"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/lib/useIsClient";
import { IconClose, IconMinus, IconPlus } from "@/components/brand/Icons";
import { categories, formatPrice, type MenuItem } from "@/content/menu";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ItemDialog({ item, onClose, onAdd }: { item: MenuItem | null; onClose: () => void; onAdd?: (item: MenuItem, qty: number, option?: string) => void }) {
  const mounted = useIsClient();
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{item && <Dialog key={item.id} item={item} onClose={onClose} onAdd={onAdd} />}</AnimatePresence>,
    document.body,
  );
}

function Dialog({ item, onClose, onAdd }: { item: MenuItem; onClose: () => void; onAdd?: (item: MenuItem, qty: number, option?: string) => void }) {
  const images = [...(item.cutout ? [item.cutout] : []), ...item.photos];
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState<string | undefined>(item.options?.[0]?.choices[0]);
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const img = images[active];
  const isCutout = img?.src.includes("/cutouts/");
  const price = formatPrice(item.price);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = Array.from(ref.current.querySelectorAll<HTMLElement>("button, select, a"));
        const i = f.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); prevFocus?.focus?.(); };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[110] flex items-end justify-center bg-obsidian/70 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-title"
        className="relative grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-cream sm:rounded-[2rem] md:grid-cols-2 md:overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-espresso shadow transition hover:bg-espresso hover:text-ivory">
          <IconClose />
        </button>
        <div className={`relative ${isCutout ? "bg-vanilla" : "bg-espresso"}`}>
          <div className="relative aspect-square md:aspect-auto md:h-full md:min-h-[32rem]">
            <AnimatePresence mode="wait">
              <motion.div key={img?.src} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {img && <Image src={img.src} alt={img.alt} fill sizes="(min-width:768px) 50vw, 100vw" quality={90} className={isCutout || img.src.includes("/stage/mojito") ? "object-contain p-8" : "object-cover"} />}
              </motion.div>
            </AnimatePresence>
          </div>
          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2" role="group" aria-label="Photos">
              {images.map((m, i) => (
                <button key={m.src} type="button" onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} aria-pressed={i === active}
                  className={`relative h-14 w-14 overflow-hidden rounded-xl border-2 transition ${i === active ? "border-ivory" : "border-transparent opacity-70 hover:opacity-100"}`}>
                  <Image src={m.src} alt="" fill sizes="56px" className={m.src.includes("/cutouts/") ? "bg-vanilla object-contain" : "object-cover"} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col p-7 sm:p-10 md:overflow-y-auto">
          <p className="eyebrow text-caramel">{categories.find((c) => c.id === item.category)?.label}{item.serve ? ` · ${item.serve}` : ""}</p>
          <h2 id="item-title" className="font-display mt-4 text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-espresso">{item.name}</h2>
          <p className="text-lede mt-5 text-muted">{item.description}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-espresso/10 py-5 text-sm">
            <div><dt className="eyebrow text-[0.6rem] text-muted">Price</dt><dd className="mt-1 font-semibold text-espresso">{price ?? "Confirmed in store"}</dd></div>
            <div><dt className="eyebrow text-[0.6rem] text-muted">Photo</dt><dd className="mt-1 text-espresso">Served at Opal</dd></div>
          </dl>

          {onAdd && (
            <div className="mt-8">
              {item.options?.map((o) => (
                <label key={o.label} className="mb-4 block text-sm text-espresso">
                  <span className="eyebrow mb-2 block text-[0.6rem] text-muted">{o.label}</span>
                  <select value={option} onChange={(e) => setOption(e.target.value)} className="h-11 w-full rounded-full border border-espresso/20 bg-ivory px-4">
                    {o.choices.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
              ))}
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-espresso/20" role="group" aria-label="Quantity">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-12 w-12 items-center justify-center"><IconMinus /></button>
                  <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
                  <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity" className="flex h-12 w-12 items-center justify-center"><IconPlus /></button>
                </div>
                <button type="button" onClick={() => onAdd(item, qty, option)} className="btn btn-dark flex-1"><span>Add to request</span></button>
              </div>
              <p className="mt-3 text-xs text-muted">Requests are sent to Opal on WhatsApp and are only confirmed once the café replies.</p>
            </div>
          )}
          <p className="mt-auto pt-8 text-xs text-muted">Dish names on this site are descriptive while Opal finalises its online menu — ask the team for today&apos;s line-up and prices.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
