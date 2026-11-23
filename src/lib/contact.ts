/** Shared contact-form validation (runs on both client and server). */
export type ContactInput = { name: string; contact: string; subject: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const SUBJECTS = ["General question", "Feedback", "Group or event enquiry", "Something else"] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{9,16}$/;

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  else if (v.name.length > 80) e.name = "That name is a little long — 80 characters max.";
  const c = v.contact.trim();
  if (!c) e.contact = "Add an email address or phone number so we can reply.";
  else if (!EMAIL.test(c) && !PHONE.test(c)) e.contact = "Enter a valid email (name@example.com) or phone number (e.g. 07XX XXX XXX).";
  if (!SUBJECTS.includes(v.subject as (typeof SUBJECTS)[number])) e.subject = "Choose a subject.";
  const m = v.message.trim();
  if (m.length < 10) e.message = "Your message needs at least 10 characters.";
  else if (m.length > 2000) e.message = "Please keep your message under 2,000 characters.";
  return e;
}
