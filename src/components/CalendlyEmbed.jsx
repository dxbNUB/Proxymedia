import { useEffect, useRef, useState } from 'react'

/**
 * ── SET YOUR CALENDLY LINK ─────────────────────────────────────────────
 * Paste your scheduling URL, e.g.
 *   'https://calendly.com/proxymedia/15min'
 * Leave it empty and the panel falls back to an email link rather than
 * rendering an empty widget.
 * ---------------------------------------------------------------------- */
const CALENDLY_URL = 'https://calendly.com/mnubaid-siddiqui/30min'
const CONTACT_EMAIL = 'hello@proxymedia.ae'

/* Themed to match the site so the widget doesn't arrive as a white box. */
const THEME = new URLSearchParams({
  hide_gdpr_banner: '1',
  hide_landing_page_details: '1',
  background_color: '1b2a24',
  text_color: 'f1f5f2',
  primary_color: '35c48b',
}).toString()

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'
const STYLE_HREF = 'https://assets.calendly.com/assets/external/widget.css'

export default function CalendlyEmbed({ height = 680 }) {
  const ref = useRef(null)
  const [near, setNear] = useState(false)

  // Only pull Calendly's script once the booking panel is close to view —
  // it is third-party weight and most visitors never reach the bottom.
  useEffect(() => {
    const node = ref.current
    if (!node || !CALENDLY_URL) return

    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!near || !CALENDLY_URL) return

    if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = STYLE_HREF
      document.head.appendChild(link)
    }

    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      document.body.appendChild(script)
    }
  }, [near])

  if (!CALENDLY_URL) {
    return (
      <div
        ref={ref}
        className="rounded-panel border border-white/12 bg-card p-9 text-center"
      >
        <p className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
          Booking calendar coming shortly
        </p>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-[1.65] text-slate">
          Add your Calendly link in{' '}
          <code className="text-cobalt">CalendlyEmbed.jsx</code> and the live
          calendar appears here.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Automation%20audit`}
          className="mt-7 inline-flex rounded-full bg-cobalt px-6 py-3 text-[15px] font-medium text-cobalt-ink transition-colors duration-300 hover:bg-cobalt-2"
        >
          Email us instead
        </a>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-panel border border-white/12 bg-card"
    >
      <div
        className="calendly-inline-widget"
        data-url={`${CALENDLY_URL}?${THEME}`}
        style={{ minWidth: '320px', height: `${height}px` }}
      />
      <noscript>
        <p className="p-8 text-[15px] text-slate">
          Booking needs JavaScript. Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-cobalt">
            {CONTACT_EMAIL}
          </a>{' '}
          and we will send you times.
        </p>
      </noscript>
    </div>
  )
}
