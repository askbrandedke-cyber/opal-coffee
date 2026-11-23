"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { IconBag, IconPlus, IconSearch } from "@/components/brand/Icons";
import { categories, formatPrice, menu, type CategoryId, type MenuItem } from "@/content/menu";
import { siteConfig } from "@/content/site";
import { ItemDialog } from "./ItemDialog";
import { RequestTray, type RequestLine } from "./RequestTray";
import { useIsClient } from "@/lib/useIsClient";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGE_BG: Record<string, string> = { green: "#006b37", orange: "#f89520", mocha: "#8d6238" };

type Cat = "all" | CategoryId;
type Serve = "any" | "hot" | "iced";

export function MenuExplorer() {
  const [cat, setCat] = useState<Cat>("all");
  const [query, setQuery] = useState("");
  const [serve, setServe] = useState<Serve>("any");
  const [openId, setOpenId] = useState<string | null>(null);
  // Restored lazily on the client; the tray UI only renders after hydration, so no mismatch.
  const [lines, setLines] = useState<RequestLine[]>(() => {
    if (typeof window === "undefined" || !siteConfig.whatsapp) return [];
    try { return JSON.parse(localStorage.getItem("opal-request") ?? "[]") as RequestLine[]; } catch { return []; }
  });
  const isClient = useIsClient();
  const [trayOpen, setTrayOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const q = useDeferredValue(query.trim().toLowerCase());
  const ordering = Boolean(siteConfig.whatsapp);

  // Deep links: /menu#breakfast or /menu#item-cafe-latte
  useEffect(() => {
    const apply = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (!h) return;
      if (categories.some((c) => c.id === h)) {
        setCat(h as CategoryId);
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (h.startsWith("item-")) {
        const id = h.slice(5);
        if (menu.some((m) => m.id === id)) {
          setOpenId(id);
          document.getElementById(h)?.scrollIntoView({ block: "center" });
        }
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  // Persist the request list for the visitor's convenience.
  useEffect(() => {
    if (!ordering) return;
    try { localStorage.setItem("opal-request", JSON.stringify(lines)); } catch {}
  }, [lines, ordering]);

  const filtered = useMemo(
    () =>
      menu.filter((m) => {
        if (cat !== "all" && m.category !== cat) return false;
        if (serve !== "any" && m.serve !== serve) return false;
        if (!q) return true;
        const cName = categories.find((c) => c.id === m.category)?.label ?? "";
        return `${m.name} ${m.description} ${cName}`.toLowerCase().includes(q);
      }),
    [cat, serve, q],
  );

  const groups = useMemo(
    () => categories.map((c) => ({ ...c, items: filtered.filter((m) => m.category === c.id) })).filter((g) => g.items.length),
    [filtered],
  );

  const add = useCallback((item: MenuItem, qty = 1, option?: string) => {
    setLines((ls) => {
      const key = `${item.id}|${option ?? ""}`;
      const found = ls.find((l) => l.key === key);
      if (found) return ls.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...ls, { key, id: item.id, name: item.name, price: item.price, qty, option }];
    });
  }, []);

  const showServe = cat === "all" || cat === "coffee-drinks";
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const openItem = openId ? menu.find((m) => m.id === openId) ?? null : null;

  return (
    <div ref={topRef} className="scroll-mt-20">
      {/* Toolbar */}
      <div className="sticky top-[60px] z-30 border-b border-espresso/10 bg-cream/90 backdrop-blur-xl sm:top-[68px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <LayoutGroup id="cats">
            <div className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Menu categories">
              {[{ id: "all" as Cat, label: "All" }, ...categories].map((c) => {
                const on = cat === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => { setCat(c.id); history.replaceState(null, "", c.id === "all" ? "/menu" : `/menu#${c.id}`); }}
                    className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm transition-colors ${on ? "text-ivory" : "text-espresso/70 hover:text-espresso"}`}
                  >
                    {on && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-espresso" transition={{ duration: 0.45, ease: EASE }} />}
                    <span className="relative">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <div className="flex items-center gap-2">
            {showServe && (
              <div className="flex rounded-full border border-espresso/15 p-1" role="group" aria-label="Drink temperature">
                {(["any", "hot", "iced"] as Serve[]).map((s) => (
                  <button key={s} type="button" aria-pressed={serve === s} onClick={() => setServe(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${serve === s ? "bg-caramel text-obsidian" : "text-espresso/60 hover:text-espresso"}`}>
                    {s === "any" ? "All" : s}
                  </button>
                ))}
              </div>
            )}
            <label className="relative flex-1 lg:w-72 lg:flex-none">
              <span className="sr-only">Search the menu</span>
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-espresso/50" width={18} height={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — latte, ugali, cake…"
                className="h-11 w-full rounded-full border border-espresso/15 bg-ivory pl-11 pr-4 text-[0.95rem] text-espresso placeholder:text-espresso/40 focus:border-caramel focus:outline-none"
              />
            </label>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{filtered.length} items shown</p>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-12 sm:px-8 sm:pt-16">
        {groups.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-4xl text-espresso">Nothing matches “{query}”.</p>
            <p className="mt-3 text-muted">Try another word, or ask our team — the menu changes and grows.</p>
            <button type="button" onClick={() => { setQuery(""); setCat("all"); setServe("any"); }} className="btn btn-dark mt-8"><span>Reset filters</span></button>
          </div>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((g) => (
            <motion.section
              key={g.id}
              id={g.id}
              aria-labelledby={`h-${g.id}`}
              className="mb-20 scroll-mt-40 last:mb-0"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="mb-8 flex flex-col gap-2 border-b border-espresso/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <h2 id={`h-${g.id}`} className="font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-espresso">{g.label}</h2>
                <p className="max-w-md text-muted">{g.blurb}</p>
              </div>
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.items.map((item, idx) => (
                  <motion.li
                    key={item.id}
                    layout
                    className={idx === 0 && g.items.length > 2 && !q ? "sm:col-span-2 sm:row-span-2" : ""}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <MenuCard item={item} feature={idx === 0 && g.items.length > 2 && !q} onOpen={() => setOpenId(item.id)} onAdd={ordering ? () => add(item) : undefined} />
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      <ItemDialog item={openItem} onClose={() => { setOpenId(null); if (location.hash.startsWith("#item-")) history.replaceState(null, "", "/menu"); }} onAdd={ordering ? (it, qty, opt) => { add(it, qty, opt); setOpenId(null); setTrayOpen(true); } : undefined} />

      {ordering && (
        <>
          <AnimatePresence>
            {isClient && count > 0 && !trayOpen && (
              <motion.button
                type="button"
                onClick={() => setTrayOpen(true)}
                className="fixed bottom-20 right-4 z-40 flex h-14 items-center gap-3 rounded-full bg-espresso pl-5 pr-2 text-ivory shadow-[0_20px_40px_-12px_rgb(0_0_0/0.5)] md:bottom-6"
                initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              >
                <IconBag width={18} height={18} />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">Your request</span>
                <span className="flex h-10 min-w-10 items-center justify-center rounded-full bg-caramel px-2 text-sm font-semibold text-obsidian">{count}</span>
              </motion.button>
            )}
          </AnimatePresence>
          <RequestTray open={trayOpen} onClose={() => setTrayOpen(false)} lines={lines} setLines={setLines} />
        </>
      )}
    </div>
  );
}

function MenuCard({ item, feature, onOpen, onAdd }: { item: MenuItem; feature: boolean; onOpen: () => void; onAdd?: () => void }) {
  const img = item.cutout ?? item.photos[0];
  const isCutout = Boolean(item.cutout);
  const isTallStage = !item.cutout && item.photos[0]?.src.includes("/stage/");
  const price = formatPrice(item.price);
  return (
    <article id={`item-${item.id}`} className={`group relative flex h-full scroll-mt-48 flex-col overflow-hidden rounded-[1.75rem] ${feature ? "bg-espresso text-ivory" : "bg-ivory text-espresso"} shadow-[0_24px_50px_-36px_rgb(35_23_17/0.5)]`}>
      <button type="button" onClick={onOpen} className="relative block text-left" aria-label={`View details: ${item.name}`} data-cursor="View">
        <div className={`relative overflow-hidden ${feature ? "aspect-[4/3] sm:aspect-[16/12]" : "aspect-[4/3]"}`}
          style={isTallStage ? { backgroundColor: "#006b37" } : undefined}>
          {isCutout && (
            <>
              <span aria-hidden="true" className="absolute inset-0" style={{ background: feature ? `radial-gradient(circle at 50% 55%, ${STAGE_BG[item.stageColor ?? "mocha"]}aa, transparent 62%)` : `radial-gradient(circle at 50% 55%, ${STAGE_BG[item.stageColor ?? "mocha"]}2e, transparent 60%)` }} />
              <Image src={img.src} alt={img.alt} fill sizes={feature ? "(min-width:1024px) 45vw, 92vw" : "(min-width:1280px) 22vw, (min-width:640px) 45vw, 92vw"}
                className="object-contain p-[7%] drop-shadow-[0_24px_24px_rgb(35_23_17/0.3)] transition-transform duration-700 ease-[var(--ease-opal)] group-hover:-rotate-3 group-hover:scale-[1.06]" />
            </>
          )}
          {!isCutout && img && (
            <Image src={img.src} alt={img.alt} fill sizes={feature ? "(min-width:1024px) 45vw, 92vw" : "(min-width:1280px) 22vw, (min-width:640px) 45vw, 92vw"}
              className={`${isTallStage ? "object-contain" : "object-cover"} transition-transform duration-700 ease-[var(--ease-opal)] group-hover:scale-[1.06]`} />
          )}
          {item.serve && (
            <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${item.serve === "iced" ? "bg-[#d9eef7] text-[#0d4a63]" : "bg-[#f6e3cf] text-roast"}`}>{item.serve}</span>
          )}
        </div>
      </button>
      <div className={`flex flex-1 flex-col ${feature ? "p-7 sm:p-9" : "p-6"}`}>
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-display leading-tight ${feature ? "text-[2.2rem] sm:text-[2.8rem]" : "text-[1.6rem]"}`}>{item.name}</h3>
          <p className={`shrink-0 pt-2 text-xs font-semibold uppercase tracking-[0.12em] ${feature ? "text-caramel-soft" : "text-caramel"}`}>{price ?? "Ask in store"}</p>
        </div>
        <p className={`mt-2 ${feature ? "max-w-md text-ivory/70" : "line-clamp-2 text-sm text-muted"}`}>{item.description}</p>
        <div className="mt-auto flex items-center gap-2 pt-5">
          <button type="button" onClick={onOpen} className={`text-xs font-semibold uppercase tracking-[0.14em] underline-offset-4 hover:underline ${feature ? "text-ivory" : "text-espresso"}`}>Details</button>
          {onAdd && (
            <button type="button" onClick={onAdd} aria-label={`Add ${item.name} to your WhatsApp request`}
              className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full transition active:scale-90 ${feature ? "bg-caramel text-obsidian" : "bg-espresso text-ivory hover:bg-roast"}`}>
              <IconPlus width={18} height={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
