import Image from "next/image";
import { CoffeeOrbit } from "@/components/brand/Brand";
import { IconDirections } from "@/components/brand/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { cutout } from "@/content/media";
import { directionsUrl } from "@/content/site";

const plate = cutout("latte-croissant", "Latte and croissant on an Opal Coffee plate");

export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="grain relative isolate overflow-hidden bg-obsidian py-28 text-ivory sm:py-36 lg:py-44">
      <div aria-hidden="true" className="opal-glow left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 [--glow:0.30]" />
      <CoffeeOrbit className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-ivory/10" text="SEE YOU AT OPAL · THE PERFECT CUP · " />
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 id="final-title" className="font-display text-hero">
            <LineReveal lines={["Good coffee.", "Great moments.", <em key="s" className="opal-text">See you at Opal.</em>]} />
          </h2>
          <Reveal delay={0.3} className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={directionsUrl} icon={<IconDirections width={18} height={18} />}>Find Us</ButtonLink>
            <ButtonLink href="/menu" variant="ghost-light" arrow>Explore Menu</ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="mx-auto w-3/4 max-w-sm lg:col-span-4 lg:w-full">
          <Image src={plate.src} alt={plate.alt} width={plate.width} height={plate.height} sizes="(min-width:1024px) 28vw, 70vw" className="animate-float drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)]" />
        </Reveal>
      </div>
    </section>
  );
}
