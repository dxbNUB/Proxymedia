import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const packages = [
  {
    name: 'Audit',
    what: 'We study how your business runs and tell you what to automate.',
    price: '$1,500',
    priceNote: '2 weeks',
    features: [
      'Map of how work moves today',
      'ROI model on your numbers',
      'Prioritised roadmap',
      'Credited against your build',
    ],
    cta: 'Book the audit',
    featured: false,
  },
  {
    name: 'Build',
    what: 'We build the system, connect it to your tools and train your team.',
    price: 'from $4,000',
    priceNote: '3–5 weeks, fixed scope',
    features: [
      'Workflows that triage, route and log',
      'Email, SMS and WhatsApp',
      'Connected to your CRM or sheets',
      'Live dashboard for your team',
      'Deployed on your infrastructure',
    ],
    cta: 'Scope my build',
    featured: true,
  },
  {
    name: 'Managed',
    what: 'We host it, keep it working and add to it every month.',
    price: 'from $1,500',
    priceNote: 'monthly, cancel anytime',
    features: [
      'Hosting, monitoring and upkeep',
      'New workflows every month',
      'Monthly report against baseline',
      'Bonus only if we beat target',
    ],
    cta: 'Talk retainers',
    featured: false,
  },
]

export default function Packages() {
  return (
    <section id="packages" className="on-light scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="Packages"
          title="Three ways to work with us. Fixed price, never hourly."
          accent="never hourly."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 100}
              /* The middle tier is marked by going dark against the light
                 ground, rather than by a block of accent colour. */
              className={`flex flex-col rounded-card p-9 ${
                p.featured
                  ? 'on-dark card-lift shadow-[0_30px_60px_-34px_rgb(15_23_19/0.7)]'
                  : 'card'
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[15px] font-medium text-mute">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full border border-flame/40 px-3 py-1 text-[12px] font-medium text-flame">
                    Most picked
                  </span>
                )}
              </div>

              <p className="mt-6 text-[40px] leading-none font-semibold tracking-[-0.04em] text-ink">
                {p.price}
              </p>
              <p className="mt-3 text-[13.5px] text-mute">{p.priceNote}</p>

              <p className="mt-6 text-[15px] leading-[1.6] text-slate">{p.what}</p>

              <ul className="mt-8 flex-1 space-y-3.5 border-t border-rule pt-7">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-[14.5px] leading-relaxed text-slate"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-[9px] h-1 w-1 shrink-0 rounded-full ${
                        p.featured ? 'bg-flame' : 'bg-ink/35'
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-10 rounded-full px-6 py-3 text-center text-[14.5px] font-medium transition-colors duration-300 ${
                  p.featured
                    ? 'bg-[#e4ebe2] text-[#15211c] hover:bg-white'
                    : 'border border-ink/25 text-ink hover:border-ink/50 hover:bg-ink/[0.04]'
                }`}
              >
                {p.cta}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
