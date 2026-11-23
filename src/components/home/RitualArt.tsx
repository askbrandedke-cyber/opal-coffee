/**
 * Original illustrations for "Every Cup Has a Moment".
 * Abstract, art-directed SVG — deliberately NOT photographs, so nothing implies
 * Opal grows, roasts or sources its own beans.
 */
import Image from "next/image";
import { cutout } from "@/content/media";

const BEANS = [
  [120, 140, 20, 1], [210, 95, -25, 0.9], [300, 150, 40, 1.1], [170, 230, -10, 1.05],
  [265, 245, 65, 0.95], [350, 250, -35, 0.85], [95, 300, 50, 0.9], [215, 330, 15, 1.15], [320, 335, -60, 1],
] as const;

export function BeansArt() {
  return (
    <svg viewBox="0 0 440 440" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="bean" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#8a5a3a" />
          <stop offset="0.55" stopColor="#4a2c1c" />
          <stop offset="1" stopColor="#24150d" />
        </radialGradient>
      </defs>
      <circle cx="220" cy="220" r="200" fill="none" stroke="#b98655" strokeOpacity="0.25" />
      {BEANS.map(([x, y, r, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
          <g className="animate-float motion-reduce:animate-none" style={{ animationDelay: `${-i * 0.7}s`, animationDuration: `${6 + (i % 3)}s` }}>
            <ellipse rx="34" ry="46" fill="url(#bean)" />
            <path d="M-4 -40c14 18 -10 30 4 46s-2 30 -2 34" fill="none" stroke="#1a0f09" strokeWidth="4" strokeLinecap="round" />
            <ellipse rx="22" ry="12" cx="-10" cy="-22" fill="#fff" opacity="0.07" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export function BrewArt() {
  return (
    <svg viewBox="0 0 440 440" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="cup" x1="0" x2="1">
          <stop offset="0" stopColor="#f5f0e8" />
          <stop offset="0.7" stopColor="#eae0d2" />
          <stop offset="1" stopColor="#cdbfae" />
        </linearGradient>
        <linearGradient id="stream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b3d20" />
          <stop offset="1" stopColor="#3a1f10" />
        </linearGradient>
        <radialGradient id="crema" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#d9a46b" />
          <stop offset="0.6" stopColor="#a5653a" />
          <stop offset="1" stopColor="#5a321b" />
        </radialGradient>
      </defs>
      <rect x="160" y="40" width="120" height="34" rx="10" fill="#493022" />
      <rect x="196" y="74" width="16" height="18" rx="4" fill="#2b1d15" />
      <rect x="228" y="74" width="16" height="18" rx="4" fill="#2b1d15" />
      <rect x="203" y="92" width="3" height="170" rx="1.5" fill="url(#stream)" className="ritual-stream" />
      <rect x="234" y="92" width="3" height="170" rx="1.5" fill="url(#stream)" className="ritual-stream" style={{ animationDelay: "-0.6s" }} />
      <ellipse cx="220" cy="372" rx="150" ry="22" fill="#000" opacity="0.25" />
      <ellipse cx="220" cy="360" rx="140" ry="20" fill="url(#cup)" />
      <path d="M135 250h170v40a85 72 0 0 1-170 0z" fill="url(#cup)" />
      <path d="M305 268c40 0 40 48 0 48" fill="none" stroke="#eae0d2" strokeWidth="12" />
      <ellipse cx="220" cy="252" rx="85" ry="14" fill="url(#crema)" />
      <ellipse cx="220" cy="250" rx="70" ry="9" fill="#e7b57e" opacity="0.35" className="ritual-pulse" />
    </svg>
  );
}

export function PourArt() {
  return (
    <svg viewBox="0 0 440 440" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="coffee" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#b77a49" />
          <stop offset="0.7" stopColor="#8a5130" />
          <stop offset="1" stopColor="#5a321b" />
        </radialGradient>
      </defs>
      <circle cx="220" cy="230" r="172" fill="#000" opacity="0.25" />
      <circle cx="220" cy="220" r="170" fill="#f5f0e8" />
      <path d="M385 200h28a22 22 0 0 1 0 44h-28" fill="none" stroke="#f5f0e8" strokeWidth="16" />
      <circle cx="220" cy="220" r="140" fill="url(#coffee)" />
      <g className="ritual-heart" style={{ transformOrigin: "220px 225px" }}>
        <path d="M220 300c-70-46-96-82-78-112 16-26 54-22 78 8 24-30 62-34 78-8 18 30-8 66-78 112z" fill="#faf6ef" />
        <path d="M220 300c-40-30-56-56-46-76 9-17 32-14 46 4 14-18 37-21 46-4 10 20-6 46-46 76z" fill="#d7a874" opacity="0.55" />
        <path d="M220 168v140" stroke="#c89463" strokeWidth="3" opacity="0.6" />
      </g>
      <path d="M340 30c-30 40-80 90-118 140" fill="none" stroke="#faf6ef" strokeWidth="7" strokeLinecap="round" className="ritual-milk" pathLength={1} />
    </svg>
  );
}

const latte = cutout("latte", "Café latte with heart latte art");
export function PauseArt() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 440 440" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[180, 220, 260].map((x, i) => (
          <path key={x} d={`M${x} 150c-18-24 18-40 0-64s18-40 0-64`} fill="none" stroke="#faf8f4" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" className="ritual-steam" style={{ animationDelay: `${i * 0.7}s` }} />
        ))}
      </svg>
      <Image src={latte.src} alt="" width={latte.width} height={latte.height} sizes="(min-width:1024px) 30vw, 70vw" className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2 drop-shadow-[0_40px_50px_rgb(0_0_0/0.55)]" />
    </div>
  );
}
