"use client";

import { useState } from "react";
import { OpalMark } from "@/components/brand/Brand";
import { IconPin } from "@/components/brand/Icons";
import { mapsEmbedUrl, siteConfig } from "@/content/site";

/**
 * Click-to-load map. Keeps Google's heavy embed (and its cookies) off the page
 * until the visitor asks for it — good for speed on mobile data and for privacy.
 */
export function MapFacade({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-roast ${className}`}>
      {loaded ? (
        <iframe
          title={`Map showing ${siteConfig.name}, ${siteConfig.location.displayAddress}`}
          src={mapsEmbedUrl()}
          className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.25)_saturate(0.9)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setLoaded(true)} className="group absolute inset-0 flex flex-col items-center justify-center text-ivory" aria-label="Load interactive Google map">
          {/* Stylised map drawing */}
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true">
            <rect width="400" height="300" fill="#3a271c" />
            <g stroke="#5c4130" strokeWidth="1">
              {Array.from({ length: 14 }).map((_, i) => <path key={`h${i}`} d={`M0 ${i * 24} Q200 ${i * 24 + 10} 400 ${i * 24 - 6}`} fill="none" />)}
              {Array.from({ length: 18 }).map((_, i) => <path key={`v${i}`} d={`M${i * 26} 0 L${i * 26 + 18} 300`} fill="none" />)}
            </g>
            <path d="M-10 210 C 90 180, 160 170, 230 140 S 360 90, 420 70" stroke="#b98655" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M-10 210 C 90 180, 160 170, 230 140 S 360 90, 420 70" stroke="#e9d3b6" strokeWidth="1.5" fill="none" strokeDasharray="6 8" />
            <text x="300" y="70" fill="#d9b48a" fontSize="10" letterSpacing="2" transform="rotate(-18 300 70)">NGONG ROAD</text>
          </svg>
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-caramel text-obsidian shadow-[0_0_0_12px_rgb(185_134_85/0.25),0_0_0_28px_rgb(185_134_85/0.1)] transition-transform duration-500 group-hover:scale-110">
            <OpalMark glow={false} className="h-9 w-auto" style={{ ["--mark-bg" as string]: "#b98655" }} />
          </span>
          <span className="relative mt-6 rounded-full bg-obsidian/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <IconPin className="mr-2 inline" width={16} height={16} />Load interactive map
          </span>
          <span className="relative mt-3 text-xs text-ivory/60">Loads Google Maps</span>
        </button>
      )}
    </div>
  );
}
