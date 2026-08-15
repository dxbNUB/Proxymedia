export const SITE = 'https://proxymedia.ae'

/**
 * One source of truth for per-route metadata. Used twice:
 *  - at build time by scripts/prerender.mjs, which writes it into the static
 *    HTML for each route (this is what crawlers read)
 *  - at runtime by useSeo(), so client-side navigation keeps the tab title and
 *    meta in sync
 */
export const routes = {
  '/': {
    title: 'AI Automation Company in Dubai, UAE | Proxymedia',
    description:
      'Proxymedia is an AI automation company in Dubai serving the UAE, Saudi Arabia and the wider GCC. We build and run systems that handle follow-ups, export documents, order entry and reporting — self-hosted and PDPL compliant. Fixed price, live in 3–5 weeks.',
  },
  '/what-we-do': {
    title: 'What We Automate — Follow-ups, Documents, Orders | Proxymedia',
    description:
      'The four systems we build for businesses in the UAE and GCC: automated follow-ups and payment chasing, export document generation, order intake from email and WhatsApp, and a live operations dashboard. Fixed price, self-hosted.',
    faq: true,
  },
  '/about': {
    title: 'About Proxymedia — AI Automation, Dubai',
    description:
      'Proxymedia is a Dubai-based AI automation company. We build systems you own, hosted in your region, built around UAE and Saudi PDPL from the start. How we work, what we believe, and who you deal with.',
  },
  '/contact': {
    title: 'Contact — Book a 15-Minute Call | Proxymedia',
    description:
      'Book a free 15-minute call with Proxymedia, an AI automation company in Dubai. We will ask what your team does by hand and tell you honestly whether we can help. Or email hello@proxymedia.ae.',
  },
  '/clients': {
    title: 'Who We Work With — Clients & Case Studies | Proxymedia',
    description:
      'Businesses across the UAE and GCC using Proxymedia automation — collections, agricultural exports, trade and logistics. What we built for each and what changed.',
  },
}

export function metaFor(path) {
  return routes[path] ?? routes['/']
}
