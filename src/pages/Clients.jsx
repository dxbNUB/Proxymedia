import Button from '../components/Button'
import Headline from '../components/Headline'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import PageHeader from '../components/PageHeader'

/**
 * ── ADD YOUR COMPANIES HERE ────────────────────────────────────────────
 * One object per business. Everything except `name` and `sector` is
 * optional — leave a field out and that part of the card is skipped.
 *
 *   name     the business
 *   sector   short label, e.g. 'Debt collection · Dubai'
 *   relation 'Client' | 'Group company' | 'Partner'  (shown as a tag)
 *   what     one or two sentences on what we built
 *   result   the outcome, once you have a real number for it
 *   url      website, if it has one — makes the card a link
 *   logo     path to a file in /public, e.g. '/logos/menaap.svg'
 * ---------------------------------------------------------------------- */
const companies = [
  {
    name: 'Menaap',
    sector: 'Debt collection · Dubai',
    relation: 'Client',
    what: 'Automated reminder sequences, promise-to-pay tracking with escalation, and a live dashboard the collections floor works from.',
    result: '',
    url: '',
    logo: '',
  },
  // {
  //   name: 'Your other company',
  //   sector: 'Sector · City',
  //   relation: 'Group company',
  //   what: 'What we built for them.',
  // },
]

const relationTone = {
  Client: 'bg-cobalt/12 text-cobalt border-cobalt/25',
  'Group company': 'bg-flame/12 text-flame border-flame/30',
  Partner: 'bg-white/[0.06] text-slate border-white/15',
}

function Card({ c, i }) {
  const Tag = c.url ? 'a' : 'div'
  const linkProps = c.url
    ? { href: c.url, target: '_blank', rel: 'noreferrer noopener' }
    : {}

  return (
    <Reveal delay={i * 90} className="card flex flex-col rounded-card p-8">
      <Tag {...linkProps} className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            {c.logo ? (
              <img
                src={c.logo}
                alt={`${c.name} logo`}
                width="120"
                height="32"
                className="mb-4 h-8 w-auto object-contain"
                loading="lazy"
              />
            ) : null}
            <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-ink">
              {c.name}
            </h3>
            <p className="mt-1.5 text-[14px] text-mute">{c.sector}</p>
          </div>

          {c.relation ? (
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-[12px] ${
                relationTone[c.relation] ?? relationTone.Partner
              }`}
            >
              {c.relation}
            </span>
          ) : null}
        </div>

        {c.what ? (
          <p className="mt-6 flex-1 text-[15px] leading-[1.65] text-slate">{c.what}</p>
        ) : null}

        {c.result ? (
          <p className="mt-6 border-t border-white/10 pt-5 text-[15px] leading-[1.6] text-ink">
            {c.result}
          </p>
        ) : null}

        {c.url ? (
          <span className="mt-6 text-[14px] text-cobalt">Visit site →</span>
        ) : null}
      </Tag>
    </Reveal>
  )
}

export default function Clients() {
  return (
    <>
      <PageHeader
        eyebrow="Who we work with"
        title="The businesses running on systems we built."
        accent="we built."
        lead="Some are clients, some are companies we are part of. Either way, the work is the same: find the manual job, build the system, keep it running."
      />

      <section className="bg-paper-2">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((c, i) => (
              <Card key={c.name} c={c} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            eyebrow="A closer look"
            title="A collections team that worked every account by hand."
            accent="by hand."
            lead="Menaap's agents kept their caseload in spreadsheets and their promises-to-pay in their heads. Now reminders send themselves, slipped promises escalate on their own, and the floor works from one dashboard."
          />

          <Reveal delay={400}>
            <p className="mt-10 text-[14px] text-mute">
              Full figures are being finalised with the client and will be
              published here.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="on-cobalt bg-cobalt text-cobalt-ink">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-10 md:py-28">
          <Headline
            text="Want your operation on this page?"
            accent="this page?"
            className="justify-center text-[32px] leading-[1.06] font-semibold tracking-[-0.035em] md:text-[46px]"
          />
          <Reveal delay={500}>
            <div className="mt-9 flex justify-center">
              <Button
                href="/contact"
                variant="ink"
                arrow
                className="!bg-cobalt-ink !text-cobalt hover:!bg-ink-deep"
              >
                Start with the audit
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
