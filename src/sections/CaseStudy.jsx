import CountUp from '../components/CountUp'
import Headline from '../components/Headline'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'

/*
 * Fill in the agreed Menaap figures and the block renders itself.
 *
 * Until then it stays hidden: a stat row reading "—% lift in their key metric"
 * looks like broken rendering, not a deliberate hold, and it does that on the
 * one section whose whole job is proving measurable results. Anything still
 * containing an em dash counts as unset.
 */
const metrics = [
  { value: '—%', label: 'lift in their key metric' },
  { value: '— days', label: 'off the cycle' },
  { value: '— hrs', label: 'saved each week' },
]

const hasFigures = metrics.every((m) => !m.value.includes('—'))

export default function CaseStudy() {
  return (
    <section id="case-study" className="scroll-mt-24 bg-paper-2">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal y={32} className="order-2 lg:order-1">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
              alt="Two colleagues reviewing accounts together at a desk"
              className="h-[360px] rounded-panel md:h-[520px]"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="rule" />
              <p className="eyebrow mt-5">Client story · Menaap, Dubai</p>
            </Reveal>

            <Headline
              text="A collections team that worked every account by hand."
              accent="by hand."
              className="mt-4 max-w-[34rem] text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] text-ink md:text-[46px]"
            />

            <Reveal delay={900}>
              <p className="mt-7 max-w-[32rem] text-[17px] leading-[1.65] text-slate">
                Now reminders send themselves, slipped promises escalate on their
                own, and the floor works from one dashboard.
              </p>
            </Reveal>

            {hasFigures ? (
            <Reveal delay={1000}>
              <dl className="mt-12 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-3">
                {metrics.map((m) => (
                  <div key={m.label} className="bg-paper-2 px-6 py-7">
                    <dt className="text-[30px] leading-none font-semibold tracking-[-0.04em] text-cobalt">
                      <CountUp value={m.value} />
                    </dt>
                    <dd className="mt-3 text-[13.5px] leading-relaxed text-mute">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
