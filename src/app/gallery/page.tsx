import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Opal Coffee in Ngong — lattes, mojitos, breakfast, Kenyan classics, pizza and cakes, straight from the Opal kitchen.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        lines={["A closer look", <em key="o" className="opal-text">at Opal.</em>]}
        intro="Every image here was shot with Opal's own plates and food. Tap any photo to see it full-screen — swipe or use your arrow keys to browse."
      />
      <section aria-label="Photo gallery" className="bg-cream">
        <GalleryGrid />
      </section>
    </>
  );
}
