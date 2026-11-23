"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/lib/useIsClient";
import { IconArrowLeft, IconArrowRight, IconClose } from "@/components/brand/Icons";

export type LightboxItem = { src: string; alt: string; width: number; height: number; caption?: string };

type Props = { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void; label?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accessible full-screen viewer: focus trap, Escape, ←/→, swipe, focus restore. */
export function Lightbox({ items, index, onClose, onIndex, label = "Image viewer" }: Props) {
  const open = index !== null;
  const mounted = useIsClient();
  const [dir, setDir] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);


  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onIndex((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      returnFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        const i = f.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  if (!mounted) return null;
  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[120] flex flex-col bg-obsidian/96 text-ivory backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onPointerDown={(e) => (touch.current = { x: e.clientX, y: e.clientY })}
          onPointerUp={(e) => {
            if (!touch.current || e.pointerType === "mouse") return;
            const dx = e.clientX - touch.current.x;
            const dy = e.clientY - touch.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
            else if (dy > 90) onClose();
            touch.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <p className="eyebrow text-ivory/60" aria-live="polite">
              {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-obsidian" aria-label="Close viewer">
              <IconClose />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.figure
                key={item.src}
                custom={dir}
                className="relative flex h-full max-h-[78vh] w-full max-w-5xl flex-col items-center justify-center"
                initial={{ opacity: 0, x: dir * 60, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -60, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="relative h-full w-full">
                  <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 1000px, 100vw" className="object-contain" quality={90} />
                </div>
                {item.caption && <figcaption className="mt-4 font-display text-xl italic text-ivory/80">{item.caption}</figcaption>}
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-obsidian sm:flex">
                  <IconArrowLeft />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-obsidian sm:flex">
                  <IconArrowRight />
                </button>
              </>
            )}
          </div>

          {items.length > 1 && (
            <div className="flex items-center justify-center gap-3 pb-6 pt-3 sm:hidden">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20"><IconArrowLeft /></button>
              <span className="eyebrow text-ivory/50">Swipe</span>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20"><IconArrowRight /></button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
