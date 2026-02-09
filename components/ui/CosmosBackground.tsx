"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  phase: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 100;

export function CosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    function createParticle(): Particle {
      const baseOpacity = 0.1 + Math.random() * 0.25;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 1 + Math.random() * 2,
        opacity: baseOpacity,
        baseOpacity,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
      };
    }

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      createParticle
    );

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(237, 237, 237, ${p.opacity})`;
        ctx!.fill();
      }
    }

    function update() {
      time++;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Sine-wave opacity pulsing
        p.opacity = p.baseOpacity + Math.sin(time * 0.02 + p.phase) * p.baseOpacity * 0.3;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
    }

    // Static single frame for reduced motion
    if (prefersReducedMotion) {
      draw();
      return;
    }

    function tick() {
      update();
      draw();
    }

    gsap.ticker.add(tick);

    const ro = new ResizeObserver(() => {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    });
    ro.observe(document.documentElement);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
