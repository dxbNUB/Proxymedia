import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const steps = [
  {
    n: '01',
    title: 'Audit & baseline',
    timeframe: 'Weeks 1–2',
    text: 'We map the workflows and agree the numbers to beat. The baseline goes in the contract.',
  },
  {
    n: '02',
    title: 'Build & deploy',
    timeframe: 'Weeks 3–6',
    text: 'Fixed-scope build on infrastructure you control. Your team is using it before we call it done.',
  },
  {
    n: '03',
    title: 'Run & improve',
    timeframe: 'Ongoing',
    text: 'We host it, watch it and keep adding. The bonus applies only if we pass your targets.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // The connector draws itself as the section passes — the one place on the
  // page where scroll position maps to a line, because the content is a
  // sequence.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'center 55%'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  })
  const width = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <section id="process" className="scroll-mt-24 bg-paper-2">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="Process"
          title="We agree the baseline first, then build against it."
          accent="against it."
        />

        <div ref={ref} className="mt-16">
          {/* Rail behind the numbered pips */}
          <div className="relative mb-10 hidden h-[1px] w-full bg-white/10 md:block">
            <motion.div
              className="absolute inset-y-0 left-0 bg-cobalt"
              style={reduced ? { width: '100%' } : { width }}
            />
            {steps.map((s, i) => (
              <span
                key={s.n}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cobalt"
                style={{ left: `calc(${(i * 100) / 3}% + 18px)` }}
              />
            ))}
          </div>

          <div className="grid gap-y-12 md:grid-cols-3 md:gap-x-12">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cobalt text-[13px] font-semibold text-cobalt-ink">
                    {s.n}
                  </span>
                  <span className="text-[13.5px] text-mute">{s.timeframe}</span>
                </div>
                <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-slate">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
