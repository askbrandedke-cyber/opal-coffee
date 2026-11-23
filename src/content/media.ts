import dims from "./image-dims.json";

export type Media = { src: string; width: number; height: number; alt: string };

const table = dims as unknown as Record<string, [number, number]>;

/** Look up a processed image by path and attach its real dimensions + alt text. */
export function media(src: string, alt: string): Media {
  const d = table[src];
  if (!d) throw new Error(`Unknown image: ${src} — run the image pipeline or fix the path.`);
  return { src, width: d[0], height: d[1], alt };
}

export const photo = (name: string, alt: string) => media(`/images/photos/${name}.webp`, alt);
export const cutout = (name: string, alt: string) => media(`/images/cutouts/${name}.webp`, alt);
export const stage = (name: string, alt: string) => media(`/images/stage/${name}.webp`, alt);
