import Image from "next/image";
import { CoffeeOrbit } from "@/components/brand/Brand";
import { IconDirections } from "@/components/brand/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { cutout } from "@/content/media";
import { directionsUrl } from "@/content/site";
import { DepthLayer, DepthScene } from "./Depth";

const latte = cutout("latte", "A café latte with heart latte art in a tall glass on an Opal Coffee saucer");
const croissant = cutout("croissant", "Golden croissant on an Opal Coffee plate");
const cake = cutout("black-forest-cake", "Black Forest cake with cherries");

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative isolate overflow-hidden bg-obsidian text-ivory">
      {/* lighting */}
      <div aria-hidden="true" className="opal-glow -right-40 top-[8%] h-[42rem] w-[42rem] [--glow:0.40]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,rgb(73_48_34/0.85),transparent_60%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-obsidian" />

      <div className="mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center gap-6 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-4 lg:pb-10 lg:pt-32">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-7">
          <p className="fade-up eyebrow flex items-center gap-3 text-caramel-soft" style={{ ["--d" as string]: "0ms" }}>
            <span className="h-px w-8 bg-caramel" aria-hidden="true" />
            Ngong Road • Astrol Petrol Station
          </p>
          <h1 id="hero-title" className="font-display text-hero mt-6 font-medium">
            <span className="mask-line"><span style={{ ["--d" as string]: "80ms" }}>A Hidden Gem.</span></span>
            <span className="mask-line"><span className="opal-text italic" style={{ ["--d" as string]: "200ms" }}>A Perfect Pause.</span></span>
          </h1>
          <p className="fade-up text-lede mt-7 max-w-md text-ivory/70" style={{ ["--d" as string]: "450ms" }}>
            Discover your next coffee moment at Opal — a welcoming café tucked along Ngong Road.
          </p>
          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "580ms" }}>
            <ButtonLink href="/menu" arrow>Explore Our Menu</ButtonLink>
            <ButtonLink href={directionsUrl} variant="ghost-light" icon={<IconDirections width={18} height={18} />}>Find Us</ButtonLink>
          </div>
          <p className="fade-up mt-12 hidden items-center gap-4 text-sm text-ivory/45 lg:flex" style={{ ["--d" as string]: "800ms" }}>
            <span className="font-display text-2xl italic text-ivory/70">The Perfect Cup.</span>
            <span className="h-px w-10 bg-ivory/25" aria-hidden="true" />
            Coffee · Breakfast · Kenyan classics · Cakes
          </p>
        </div>

        {/* Floating product composition */}
        <DepthScene className="relative mx-auto aspect-square w-full max-w-[34rem] lg:col-span-5 lg:max-w-none">
          <div className="hero-zoom absolute inset-0">
            <DepthLayer depth={6} className="absolute inset-[2%] text-caramel-soft/70">
              <CoffeeOrbit className="h-full w-full" />
            </DepthLayer>
            <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(217_180_138/0.28),transparent_70%)] blur-2xl" />
            <DepthLayer depth={-26} className="absolute -left-[4%] bottom-[2%] w-[38%]">
              <Image src={croissant.src} alt={croissant.alt} width={croissant.width} height={croissant.height} sizes="(min-width:1024px) 15vw, 34vw" className="animate-float drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)] [animation-delay:-2s]" quality={75} />
            </DepthLayer>
            <DepthLayer depth={-18} className="absolute -right-[2%] top-[4%] w-[32%]">
              <Image src={cake.src} alt={cake.alt} width={cake.width} height={cake.height} sizes="(min-width:1024px) 13vw, 30vw" className="animate-float drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)] [animation-delay:-4s]" quality={75} />
            </DepthLayer>
            <DepthLayer depth={14} className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2">
              <Image
                src={latte.src} alt={latte.alt} width={latte.width} height={latte.height} preload loading="eager" quality={90}
                sizes="(min-width:1024px) 30vw, 72vw"
                className="drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)]"
              />
            </DepthLayer>
            <p className="eyebrow absolute bottom-[8%] right-[2%] rounded-full border border-ivory/15 bg-obsidian/60 px-4 py-2 text-[0.6rem] text-ivory/70 backdrop-blur">
              Café latte · Served at Opal
            </p>
          </div>
        </DepthScene>
      </div>

      <a href="#discover" className="fade-up absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/50 lg:flex" style={{ ["--d" as string]: "1000ms" }}>
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/15"><span className="scroll-cue absolute inset-0 bg-caramel" /></span>
        <span className="sr-only">to discover Opal</span>
      </a>
    </section>
  );
}
