/**
 * Gallery content. All images are Opal's own photography.
 * "Our Space" has no photos yet — add interior/exterior shots here when available
 * (see README → "Adding photos"). Empty categories are hidden automatically.
 */
import { photo, stage, cutout, type Media } from "./media";

export type GalleryCategory = "Coffee & Drinks" | "Breakfast" | "Mains" | "Kenyan Classics" | "Cakes & Pastries" | "Our Space";

export type GalleryItem = Media & { id: string; category: GalleryCategory; caption: string; tone?: "dark" | "light" };

const g = (id: string, category: GalleryCategory, m: Media, caption: string): GalleryItem => ({ id, category, caption, ...m });

export const gallery: GalleryItem[] = [
  g("latte", "Coffee & Drinks", stage("latte", "Café latte with heart latte art"), "Café latte, heart on top"),
  g("pancakes", "Breakfast", photo("pancake-stack-2", "Pancake stack with chocolate drizzle and mint"), "Pancake stack"),
  g("wings", "Mains", photo("sesame-wings-macro", "Glazed sesame wings close-up"), "Sticky sesame wings"),
  g("mojitos", "Coffee & Drinks", stage("mojito-lineup", "Four mojitos in a row: berry, classic mint, blue and strawberry"), "The mojito line-up"),
  g("black-forest", "Cakes & Pastries", photo("black-forest-cake-detail", "Black Forest cake with cherries and chocolate curls"), "Black Forest cake"),
  g("ugali", "Kenyan Classics", photo("ugali-stew", "Ugali with beef stew and sukuma"), "Ugali, beef stew & sukuma"),
  g("croissant", "Breakfast", photo("croissant", "Golden croissant"), "Butter croissant"),
  g("pizza", "Mains", photo("pizza-macro-3", "Close-up of sausage and beef pizza"), "Sausage & beef pizza"),
  g("caramel", "Cakes & Pastries", photo("caramel-layer-cake", "Caramel layer cake slice"), "Caramel layer cake"),
  g("latte-croissant", "Coffee & Drinks", stage("latte-croissant", "Latte with a croissant"), "Latte & croissant"),
  g("beef", "Mains", photo("beef-fries-kachumbari-2", "Seared beef with fries and kachumbari"), "Beef, fries & kachumbari"),
  g("stew-rice", "Kenyan Classics", photo("stew-rice-greens-2", "Beef stew with yellow rice and greens"), "Stew with golden rice"),
  g("passion", "Cakes & Pastries", photo("passion-cake-slice", "Passion fruit cake slice"), "Passion fruit cake"),
  g("chicken", "Mains", photo("quarter-chicken-2", "Glazed roast chicken with fries and kachumbari"), "Roast quarter chicken"),
  g("croissant-tea", "Coffee & Drinks", photo("croissant-and-tea", "Croissant with a glass mug of milky tea"), "Tea & a croissant"),
  g("pancake-syrup", "Breakfast", photo("pancake-syrup", "Pancake with syrup"), "Pancake & syrup"),
  g("loaded", "Mains", photo("loaded-fries-2", "Loaded fries with chicken and sauces"), "Loaded chicken fries"),
  g("stirfry", "Mains", photo("beef-stirfry-rice-3", "Beef stir-fry with yellow rice"), "Beef stir-fry & pilau rice"),
  g("pastry", "Cakes & Pastries", photo("pastry-turnover-macro", "Flaky pastry layers"), "Flaky pastry"),
  g("mushroom", "Mains", photo("chicken-mushroom-2", "Chicken in creamy mushroom sauce"), "Creamy mushroom chicken"),
  g("spiced", "Mains", photo("spiced-chicken-rice-2", "Spiced chicken over tomato rice"), "Spiced chicken & rice"),
  g("stew", "Kenyan Classics", photo("beef-stew-macro", "Beef stew close-up"), "Beef stew"),
  g("breakfast", "Breakfast", cutout("full-breakfast", "Full breakfast plate"), "Full breakfast"),
  g("crumbed", "Mains", photo("crumbed-chicken-2", "Crumbed chicken with fries and coleslaw"), "Crumbed chicken"),
  g("pizza-whole", "Mains", photo("pizza-wide", "Whole pizza on a wooden paddle"), "Pizza night"),
  g("puff", "Cakes & Pastries", photo("puff-pastry-2", "Puff pastry"), "Puff pastry"),
  g("ugali-wide", "Kenyan Classics", photo("ugali-stew-wide-2", "Ugali and beef stew"), "Ugali & stew"),
];

export const galleryCategories: GalleryCategory[] = [
  "Coffee & Drinks", "Breakfast", "Mains", "Kenyan Classics", "Cakes & Pastries", "Our Space",
];
