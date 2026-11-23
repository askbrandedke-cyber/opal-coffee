import type { Metadata } from "next";
import { IconArrowUpRight, IconDirections, IconInstagram, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/brand/Icons";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { directionsUrl, siteConfig, socialLinks, telUrl, whatsappUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Opal Coffee, Astrol Petrol Station, Ngong Road, Ngong.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const tel = telUrl();
  const wa = whatsappUrl("Hello Opal Coffee!");
  return (
    <>
      <PageHero eyebrow="Contact" lines={["Say hello", <em key="h" className="opal-text">to Opal.</em>]} intro="Questions, feedback or a group booking idea — send a note and the team will get back to you." />
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7"><ContactForm /></div>
          <aside className="space-y-6 lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach Opal">
            <div className="rounded-[2rem] bg-espresso p-8 text-ivory">
              <h2 className="eyebrow text-caramel-soft">Direct</h2>
              <ul className="mt-5 space-y-4">
                {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-3"><IconWhatsApp className="text-caramel-soft" />WhatsApp</a></li>}
                {tel && <li><a href={tel} className="nav-link inline-flex items-center gap-3"><IconPhone className="text-caramel-soft" />{siteConfig.phone}</a></li>}
                {siteConfig.email && <li><a href={`mailto:${siteConfig.email}`} className="nav-link inline-flex items-center gap-3"><IconMail className="text-caramel-soft" />{siteConfig.email}</a></li>}
                {socialLinks.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-3"><IconInstagram className="text-caramel-soft" />{s.label}</a></li>)}
                {!wa && !tel && !siteConfig.email && socialLinks.length === 0 && (
                  <li className="text-ivory/65">Phone, WhatsApp and social links will appear here once confirmed. Until then, the form or a visit is the best way to reach us.</li>
                )}
              </ul>
            </div>
            <div className="rounded-[2rem] bg-ivory p-8">
              <h2 className="eyebrow flex items-center gap-2 text-caramel"><IconPin width={16} height={16} />Visit</h2>
              <p className="mt-4 font-display text-2xl leading-snug text-espresso">{siteConfig.location.displayAddress}</p>
              {siteConfig.location.nearbyLandmark && <p className="mt-1 text-muted">Near {siteConfig.location.nearbyLandmark}</p>}
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full"><IconDirections width={18} height={18} /><span>Get Directions</span><IconArrowUpRight width={14} height={14} /></a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
