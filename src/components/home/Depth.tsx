"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useRef, type ReactNode, type PointerEvent } from "react";

type Ctx = { x: MotionValue<number>; y: MotionValue<number> };
const DepthCtx = createContext<Ctx | null>(null);

/** Pointer-driven depth for desktop. Touch and reduced-motion visitors get a static scene. */
export function DepthScene({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 18 });
  const y = useSpring(my, { stiffness: 60, damping: 18 });

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <DepthCtx.Provider value={{ x, y }}>
      <div ref={ref} className={className} onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }}>
        {children}
      </div>
    </DepthCtx.Provider>
  );
}

export function DepthLayer({ depth, children, className }: { depth: number; children: ReactNode; className?: string }) {
  const ctx = useContext(DepthCtx)!;
  const tx = useTransform(ctx.x, (v) => v * depth);
  const ty = useTransform(ctx.y, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x: tx, y: ty }}>
      {children}
    </motion.div>
  );
}
