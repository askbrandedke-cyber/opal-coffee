import type { SVGProps } from "react";

/**
 * Opal Signature Motif — a cup seen from above (the rim as an orbit), a handle,
 * and a coffee bean at the centre, echoing Opal's own cup-and-bean logo.
 * An opalescent arc (refracted light) sweeps across the rim.
 * NOTE: replace with the official vector logo file when supplied (see README).
 */
export function OpalMark({ glow = true, className, ...rest }: SVGProps<SVGSVGElement> & { glow?: boolean }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className} {...rest}>
      <defs>
        <linearGradient id="opal-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9b48a" />
          <stop offset="0.5" stopColor="#c4b5cc" />
          <stop offset="1" stopColor="#879b8d" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="33" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M94 44h14a6 6 0 0 1 0 12H94" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* bean */}
      <ellipse cx="50" cy="50" rx="13" ry="18" transform="rotate(28 50 50)" fill="currentColor" />
      <path d="M44 36c8 5 2 14 9 20 4 3 3 8 1 10" stroke="var(--mark-bg, #17120f)" strokeWidth="2.6" strokeLinecap="round" />
      {glow && <path d="M14 34A40 40 0 0 1 58 7" stroke="url(#opal-arc)" strokeWidth="3.5" strokeLinecap="round" />}
    </svg>
  );
}

export function Wordmark({ className, tone = "light", showMark = true }: { className?: string; tone?: "light" | "dark"; showMark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${tone === "light" ? "text-ivory" : "text-espresso"} ${className ?? ""}`}>
      {showMark && (
        <OpalMark
          className="h-7 w-auto"
          style={{ ["--mark-bg" as string]: tone === "light" ? "#17120f" : "#f5f0e8" }}
        />
      )}
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.65rem] font-semibold tracking-[0.2em]">OPAL</span>
        <span className="mt-0.5 text-[0.5rem] font-semibold tracking-[0.55em] opacity-70">COFFEE</span>
      </span>
    </span>
  );
}

/** Coffee Orbit — rotating circular type around a cup rim. */
export function CoffeeOrbit({
  text = "OPAL COFFEE · THE PERFECT CUP · NGONG ROAD · ",
  className,
  spin = true,
}: { text?: string; className?: string; spin?: boolean }) {
  const id = `orbit-${text.length}-${text.charCodeAt(0)}-${text.charCodeAt(text.length - 3)}`;
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <path id={id} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <g className={spin ? "origin-center animate-orbit motion-reduce:animate-none" : undefined} style={{ transformBox: "fill-box" }}>
        <text fill="currentColor" style={{ fontSize: 11.5, fontWeight: 600 }}>
          {/* fitted exactly to the circumference (2π·82 ≈ 515) */}
          <textPath href={`#${id}`} textLength={512} lengthAdjust="spacing">{text.repeat(Math.max(1, Math.round(44 / text.length)))}</textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
}

/** Thin decorative stroke that draws itself (path length normalised to 1). */
export function OpalStroke({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 40" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="stroke-g" x1="0" x2="1">
          <stop offset="0" stopColor="#b98655" />
          <stop offset="0.55" stopColor="#c4b5cc" />
          <stop offset="1" stopColor="#879b8d" />
        </linearGradient>
      </defs>
      <path d="M4 28C60 6 110 36 160 18s96-10 136 4" stroke="url(#stroke-g)" strokeWidth="2" strokeLinecap="round" pathLength={1} />
    </svg>
  );
}
