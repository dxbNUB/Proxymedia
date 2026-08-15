import { Link } from 'react-router-dom'
import FlowDiagram from '../components/FlowDiagram'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

/* Home-page summary. The full version lives on /what-we-do — kept short here
   so the two pages are not competing for the same search result. */
const systems = [
  {
    n: '01',
    build: 'A follow-up system',
    helps: 'Payments and shipment updates chase themselves. You get paid sooner.',
  },
  {
    n: '02',
    build: 'A document generator',
    helps: 'Export paperwork produced from one set of details, ready before the truck leaves.',
  },
  {
    n: '03',
    build: 'An order intake system',
    helps: 'Orders read from email, WhatsApp and PDF, checked, and entered for you.',
  },
  {
    n: '04',
    build: 'An operations dashboard',
    helps: 'One live screen for where every consignment is and who owes you what.',
  },
]

export default function ServicesTeaser() {
  return (
    <section id="capabilities" className="scroll-mt-24 bg-paper-2">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="What we do"
          title="Four systems we build, and what each one takes off your team."
          accent="off your team."
        />

        {/* One diagram, doing the job a paragraph would do worse. */}
        <Reveal delay={300} className="mt-14 overflow-x-auto">
          <div className="min-w-[640px] rounded-card border border-white/10 bg-paper px-6 py-8 md:min-w-0 md:px-10">
            <FlowDiagram />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2">
          {systems.map((s, i) => (
            <Reveal
              key={s.build}
              delay={i * 80}
              className="bg-paper-2 p-9 transition-colors duration-500 hover:bg-card"
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
