"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Brand";
import { IconDirections, IconPin } from "@/components/brand/Icons";
import { directionsUrl, navigation, siteConfig } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close the overlay when the route changes (render-time state adjustment).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Scroll lock, Escape to close, focus trap.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a,button"));
        const all = [toggleRef.current!, ...items];
        const i = all.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? all.length - 1 : i - 1) : i === all.length - 1 ? 0 : i + 1;
        e.preventDefault();
        all[next]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-4 transition-all duration-500 ease-[var(--ease-opal)] sm:px-8 ${
          scrolled || open ? "py-3" : "py-5 sm:py-7"
        }`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 border-b transition-all duration-500 ${
            scrolled && !open ? "border-ivory/10 bg-obsidian/80 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        />
        <Link href="/" aria-label="Opal Coffee — home" className="relative z-10 rounded-sm">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ivory/85">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link py-2 transition-colors hover:text-ivory" aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <span className="hidden sm:inline-flex">
            <Link href="/menu" className="btn btn-primary !min-h-11 !px-5 !text-[0.72rem]">
              <span>Explore Menu</span>
            </Link>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 items-center gap-3 rounded-full border border-ivory/25 pl-4 pr-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0.5 h-px w-5 bg-current transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0.5 left-0 h-px w-5 bg-current transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="grain fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-obsidian px-6 pb-10 pt-28 text-ivory lg:hidden"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="opal-glow -right-24 top-10 h-80 w-80" />
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {[...navigation, { href: "/contact", label: "Contact" }].map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-1.5 font-display text-[2.7rem] leading-tight aria-[current=page]:text-caramel-soft"
                      >
                        <span className="eyebrow w-6 text-ivory/40">0{i + 1}</span>
                        <span className="transition-transform duration-500 group-hover:translate-x-2">{item.label}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="mt-auto space-y-5 pt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <div className="opal-line h-px w-full opacity-60" />
              <p className="flex items-start gap-3 text-sm text-ivory/75">
                <IconPin className="mt-0.5 shrink-0 text-caramel" />
                {siteConfig.location.displayAddress}
              </p>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                <IconDirections width={18} height={18} />
                <span>Get Directions</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
