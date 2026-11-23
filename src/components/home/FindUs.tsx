import { IconArrowUpRight, IconClock, IconDirections, IconPin } from "@/components/brand/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { MapFacade } from "@/components/ui/MapFacade";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { directionsUrl, mapsPlaceUrl, siteConfig } from "@/content/site";

export function FindUs() {
  const l = siteConfig.location;
  return (
    <section aria-labelledby="find-title" className="grain relative overflow-hidden bg-roast text-ivory">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vanilla/10 to-transparent" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow text-caramel-soft">Find the hidden gem</p></Reveal>
          <h2 id="find-title" className="font-display text-mega mt-5"><LineReveal lines={["Your next coffee", <em key="s">stop is here.</em>]} /></h2>
          <Reveal delay={0.1}>
            <p className="text-lede mt-6 max-w-md text-ivory/75">Find Opal Coffee at Astrol Petrol Station, Ngong Road, Ngong, Kenya.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-10 space-y-6 border-t border-ivory/15 pt-8">
              <div className="flex gap-4">
                <dt><IconPin className="mt-1 text-caramel-soft" /><span className="sr-only">Address</span></dt>
                <dd><span className="block text-ivory">{l.streetAddress}</span><span className="text-ivory/60">{l.locality}, {l.region}, {l.country}</span></dd>
              </div>
              {l.nearbyLandmark && (
                <div className="flex gap-4">
                  <dt><IconDirections className="mt-1 text-caramel-soft" /><span className="sr-only">Landmark</span></dt>
                  <dd><span className="block text-ivory">Near {l.nearbyLandmark}</span><span className="text-ivory/60">Look for the Astrol station on Ngong Road</span></dd>
                </div>
              )}
              <div className="flex gap-4">
                <dt><IconClock className="mt-1 text-caramel-soft" /><span className="sr-only">Hours</span></dt>
                <dd className="text-ivory/70">{siteConfig.hours ? siteConfig.hours.map((h) => `${h.days}: ${h.open}–${h.close}`).join(" · ") : "Opening hours coming soon."}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={directionsUrl} icon={<IconDirections width={18} height={18} />}>Get Directions</ButtonLink>
            <ButtonLink href={mapsPlaceUrl} variant="ghost-light" icon={<IconArrowUpRight width={16} height={16} />}>Open in Maps</ButtonLink>
          </Reveal>
          <p className="mt-6 text-xs text-ivory/50">Plus code: {l.plusCode} · directions use the exact Ngong location.</p>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <MapFacade className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[32rem]" />
        </Reveal>
      </div>
    </section>
  );
}
