import type { ReactNode } from "react";

/** Dark editorial page opener shared by inner pages (keeps header contrast consistent). */
export function PageHero({
  eyebrow, lines, intro, children, aside,
}: { eyebrow: string; lines: ReactNode[]; intro?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-obsidian text-ivory">
      <div aria-hidden="true" className="opal-glow -right-48 -top-24 h-[36rem] w-[36rem] [--glow:0.35]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_30%,rgb(73_48_34/0.8),transparent_60%)]" />
      <div className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="fade-up eyebrow flex items-center gap-3 text-caramel-soft"><span className="h-px w-8 bg-caramel" aria-hidden="true" />{eyebrow}</p>
          <h1 className="font-display text-hero mt-6">
            {lines.map((l, i) => (
              <span key={i} className="mask-line"><span style={{ ["--d" as string]: `${80 + i * 110}ms` }}>{l}</span></span>
            ))}
          </h1>
          {intro && <div className="fade-up text-lede mt-7 max-w-xl text-ivory/70" style={{ ["--d" as string]: "380ms" }}>{intro}</div>}
          {children && <div className="fade-up mt-9" style={{ ["--d" as string]: "500ms" }}>{children}</div>}
        </div>
        {aside && <div className="hero-zoom relative lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
