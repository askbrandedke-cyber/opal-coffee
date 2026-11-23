import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconClock, IconDirections, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/brand/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { MapFacade } from "@/components/ui/MapFacade";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CopyPlusCode } from "@/components/visit/CopyPlusCode";
import { cutout } from "@/content/media";
import { directionsUrl, mapsPlaceUrl, plusCodeUrl, siteConfig, telUrl, whatsappUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Visit — Directions to Opal Coffee, Ngong Road",
  description: "Find Opal Coffee at Astrol Petrol Station, Ngong Road, Ngong, Kenya — near Zambia Stage. One-tap directions to the exact location.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  const l = siteConfig.location;
  const tel = telUrl();
  const wa = whatsappUrl("Hello Opal Coffee!");
  const latte = cutout("latte", "Café latte on an Opal Coffee saucer");

  const faqs = [
    { q: "Where exactly is Opal Coffee?", a: `Inside ${l.streetAddress}, ${l.locality}. Search for plus code ${l.plusCodeShort} or tap “Get Directions” for the exact spot.` },
    ...(l.nearbyLandmark ? [{ q: "Is there a landmark nearby?", a: `Yes — Opal is near ${l.nearbyLandmark} on Ngong Road. If you're coming by matatu, ${l.nearbyLandmark} is the stage to ask for.` }] : []),
    { q: "Make sure you're heading to the right Astrol", a: "There's more than one Astrol station in Nairobi. Opal is at the Ngong Road station in Ngong town — our directions link uses the exact coordinates so you won't end up on Lenana Road." },
    { q: "Can I see the menu before I come?", a: "Yes — browse the full menu online. Prices are confirmed in store while our online price list is finalised." },
    { q: "What are the opening hours?", a: siteConfig.hours ? siteConfig.hours.map((h) => `${h.days}: ${h.open}–${h.close}`).join(", ") : "We'll publish our opening hours here shortly." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Visit Opal"
        lines={["Find the", <em key="g" className="opal-text">hidden gem.</em>]}
        intro={<><span className="text-ivory">{l.displayAddress}</span>{l.nearbyLandmark && <> · near {l.nearbyLandmark}</>}</>}
        aside={<Image src={latte.src} alt={latte.alt} width={latte.width} height={latte.height} preload loading="eager" sizes="(min-width:1024px) 28vw, 70vw" className="mx-auto w-2/3 max-w-sm drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)] lg:w-full" />}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={directionsUrl} icon={<IconDirections width={18} height={18} />}>Get Directions</ButtonLink>
          <ButtonLink href={mapsPlaceUrl} variant="ghost-light" icon={<IconArrowUpRight width={16} height={16} />}>Open in Google Maps</ButtonLink>
        </div>
      </PageHero>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><MapFacade className="aspect-[4/3] w-full lg:h-full lg:min-h-[34rem] lg:aspect-auto" /></Reveal>
          <div className="grid gap-6 lg:col-span-5">
            <Reveal className="rounded-[2rem] bg-ivory p-8 shadow-[0_24px_50px_-36px_rgb(35_23_17/0.5)]">
              <h2 className="eyebrow flex items-center gap-2 text-caramel"><IconPin width={16} height={16} />Address</h2>
              <address className="mt-4 font-display text-3xl not-italic leading-tight text-espresso">{l.streetAddress}<br />{l.locality}, {l.country}</address>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <CopyPlusCode code={l.plusCode} />
                <a href={plusCodeUrl} target="_blank" rel="noopener noreferrer" className="nav-link text-sm text-muted">What&apos;s a plus code?</a>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[2rem] bg-ivory p-8 shadow-[0_24px_50px_-36px_rgb(35_23_17/0.5)]">
              <h2 className="eyebrow flex items-center gap-2 text-caramel"><IconClock width={16} height={16} />Hours</h2>
              {siteConfig.hours ? (
                <ul className="mt-4 space-y-2 text-espresso">{siteConfig.hours.map((h) => <li key={h.days} className="flex justify-between"><span>{h.days}</span><span>{h.open} – {h.close}</span></li>)}</ul>
              ) : (
                <p className="mt-4 text-muted">Opening hours will be published here shortly.</p>
              )}
            </Reveal>
            <Reveal delay={0.16} className="rounded-[2rem] bg-espresso p-8 text-ivory">
              <h2 className="eyebrow text-caramel-soft">Get in touch</h2>
              <ul className="mt-4 space-y-3">
                {tel && <li><a href={tel} className="nav-link inline-flex items-center gap-3"><IconPhone className="text-caramel-soft" />{siteConfig.phone}</a></li>}
                {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-3"><IconWhatsApp className="text-caramel-soft" />WhatsApp us</a></li>}
                {siteConfig.email && <li><a href={`mailto:${siteConfig.email}`} className="nav-link inline-flex items-center gap-3"><IconMail className="text-caramel-soft" />{siteConfig.email}</a></li>}
                <li><Link href="/contact" className="nav-link inline-flex items-center gap-3"><IconMail className="text-caramel-soft" />Send us a message</Link></li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-vanilla py-20 sm:py-28" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="font-display text-title text-espresso">Good to <em>know.</em></h2>
          </div>
          <div className="divide-y divide-espresso/15 border-y border-espresso/15 lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-2xl text-espresso [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-espresso/20 text-xl transition-transform duration-500 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-5 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
