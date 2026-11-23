"use client";

import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BeansArt, BrewArt, PauseArt, PourArt } from "./RitualArt";

const STAGES = [
  { n: "01", title: "The Beans", body: "It begins with a handful of roasted beans — dark, glossy, and full of promise.", art: <BeansArt /> },
  { n: "02", title: "The Brew", body: "Hot water meets fine grounds, and a slow ribbon of espresso settles under its crema.", art: <BrewArt /> },
  { n: "03", title: "The Pour", body: "Silky milk folds in, and a careful wrist turns the surface into a heart.", art: <PourArt /> },
  { n: "04", title: "The Pause", body: "Then the best part — the cup is yours. Sit down. Slow down. This is your moment.", art: <PauseArt /> },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function Step({ i, onActive, children }: { i: number; onActive: (i: number) => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  return <div ref={ref} className="flex min-h-[70vh] items-center">{children}</div>;
}

export function Ritual() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section ref={ref} aria-labelledby="ritual-title" className="grain relative bg-espresso text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 sm:pt-32">
        <p className="eyebrow text-caramel-soft">The Opal ritual</p>
        <h2 id="ritual-title" className="font-display text-mega mt-5 max-w-3xl">Every cup has <em className="opal-text">a moment.</em></h2>
      </div>

      {/* Desktop: sticky illustration, text steps scroll naturally (no scroll-jacking) */}
      <div className="mx-auto hidden max-w-[1440px] grid-cols-12 gap-8 px-8 pb-24 lg:grid">
        <div className="col-span-6">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-square w-full max-w-[560px]">
              <div aria-hidden="true" className="opal-glow inset-[12%] [--glow:0.30]" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  {STAGES[active].art}
                </motion.div>
              </AnimatePresence>
              <svg viewBox="0 0 100 100" className="absolute -inset-[4%] -rotate-90" aria-hidden="true">
                <circle cx="50" cy="50" r="49" fill="none" stroke="#faf8f4" strokeOpacity="0.08" strokeWidth="0.3" />
                <motion.circle cx="50" cy="50" r="49" fill="none" stroke="#d9b48a" strokeWidth="0.4" style={{ pathLength: progress }} />
              </svg>
            </div>
          </div>
        </div>
        <ol className="col-span-5 col-start-8">
          {STAGES.map((s, i) => (
            <li key={s.n}>
              <Step i={i} onActive={setActive}>
                <div className={`transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-30"}`}>
                  <p className="eyebrow text-caramel-soft">{s.n} — Stage</p>
                  <h3 className="font-display mt-4 text-[clamp(2.6rem,4.5vw,4.5rem)] leading-none">{s.title}</h3>
                  <p className="text-lede mt-6 max-w-md text-ivory/70">{s.body}</p>
                </div>
              </Step>
            </li>
          ))}
          <li aria-hidden="true" className="h-[30vh]" />
        </ol>
      </div>

      {/* Mobile & tablet: stacked cards, each with its own visual */}
      <ol className="mx-auto grid max-w-2xl gap-14 px-5 pb-24 pt-14 sm:px-8 lg:hidden">
        {STAGES.map((s, i) => (
          <motion.li key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: EASE, delay: i === 0 ? 0 : 0.05 }}>
            <div className="relative mx-auto aspect-square w-full max-w-sm">{s.art}</div>
            <p className="eyebrow mt-6 text-caramel-soft">{s.n} — Stage</p>
            <h3 className="font-display mt-3 text-5xl">{s.title}</h3>
            <p className="mt-4 text-ivory/70">{s.body}</p>
          </motion.li>
        ))}
      </ol>
      <p className="sr-only">Illustrations are artistic and do not depict Opal&apos;s sourcing or roasting.</p>
    </section>
  );
}
