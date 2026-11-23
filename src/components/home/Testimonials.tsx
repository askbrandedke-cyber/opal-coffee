import { IconArrowUpRight } from "@/components/brand/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/content/reviews";
import { showPlaceholders, siteConfig } from "@/content/site";

/**
 * Renders ONLY verified reviews from content/reviews.ts.
 * Hidden on the public site while that list is empty. With
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS=true a clearly-labelled design preview is shown.
 */
export function Testimonials() {
  const preview = reviews.length === 0 && showPlaceholders;
  if (reviews.length === 0 && !preview) return null;

  const items = preview
    ? [1, 2, 3].map((i) => ({ quote: "Placeholder — a verified guest review will appear here once Opal approves it for publication.", author: `Guest name ${i}`, source: "Source" as string, sourceUrl: undefined as string | undefined }))
    : reviews;

  return (
    <section aria-labelledby="reviews-title" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        {preview && <p className="eyebrow mb-6 inline-block rounded-full border border-dashed border-caramel px-4 py-2 text-caramel">Design preview · hidden in production</p>}
        <Reveal><h2 id="reviews-title" className="font-display text-mega text-espresso">Words from <em>our guests.</em></h2></Reveal>
        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {items.map((r, i) => (
            <li key={i} className="w-[85vw] max-w-md shrink-0 snap-start rounded-[1.75rem] bg-ivory p-8 shadow-[0_30px_60px_-35px_rgb(35_23_17/0.4)]">
              <blockquote>
                <p className="font-display text-2xl leading-snug text-espresso">“{r.quote}”</p>
                <footer className="mt-6 text-sm text-muted">
                  — {r.author}, <cite className="not-italic">{r.sourceUrl ? <a className="nav-link" href={r.sourceUrl} target="_blank" rel="noopener noreferrer">{r.source}</a> : r.source}</cite>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
        {siteConfig.googleReviewsUrl && (
          <a href={siteConfig.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="nav-link mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-espresso">
            Read reviews on Google <IconArrowUpRight width={16} height={16} />
          </a>
        )}
      </div>
    </section>
  );
}
