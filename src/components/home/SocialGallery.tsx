import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconInstagram } from "@/components/brand/Icons";
import { LineReveal, MaskReveal, Reveal } from "@/components/ui/Reveal";
import { photo, stage } from "@/content/media";
import { siteConfig } from "@/content/site";

/** Curated, static collage — not a live feed. Link appears once the official account is confirmed. */
const TILES = [
  { m: photo("caramel-layer-cake-2", "Caramel layer cake with a cream swirl"), cls: "col-span-2 row-span-2" },
  { m: stage("mojito-strawberry", "Strawberry mojito"), cls: "" },
  { m: photo("sesame-wings-macro", "Glazed sesame wings close-up"), cls: "" },
  { m: photo("croissant-2", "Croissant close-up"), cls: "" },
  { m: photo("stew-rice-macro", "Beef stew and golden rice"), cls: "" },
  { m: photo("pancake-stack", "Pancake stack with chocolate and strawberries"), cls: "col-span-2" },
  { m: stage("mojito-lineup", "Four mojitos lined up: berry, classic mint, blue and strawberry"), cls: "col-span-2" },
];

export function SocialGallery() {
  return (
    <section aria-labelledby="social-title" className="bg-vanilla py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="social-title" className="font-display text-mega text-espresso"><LineReveal lines={["A little", <em key="m">more Opal.</em>]} /></h2>
          <Reveal className="flex flex-col items-start gap-3 sm:items-end">
            {siteConfig.instagramUrl ? (
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><IconInstagram width={18} height={18} /><span>Follow on Instagram</span></a>
            ) : (
              <Link href="/gallery" className="btn btn-dark"><span>Open the gallery</span><IconArrowUpRight className="btn-arrow" width={16} height={16} /></Link>
            )}
            <p className="text-xs uppercase tracking-[0.18em] text-muted">A curated selection from Opal&apos;s kitchen</p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[38vw] grid-cols-2 gap-3 sm:auto-rows-[22vw] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[15rem]">
          {TILES.map((t, i) => (
            <MaskReveal key={t.m.src} delay={i * 0.06} className={`group relative overflow-hidden rounded-[1.25rem] ${t.cls}`}>
              <Link href="/gallery" className="relative block h-full w-full" aria-label={`${t.m.alt} — open gallery`} data-cursor="View">
                <Image src={t.m.src} alt={t.m.alt} fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-opal)] group-hover:scale-[1.08]" />
                <span className="absolute inset-0 bg-obsidian/0 transition-colors duration-500 group-hover:bg-obsidian/25" />
              </Link>
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
