import { formatPrice } from "@/content/menu";

type Line = { name: string; qty: number; option?: string; price: number | null };

/** Builds the plain-text WhatsApp request. Clearly a request — never a confirmed order. */
export function buildRequestMessage({ lines, name, note, timing, total }: { lines: Line[]; name?: string; note?: string; timing?: string; total: number | null }) {
  const out = ["Hello Opal Coffee! I'd like to request:", ""];
  for (const l of lines) out.push(`• ${l.qty} × ${l.name}${l.option ? ` (${l.option})` : ""}`);
  out.push("");
  if (timing) out.push(`How: ${timing}`);
  if (total != null) out.push(`Estimated total from website: ${formatPrice(total)}`);
  if (note?.trim()) out.push(`Note: ${note.trim()}`);
  if (name?.trim()) out.push(`Name: ${name.trim()}`);
  out.push("", "Please confirm availability and the total. Thank you!");
  return out.join("\n");
}
