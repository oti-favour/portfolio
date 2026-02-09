"use client";

import { useRef, useCallback, useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleCycles?: number;
  hover?: boolean;
}

export function TextScramble({
  text,
  className = "",
  speed = 50,
  scrambleCycles = 2,
  hover,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const scramble = useCallback(() => {
    if (reducedMotion.current) return;

    cancelAnimationFrame(frameRef.current);
    let tick = 0;
    let lastTime = 0;

    function step(time: number) {
      if (time - lastTime < speed) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }
      lastTime = time;

      const resolved = Math.floor(tick / scrambleCycles);

      if (resolved >= text.length) {
        setDisplay(text);
        return;
      }

      const next = text
        .split("")
        .map((char, i) => {
          if (i < resolved) return char;
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);
      tick++;
      frameRef.current = requestAnimationFrame(step);
    }

    frameRef.current = requestAnimationFrame(step);
  }, [text, speed, scrambleCycles]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setDisplay(text);
  }, [text]);

  // External hover control
  useEffect(() => {
    if (hover === undefined) return;
    if (hover) {
      scramble();
    } else {
      reset();
    }
  }, [hover, scramble, reset]);

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // Only use mouse events when not externally controlled
  const mouseProps = hover === undefined
    ? { onMouseEnter: scramble, onMouseLeave: reset }
    : {};

  return (
    <span className={className} {...mouseProps}>
      {display}
    </span>
  );
}
