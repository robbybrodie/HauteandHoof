"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type MediaStub = {
  id: string;
  label: string;
  type: "photo" | "video";
  image?: string;
};

type Ghost = {
  id: number;
  x: number;
  y: number;
  stub: MediaStub;
};

const STUBS: MediaStub[] = [
  { id: "s1", label: "Training Moment", type: "photo", image: "/images/home-hero.jpg" },
  { id: "s2", label: "Journey Highlight", type: "photo", image: "/images/journey-banner.jpg" },
  { id: "s3", label: "Barrel Clip Stub", type: "video" },
  { id: "s4", label: "Sewing Desk Stub", type: "photo" },
  { id: "s5", label: "Jumping Reel Stub", type: "video" }
];

export function CursorMediaTrail() {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const nextStub = useRef(0);
  const ghostId = useRef(0);
  const lastSpawn = useRef(0);
  const enabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return false;
    return true;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 90) return;
      lastSpawn.current = now;

      const stub = STUBS[nextStub.current];
      nextStub.current = (nextStub.current + 1) % STUBS.length;

      const newGhost: Ghost = {
        id: ghostId.current++,
        x: event.clientX,
        y: event.clientY,
        stub
      };

      setGhosts((current) => [...current.slice(-7), newGhost]);
      window.setTimeout(() => {
        setGhosts((current) => current.filter((ghost) => ghost.id !== newGhost.id));
      }, 640);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursorTrailLayer" aria-hidden="true">
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className={`cursorGhost ${ghost.stub.type === "video" ? "cursorGhostVideo" : "cursorGhostPhoto"}`}
          style={{
            left: `${ghost.x}px`,
            top: `${ghost.y}px`,
            backgroundImage: ghost.stub.image ? `url(${ghost.stub.image})` : undefined
          }}
        >
          <span>{ghost.stub.type === "video" ? "Video" : "Photo"}</span>
          <small>{ghost.stub.label}</small>
        </div>
      ))}
    </div>
  );
}
