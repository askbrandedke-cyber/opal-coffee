import type { Metadata } from "next";
import Image from "next/image";
import { CoffeeOrbit, OpalStroke } from "@/components/brand/Brand";
import { IconDirections } from "@/components/brand/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { DrawOnView, LineReveal, MaskReveal, Reveal } from "@/components/ui/Reveal";
import { cutout, photo, stage } from "@/content/media";
import { directionsUrl, showPlaceholders, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Opal Coffee is a welcoming café on Ngong Road, Ngong — a hidden gem for good coffee, honest food and unhurried moments.",
  alternates: { canonical: "/story" },
};

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  STORY COPY — EDITABLE DRAFT
 *  Written only from known facts (location, Opal's own photography, slogan).
 *  CONTENT GAPS for the owner to supply (never invented here):
 *    • Founder / team story, year opened, what inspired the name
 *    • Interior, exterior and team photography
 *  Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=true to see where these will appear.
 * ───────────────────────────────────────────────────────────────────────────
 */
const CHAPTERS = [
  {
    n: "01", eyebrow: "The name", title: ["A gem is something", <em key="a">you find.</em>],
    body: "An opal holds light inside it — easy to miss from a distance, impossible to forget up close. That's the feeling we want Opal Coffee to have: tucked into a petrol station on Ngong Road, and quietly worth the stop.",
    img: photo("croissant-and-tea", "A croissant and a glass mug of milky tea on a wooden table"),
  },
  {
    n: "02", eyebrow: "The cup", title: ["“The perfect cup”", <em key="b">is a promise.</em>],
    body: "It's printed on every Opal plate and saucer — and it's the standard behind every latte poured with a heart and every mojito built over crushed ice.",
    img: stage("latte", "A café latte with heart latte art on an Opal Coffee saucer"),
  },
  {
    n: "03", eyebrow: "The kitchen", title: ["Breakfast to", <em key="c">Kenyan classics.</em>],
    body: "Pancakes and full breakfasts for slow mornings. Ugali, stew and sukuma, pilau and grilled chicken for proper lunches. Pizza, wings and Black Forest cake for when the conversation runs long.",
    img: photo("ugali-stew-wide", "Ugali with beef stew and greens from above"),
  },
];

export default function StoryPage() {
  const plate = cutout("black-forest-cake", "Black Forest cake with cherries");
  return (
    <>
      <PageHero
        eyebrow="Our story"
        lines={["There's always time", <em key="t" className="opal-text">for a good coffee moment.</em>]}
        intro={<>Opal Coffee is a welcoming café at {siteConfig.location.streetAddress}, {siteConfig.location.locality}. Here&apos;s what we&apos;re about.</>}
      />

      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] space-y-28 px-5 sm:space-y-40 sm:px-8">
          {CHAPTERS.map((c, i) => (
            <article key={c.n} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <MaskReveal from={i % 2 ? "right" : "left"} className={`relative aspect-[4/5] overflow-hidden ${i === 1 ? "rounded-t-full rounded-b-[2rem]" : "rounded-[2rem]"}`}>
                  <Image src={c.img.src} alt={c.img.alt} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
                </MaskReveal>
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <Reveal><p className="eyebrow text-caramel">{c.n} — {c.eyebrow}</p></Reveal>
                <h2 className="font-display text-title mt-5 text-espresso"><LineReveal lines={c.title} /></h2>
                <DrawOnView className="mt-5 w-48"><OpalStroke /></DrawOnView>
                <Reveal delay={0.1}><p className="text-lede mt-6 text-muted">{c.body}</p></Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-espresso py-24 text-ivory sm:py-32">
        <CoffeeOrbit className="absolute -right-24 -top-24 h-96 w-96 text-ivory/10" text="NGONG ROAD · NEAR ZAMBIA STAGE · " />
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow text-caramel-soft">04 — The place</p></Reveal>
            <h2 className="font-display text-mega mt-5"><LineReveal lines={["Right on", <em key="n" className="opal-text">Ngong Road.</em>]} /></h2>
            <Reveal delay={0.1}>
              <p className="text-lede mt-6 max-w-xl text-ivory/75">
                You&apos;ll find us at Astrol Petrol Station on Ngong Road{siteConfig.location.nearbyLandmark ? `, near ${siteConfig.location.nearbyLandmark}` : ""}.
                Easy to reach whether you&apos;re driving through, on your way home, or meeting a friend in town.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={directionsUrl} icon={<IconDirections width={18} height={18} />}>Get Directions</ButtonLink>
              <ButtonLink href="/menu" variant="ghost-light" arrow>Explore the Menu</ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="mx-auto w-3/4 max-w-sm lg:col-span-5 lg:w-full">
            <Image src={plate.src} alt={plate.alt} width={plate.width} height={plate.height} sizes="(min-width:1024px) 30vw, 70vw" className="animate-float drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)]" />
          </Reveal>
        </div>
      </section>

      {showPlaceholders && (
        <section className="bg-vanilla py-16">
          <div className="mx-auto max-w-3xl rounded-[2rem] border-2 border-dashed border-caramel/60 p-10 text-center">
            <p className="eyebrow text-caramel">Content gap · preview only</p>
            <p className="mt-4 font-display text-3xl text-espresso">Founder & team story, opening year, and photos of the space</p>
            <p className="mt-3 text-muted">Supply these and add them to this page — nothing has been invented in their place.</p>
          </div>
        </section>
      )}
    </>
  );
}
