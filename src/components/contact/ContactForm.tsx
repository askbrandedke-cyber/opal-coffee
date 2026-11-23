"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconCheck, IconDirections } from "@/components/brand/Icons";
import { SUBJECTS, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { directionsUrl, siteConfig, telUrl, whatsappUrl } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "not_configured" | "rate_limited" | "error";

const field =
  "w-full rounded-2xl border bg-ivory px-5 text-espresso placeholder:text-espresso/35 transition focus:outline-none focus:ring-2 focus:ring-caramel/50 aria-[invalid=true]:border-[#a2402f]";

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: "", contact: "", subject: SUBJECTS[0], message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (k: keyof ContactInput) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setStatus("sent");
      else if (data.code === "not_configured") setStatus("not_configured");
      else if (data.code === "rate_limited") setStatus("rate_limited");
      else if (data.code === "invalid" && data.errors) { setErrors(data.errors); setStatus("idle"); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const errList = Object.entries(errors).filter(([, v]) => v) as [keyof ContactInput, string][];
  const wa = whatsappUrl("Hello Opal Coffee!");
  const tel = telUrl();

  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-ivory p-10 text-center" role="status">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-ivory"><IconCheck width={28} height={28} /></span>
        <h2 className="font-display mt-6 text-4xl text-espresso">Message sent — thank you.</h2>
        <p className="mt-3 text-muted">Your message reached the Opal team. We&apos;ll reply to {values.contact}.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[2rem] bg-ivory p-6 shadow-[0_30px_60px_-40px_rgb(35_23_17/0.5)] sm:p-10" aria-describedby="form-note">
      <AnimatePresence>
        {errList.length > 0 && (
          <motion.div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 rounded-2xl border border-[#a2402f]/40 bg-[#a2402f]/5 p-5 text-sm text-[#7c2f22] focus:outline-none"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <p className="font-semibold">Please check {errList.length === 1 ? "one thing" : `${errList.length} things`}:</p>
            <ul className="mt-2 list-disc pl-5">{errList.map(([k, v]) => <li key={k}><a href={`#cf-${k}`} className="underline">{v}</a></li>)}</ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="cf-name" name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} className={`${field} h-14 border-espresso/15`} />
        </Field>
        <Field id="contact" label="Email or phone" error={errors.contact} hint="So we can reply">
          <input id="cf-contact" name="contact" autoComplete="email" inputMode="email" value={values.contact} onChange={set("contact")} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "cf-contact-err" : "cf-contact-hint"} className={`${field} h-14 border-espresso/15`} />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="subject" label="Subject" error={errors.subject}>
          <select id="cf-subject" name="subject" value={values.subject} onChange={set("subject")} aria-invalid={!!errors.subject} className={`${field} h-14 appearance-none border-espresso/15`}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <div className="mt-5">
        <Field id="message" label="Message" error={errors.message}>
          <textarea id="cf-message" name="message" rows={6} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined} className={`${field} border-espresso/15 py-4`} />
        </Field>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs text-muted">We only use your details to reply to this message.</p>
        <button type="submit" disabled={status === "sending"} className="btn btn-dark min-w-44 disabled:opacity-60" aria-busy={status === "sending"}>
          {status === "sending" ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" aria-hidden="true" /><span>Sending…</span></>) : <span>Send message</span>}
        </button>
      </div>

      <div aria-live="polite">
        {status === "not_configured" && (
          <div className="mt-6 rounded-2xl bg-vanilla p-5 text-sm text-espresso" role="status">
            <p className="font-semibold">Online messages aren&apos;t switched on yet — your message has not been sent.</p>
            <p className="mt-1 text-muted">
              {wa || tel ? "Please reach Opal directly:" : "The quickest way to reach Opal for now is to stop by:"}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {wa && <a className="btn btn-dark !min-h-11" href={wa} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span></a>}
              {tel && <a className="btn btn-ghost-dark !min-h-11" href={tel}><span>Call {siteConfig.phone}</span></a>}
              <a className="btn btn-ghost-dark !min-h-11" href={directionsUrl} target="_blank" rel="noopener noreferrer"><IconDirections width={16} height={16} /><span>Directions</span></a>
            </div>
          </div>
        )}
        {status === "rate_limited" && <p className="mt-6 text-sm text-[#7c2f22]" role="alert">You&apos;ve sent a few messages in a short time. Please wait a few minutes and try again.</p>}
        {status === "error" && <p className="mt-6 text-sm text-[#7c2f22]" role="alert">Something went wrong and your message wasn&apos;t sent. Please try again in a moment.</p>}
      </div>
    </form>
  );
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`cf-${id}`} className="eyebrow mb-2 flex justify-between text-[0.62rem] text-muted">
        <span>{label}</span>{hint && <span id={`cf-${id}-hint`} className="normal-case tracking-normal">{hint}</span>}
      </label>
      {children}
      {error && <p id={`cf-${id}-err`} className="mt-2 text-sm text-[#a2402f]">{error}</p>}
    </div>
  );
}
