"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/lib/useIsClient";
import { IconClose, IconMinus, IconPlus, IconWhatsApp } from "@/components/brand/Icons";
import { formatPrice } from "@/content/menu";
import { whatsappUrl } from "@/content/site";
import { buildRequestMessage } from "@/lib/whatsapp";

export type RequestLine = { key: string; id: string; name: string; price: number | null; qty: number; option?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/** WhatsApp order-INTENT builder. Nothing is charged or confirmed here. */
export function RequestTray({ open, onClose, lines, setLines }: { open: boolean; onClose: () => void; lines: RequestLine[]; setLines: Dispatch<SetStateAction<RequestLine[]>> }) {
  const mounted = useIsClient();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [timing, setTiming] = useState("Pick up");
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prevFocus?.focus?.(); };
  }, [open, onClose]);

  const allPriced = lines.length > 0 && lines.every((l) => l.price != null);
  const total = allPriced ? lines.reduce((s, l) => s + (l.price ?? 0) * l.qty, 0) : null;
  const message = buildRequestMessage({ lines, name, note, timing, total });
  const href = whatsappUrl(message);
  const change = (key: string, d: number) => setLines((ls) => ls.flatMap((l) => (l.key !== key ? [l] : l.qty + d <= 0 ? [] : [{ ...l, qty: l.qty + d }])));

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[115] bg-obsidian/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.aside
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tray-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream text-espresso"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
              <h2 id="tray-title" className="font-display text-3xl">Your request</h2>
              <button type="button" onClick={onClose} aria-label="Close request" className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15"><IconClose /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <p className="py-10 text-center text-muted">Nothing added yet. Tap “+” on any dish.</p>
              ) : (
                <ul className="divide-y divide-espresso/10">
                  {lines.map((l) => (
                    <li key={l.key} className="flex items-center gap-3 py-4">
                      <div className="flex-1">
                        <p className="font-medium">{l.name}</p>
                        <p className="text-xs text-muted">{l.option ? `${l.option} · ` : ""}{formatPrice(l.price) ?? "Price confirmed by café"}</p>
                      </div>
                      <div className="flex items-center rounded-full border border-espresso/15">
                        <button type="button" onClick={() => change(l.key, -1)} aria-label={`One less ${l.name}`} className="flex h-10 w-10 items-center justify-center"><IconMinus width={16} height={16} /></button>
                        <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                        <button type="button" onClick={() => change(l.key, 1)} aria-label={`One more ${l.name}`} className="flex h-10 w-10 items-center justify-center"><IconPlus width={16} height={16} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 space-y-4">
                <label className="block text-sm"><span className="eyebrow mb-2 block text-[0.6rem] text-muted">Your name (optional)</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} className="h-11 w-full rounded-full border border-espresso/20 bg-ivory px-4" /></label>
                <fieldset>
                  <legend className="eyebrow mb-2 text-[0.6rem] text-muted">How</legend>
                  <div className="flex gap-2">
                    {["Pick up", "Eat in"].map((t) => (
                      <button key={t} type="button" aria-pressed={timing === t} onClick={() => setTiming(t)} className={`rounded-full px-4 py-2 text-sm ${timing === t ? "bg-espresso text-ivory" : "border border-espresso/20"}`}>{t}</button>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-sm"><span className="eyebrow mb-2 block text-[0.6rem] text-muted">Note (optional)</span>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} rows={3} placeholder="e.g. arriving around 1pm" className="w-full rounded-2xl border border-espresso/20 bg-ivory px-4 py-3" /></label>
              </div>
            </div>
            <div className="border-t border-espresso/10 px-6 py-5">
              {total != null && <p className="mb-3 flex justify-between text-sm"><span className="text-muted">Estimated total</span><span className="font-semibold">{formatPrice(total)}</span></p>}
              <a
                href={lines.length && href ? href : undefined}
                aria-disabled={!lines.length}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn w-full ${lines.length ? "btn-primary" : "pointer-events-none bg-espresso/20 text-espresso/50"}`}
              >
                <IconWhatsApp width={18} height={18} /><span>Send request on WhatsApp</span>
              </a>
              <p className="mt-3 text-center text-xs text-muted">This opens WhatsApp with your request. It is not an order until Opal confirms it.</p>
              {lines.length > 0 && <button type="button" onClick={() => setLines([])} className="mx-auto mt-3 block text-xs uppercase tracking-[0.14em] text-muted underline-offset-4 hover:underline">Clear list</button>}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
