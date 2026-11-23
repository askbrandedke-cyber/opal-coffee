"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { IconExpand } from "@/components/brand/Icons";
import { Lightbox } from "@/components/ui/Lightbox";
import { gallery, galleryCategories, type GalleryCategory } from "@/content/gallery";
import { showPlaceholders } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function GalleryGrid() {
  const [cat, setCat] = useState<"All" | GalleryCategory>("All");
  const [open, setOpen] = useState<number | null>(null);
  const available = galleryCategories.filter((c) => gallery.some((g) => g.category === c) || (showPlaceholders && c === "Our Space"));
  const items = useMemo(() => (cat === "All" ? gallery : gallery.filter((g) => g.category === cat)), [cat]);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 sm:px-8">
      <LayoutGroup id="gal">
        <div className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 py-8 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter photos">
          {(["All", ...available] as const).map((c) => {
            const on = cat === c;
            return (
              <button key={c} type="button" aria-pressed={on} onClick={() => setCat(c)} className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors ${on ? "text-ivory" : "text-espresso/70 hover:text-espresso"}`}>
                {on && <motion.span layoutId="gal-pill" className="absolute inset-0 rounded-full bg-espresso" transition={{ duration: 0.45, ease: EASE }} />}
                <span className="relative">{c}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <p className="sr-only" aria-live="polite">{items.length} photos</p>

      {cat === "Our Space" && showPlaceholders && items.length === 0 && (
        <div className="rounded-[2rem] border-2 border-dashed border-caramel/50 p-12 text-center text-muted">
          <p className="eyebrow text-caramel">Placeholder · preview only</p>
          <p className="mt-3 font-display text-3xl text-espresso">Interior, exterior and team photos will live here.</p>
        </div>
      )}

      <motion.ul layout className="columns-2 gap-3 sm:gap-5 md:columns-3 xl:columns-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((g, i) => (
            <motion.li
              key={g.id}
              layout
              className="mb-3 break-inside-avoid sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE, delay: Math.min(i, 8) * 0.03 }}
            >
              <figure className="group">
                <button type="button" onClick={() => setOpen(i)} className="relative block w-full overflow-hidden rounded-[1.25rem] bg-vanilla sm:rounded-[1.5rem]" aria-label={`Open photo: ${g.caption}`} data-cursor="View">
                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} loading={i < 4 ? "eager" : "lazy"} sizes="(min-width:1280px) 24vw, (min-width:768px) 32vw, 48vw"
                    className={`h-auto w-full transition-transform duration-[1.1s] ease-[var(--ease-opal)] group-hover:scale-[1.05] ${g.src.includes("/cutouts/") ? "bg-[#ece2d4] p-4" : ""}`} />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-obsidian/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-display text-lg italic text-ivory">{g.caption}</span>
                    <IconExpand className="text-ivory" width={18} height={18} />
                  </span>
                </button>
                <figcaption className="sr-only">{g.caption} — {g.category}</figcaption>
              </figure>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={items.map(({ src, alt, width, height, caption }) => ({ src, alt, width, height, caption }))} index={open} onClose={() => setOpen(null)} onIndex={setOpen} label="Opal gallery viewer" />
    </div>
  );
}
