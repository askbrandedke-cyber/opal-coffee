import Link from "next/link";
import { OpalMark } from "@/components/brand/Brand";
import { IconArrowUpRight, IconClock, IconDirections, IconMail, IconPhone, IconPin } from "@/components/brand/Icons";
import { directionsUrl, navigation, siteConfig, socialLinks, telUrl } from "@/content/site";

export function Footer() {
  const tel = telUrl();
  const year = 2026;
  return (
    <footer className="grain relative overflow-hidden bg-obsidian text-ivory">
      <div className="opal-line h-px w-full opacity-50" />
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-20 sm:px-8 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <OpalMark className="h-14 w-auto text-caramel-soft" style={{ ["--mark-bg" as string]: "#17120f" }} />
            <p className="mt-8 max-w-sm font-display text-3xl leading-tight text-ivory/90">
              The hidden gem of Ngong Road. <span className="italic text-caramel-soft">{siteConfig.slogan}</span>
            </p>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-9">
              <IconDirections width={18} height={18} />
              <span>Get Directions</span>
            </a>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="eyebrow text-ivory/45">Explore</h2>
            <ul className="mt-6 space-y-3 text-ivory/80">
              {[...navigation, { href: "/contact", label: "Contact" }].map((n) => (
                <li key={n.href}><Link className="nav-link" href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-ivory/45">Find us</h2>
            <address className="mt-6 space-y-4 not-italic text-ivory/80">
              <p className="flex gap-3"><IconPin className="mt-0.5 shrink-0 text-caramel" />
                <span>{siteConfig.location.streetAddress}<br />{siteConfig.location.locality}, {siteConfig.location.country}
                  {siteConfig.location.nearbyLandmark && <><br /><span className="text-ivory/55">Near {siteConfig.location.nearbyLandmark}</span></>}
                </span>
              </p>
              {tel && <p className="flex gap-3"><IconPhone className="shrink-0 text-caramel" /><a href={tel} className="nav-link">{siteConfig.phone}</a></p>}
              {siteConfig.email && <p className="flex gap-3"><IconMail className="shrink-0 text-caramel" /><a href={`mailto:${siteConfig.email}`} className="nav-link">{siteConfig.email}</a></p>}
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-ivory/45">Hours</h2>
            <div className="mt-6 text-ivory/80">
              {siteConfig.hours ? (
                <ul className="space-y-2">{siteConfig.hours.map((h) => <li key={h.days}><span className="text-ivory/55">{h.days}</span><br />{h.open} – {h.close}</li>)}</ul>
              ) : (
                <p className="flex gap-3 text-ivory/60"><IconClock className="mt-0.5 shrink-0 text-caramel" />Opening hours will be published here soon.</p>
              )}
            </div>
            {socialLinks.length > 0 && (
              <>
                <h2 className="eyebrow mt-10 text-ivory/45">Follow</h2>
                <ul className="mt-5 space-y-2">
                  {socialLinks.map((s) => (
                    <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-1.5">{s.label}<IconArrowUpRight width={14} height={14} /></a></li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <p aria-hidden="true" className="pointer-events-none mt-20 select-none text-center font-display font-semibold leading-[0.8] tracking-[0.06em] text-transparent [-webkit-text-stroke:1px_rgb(217_180_138/0.35)] [font-size:clamp(5rem,27vw,26rem)]">
          OPAL
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.legalName}, Ngong, Kenya. All photography © Opal Coffee.</p>
          <p>This site uses no tracking cookies. Contact-form messages are used only to reply to you.</p>
        </div>
      </div>
    </footer>
  );
}
