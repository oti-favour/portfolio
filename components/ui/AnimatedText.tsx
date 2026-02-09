"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export function AnimatedText({
  children,
  as: Tag = "p",
  className = "",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const words = children.split(" ");
      el.innerHTML = words
        .map(
          (word, i) =>
            `<span class="highlight-word">${word}</span>${i < words.length - 1 ? " " : ""}`
        )
        .join("");

      if (reducedMotion) {
        el.querySelectorAll<HTMLSpanElement>(".highlight-word").forEach((span) => {
          span.style.color = "#EDEDED";
        });
        return;
      }

      const wordSpans = el.querySelectorAll(".highlight-word");

      gsap.to(wordSpans, {
        color: "#EDEDED",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scrub: true,
          start: "top 65%",
          end: "bottom 40%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    // @ts-expect-error -- dynamic tag element
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
