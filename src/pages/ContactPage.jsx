import CalendlyEmbed from '../components/CalendlyEmbed'
import LocalTime from '../components/LocalTime'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const included = [
  'A written map of how work moves through your business',
  'What each manual step is costing you, in hours and money',
  'A list of what to automate first, in order',
]

const agenda = [
  'What your team does by hand every week',
  'Which of it is worth automating first',
  'What it would cost and how long it would take',
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Pick a time. Fifteen minutes, no deck."
        accent="no deck."
        lead="We will ask what your team does by hand and tell you honestly whether we can help. If we cannot, we will say so on the call."
      />

      <section className="bg-paper-2">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal>
                <div className="rule w-24" />
                <p className="eyebrow mt-5">On the call</p>
              </Reveal>

              <Reveal delay={120}>
                <ul className="mt-7 space-y-3.5">
                  {agenda.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[16px] leading-[1.6] text-slate"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-px w-4 shrink-0 bg-cobalt"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="text-[15px] text-slate">Prefer to write first?</p>
                  <a
                    href="mailto:hello@proxymedia.ae?subject=Automation%20enquiry"
                    className="mt-2 inline-block text-[17px] text-cobalt transition-colors duration-300 hover:text-cobalt-2"
                  >
                    hello@proxymedia.ae
                  </a>
                  <p className="mt-4 text-[14.5px] text-mute">
                    Dubai, United Arab Emirates
                  </p>
                  <LocalTime className="mt-3 text-[14px] text-mute" />
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} y={28}>
              <CalendlyEmbed />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="on-light">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
          <Reveal>
            <div className="rule w-24" />
            <p className="eyebrow mt-5">Not ready to talk?</p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-5 max-w-2xl text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink md:text-[40px]">
              Start with the audit instead. Two weeks, $1,500, no lock-in.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-ink/10 sm:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item} delay={i * 90} className="bg-card px-7 py-8">
                <p className="text-[13px] font-semibold tracking-[0.08em] text-flame">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-5 text-[15.5px] leading-[1.6] text-slate">{item}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={320}>
            <p className="mt-8 text-[15px] text-mute">
              You keep all three whether or not you build with us.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
