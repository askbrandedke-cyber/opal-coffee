import type { Metadata } from "next";
import Image from "next/image";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { cutout } from "@/content/media";

export const metadata: Metadata = {
  title: "Menu — Coffee, Breakfast & Kenyan Classics",
  description: "Explore Opal Coffee's menu in Ngong: lattes, mojitos, pancakes, full breakfasts, ugali and stew, pilau, pizza, wings and cakes. Prices confirmed in store.",
  alternates: { canonical: "/menu" },
};

const a = cutout("full-breakfast-toast", "Full breakfast with eggs, sausages, beans and toast");
const b = cutout("latte", "Café latte with heart latte art");
const c = cutout("caramel-layer-cake", "Slice of caramel layer cake");

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="The Opal menu"
        lines={["Something good", <em key="b" className="opal-text">is brewing.</em>]}
        intro="Coffee poured with care, cold mojitos, all-day breakfast, Kenyan classics and cakes — every dish photographed at Opal."
        aside={
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image src={a.src} alt={a.alt} width={a.width} height={a.height} preload loading="eager" sizes="(min-width:1024px) 30vw, 80vw" className="absolute left-0 top-[18%] w-[78%] drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]" />
            <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="20vw" className="animate-float absolute -top-[4%] right-0 w-[44%] drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]" />
            <Image src={c.src} alt={c.alt} width={c.width} height={c.height} sizes="18vw" className="animate-float absolute bottom-0 right-[6%] w-[40%] drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)] [animation-delay:-3s]" />
          </div>
        }
      />
      <div className="bg-vanilla">
        <p className="mx-auto max-w-[1440px] px-5 py-4 text-center text-xs uppercase tracking-[0.16em] text-muted sm:px-8">
          Prices are confirmed in store while our online price list is finalised · Dish names are descriptive
        </p>
      </div>
      <section aria-label="Menu" className="bg-cream">
        <MenuExplorer />
      </section>
    </>
  );
}
