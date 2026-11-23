import { InlineScript } from "@/components/ui/InlineScript";
import { IntroSkip } from "./IntroSkip";

/**
 * First-visit intro (≈1.4s total, CSS only so it never waits on JS).
 * An inline script decides BEFORE first paint whether to play it:
 *   – skipped if already seen this session, or if the visitor prefers reduced motion.
 * Lives in the root layout, so it never replays on client-side navigation.
 */
export function Intro() {
  return (
    <>
      <InlineScript
        html={`try{var d=document.documentElement;if(!sessionStorage.getItem('opal-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&location.pathname==='/'){d.dataset.intro='play';sessionStorage.setItem('opal-intro','1')}}catch(e){}`}
      />
      <div className="intro" id="opal-intro" aria-hidden="true">
        <div className="relative flex flex-col items-center text-ivory">
          <svg viewBox="0 0 240 240" className="absolute left-1/2 top-1/2 h-[min(70vw,340px)] w-[min(70vw,340px)] -translate-x-1/2 -translate-y-1/2">
            <defs>
              <linearGradient id="intro-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#b98655" />
                <stop offset="0.5" stopColor="#c4b5cc" />
                <stop offset="1" stopColor="#879b8d" />
              </linearGradient>
            </defs>
            <circle className="intro-ring" cx="120" cy="120" r="95" fill="none" stroke="url(#intro-g)" strokeWidth="1.2" />
          </svg>
          <div className="relative overflow-hidden px-2">
            <p className="font-display text-[clamp(4rem,14vw,8rem)] font-medium tracking-[0.18em]">
              {"OPAL".split("").map((l, i) => (
                <span key={i} className="intro-letter" style={{ animationDelay: `${i * 70}ms` }}>{l}</span>
              ))}
            </p>
            <span className="intro-sweep" />
          </div>
          <p className="intro-letter eyebrow mt-2 text-caramel-soft" style={{ animationDelay: "380ms" }}>The Perfect Cup.</p>
        </div>
        <IntroSkip />
      </div>
    </>
  );
}
