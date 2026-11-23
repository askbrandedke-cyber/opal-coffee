import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages: [string, number][] = [["", 1], ["/menu", 0.9], ["/visit", 0.9], ["/gallery", 0.7], ["/story", 0.6], ["/contact", 0.5]];
  return pages.map(([p, priority]) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority }));
}
