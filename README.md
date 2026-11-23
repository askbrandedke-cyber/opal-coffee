# Opal Coffee — website

A cinematic, mobile-first website for **Opal Coffee, Astrol Petrol Station, Ngong Road, Ngong, Kenya**.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and Motion.

Pages: **Home · Menu · Our Story · Gallery · Visit · Contact**, plus sitemap, robots, social preview image and structured data.

---

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Deploy (Vercel — recommended)

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project**, import the repository (framework is detected automatically).
3. Add the environment variables from `.env.example` under **Settings → Environment Variables**.
4. Deploy, then add your domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it.

Any Node.js host that runs `npm run build && npm start` also works.

---

## Updating content (no design skills needed)

All business content lives in `src/content/`. Anything set to `null` is **unconfirmed and hidden automatically** — nothing is ever made up to fill the gap.

| What | File | Notes |
|---|---|---|
| Phone, email, Instagram/Facebook/TikTok, opening hours, Google reviews link | `src/content/site.ts` | Replace `null` with the real value. Hours example: `[{ days: "Mon–Fri", open: "7:00", close: "21:00" }]` |
| WhatsApp number | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` | Turns on the menu's WhatsApp request builder |
| Menu items, names, prices (KES) | `src/content/menu.ts` | Set `price: 450` to show a price; set `nameConfirmed: true` once the name is official |
| Home "Signature pours" slider | `src/content/showcase.ts` | |
| Gallery photos & captions | `src/content/gallery.ts` | |
| Guest reviews | `src/content/reviews.ts` | Only real, attributable reviews you have permission to publish. Section stays hidden while empty |
| Story page copy | `src/app/story/page.tsx` | `CHAPTERS` array at the top |

### Adding photos

1. Put the image in `public/images/photos/` (table photos) or `public/images/cutouts/` (transparent PNG/WebP).
   Use `.webp` or `.jpg`, about 1600px on the longest side.
2. Add its size to `src/content/image-dims.json`, e.g. `"/images/photos/interior.webp": [1600, 1067]`.
3. Reference it in a content file: `photo("interior", "Describe what is in the photo")`.

**Venue photos (interior, exterior, team) are still needed.** Add them to `gallery.ts` with the category `"Our Space"` — that filter appears automatically once it has photos.

The original supplied photos were processed by a small script (backdrop removal for the branded-plate shots, WebP export). Ask your developer to re-run it for new studio shots.

### Brand

* Colours, fonts, easing and animation timings: `src/app/globals.css` (`@theme` block at the top).
* Logo motif, wordmark and the rotating "coffee orbit" type: `src/components/brand/Brand.tsx`.
  The motif is inspired by Opal's cup-and-bean logo; **swap in the official vector logo** when available.
* Icons: `src/components/brand/Icons.tsx`.

---

## Integrations & credentials

| Service | Needed for | Variables |
|---|---|---|
| Resend (email) | Contact form delivery | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (sender on a domain verified in Resend) |
| WhatsApp | Menu request builder, WhatsApp links | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Google Maps Embed API *(optional)* | Branded embed | `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` |

Without email credentials, the contact form validates input and then tells visitors honestly that online messages aren't switched on yet. It never pretends a message was sent.
Spam protection: hidden honeypot field, minimum fill time, per-IP rate limit.

## Location accuracy

Directions use the exact coordinates decoded from plus code **6GCRMM26+674** (−1.3494875, 36.6607031), not a name search. That way visitors can't be sent to the Astrol station on Lenana Road.

## Accessibility & performance notes

* Respects *reduced motion*: the intro is skipped and animations are disabled.
* Keyboard support throughout: skip link, focus traps in the mobile menu, lightbox and dialogs, and arrow keys in sliders and the lightbox.
* Every page is statically pre-rendered. Images are served as AVIF/WebP at responsive sizes and lazy-loaded below the fold.
* Fonts are self-hosted, and the Google map loads only when a visitor taps it.
