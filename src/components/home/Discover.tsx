import Image from "next/image";
import { CoffeeOrbit, OpalStroke } from "@/components/brand/Brand";
import { DrawOnView, LineReveal, MaskReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { photo } from "@/content/media";

const main = photo("pancake-stack-2", "Pancake stack with chocolate drizzle, strawberries and fresh mint");
const sideA = photo("croissant-and-tea", "Croissant served with a glass mug of milky tea");
const sideB = photo("black-forest-cake-macro", "Cherries and chocolate curls on a Black Forest cake");

export function Discover() {
  return (
    <section id="discover" aria-labelledby="discover-title" className="relative overflow-hidden bg-cream py-24 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-roast/10" />
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-10">
          <Reveal><p className="eyebrow text-caramel">Discover Opal</p></Reveal>
          <h2 id="discover-title" className="font-display text-title mt-6 text-espresso">
            <LineReveal lines={["Some places are", <em key="w" className="text-roast">worth discovering.</em>]} />
          </h2>
          <DrawOnView className="mt-6 w-56" delay={0.4}><OpalStroke /></DrawOnView>
          <Reveal delay={0.15}>
            <p className="text-lede mt-8 max-w-md text-muted">
              Tucked into the rhythm of Ngong Road, Opal is a place to slow down, catch up, and enjoy a good coffee moment —
              with a kitchen that takes breakfast, Kenyan classics and cake just as seriously as the cup.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/story" variant="dark" arrow>Our Story</ButtonLink>
            <ButtonLink href="/visit" variant="ghost-dark">Plan a Visit</ButtonLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            <MaskReveal className="relative col-span-12 aspect-[4/5] overflow-hidden rounded-[2rem] sm:col-span-8 sm:row-span-2">
              <Image src={main.src} alt={main.alt} fill sizes="(min-width:1024px) 38vw, (min-width:640px) 60vw, 92vw" className="object-cover" />
            </MaskReveal>
            <MaskReveal delay={0.15} from="right" className="relative col-span-6 aspect-[3/4] overflow-hidden rounded-[1.5rem] sm:col-span-4 sm:mt-16">
              <Image src={sideA.src} alt={sideA.alt} fill sizes="(min-width:1024px) 18vw, 45vw" className="object-cover" />
            </MaskReveal>
            <MaskReveal delay={0.3} from="right" className="relative col-span-6 aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[1.5rem] sm:col-span-4">
              <Image src={sideB.src} alt={sideB.alt} fill sizes="(min-width:1024px) 18vw, 45vw" className="object-cover" />
            </MaskReveal>
          </div>

          <Reveal delay={0.6} className="absolute -left-4 top-[58%] hidden rotate-[-4deg] rounded-2xl bg-ivory px-5 py-4 shadow-[0_25px_50px_-20px_rgb(35_23_17/0.35)] sm:block lg:-left-14">
            <p className="font-display text-2xl italic text-roast">“the perfect cup.”</p>
            <p className="eyebrow mt-1 text-[0.58rem] text-muted">— printed on every Opal plate</p>
          </Reveal>

          <Reveal delay={0.5} className="absolute -right-2 -top-12 hidden h-36 w-36 text-roast sm:block lg:-right-6">
            <CoffeeOrbit text="HIDDEN GEM · NGONG ROAD · " className="h-full w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
