"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { photo, stage } from "@/content/media";

const MOMENTS = [
  { id: "morning", time: "Mornings", title: "Your Morning Reset", text: "A warm latte, a flaky croissant, and ten quiet minutes before the day begins.", image: stage("latte-croissant", "Latte with a croissant") },
  { id: "break", time: "Midday", title: "A Quick Coffee Break", text: "Step off Ngong Road, refuel, and get back out there feeling better.", image: photo("pancake-stack-3", "Pancake stack on a wooden table") },
  { id: "catchup", time: "Afternoons", title: "An Afternoon Catch-Up", text: "Cake, something cold and colourful, and a long overdue conversation.", image: photo("black-forest-cake", "Black Forest cake on a wooden table") },
  { id: "weekend", time: "Weekends", title: "Your Weekend Pause", text: "Pizza, wings and plates made for sharing — no rush at all.", image: photo("pizza-2", "Sausage and beef pizza on a wooden board") },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Moments() {
  const [active, setActive] = useState(0);
  const m = MOMENTS[active];

  return (
    <section aria-labelledby="moments-title" className="grain relative isolate overflow-hidden bg-obsidian text-ivory">
      <AnimatePresence initial={false}>
        <motion.div key={m.id} className="absolute inset-0 -z-10" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: EASE }}>
          <Image src={m.image.src} alt="" fill sizes="100vw" className="object-cover opacity-30 blur-[2px]" quality={70} />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />

      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <Reveal><p className="eyebrow text-caramel-soft">Opal moments</p></Reveal>
        <h2 id="moments-title" className="font-display text-mega mt-5 max-w-5xl"><LineReveal lines={["Whatever brings you in —", <em key="m" className="opal-text">there&apos;s a moment for it.</em>]} /></h2>

        {/* Desktop: expanding panels */}
        <div className="mt-16 hidden h-[30rem] gap-3 lg:flex" role="tablist" aria-label="Opal moments">
          {MOMENTS.map((mo, i) => {
            const on = i === active;
            return (
              <motion.button
                key={mo.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`moment-${mo.id}`}
                id={`moment-tab-${mo.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative flex flex-col justify-end overflow-hidden rounded-[1.75rem] border border-ivory/15 p-7 text-left"
                animate={{ flexGrow: on ? 2.6 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ flexBasis: 0 }}
              >
                <Image src={mo.image.src} alt="" fill sizes="40vw" className={`object-cover transition-all duration-1000 ${on ? "opacity-90 scale-100" : "opacity-25 scale-110"}`} />
                <span className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />
                <span className="relative">
                  <span className="eyebrow text-caramel-soft">0{i + 1} · {mo.time}</span>
                  <span className="font-display mt-3 block text-[2.1rem] leading-tight">{mo.title}</span>
                  <AnimatePresence>
                    {on && (
                      <motion.span id={`moment-${mo.id}`} role="tabpanel" aria-labelledby={`moment-tab-${mo.id}`} className="mt-3 block max-w-sm text-ivory/80" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        {mo.text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile: swipeable cards */}
        <ul className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 lg:hidden">
          {MOMENTS.map((mo, i) => (
            <li key={mo.id} className="relative flex aspect-[3/4] w-[80vw] max-w-sm shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[1.75rem] p-6">
              <Image src={mo.image.src} alt={mo.image.alt} fill sizes="80vw" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
              <div className="relative">
                <p className="eyebrow text-caramel-soft">0{i + 1} · {mo.time}</p>
                <h3 className="font-display mt-2 text-3xl">{mo.title}</h3>
                <p className="mt-2 text-sm text-ivory/80">{mo.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
