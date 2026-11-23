import { validateContact, type ContactInput } from "@/lib/contact";

/**
 * POST /api/contact
 * Sends the message via Resend (https://resend.com) using:
 *   RESEND_API_KEY      – server-only secret
 *   CONTACT_TO_EMAIL    – Opal's inbox
 *   CONTACT_FROM_EMAIL  – a sender on a domain verified in Resend
 * If these are missing the endpoint answers 503 { code: "not_configured" } and the
 * form tells the visitor truthfully that messages can't be sent yet.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ code: "bad_request" }, { status: 400 });
  }

  // Spam traps: honeypot field must be empty, and humans take > 3s to fill the form.
  const startedAt = Number(body.startedAt);
  if (typeof body.website === "string" && body.website.length > 0) return Response.json({ ok: true });
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return Response.json({ code: "too_fast" }, { status: 400 });
  }

  const input: ContactInput = {
    name: String(body.name ?? "").slice(0, 200),
    contact: String(body.contact ?? "").slice(0, 200),
    subject: String(body.subject ?? ""),
    message: String(body.message ?? "").slice(0, 4000),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return Response.json({ code: "invalid", errors }, { status: 422 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return Response.json({ code: "rate_limited" }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return Response.json({ code: "not_configured" }, { status: 503 });

  const isEmail = input.contact.includes("@");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      ...(isEmail ? { reply_to: input.contact } : {}),
      subject: `Website: ${input.subject} — ${input.name}`,
      text: `Name: ${input.name}\nContact: ${input.contact}\nSubject: ${input.subject}\n\n${input.message}`,
      html: `<p><strong>Name:</strong> ${esc(input.name)}<br><strong>Contact:</strong> ${esc(input.contact)}<br><strong>Subject:</strong> ${esc(input.subject)}</p><p>${esc(input.message).replace(/\n/g, "<br>")}</p>`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) return Response.json({ code: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
