import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import Button from '../components/Button'
import CountUp from '../components/CountUp'
import Headline from '../components/Headline'
import Reveal from '../components/Reveal'

const proof = [
  { k: '3–5', unit: 'weeks to live' },
  { k: 'UAE', unit: 'hosted, yours' },
  { k: 'Fixed', unit: 'price, always' },
]

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  })
  // Kept shallow on purpose. A photograph scaled past ~1.08 is being resampled
  // well beyond its natural size while it moves, which reads as softness and
  // edge shimmer rather than depth.
  const y = useTransform(smooth, [0, 1], ['0%', '10%'])
  const scale = useTransform(smooth, [0, 1], [1.03, 1.08])

  return (
    <section className="bg-paper">
      {/* Full-bleed photograph. The frame splits field from depot, which is
          the business in one picture — copy sits over the field side. */}
      <div
        ref={ref}
        className="relative isolate flex min-h-[70svh] items-center overflow-hidden md:min-h-[76svh]"
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={reduced ? undefined : { y, scale }}
        >
          <picture>
            <source
              media="(min-width: 900px)"
              srcSet="/hero-field-depot.webp"
              type="image/webp"
            />
            <source srcSet="/hero-field-depot-1400.webp" type="image/webp" />
            <img
              src="/hero-field-depot.jpg"
              alt="Aerial view of a crop field meeting a haulage depot, trucks lined up in their bays"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </picture>
        </motion.div>

        {/* Scrims: ink from the left for legibility, ground at the bottom so
            the photograph dissolves into the page instead of stopping. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,18,15,0.94)_0%,rgba(10,18,15,0.82)_34%,rgba(10,18,15,0.35)_62%,rgba(10,18,15,0.1)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(to_top,var(--color-paper)_18%,rgba(15,26,22,0.6)_55%,transparent)]"
        />
        <span aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10">
          <div className="max-w-[42rem]">
            <Reveal>
              <div className="rule w-24" />
              <p className="eyebrow mt-5">AI automation for businesses in the UAE and GCC</p>
            </Reveal>

            <Headline
              as="h1"
              text="We automate your business."
              accent="your business."
              className="mt-6 text-[46px] leading-[0.98] font-semibold tracking-[-0.04em] text-ink md:text-[74px]"
            />

            <Reveal delay={620}>
              <p className="mt-8 max-w-[32rem] text-[18px] leading-[1.6] text-slate">
                Chasing unpaid invoices, producing your documents, keying in
                orders from email and WhatsApp, reporting where everything
                stands — we build software that does all of it, then run it
                for you.
              </p>
            </Reveal>

            <Reveal delay={720}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="/contact" variant="cobalt" arrow>
                  Book a 15-min call
                </Button>
                <Button variant="quiet" href="#packages">
                  See packages
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Proof strip sits on the ground below the photograph. */}
      <div className="mx-auto max-w-[1280px] px-6 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-3">
            {proof.map((p) => (
              <li key={p.unit} className="bg-paper px-7 py-7">
                <p className="text-[30px] leading-none font-semibold tracking-[-0.035em] text-ink">
                  <CountUp value={p.k} />
                </p>
                <p className="mt-2.5 text-[14px] text-mute">{p.unit}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
