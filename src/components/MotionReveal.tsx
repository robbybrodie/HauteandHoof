"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MotionReveal({
  children,
  delayMs = 0
}: {
  children: ReactNode;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("revealVisible"), delayMs);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
