"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconExpand } from "@/components/brand/Icons";
import { Lightbox } from "@/components/ui/Lightbox";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { photo, stage } from "@/content/media";
import { showPlaceholders } from "@/content/site";

const FRAMES = [
  { ...photo("croissant-and-tea", "A croissant and a glass of milky tea on a wooden table"), caption: "A quick stop", w: "w-[68vw] sm:w-[22rem]", h: "aspect-[3/4]" },
  { ...photo("pizza-wide", "Pizza on a wooden paddle"), caption: "Something to share", w: "w-[86vw] sm:w-[34rem]", h: "aspect-[3/2]" },
  { ...stage("mojito-lineup", "Four colourful mojitos lined up on a green backdrop"), caption: "An afternoon cooler", w: "w-[86vw] sm:w-[30rem]", h: "aspect-[4/3]" },
  { ...photo("black-forest-cake-detail", "Black Forest cake with whipped cream and cherries"), caption: "Something sweet", w: "w-[68vw] sm:w-[22rem]", h: "aspect-[3/4]" },
  { ...photo("ugali-stew-wide", "Ugali, beef stew and greens from above"), caption: "A proper lunch", w: "w-[86vw] sm:w-[34rem]", h: "aspect-[3/2]" },
  { ...photo("pancake-syrup-2", "Pancake dusted with sugar beside a pot of syrup"), caption: "Unhurried mornings", w: "w-[68vw] sm:w-[22rem]", h: "aspect-[3/4]" },
];

export function Atmosphere() {
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const scrollBy = (d: number) => track.current?.scrollBy({ left: d * Math.min(window.innerWidth * 0.7, 560), behavior: "smooth" });

  return (
    <section aria-labelledby="atmos-title" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal><p className="eyebrow text-caramel">The Opal table</p></Reveal>
          <h2 id="atmos-title" className="font-display text-mega mt-5 text-espresso"><LineReveal lines={["A place to", <em key="t">make time.</em>]} /></h2>
          <Reveal delay={0.1}><p className="text-lede mt-6 max-w-md text-muted">For quick stops, unhurried conversations, and everything in between.</p></Reveal>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll photos left" className="flex h-12 w-12 items-center justify-center rounded-full border border-espresso/25 text-espresso transition hover:bg-espresso hover:text-ivory"><IconArrowLeft /></button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll photos right" className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso text-ivory transition hover:bg-roast"><IconArrowRight /></button>
        </div>
      </div>

      <div
        ref={track}
        data-cursor="Drag"
        className="no-scrollbar mt-14 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto scroll-smooth scroll-px-5 px-5 pb-4 sm:gap-6 sm:scroll-px-8 sm:px-8 lg:scroll-px-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))]"
        tabIndex={0}
        aria-label="Photos from Opal — scroll horizontally"
      >
        {FRAMES.map((f, i) => (
          <figure key={f.src} className={`group shrink-0 snap-start ${f.w}`}>
            <button type="button" onClick={() => setOpen(i)} className="relative block w-full overflow-hidden rounded-[1.75rem]" aria-label={`View larger: ${f.caption}`} data-cursor="View">
              <div className={`relative ${f.h}`}>
                <Image src={f.src} alt={f.alt} fill sizes="(min-width:640px) 34rem, 86vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-opal)] group-hover:scale-[1.06]" />
              </div>
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-espresso opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"><IconExpand width={16} height={16} /></span>
            </button>
            <figcaption className="mt-4 flex items-center gap-3 text-espresso">
              <span className="eyebrow text-[0.6rem] text-muted">0{i + 1}</span>
              <span className="font-display text-xl italic">{f.caption}</span>
            </figcaption>
          </figure>
        ))}
        {showPlaceholders && (
          <div className="flex aspect-[3/4] w-[68vw] shrink-0 snap-start flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-caramel/50 p-8 text-center text-muted sm:w-[22rem]">
            <p className="eyebrow text-caramel">Placeholder</p>
            <p className="mt-3 font-display text-2xl text-espresso">Interior & exterior photography goes here</p>
            <p className="mt-2 text-sm">Only real photos of Opal&apos;s space — see README.</p>
          </div>
        )}
      </div>

      <Lightbox items={FRAMES.map(({ src, alt, width, height, caption }) => ({ src, alt, width, height, caption }))} index={open} onClose={() => setOpen(null)} onIndex={setOpen} label="Opal photo viewer" />
    </section>
  );
}
