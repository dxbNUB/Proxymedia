import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const capabilities = [
  {
    n: '01',
    build: 'A follow-up system',
    does: 'Reminders for unpaid invoices and shipment updates go out on WhatsApp, email or SMS on the schedule you set. Replies are read and filed against the right account, and anyone who promises a payment date and misses it is escalated to your manager.',
    helps: 'You get paid sooner, and nobody has to keep a list in their head.',
    chips: ['WhatsApp & email', 'Promise-to-pay tracking', 'Escalation rules', 'Reply logging'],
  },
  {
    n: '02',
    build: 'A document generator',
    does: 'You enter the shipment details once. The system produces the certificate of origin, phytosanitary certificate, packing list and commercial invoice as finished files, named correctly and filed against the consignment.',
    helps: 'Paperwork is ready before the truck leaves, and the same detail is never typed twice.',
    chips: ['Certificate of origin', 'Phytosanitary', 'Packing lists', 'Commercial invoices'],
  },
  {
    n: '03',
    build: 'An order intake system',
    does: 'Orders arriving by email, WhatsApp or PDF are read automatically, checked against your price list and stock, then written into your CRM, ERP or sheet. Anything that does not match is sent to a person to approve.',
    helps: 'Orders stop sitting in an inbox, and mistakes get caught before they ship.',
    chips: ['Email & PDF reading', 'Price-list checks', 'CRM & ERP sync', 'Review queue'],
  },
  {
    n: '04',
    build: 'An operations dashboard',
    does: 'One screen showing every live consignment, which documents exist, the latest temperature readings, and what each buyer owes you. It is built from the same workflows, so it updates itself.',
    helps: 'You can answer "where is it and who owes us?" without calling anyone.',
    chips: ['Live consignments', 'Cold-chain readings', 'Ageing receivables', 'Daily summary'],
  },
]

export default function Stats() {
  return (
    <section id="capabilities" className="scroll-mt-24 bg-paper-2">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="What we do"
          title="Four systems we build, and what each one takes off your team."
          accent="off your team."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal
              key={c.build}
              delay={i * 80}
              className="flex flex-col bg-paper-2 p-9 transition-colors duration-500 hover:bg-card"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] font-semibold tracking-[0.08em] text-flame">
                  {c.n}
                </span>
                <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-ink">
                  {c.build}
                </h3>
              </div>

              {/* What it is */}
              <p className="mt-5 max-w-[32rem] text-[15.5px] leading-[1.65] text-slate">
                {c.does}
              </p>

              {/* What it gets you */}
              <p className="mt-5 flex max-w-[32rem] flex-1 gap-3 text-[15.5px] leading-[1.6] text-ink">
                <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-cobalt" />
                <span>{c.helps}</span>
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {c.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-mute"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
