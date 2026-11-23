import { Hero } from "@/components/home/Hero";
import { Discover } from "@/components/home/Discover";
import { DrinkShowcase } from "@/components/home/DrinkShowcase";
import { FoodEditorial } from "@/components/home/FoodEditorial";
import { Ritual } from "@/components/home/Ritual";
import { Atmosphere } from "@/components/home/Atmosphere";
import { Moments } from "@/components/home/Moments";
import { Testimonials } from "@/components/home/Testimonials";
import { SocialGallery } from "@/components/home/SocialGallery";
import { FindUs } from "@/components/home/FindUs";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Discover />
      <DrinkShowcase />
      <FoodEditorial />
      <Ritual />
      <Atmosphere />
      <Moments />
      <Testimonials />
      <SocialGallery />
      <FindUs />
      <FinalCta />
    </>
  );
}
