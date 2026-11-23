/**
 * Verified guest reviews ONLY.
 * Add reviews here only when they are real, attributable and Opal has permission
 * to publish them. The "Words From Our Guests" section stays hidden while this
 * list is empty. Never invent names, quotes or ratings.
 */
export type Review = {
  quote: string;
  author: string; // as published on the source, e.g. "Wanjiru K."
  source: "Google" | "Instagram" | "In person" | string;
  sourceUrl?: string;
  date?: string; // ISO date
};

export const reviews: Review[] = [];

/** Specials / offers — only add owner-approved offers. Empty = section hidden. */
export type Special = { title: string; detail: string; validUntil?: string };
export const specials: Special[] = [];
