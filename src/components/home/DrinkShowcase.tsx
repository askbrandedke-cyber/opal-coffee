"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type PanInfo } from "motion/react";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@/components/brand/Icons";
import { showcase } from "@/content/showcase";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DrinkShowcase() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const drink = showcase[index];
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((delta: number) => {
    setState(([i]) => [(i + delta + showcase.length) % showcase.length, delta]);
  }, []);
  const goTo = (i: number) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

  // Cursor-driven tilt for the hero drink (desktop only)
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 }), sry = useSpring(ry, { stiffness: 120, damping: 16 });
  const glare = useTransform(sry, (v) => `radial-gradient(circle at ${50 + v * 2.5}% 25%, rgb(255 255 255 / 0.35), transparent 45%)`);
  const onTilt = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  return (
    <motion.section
      aria-roledescription="carousel"
      aria-labelledby="drinks-title"
      className="grain relative isolate overflow-hidden py-24 text-ivory sm:py-28 lg:py-32"
      animate={{ backgroundColor: drink.stage }}
      initial={false}
      transition={{ duration: 0.9, ease: EASE }}
      onKeyDown={onKey}
    >
      <motion.div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 h-[36rem] w-[36rem] rounded-full blur-3xl"
        animate={{ backgroundColor: drink.accent, opacity: 0.22 }}
        transition={{ duration: 1 }}
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-ivory/70">Signature pours</p>
            <h2 id="drinks-title" className="font-display text-title mt-5 max-w-xl">Made for your <em>coffee moments.</em></h2>
          </div>
          <p className="max-w-sm text-ivory/75">Discover the drinks that deserve a closer look — photographed on the very backdrops you&apos;ll find across Opal&apos;s brand.</p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-6 lg:grid-cols-12 lg:gap-6">
          {/* Text */}
          <div className="order-2 lg:order-1 lg:col-span-4" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <p className="eyebrow" style={{ color: drink.accent }}>{drink.kind}</p>
                <h3 className="font-display mt-4 text-[clamp(2.8rem,5.6vw,5.4rem)] leading-[0.92]">{drink.name}</h3>
                <p className="text-lede mt-6 max-w-sm text-ivory/80">{drink.line}</p>
                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Details">
                  {drink.notes.map((n) => (
                    <li key={n} className="rounded-full border border-ivory/25 px-3.5 py-1.5 text-xs tracking-wide text-ivory/85">{n}</li>
                  ))}
                </ul>
                <Link href={`/menu#item-${drink.menuId}`} className="nav-link mt-9 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]">
                  View on the menu <IconArrowUpRight width={16} height={16} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stage */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <motion.div
              ref={stageRef}
              className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] touch-pan-y select-none [perspective:1200px]"
              onPointerMove={onTilt}
              onPointerLeave={() => { rx.set(0); ry.set(0); }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              data-cursor="Drag"
              role="group"
              aria-roledescription="slide"
              aria-label={`${drink.index} of ${String(showcase.length).padStart(2, "0")}: ${drink.name}`}
            >
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={drink.id}
                  custom={dir}
                  className={`absolute inset-0 ${drink.aspect === "square" ? "feather-soft" : ""}`}
                  style={{ rotateX: srx, rotateY: sry }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 120, rotate: dir * 6, scale: 0.9, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, rotate: 0, scale: 1, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -140, rotate: dir * -6, scale: 0.92, filter: "blur(6px)" }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <Image
                    src={drink.image.src}
                    alt={drink.image.alt}
                    fill
                    draggable={false}
                    sizes="(min-width:1024px) 34vw, 90vw"
                    quality={90}
                    className="object-contain"
                  />
                  {drink.aspect === "square" && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                    style={{ background: glare }}
                  />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="order-3 flex flex-col gap-8 lg:col-span-3 lg:items-end">
            <p className="font-display text-[clamp(4rem,7vw,7rem)] leading-none text-ivory/90" aria-hidden="true">
              {drink.index}<span className="text-2xl text-ivory/40"> / {String(showcase.length).padStart(2, "0")}</span>
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous drink" className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/30 transition hover:bg-ivory hover:text-obsidian active:scale-95">
                <IconArrowLeft />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next drink" className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-obsidian transition hover:bg-caramel-soft active:scale-95">
                <IconArrowRight />
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-end lg:gap-1.5" aria-label="Choose a drink">
              {showcase.map((d, i) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === index ? "true" : undefined}
                    className="group flex items-center gap-3 rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-ivory/55 transition hover:text-ivory aria-[current=true]:bg-ivory/10 aria-[current=true]:text-ivory lg:px-0 lg:py-1 lg:aria-[current=true]:bg-transparent"
                  >
                    <span>{d.name}</span>
                    <span aria-hidden="true" className="hidden h-px w-6 bg-current transition-all group-aria-[current=true]:w-12 lg:block" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 text-center text-[0.7rem] uppercase tracking-[0.2em] text-ivory/45 lg:text-left">
          Drink names are descriptive · ask in store for today&apos;s line-up and prices
        </p>
      </div>
    </motion.section>
  );
}
