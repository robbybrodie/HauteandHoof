"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type MediaStub = {
  id: string;
  label: string;
  type: "photo" | "video";
  image?: string;
};

type Ghost = {
  x: number;
  y: number;
};

const STUBS: MediaStub[] = [
  { id: "s1", label: "Training Moment", type: "photo", image: "/images/home-hero.jpg" },
  { id: "s2", label: "Journey Highlight", type: "photo", image: "/images/journey-banner.jpg" },
  { id: "s3", label: "Barrel Clip Stub", type: "video" },
  { id: "s4", label: "Sewing Desk Stub", type: "photo" },
  { id: "s5", label: "Jumping Reel Stub", type: "video" }
];

export function CursorMediaTrail() {
  const [activeStub, setActiveStub] = useState(STUBS[0]);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Ghost>({ x: 0, y: 0 });
  const nextStub = useRef(1);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const lastSwap = useRef(0);
  const enabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return false;
    return true;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.2;
      current.current.y += (target.current.y - current.current.y) * 0.2;
      setPosition({ x: current.current.x, y: current.current.y });
      rafId.current = window.requestAnimationFrame(animate);
    };

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX + 24, y: event.clientY + 18 };
      if (!visible) setVisible(true);

      const now = performance.now();
      if (now - lastSwap.current > 280) {
        setActiveStub(STUBS[nextStub.current]);
        nextStub.current = (nextStub.current + 1) % STUBS.length;
        lastSwap.current = now;
      }
    };

    const onLeave = () => {
      setVisible(false);
    };

    rafId.current = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div className="cursorTrailLayer" aria-hidden="true">
      <div
        className={`cursorPreview ${visible ? "cursorPreviewVisible" : ""} ${
          activeStub.type === "video" ? "cursorPreviewVideo" : "cursorPreviewPhoto"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundImage: activeStub.image ? `url(${activeStub.image})` : undefined
        }}
      >
        <span>{activeStub.type === "video" ? "Video" : "Photo"}</span>
        <small>{activeStub.label}</small>
      </div>
    </div>
  );
}
