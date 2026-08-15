import { Link } from 'react-router-dom'
import Headline from '../components/Headline'
import Reveal from '../components/Reveal'

/* TODO — drop your number in (digits only, country code first, e.g.
   '971501234567') and the WhatsApp line appears. Left empty on purpose:
   a dead contact link is worse than none. */
const WHATSAPP = ''

const included = [
  'A written map of how work moves through your business',
  'What each manual step is costing you, in hours and money',
  'A list of what to automate first, in order',
]

/* Home-page closer. The calendar itself lives on /contact so it is only
   embedded once and has a URL people can be sent to. */
export default function Contact() {
  return (
    <section
      id="contact"
      className="on-cobalt scroll-mt-24 bg-cobalt text-cobalt-ink"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Start here</p>
            </Reveal>

            <Headline
              text="Start with the audit. Two weeks, $1,500, no lock-in."
              accent="no lock-in."
              className="mt-4 max-w-[24rem] text-[36px] leading-[1.04] font-semibold tracking-[-0.035em] md:text-[52px]"
            />
          </div>

          <Reveal delay={600}>
            <ul className="space-y-3.5">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[16px] leading-[1.6] text-cobalt-ink/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[11px] h-px w-4 shrink-0 bg-cobalt-ink/50"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-cobalt-ink px-7 py-3.5 text-[15px] font-medium text-cobalt transition-colors duration-300 hover:bg-ink-deep"
              >
                Book a 15-min call
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[2px] motion-reduce:transform-none"
                >
                  <path
                    d="M3.5 10.5 L10.5 3.5 M5 3.5 h5.5 V9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <a
                href="mailto:hello@proxymedia.ae?subject=Automation%20audit"
                className="text-[15px] text-cobalt-ink/80 underline decoration-cobalt-ink/40 underline-offset-[5px] transition-colors hover:text-cobalt-ink hover:decoration-cobalt-ink"
              >
                hello@proxymedia.ae
              </a>

              {WHATSAPP ? (
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  className="text-[15px] text-cobalt-ink/80 underline decoration-cobalt-ink/40 underline-offset-[5px] transition-colors hover:text-cobalt-ink hover:decoration-cobalt-ink"
                >
                  WhatsApp
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
