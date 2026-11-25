/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  OPAL COFFEE — CENTRAL BUSINESS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the single place to update business facts. Anything set to `null`
 *  is UNCONFIRMED and is automatically hidden on the public website — nothing
 *  is ever invented to fill the gap.
 *
 *  ✅ Confirmed (from supplied brief / Opal's own branded photography):
 *     name, slogan "The Perfect Cup.", address, landmark, plus code, brand colours
 *  ❓ To confirm with the owner before launch:
 *     phone, WhatsApp, email, Instagram/socials, opening hours, prices
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type DayHours = { days: string; open: string; close: string };

export type SiteConfig = {
  name: string;
  legalName: string;
  /** Official line printed on Opal's branded plates. */
  slogan: string;
  /** Campaign headline used on the website (marketing direction, not official). */
  tagline: string;
  description: string;
  location: {
    displayAddress: string;
    streetAddress: string;
    locality: string;
    region: string;
    country: string;
    countryCode: string;
    nearbyLandmark: string | null;
    /** Google Open Location Code (plus code). */
    plusCode: string;
    plusCodeShort: string;
    lat: number;
    lng: number;
  };
  phone: string | null; // e.g. "+254 7XX XXX XXX"
  whatsapp: string | null; // digits only, international format, e.g. "2547XXXXXXXX"
  email: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  tiktokUrl: string | null;
  googleReviewsUrl: string | null;
  hours: DayHours[] | null;
  currency: "KES";
};

export const siteConfig: SiteConfig = {
  name: "Opal Coffee",
  legalName: "Opal Coffee Shop",
  slogan: "The Perfect Cup.",
  tagline: "A Hidden Gem. A Perfect Pause.",
  description:
    "Opal Coffee is a welcoming café at Astrol Petrol Station on Ngong Road, Ngong — coffee, breakfast, Kenyan classics, cakes and fresh mojitos, served on Opal's own plates.",
  location: {
    displayAddress: "Astrol Petrol Station, Ngong Road, Ngong, Kenya",
    streetAddress: "Astrol Petrol Station, Ngong Road",
    locality: "Ngong",
    region: "Kajiado County",
    country: "Kenya",
    countryCode: "KE",
    nearbyLandmark: "Zambia Stage",
    plusCode: "6GCRMM26+674",
    plusCodeShort: "MM26+674 Ngong",
    // Decoded from plus code 6GCRMM26+674 (centre of the 3m × 3m cell).
    lat: -1.3494875,
    lng: 36.6607031,
  },
  phone: null,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || null,
  email: null,
  instagramUrl: null,
  facebookUrl: null,
  tiktokUrl: null,
  googleReviewsUrl: null,
  hours: null,
  currency: "KES",
};

/* ── Derived helpers ─────────────────────────────────────────────────────── */

const { lat, lng } = siteConfig.location;

/**
 * Directions go to the exact coordinates of the Ngong location (decoded from
 * the plus code) — never to a name search, which could resolve to the other
 * Astrol station on Lenana Road.
 */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
export const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
export const plusCodeUrl = `https://plus.codes/${encodeURIComponent(siteConfig.location.plusCode)}`;

export function mapsEmbedUrl() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=17`;
  }
  // Keyless embed fallback (standard Google Maps share-embed format).
  return `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
}

export function whatsappUrl(message?: string) {
  if (!siteConfig.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsapp}${text}`;
}

export function telUrl() {
  return siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : null;
}

export const socialLinks = (
  [
    ["Instagram", siteConfig.instagramUrl],
    ["Facebook", siteConfig.facebookUrl],
    ["TikTok", siteConfig.tiktokUrl],
  ] as const
)
  .filter(([, url]) => Boolean(url))
  .map(([label, url]) => ({ label, url: url as string }));

/** Shows designed placeholders for missing content (reviews, venue photos). Never enable in production. */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return process.env.NODE_ENV === "production" ? "https://opal-coffee.vercel.app" : "http://localhost:3000";
}

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
] as const;
