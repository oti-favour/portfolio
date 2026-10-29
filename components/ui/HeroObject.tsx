"use client";

import { useEffect, useRef } from "react";

/**
 * The one WebGL moment: a pink wireframe icosahedron with a points overlay,
 * floating in the hero frame and tilting toward the pointer. Lazy-loads three
 * (code-split, client only) and only runs on desktop + when on screen.
 */
export function HeroObject() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Desktop-only: keep mobile light.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let cleanup: (() => void) | undefined;
    let disposed = false;

    import("three")
      .then((THREE) => {
        if (disposed || !el) return;

        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        const getSize = () => ({
          w: el.clientWidth || 1,
          h: el.clientHeight || 1,
        });

        let { w, h } = getSize();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.z = 4.4;

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        el.appendChild(renderer.domElement);

        const geo = new THREE.IcosahedronGeometry(1.4, 1);
        const edges = new THREE.WireframeGeometry(geo);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xdb2777,
          transparent: true,
          opacity: 0.5,
        });
        const lines = new THREE.LineSegments(edges, lineMat);

        const pointMat = new THREE.PointsMaterial({
          color: 0xec4899,
          size: 0.05,
          transparent: true,
          opacity: 0.9,
        });
        const points = new THREE.Points(geo, pointMat);

        const group = new THREE.Group();
        group.add(lines);
        group.add(points);
        group.rotation.set(0.35, 0.5, 0);
        scene.add(group);

        const pointer = { x: 0, y: 0 };
        const tilt = { x: 0.35, y: 0.5 };

        const onPointerMove = (e: PointerEvent) => {
          pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
          pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onPointerMove);

        const resize = () => {
          const s = getSize();
          w = s.w;
          h = s.h;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        let visible = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { threshold: 0 }
        );
        io.observe(el);

        const clock = new THREE.Clock();
        let frameId = 0;

        const renderFrame = () => renderer.render(scene, camera);

        const animate = () => {
          frameId = requestAnimationFrame(animate);
          if (!visible) return;
          const t = clock.getElapsedTime();
          tilt.x += (pointer.y * 0.5 + 0.1 - tilt.x) * 0.04;
          tilt.y += (pointer.x * 0.5 - tilt.y) * 0.04;
          group.rotation.x = tilt.x + Math.sin(t * 0.3) * 0.05;
          group.rotation.y = tilt.y + t * 0.07;
          renderFrame();
        };

        if (reduced) {
          renderFrame();
        } else {
          animate();
        }

        cleanup = () => {
          cancelAnimationFrame(frameId);
          window.removeEventListener("pointermove", onPointerMove);
          ro.disconnect();
          io.disconnect();
          geo.dispose();
          edges.dispose();
          lineMat.dispose();
          pointMat.dispose();
          renderer.dispose();
          if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        };
      })
      .catch(() => {
        /* three failed to load — hero still works without the 3D flourish */
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
