/**
 * Home-page "Signature Drinks" showcase. Each slide sits on the exact backdrop
 * colour it was photographed on, so the photo blends seamlessly into the stage.
 * Names are descriptive until confirmed — see content/menu.ts.
 */
import { stage, type Media } from "./media";

export type ShowcaseDrink = {
  id: string;
  menuId: string;
  index: string;
  kind: string;
  name: string;
  line: string;
  notes: string[];
  image: Media;
  stage: string; // exact photographed backdrop
  accent: string;
  aspect: "square" | "portrait";
};

export const showcase: ShowcaseDrink[] = [
  {
    id: "latte", menuId: "cafe-latte", index: "01", kind: "Hot · Espresso & milk", name: "Café Latte",
    line: "Silky steamed milk, a shot of espresso, and a heart on top.",
    notes: ["Tall glass", "Latte art", "Served hot"],
    image: stage("latte", "Café latte with heart latte art in a tall glass on an Opal Coffee saucer"),
    stage: "#8D6238", accent: "#F3D9B1", aspect: "square",
  },
  {
    id: "latte-croissant", menuId: "latte-croissant", index: "02", kind: "Hot · The pairing", name: "Latte & Croissant",
    line: "The quiet-morning classic: a warm latte and a flaky, golden croissant.",
    notes: ["Coffee + pastry", "Morning favourite"],
    image: stage("latte-croissant", "Latte and croissant on an Opal Coffee plate"),
    stage: "#016C38", accent: "#F7C873", aspect: "square",
  },
  {
    id: "berry", menuId: "berry-mojito", index: "03", kind: "Iced · Mojito", name: "Berry Mojito",
    line: "Crushed berries, lime and mint over ice — deep red and sparkling.",
    notes: ["Crushed ice", "Fresh mint", "Lime"],
    image: stage("mojito-berry", "Berry mojito with mint, lime and crushed ice"),
    stage: "#006B37", accent: "#FF6B8B", aspect: "portrait",
  },
  {
    id: "mint", menuId: "classic-mojito", index: "04", kind: "Iced · Mojito", name: "Classic Mint",
    line: "Muddled lime and mint with bright fizz. Clean, cold, refreshing.",
    notes: ["Lime wheels", "Fresh mint", "Sparkling"],
    image: stage("mojito-classic-mint", "Classic mint mojito with lime wheels"),
    stage: "#006B37", accent: "#D4EC8E", aspect: "portrait",
  },
  {
    id: "blue", menuId: "blue-mojito", index: "05", kind: "Iced · Mojito", name: "Blue Mojito",
    line: "An ocean-blue layered cooler with lime, mint and plenty of ice.",
    notes: ["Layered", "Lime", "Mint"],
    image: stage("mojito-blue-lagoon", "Blue layered mojito with lime and mint"),
    stage: "#006B37", accent: "#8FD6FF", aspect: "portrait",
  },
  {
    id: "strawberry", menuId: "strawberry-mojito", index: "06", kind: "Iced · Mojito", name: "Strawberry Mojito",
    line: "Strawberry, lime and mint — a sunset in a tall glass.",
    notes: ["Strawberry", "Lime", "Mint"],
    image: stage("mojito-strawberry", "Strawberry mojito with lime and mint"),
    stage: "#006B37", accent: "#FFB08A", aspect: "portrait",
  },
];
