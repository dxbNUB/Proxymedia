import { Link } from 'react-router-dom'
import FlowDiagram from '../components/FlowDiagram'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

/* Home-page summary. The full version lives on /what-we-do — kept short here
   so the two pages are not competing for the same search result. */
const systems = [
  {
    n: '01',
    build: 'Payment follow-up',
    helps: 'Unpaid invoices chased on a schedule, by email and WhatsApp, until the money lands. You get paid sooner without anyone nagging.',
  },
  {
    n: '02',
    build: 'Document generation',
    helps: 'Invoices, customs paperwork and certificates produced from one set of details — filled, formatted and filed before the truck leaves.',
  },
  {
    n: '03',
    build: 'Order intake',
    helps: 'Orders read straight out of email, WhatsApp and PDFs, checked against your rules, and entered into your system for you.',
  },
  {
    n: '04',
    build: 'Operations dashboard',
    helps: 'One live screen showing where every job stands, what is overdue and who owes you what — instead of five spreadsheets.',
  },
]

export default function ServicesTeaser() {
  return (
    <section id="capabilities" className="on-light scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="What we do"
          title="Four systems we build, and what each one takes off your team."
          accent="off your team."
        />

        {/* One diagram, doing the job a paragraph would do worse. */}
        <Reveal delay={300} className="mt-14 overflow-x-auto">
          {/* The diagram is drawn for dark ground — white rules, light labels —
              so on paper it keeps its own dark panel. It reads as a screen set
              into the page, which is what it is. */}
          <div className="on-dark min-w-[640px] rounded-panel border border-white/10 px-6 py-8 md:min-w-0 md:px-10">
            <FlowDiagram />
          </div>
        </Reveal>

        {/* Hairline grid: the gap is the rule colour showing through, so it
            follows the section's palette instead of assuming white. */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-card bg-rule sm:grid-cols-2">
          {systems.map((s, i) => (
            <Reveal
              key={s.build}
              delay={i * 80}
              // Clay edge on approach. Border is present but transparent at
              // rest, so nothing shifts when it colours in.
              className="border-l-2 border-transparent bg-paper p-9 transition-colors duration-500 hover:border-flame hover:bg-card"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] font-semibold tracking-[0.08em] text-flame">
                  {s.n}
                </span>
                <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-ink">
                  {s.build}
                </h3>
              </div>
              <p className="mt-4 max-w-[30rem] text-[15.5px] leading-[1.65] text-slate">
                {s.helps}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <Link
            to="/what-we-do"
            className="mt-10 inline-flex items-center gap-2 text-[15px] text-cobalt transition-colors duration-300 hover:text-cobalt-2"
          >
            See exactly what each system does
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
