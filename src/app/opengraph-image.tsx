import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Opal Coffee — The hidden gem of Ngong Road. A café latte on an Opal Coffee saucer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview for WhatsApp, Instagram's in-app browser, etc. */
export default async function Image() {
  const dir = join(process.cwd(), "src/assets");
  const [serif, serifItalic, latte, croissant] = await Promise.all([
    readFile(join(dir, "cormorant-garamond-latin-500-normal.woff")),
    readFile(join(dir, "cormorant-garamond-latin-500-italic.woff")),
    readFile(join(dir, "og-latte.png"), "base64"),
    readFile(join(dir, "og-croissant.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "radial-gradient(circle at 75% 50%, #493022 0%, #17120f 62%)", color: "#faf8f4", fontFamily: "Cormorant" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 72px", width: 700 }}>
          <div style={{ fontSize: 18, letterSpacing: 6, whiteSpace: "nowrap", color: "#d9b48a", fontFamily: "Cormorant" }}>NGONG ROAD · ASTROL PETROL STATION</div>
          <div style={{ fontSize: 92, lineHeight: 1, marginTop: 24, whiteSpace: "nowrap" }}>A Hidden Gem.</div>
          <div style={{ fontSize: 92, lineHeight: 1, fontStyle: "italic", color: "#d9b48a", whiteSpace: "nowrap" }}>A Perfect Pause.</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 36, fontSize: 30, whiteSpace: "nowrap" }}>
            <span style={{ letterSpacing: 8 }}>OPAL COFFEE</span>
            <span style={{ width: 60, height: 1, background: "#b98655", margin: "0 20px" }} />
            <span style={{ fontStyle: "italic", color: "rgba(250,248,244,0.7)" }}>The Perfect Cup.</span>
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 520, alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 440, height: 440, borderRadius: 9999, border: "1px solid rgba(217,180,138,0.35)" }} />
          <img src={`data:image/png;base64,${croissant}`} width={210} height={150} style={{ position: "absolute", left: 10, bottom: 70, objectFit: "contain" }} alt="" />
          <img src={`data:image/png;base64,${latte}`} width={420} height={437} style={{ objectFit: "contain" }} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 500 },
        { name: "Cormorant", data: serifItalic, style: "italic", weight: 500 },
      ],
    },
  );
}
