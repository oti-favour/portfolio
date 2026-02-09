"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface FadeInOutOptions {
  yIn?: number;
  yOut?: number;
  scrub?: number;
  start?: string;
  end?: string;
  selector?: string;
}

export function useFadeInOut<T extends HTMLElement>({
  yIn = 80,
  yOut = -60,
  scrub = 0.6,
  start = "top bottom-=50",
  end = "bottom top+=50",
  selector,
}: FadeInOutOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!ref.current) return;

      const targets = selector
        ? ref.current.querySelectorAll(selector)
        : [ref.current];

      targets.forEach((target) => {
        gsap.set(target, { opacity: 0, y: yIn });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target,
            start,
            end,
            scrub,
          },
        });

        // Fade in: 0% → 25%
        tl.to(target, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.25,
        });

        // Hold: 25% → 75%
        tl.to(target, {
          duration: 0.5,
        });

        // Fade out: 75% → 100%
        tl.to(target, {
          opacity: 0,
          y: yOut,
          ease: "power2.in",
          duration: 0.25,
        });
      });
    },
    { scope: ref }
  );

  return ref;
}
