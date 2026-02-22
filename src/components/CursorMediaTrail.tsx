"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Stub = {
  label: string;
  type: "photo" | "video";
  image?: string;
};

const STUBS: Stub[] = [
  { label: "Training Moment", type: "photo", image: "/images/home-hero.jpg" },
  { label: "Journey Highlight", type: "photo", image: "/images/journey-banner.jpg" },
  { label: "Barrel Clip", type: "video" },
  { label: "Sewing Desk", type: "photo" },
  { label: "Jumping Reel", type: "video" }
];

export function CursorMediaTrail() {
  const [stub, setStub] = useState(STUBS[0]);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const tgt = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const idx = useRef(1);
  const lastSwap = useRef(0);

  const enabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia?.("(pointer: coarse)").matches;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      cur.current.x += (tgt.current.x - cur.current.x) * 0.15;
      cur.current.y += (tgt.current.y - cur.current.y) * 0.15;
      setPos({ x: cur.current.x, y: cur.current.y });
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tgt.current = { x: e.clientX + 20, y: e.clientY + 16 };
      if (!visible) setVisible(true);
      const now = performance.now();
      if (now - lastSwap.current > 320) {
        setStub(STUBS[idx.current]);
        idx.current = (idx.current + 1) % STUBS.length;
        lastSwap.current = now;
      }
    };

    const onLeave = () => setVisible(false);

    raf.current = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div className="cursorLayer" aria-hidden="true">
      <div
        className={`cursorCard ${visible ? "cursorCardVisible" : ""}`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          backgroundImage: stub.image ? `url(${stub.image})` : undefined,
          background: !stub.image
            ? "linear-gradient(135deg, #18181e, #222230)"
            : undefined
        }}
      >
        <span>{stub.type === "video" ? "Video" : "Photo"}</span>
        <small>{stub.label}</small>
      </div>
    </div>
  );
}
