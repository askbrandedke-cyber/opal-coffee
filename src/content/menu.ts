/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  OPAL MENU — EDITABLE CONTENT MODEL
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every dish below appears in Opal's own professional photography (branded
 *  "OPAL COFFEE · The Perfect Cup." plates), so it is shown on the website.
 *
 *  ⚠️  Names & descriptions are DESCRIPTIVE — written from the photos — and are
 *      flagged `nameConfirmed: false` until the owner confirms the official
 *      menu wording. Prices are `null` (shown as "Ask in store") until confirmed.
 *
 *  To update an item: change `name`, set `nameConfirmed: true`, and add a
 *  `price` in KES (a number, e.g. 450). To add an item, copy an entry and drop
 *  new photos into /public/images (see README → "Adding photos").
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { cutout, photo, stage, type Media } from "./media";

export type CategoryId = "coffee-drinks" | "breakfast" | "mains" | "kenyan" | "snacks" | "cakes";

export type MenuCategory = { id: CategoryId; label: string; blurb: string };

export type MenuItem = {
  id: string;
  name: string;
  nameConfirmed: boolean;
  category: CategoryId;
  description: string;
  price: number | null; // KES
  /** Hot / iced only apply to drinks. */
  serve?: "hot" | "iced";
  /** Cut-out plate (transparent) for editorial presentation. */
  cutout?: Media;
  /** Table photography. */
  photos: Media[];
  /** Brand backdrop the dish was photographed on — used as a card accent. */
  stageColor?: "green" | "orange" | "mocha";
  featured?: boolean;
  /** Options only when confirmed by Opal (used by the WhatsApp request builder). */
  options?: { label: string; choices: string[] }[];
};

export const categories: MenuCategory[] = [
  { id: "coffee-drinks", label: "Coffee & Drinks", blurb: "Lattes poured to a heart, and mojitos built over crushed ice." },
  { id: "breakfast", label: "Breakfast", blurb: "Pancakes, crêpes, croissants and full plates to start the day." },
  { id: "mains", label: "Mains", blurb: "Grills, chicken, pizza and generous plates." },
  { id: "kenyan", label: "Kenyan Classics", blurb: "Ugali, pilau, stews and sukuma — comfort, done properly." },
  { id: "snacks", label: "Snacks & Sides", blurb: "Fries, wings, wedges and pastries for in-between moments." },
  { id: "cakes", label: "Cakes & Pastries", blurb: "Layer cakes, Black Forest and flaky bakes." },
];

export const menu: MenuItem[] = [
  /* ── Coffee & drinks ─────────────────────────────────────────────── */
  {
    id: "cafe-latte", name: "Café Latte", nameConfirmed: false, category: "coffee-drinks", serve: "hot", price: null, featured: true,
    description: "Espresso and silky steamed milk in a tall glass, finished with a latte-art heart.",
    cutout: cutout("latte", "Café latte with heart latte art in a tall glass on an Opal Coffee saucer"),
    photos: [stage("latte", "Café latte with heart latte art on a mocha-brown backdrop")], stageColor: "mocha",
  },
  {
    id: "latte-croissant", name: "Latte & Croissant", nameConfirmed: false, category: "coffee-drinks", serve: "hot", price: null,
    description: "The classic pairing — a café latte with a golden, flaky butter croissant.",
    cutout: cutout("latte-croissant", "Café latte and croissant on an Opal Coffee plate"),
    photos: [stage("latte-croissant", "Latte and croissant on a brand-green backdrop"), photo("croissant-and-tea", "Croissant beside a glass mug of milky tea")], stageColor: "green",
  },
  {
    id: "berry-mojito", name: "Berry Mojito", nameConfirmed: false, category: "coffee-drinks", serve: "iced", price: null,
    description: "Crushed berries, lime and fresh mint over ice, topped up and sparkling.",
    photos: [stage("mojito-berry", "Deep red berry mojito with mint, lime and crushed ice")], stageColor: "green",
  },
  {
    id: "classic-mojito", name: "Classic Mint Mojito", nameConfirmed: false, category: "coffee-drinks", serve: "iced", price: null, featured: true,
    description: "Muddled lime and mint, crushed ice and bright fizz — clean and refreshing.",
    photos: [stage("mojito-classic-mint", "Classic mojito with lime wheels and mint leaves")], stageColor: "green",
  },
  {
    id: "blue-mojito", name: "Blue Mojito", nameConfirmed: false, category: "coffee-drinks", serve: "iced", price: null,
    description: "An ocean-blue layered mojito with lime, mint and plenty of ice.",
    photos: [stage("mojito-blue-lagoon", "Blue layered mojito with lime and mint")], stageColor: "green",
  },
  {
    id: "strawberry-mojito", name: "Strawberry Mojito", nameConfirmed: false, category: "coffee-drinks", serve: "iced", price: null,
    description: "Strawberry, lime and mint shaken over ice for a sunset-coloured cooler.",
    photos: [stage("mojito-strawberry", "Strawberry mojito with lime slice and mint")], stageColor: "green",
  },

  /* ── Breakfast ───────────────────────────────────────────────────── */
  {
    id: "pancake-stack", name: "Pancake Stack", nameConfirmed: false, category: "breakfast", price: null, featured: true,
    description: "Fluffy stacked pancakes with chocolate drizzle, a dusting of sugar, strawberries and fresh mint.",
    cutout: cutout("pancake-stack", "Stack of pancakes with chocolate drizzle on an Opal plate"),
    photos: [photo("pancake-stack", "Pancake stack with chocolate drizzle and strawberries"), photo("pancake-stack-2", "Close view of pancakes with chocolate lines and mint"), photo("pancake-stack-3", "Pancakes on a white plate on a wooden table")], stageColor: "orange",
  },
  {
    id: "pancake-syrup", name: "Pancake with Syrup", nameConfirmed: false, category: "breakfast", price: null,
    description: "A golden pancake, sugar-dusted and served with a little pot of syrup.",
    cutout: cutout("pancake", "Single pancake with a pot of syrup on an Opal plate"),
    photos: [photo("pancake-syrup", "Pancake with syrup and mint"), photo("pancake-syrup-2", "Pancake dusted with sugar beside syrup")], stageColor: "green",
  },
  {
    id: "crepes", name: "Chocolate Crêpes", nameConfirmed: false, category: "breakfast", price: null,
    description: "Folded crêpes with a ribbon of chocolate drizzle.",
    cutout: cutout("crepes", "Folded crêpes with chocolate drizzle on an Opal plate"), photos: [], stageColor: "green",
  },
  {
    id: "full-breakfast", name: "Full Breakfast", nameConfirmed: false, category: "breakfast", price: null, featured: true,
    description: "Fried eggs, sausages, baked beans and sautéed potatoes — with toast on the side.",
    cutout: cutout("full-breakfast-toast", "Full breakfast with eggs, sausages, beans and toast"),
    photos: [], stageColor: "green",
  },
  {
    id: "breakfast-platter", name: "Breakfast Platter", nameConfirmed: false, category: "breakfast", price: null,
    description: "Crêpe, sausages, a fried egg, saucy potatoes and fresh salsa on one generous plate.",
    cutout: cutout("breakfast-platter-2", "Breakfast platter with crêpe, sausages, egg and salsa"), photos: [], stageColor: "orange",
  },
  {
    id: "croissant", name: "Butter Croissant", nameConfirmed: false, category: "breakfast", price: null,
    description: "Golden, layered and flaky — perfect beside a latte.",
    cutout: cutout("croissant", "Golden croissant on an Opal plate"),
    photos: [photo("croissant", "Glossy croissant on a white plate"), photo("croissant-2", "Croissant close-up")], stageColor: "orange",
  },

  /* ── Mains ───────────────────────────────────────────────────────── */
  {
    id: "beef-fries", name: "Beef & Fries with Kachumbari", nameConfirmed: false, category: "mains", price: null, featured: true,
    description: "Seared beef pieces with crisp fries and fresh tomato-onion kachumbari.",
    cutout: cutout("beef-fries", "Beef pieces, fries and kachumbari on an Opal plate"),
    photos: [photo("beef-fries-kachumbari", "Seared beef with fries and kachumbari"), photo("beef-fries-kachumbari-4", "Beef and fries on an oval plate")], stageColor: "mocha",
  },
  {
    id: "quarter-chicken", name: "Roast Quarter Chicken & Fries", nameConfirmed: false, category: "mains", price: null,
    description: "A glazed, golden chicken quarter with fries and a side of kachumbari.",
    photos: [photo("quarter-chicken", "Roast chicken quarter with fries"), photo("quarter-chicken-2", "Glazed chicken with kachumbari"), photo("quarter-chicken-wide", "Chicken and fries on a white plate")],
  },
  {
    id: "grilled-chicken", name: "Grilled Chicken, Rice & Spinach", nameConfirmed: false, category: "mains", price: null,
    description: "Spiced grilled chicken with fluffy rice and buttery spinach.",
    cutout: cutout("grilled-chicken", "Grilled chicken with rice and spinach on an Opal plate"),
    photos: [photo("grilled-chicken-rice", "Grilled chicken with rice and spinach"), photo("grilled-chicken-rice-wide", "Grilled chicken plate from above")], stageColor: "orange",
  },
  {
    id: "chicken-mushroom", name: "Chicken in Creamy Mushroom Sauce", nameConfirmed: false, category: "mains", price: null,
    description: "Tender chicken in a creamy mushroom sauce with rice and spinach.",
    cutout: cutout("chicken-mushroom", "Chicken in mushroom sauce with rice and spinach"),
    photos: [photo("chicken-mushroom", "Chicken in creamy mushroom sauce with rice"), photo("chicken-mushroom-top", "Mushroom chicken plate from above")], stageColor: "green",
  },
  {
    id: "crumbed-chicken", name: "Crumbed Chicken & Fries", nameConfirmed: false, category: "mains", price: null,
    description: "Crisp golden crumbed chicken with fries and creamy coleslaw.",
    cutout: cutout("crumbed-chicken", "Crumbed chicken with fries and coleslaw"),
    photos: [photo("crumbed-chicken", "Crumbed chicken with fries and coleslaw"), photo("crumbed-chicken-2", "Two pieces of crumbed chicken")], stageColor: "orange",
  },
  {
    id: "beef-stirfry", name: "Beef Stir-fry with Pilau Rice", nameConfirmed: false, category: "mains", price: null,
    description: "Beef strips tossed with peppers and broccoli beside golden spiced rice.",
    photos: [photo("beef-stirfry-rice", "Beef stir-fry with peppers beside yellow rice"), photo("beef-stirfry-rice-wide", "Stir-fry and rice on an oval plate")],
  },
  {
    id: "spiced-chicken-rice", name: "Spiced Chicken & Rice", nameConfirmed: false, category: "mains", price: null,
    description: "Saucy spiced chicken over fragrant tomato rice with a cream drizzle.",
    cutout: cutout("spiced-chicken-rice", "Spiced chicken on tomato rice on an Opal plate"),
    photos: [photo("spiced-chicken-rice", "Spiced chicken over orange rice"), photo("spiced-chicken-rice-macro", "Close-up of spiced chicken and rice")], stageColor: "green",
  },
  {
    id: "pizza", name: "Sausage & Beef Pizza", nameConfirmed: false, category: "mains", price: null, featured: true,
    description: "Stone-baked style pizza loaded with sausage, minced beef, peppers and melted cheese.",
    cutout: cutout("pizza", "Pizza with sausage and beef on a wooden board"),
    photos: [photo("pizza", "Whole pizza on a wooden board"), photo("pizza-macro", "Close-up of pizza with melted cheese and sausage"), photo("pizza-wide", "Pizza on a wooden paddle")], stageColor: "green",
  },
  {
    id: "wrap", name: "Wrap with Spiced Potatoes", nameConfirmed: false, category: "mains", price: null,
    description: "A rolled wrap served with saucy potatoes and fresh salsa.",
    cutout: cutout("wrap-potatoes", "Wrap with spiced potatoes and salsa"), photos: [], stageColor: "green",
  },

  /* ── Kenyan classics ─────────────────────────────────────────────── */
  {
    id: "ugali-stew", name: "Ugali, Beef Stew & Sukuma", nameConfirmed: false, category: "kenyan", price: null, featured: true,
    description: "Soft ugali with a rich beef stew and sautéed sukuma wiki.",
    cutout: cutout("ugali-stew", "Ugali with beef stew and greens on an Opal plate"),
    photos: [photo("ugali-stew", "Ugali with a bowl of beef stew and greens"), photo("ugali-stew-wide", "Ugali, stew and sukuma from above"), photo("beef-stew-macro", "Close-up of beef stew")], stageColor: "green",
  },
  {
    id: "stew-rice", name: "Beef Stew with Yellow Rice", nameConfirmed: false, category: "kenyan", price: null,
    description: "Hearty beef stew with golden rice and greens.",
    cutout: cutout("stew-rice-greens", "Yellow rice, greens and beef stew on an Opal plate"),
    photos: [photo("stew-rice-greens", "Beef stew with yellow rice and greens"), photo("stew-rice", "Stew bowl on golden rice")], stageColor: "green",
  },
  {
    id: "pilau", name: "Pilau with Kachumbari", nameConfirmed: false, category: "kenyan", price: null,
    description: "Fragrant spiced pilau rice served with fresh kachumbari.",
    cutout: cutout("pilau", "Pilau rice with kachumbari on an Opal plate"), photos: [], stageColor: "green",
  },
  {
    id: "masala-fries", name: "Masala Fries", nameConfirmed: false, category: "kenyan", price: null,
    description: "Fries tossed in a spiced, saucy masala coating.",
    cutout: cutout("masala-fries", "Masala fries in a bowl on an Opal plate"), photos: [], stageColor: "green",
  },
  {
    id: "masala-fries-sausage", name: "Masala Fries & Sausages", nameConfirmed: false, category: "kenyan", price: null,
    description: "Spiced masala fries with two golden sausages.",
    cutout: cutout("masala-fries-sausage", "Masala fries with sausages"), photos: [], stageColor: "orange",
  },

  /* ── Snacks & sides ──────────────────────────────────────────────── */
  {
    id: "sesame-wings", name: "Sticky Sesame Wings", nameConfirmed: false, category: "snacks", price: null, featured: true,
    description: "Glazed chicken wings with toasted sesame, fries and coleslaw.",
    cutout: cutout("sesame-wings", "Sticky sesame wings with fries"),
    photos: [photo("sesame-wings-2", "Sticky sesame wings with fries and coleslaw"), photo("sesame-wings-macro", "Close-up of glazed sesame wings"), photo("sesame-wings-wide", "Wings, fries and coleslaw from above")], stageColor: "orange",
  },
  {
    id: "loaded-fries", name: "Loaded Chicken Fries", nameConfirmed: false, category: "snacks", price: null,
    description: "Fries piled with chicken, BBQ sauce, creamy drizzle and kachumbari.",
    cutout: cutout("loaded-fries", "Loaded fries with chicken and sauces"),
    photos: [photo("loaded-fries", "Loaded fries with chicken, sauce and kachumbari"), photo("loaded-fries-3", "Loaded fries close-up")], stageColor: "green",
  },
  {
    id: "sausage-fries", name: "Sausage & Fries", nameConfirmed: false, category: "snacks", price: null,
    description: "Golden fries with two grilled sausages.",
    cutout: cutout("sausage-fries", "Sausages and fries in a bowl"), photos: [], stageColor: "mocha",
  },
  {
    id: "fries", name: "Fries", nameConfirmed: false, category: "snacks", price: null,
    description: "A generous bowl of crisp golden fries.",
    cutout: cutout("fries", "Bowl of fries on an Opal plate"), photos: [], stageColor: "green",
  },
  {
    id: "potato-wedges", name: "Spiced Potato Wedges", nameConfirmed: false, category: "snacks", price: null,
    description: "Roasted potato wedges with peppers and a light spice.",
    cutout: cutout("potato-wedges", "Spiced potato wedges with peppers"), photos: [], stageColor: "orange",
  },
  {
    id: "saucy-potatoes", name: "Saucy Potatoes", nameConfirmed: false, category: "snacks", price: null,
    description: "Potatoes simmered in a rich tomato sauce.",
    cutout: cutout("saucy-potatoes", "Potatoes in tomato sauce"), photos: [], stageColor: "green",
  },
  {
    id: "puff-pastry", name: "Savoury Puff Pastry", nameConfirmed: false, category: "snacks", price: null,
    description: "Golden, flaky, many-layered puff pastry.",
    cutout: cutout("puff-pastry", "Puff pastry on an Opal plate"),
    photos: [photo("puff-pastry", "Square puff pastry"), photo("pastry-turnover", "Half-moon pastry turnover"), photo("pastry-turnover-macro", "Flaky pastry layers close-up")], stageColor: "orange",
  },

  /* ── Cakes ───────────────────────────────────────────────────────── */
  {
    id: "black-forest", name: "Black Forest Cake", nameConfirmed: false, category: "cakes", price: null, featured: true,
    description: "Chocolate curls, whipped cream rosettes and bright cherries.",
    cutout: cutout("black-forest-cake", "Whole Black Forest cake with cherries"),
    photos: [photo("black-forest-cake", "Black Forest cake on a wooden table"), photo("black-forest-cake-macro", "Cherries and chocolate curls close-up"), photo("black-forest-cake-detail", "Side of Black Forest cake")], stageColor: "green",
  },
  {
    id: "caramel-cake", name: "Caramel Layer Cake", nameConfirmed: false, category: "cakes", price: null,
    description: "Spiced sponge layered with cream and finished with caramel drizzle.",
    cutout: cutout("caramel-layer-cake", "Slice of caramel layer cake"),
    photos: [photo("caramel-layer-cake", "Caramel layer cake slice"), photo("caramel-layer-cake-2", "Caramel cake with cream swirl")], stageColor: "green",
  },
  {
    id: "passion-cake", name: "Passion Fruit Cake", nameConfirmed: false, category: "cakes", price: null,
    description: "Golden sponge with cream and a glossy passion fruit glaze.",
    cutout: cutout("passion-cake", "Slice of passion fruit cake"),
    photos: [photo("passion-cake-slice", "Passion fruit cake slice with glaze")], stageColor: "mocha",
  },
];

export const menuById = Object.fromEntries(menu.map((m) => [m.id, m])) as Record<string, MenuItem>;

export function formatPrice(price: number | null) {
  if (price == null) return null;
  return `KES ${price.toLocaleString("en-KE")}`;
}
