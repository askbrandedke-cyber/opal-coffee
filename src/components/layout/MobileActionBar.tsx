"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { IconDirections, IconMenu } from "@/components/brand/Icons";
import { directionsUrl } from "@/content/site";

/** Compact sticky actions on phones — appears after the hero, hides near the footer. */
export function MobileActionBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - 700;
      setShow(y > window.innerHeight * 0.85 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Quick actions"
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex gap-2 rounded-full border border-ivory/10 bg-obsidian/90 p-1.5 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] backdrop-blur-xl">
            {!pathname.startsWith("/menu") && (
              <Link href="/menu" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ivory">
                <IconMenu width={18} height={18} /> Menu
              </Link>
            )}
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-caramel text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-obsidian">
              <IconDirections width={18} height={18} /> Directions
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
