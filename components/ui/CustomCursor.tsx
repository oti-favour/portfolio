"use client";

import { useEffect, useRef } from "react";

/**
 * A glowing, 3D-ish custom cursor: a small pink orb with a trailing ring.
 * Over elements marked data-cursor="view" the ring grows into a "View" bubble.
 * Desktop / fine-pointer only; respects reduced motion and cleans up after itself.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const root = document.documentElement;
    root.setAttribute("data-custom-cursor", "");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (reduced) ring.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('[data-cursor="view"]')) {
        root.setAttribute("data-cursor-view", "");
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const related = (e as PointerEvent).relatedTarget as HTMLElement | null;
      if (
        target?.closest?.('[data-cursor="view"]') &&
        !related?.closest?.('[data-cursor="view"]')
      ) {
        root.removeAttribute("data-cursor-view");
      }
    };
    const onLeave = () => root.setAttribute("data-cursor-hidden", "");
    const onEnter = () => root.removeAttribute("data-cursor-hidden");

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    if (!reduced) loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      root.removeAttribute("data-custom-cursor");
      root.removeAttribute("data-cursor-view");
      root.removeAttribute("data-cursor-hidden");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-view-label">View</span>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
