"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "span" | "li" | "h2" | "h3";
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Fade-up on scroll into view. Content is fully visible with reduced motion. */
export function Reveal({ children, delay = 0, y = 26, className, as = "div", amount = 0.3, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * Image/frame reveal through a clip-path mask.
 * Visibility is observed on an unclipped wrapper — IntersectionObserver ignores
 * fully-clipped targets, so observing the masked element itself never fires.
 */
export function MaskReveal({ children, delay = 0, className = "", from = "bottom" }: { children: ReactNode; delay?: number; className?: string; from?: "bottom" | "left" | "right" }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const hidden = from === "bottom" ? "inset(100% 0% 0% 0%)" : from === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
  const shown = reduce || inView;
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[inherit]"
        initial={reduce ? false : { clipPath: hidden }}
        animate={shown ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduce ? false : { scale: 1.15 }}
          animate={shown ? { scale: 1 } : undefined}
          transition={{ duration: 1.5, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Splits a heading into masked lines that rise in sequence. */
export function LineReveal({ lines, className, lineClassName = "", delay = 0 }: { lines: ReactNode[]; className?: string; lineClassName?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <span ref={ref} className={`block ${className ?? ""}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`inline-block ${lineClassName}`}
            initial={reduce ? false : { y: "105%" }}
            animate={reduce || inView ? { y: "0%" } : undefined}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** A decorative path that draws itself (path needs pathLength={1}). */
export function DrawOnView({ children, className = "", delay = 0.2 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <div ref={ref} className={`draw ${inView ? "is-drawn" : ""} ${className}`} style={{ ["--draw-delay" as string]: `${delay}s` }}>
      {children}
    </div>
  );
}
