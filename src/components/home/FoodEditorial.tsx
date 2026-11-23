"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IconArrowUpRight } from "@/components/brand/Icons";
import { LineReveal, MaskReveal, Reveal } from "@/components/ui/Reveal";
import { cutout, photo } from "@/content/media";
import { categories } from "@/content/menu";

const big = photo("sesame-wings-2", "Sticky sesame wings with fries and creamy coleslaw");
const tall = photo("ugali-stew", "Ugali with a bowl of beef stew and sukuma wiki");
const small = photo("pizza-macro", "Close-up of a sausage and beef pizza with melted cheese");
const floating = cutout("pancake-stack", "Pancake stack with chocolate drizzle on an Opal plate");

export function FoodEditorial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yFloat = useTransform(scrollYProgress, [0, 1], [120, -160]);
  const rFloat = useTransform(scrollYProgress, [0, 1], [-12, 10]);

  return (
    <section ref={ref} aria-labelledby="food-title" className="relative overflow-hidden bg-vanilla py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><p className="eyebrow text-caramel">From the Opal kitchen</p></Reveal>
            <h2 id="food-title" className="font-display text-mega mt-6 text-espresso">
              <LineReveal lines={["Come for the coffee.", <em key="s" className="text-roast">Stay for the moment.</em>]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="self-end lg:col-span-5 lg:col-start-8">
            <p className="text-lede text-muted">
              Fluffy pancakes, sticky wings, ugali with slow-cooked stew, pizza, and cakes finished by hand. Every plate here
              was photographed straight from Opal&apos;s kitchen.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Menu categories">
              {categories.filter((c) => c.id !== "coffee-drinks").map((c, i) => (
                <motion.li key={c.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.06 }}>
                  <Link href={`/menu#${c.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-espresso/20 px-4 py-2 text-sm text-espresso transition hover:border-espresso hover:bg-espresso hover:text-ivory">
                    {c.label}<IconArrowUpRight width={14} height={14} />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative mt-16 grid grid-cols-12 gap-4 sm:gap-6 lg:mt-24">
          <figure className="group col-span-12 lg:col-span-7">
            <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4]">
              <Image src={big.src} alt={big.alt} fill sizes="(min-width:1024px) 55vw, 92vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-opal)] group-hover:scale-[1.04]" />
            </MaskReveal>
            <figcaption className="mt-4 flex items-baseline justify-between text-sm text-muted">
              <span className="font-display text-xl italic text-espresso">Sticky sesame wings</span><span className="eyebrow text-[0.6rem]">Snacks & sides</span>
            </figcaption>
          </figure>

          <div className="col-span-12 grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-5 lg:grid-cols-1">
            <figure className="group">
              <MaskReveal delay={0.1} className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2rem] lg:aspect-[4/3] lg:rounded-[2rem]">
                <Image src={tall.src} alt={tall.alt} fill sizes="(min-width:1024px) 38vw, 46vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-opal)] group-hover:scale-[1.05]" />
              </MaskReveal>
              <figcaption className="mt-3 font-display text-lg italic text-espresso">Ugali, stew & sukuma</figcaption>
            </figure>
            <figure className="group">
              <MaskReveal delay={0.2} className="relative aspect-[3/4] overflow-hidden rounded-[2rem] lg:aspect-[16/9]">
                <Image src={small.src} alt={small.alt} fill sizes="(min-width:1024px) 38vw, 46vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-opal)] group-hover:scale-[1.05]" />
              </MaskReveal>
              <figcaption className="mt-3 font-display text-lg italic text-espresso">Sausage & beef pizza</figcaption>
            </figure>
          </div>

          <motion.div style={{ y: yFloat, rotate: rFloat }} aria-hidden="true" className="pointer-events-none absolute -top-28 right-[34%] hidden w-[19%] lg:block">
            <Image src={floating.src} alt="" width={floating.width} height={floating.height} sizes="24vw" className="drop-shadow-[0_40px_40px_rgb(35_23_17/0.35)]" />
          </motion.div>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Link href="/menu" className="btn btn-dark"><span>See the full menu</span></Link>
        </Reveal>
      </div>
    </section>
  );
}
