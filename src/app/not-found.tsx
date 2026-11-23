import { ButtonLink } from "@/components/ui/Button";
import { CoffeeOrbit } from "@/components/brand/Brand";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90svh] items-center overflow-hidden bg-obsidian text-ivory">
      <CoffeeOrbit className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 text-ivory/10" text="THIS PAGE WANDERED OFF · " />
      <div className="relative mx-auto max-w-2xl px-5 text-center">
        <p className="eyebrow text-caramel-soft">404</p>
        <h1 className="font-display text-mega mt-5">This cup is <em className="opal-text">empty.</em></h1>
        <p className="mt-6 text-ivory/70">The page you&apos;re looking for isn&apos;t here — but the coffee still is.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>Back home</ButtonLink>
          <ButtonLink href="/menu" variant="ghost-light">See the menu</ButtonLink>
        </div>
      </div>
    </section>
  );
}
