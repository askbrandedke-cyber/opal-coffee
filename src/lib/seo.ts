import { siteConfig, siteUrl, socialLinks } from "@/content/site";

/**
 * schema.org CafeOrCoffeeShop. Only verified facts are emitted:
 * no ratings, no reviews, and hours/phone only once they are set in content/site.ts.
 */
export function localBusinessJsonLd() {
  const url = siteUrl();
  const { location: l } = siteConfig;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${url}/#cafe`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    slogan: siteConfig.slogan,
    description: siteConfig.description,
    url,
    image: [`${url}/opengraph-image`],
    servesCuisine: ["Coffee", "Breakfast", "Kenyan", "Cakes & pastries"],
    currenciesAccepted: siteConfig.currency,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.streetAddress,
      addressLocality: l.locality,
      addressRegion: l.region,
      addressCountry: l.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`,
    menu: `${url}/menu`,
  };
  if (siteConfig.phone) data.telephone = siteConfig.phone;
  if (siteConfig.email) data.email = siteConfig.email;
  if (socialLinks.length) data.sameAs = socialLinks.map((s) => s.url);
  if (siteConfig.hours) {
    data.openingHours = siteConfig.hours.map((h) => `${h.days} ${h.open}-${h.close}`);
  }
  return data;
}
