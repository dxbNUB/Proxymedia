import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

/**
 * Rendered for any unmatched route, and prerendered to dist/404.html, which
 * Vercel serves for unknown paths on a static build. Without it a typo or a
 * dead link returns Vercel's raw plain-text NOT_FOUND page — no branding, no
 * navigation, no way back.
 */
const elsewhere = [
  { to: '/what-we-do', label: 'What we automate' },
  { to: '/clients', label: 'Who we work with' },
  { to: '/about', label: 'About Proxymedia' },
]

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="mx-auto flex min-h-[62svh] max-w-[1280px] flex-col justify-center px-6 py-28 md:px-10">
        <Reveal>
          <div className="rule w-24" />
          <p className="eyebrow mt-5">Error 404</p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-6 max-w-[34rem] text-[38px] leading-[1.05] font-semibold tracking-[-0.03em] text-ink md:text-[54px]">
            That page isn’t <em className="accent">here.</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-[32rem] text-[17px] leading-[1.6] text-slate">
            The link may be out of date, or the address mistyped. Everything on
            the site is one step away from here.
          </p>
        </Reveal>

        <Reveal delay={230}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="/" variant="cobalt" arrow>
              Back to the homepage
            </Button>
            <Button href="/contact" variant="quiet">
              Book a call instead
            </Button>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-7 text-[15px]">
            {elsewhere.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-slate transition-colors duration-300 hover:text-cobalt"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
