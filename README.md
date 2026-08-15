# Proxymedia — marketing site

Landing page for Proxymedia, an AI automation agency serving GCC businesses.
Positioning: pure automation company — client industries (collections, trade,
real estate, …) are segments, not the service. Vite + React 19 + Tailwind CSS v4.

Visual system: warm dark ink (`#0E1512`, never pure black), Inter throughout with
Instrument Serif italic reserved for one accent word per headline (`.accent`),
small-caps letter-spaced eyebrows (`.eyebrow`), muted sage + warm clay accents,
large radii, soft shadows, real photography. No gradients on text, no monospace
labels, no neon.

## Run locally

```
npm install
npm run dev
```

Opens at http://localhost:5173.

## Build

`npm run build` does three things in order:

1. `vite build` — the client bundle
2. `vite build --ssr src/entry-server.jsx` — a server bundle used only at build time
3. `node scripts/prerender.mjs` — renders every route in `src/seo.js` to static
   HTML (`dist/index.html`, `dist/about/index.html`, …) with that route's title,
   description and canonical baked in. React hydrates on top.

Add a page: create it in `src/pages/`, add a `<Route>` in `App.jsx`, and add an
entry to `routes` in `src/seo.js` — the prerender and sitemap follow from there.

**Hosting note:** because routes are real directories, any static host works, but
it must serve `/about/index.html` for `/about`. On Vercel/Netlify this is the
default; do not add a catch-all rewrite to `/index.html` or you will lose the
per-page HTML.

## Structure

```
proxymedia/
├─ public/                  copied verbatim into dist/
│  ├─ .htaccess             Apache rules (see Hosting note below)
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ hero-field-depot.*    optimised hero photograph (jpg + 2 webp sizes)
├─ scripts/
│  ├─ prerender.mjs         renders every route to static HTML
│  └─ package.mjs           zips dist/ for upload
├─ docs/
│  └─ design-handoff/       original Claude Design bundle (reference only)
├─ src/
│  ├─ config/seo.js         per-route title + description, and SITE
│  ├─ hooks/
│  │  ├─ useSeo.js          keeps head tags right on client navigation
│  │  └─ useScrollSpy.js    highlights the nav link for the visible section
│  ├─ components/           reusable pieces
│  │  ├─ Button.jsx         pill button, spring hover, routes internally
│  │  ├─ CalendlyEmbed.jsx  booking widget (set CALENDLY_URL here)
│  │  ├─ CountUp.jsx        figures count up when scrolled into view
│  │  ├─ FlowDiagram.jsx    home: inputs → system → outputs
│  │  ├─ PipelineDiagram.jsx  what-we-do: one job, arrival to done
│  │  ├─ Headline.jsx       word-by-word headline
│  │  ├─ LocalTime.jsx      live Dubai time + open/closed
│  │  ├─ PageHeader.jsx     inner-page banner
│  │  ├─ ParallaxImage.jsx  scroll parallax + grain
│  │  ├─ Reveal.jsx         fade-up on enter
│  │  ├─ ScrollProgress.jsx top hairline
│  │  └─ SectionHeading.jsx rule + eyebrow + headline
│  ├─ sections/             page sections, shared across routes
│  ├─ pages/                one file per route
│  ├─ App.jsx               routes, scroll manager, grain
│  ├─ main.jsx              client entry (hydrates the prerendered HTML)
│  ├─ entry-server.jsx      build-time entry for prerendering
│  └─ index.css             all theme tokens and shared CSS
├─ index.html               head: meta, JSON-LD, the `.js` bootstrap script
└─ dist/                    build output — never edit, never commit
```

### Where to change things

| Want to change | File |
|---|---|
| Colours, fonts, spacing tokens | `src/index.css` (`@theme`) |
| Page title / meta description | `src/config/seo.js` |
| Booking link | `src/components/CalendlyEmbed.jsx` |
| WhatsApp number | `src/sections/Contact.jsx` |
| Client list | `src/pages/Clients.jsx` |
| Pricing | `src/sections/Packages.jsx` |
| FAQ | `src/sections/Faq.jsx` |

## Deploy

```
npm run package     # build + zip → proxymedia-site.zip
```

Upload the zip's contents into `public_html` on SiteGround, extract, and flush
the Dynamic Cache. `.htaccess` must be present (File Manager hides dotfiles —
turn on "show hidden files" to check).

## Before this goes public (in priority order)

1. **Fill in Menaap numbers** in `CaseStudy.jsx` (recovery-rate lift, DSO cut,
   hours saved) — the whole strategy hangs on this.
2. **Replace the mailto placeholder** in `Contact.jsx`
   (`hello@proxymedia.ae`) with a real address, and add the WhatsApp link.
3. Verify pricing in `Packages.jsx` matches what you actually want to charge.

## Growth roadmap (later)

- Contact form wired to Brevo (replaces mailto)
- Arabic version / RTL toggle
- Per-industry landing pages (collections first — outreach targets land there)
- Blog / proof-of-work section for LinkedIn content permalinks
- Deploy: Vercel or the DigitalOcean box (nginx + `npm run build` → `dist/`)
