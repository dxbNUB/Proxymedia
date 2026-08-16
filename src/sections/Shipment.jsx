import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Headline from '../components/Headline'
import Reveal from '../components/Reveal'

const stages = [
  {
    label: 'Booked',
    title: 'We create the export documents',
    text: 'Certificate of origin, phytosanitary certificate, packing list and invoice — written from the booking, ready before the truck leaves.',
  },
  {
    label: 'In transit',
    title: 'We watch the temperature',
    text: 'Reefer readings are checked every hour. If one drifts out of range, your manager is told immediately — not the buyer after the fact.',
  },
  {
    label: 'Landed',
    title: 'We tell the buyer and update your books',
    text: 'The arrival update goes to the buyer, the ledger and the dashboard at the same time. Nobody re-types a reference number.',
  },
]

const rows = [
  { ref: 'CN-4821', lane: 'Al Ain → Jebel Ali', stageAt: 0, status: 'Docs ready' },
  { ref: 'CN-4822', lane: 'Jebel Ali → Rotterdam', stageAt: 1, status: 'At sea' },
  { ref: 'CN-4819', lane: 'Jebel Ali → Hamburg', stageAt: 2, status: 'Delivered' },
]

const panels = [
  { k: 'Documents', v: '4 of 4', note: 'Generated automatically' },
  { k: 'Reefer', v: '2.4 °C', note: 'Within range, checked hourly', spark: true },
  { k: 'Buyer notified', v: 'Sent', note: 'Ledger updated at the same time' },
]

const EASE = [0.22, 1, 0.36, 1]

export default function Shipment() {
  const trackRef = useRef(null)
  const [stage, setStage] = useState(0)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v < 0.34 ? 0 : v < 0.68 ? 1 : 2
    setStage((prev) => (prev === next ? prev : next))
  })

  return (
    <section className="relative bg-ink-deep">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="ambient" />
      </span>

      {/* The pinned scroll sequence is desktop-only. On a phone the stack
          inside it — headline, stage copy, dashboard — is far taller than the
          viewport, and pinning it to 100svh simply clipped everything below
          the fold. Under lg the section is an ordinary block that scrolls. */}
      <div ref={trackRef} className="relative lg:h-[240vh]">
        <div className="py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0 lg:supports-[height:100svh]:h-[100svh]">
          <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
            <div className="grid items-center gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
              <div>
                <Reveal>
                  <div className="rule w-24" />
                  <p className="eyebrow mt-5">How it works</p>
                </Reveal>

                <Headline
                  text="Here is what happens to one shipment, without your team touching it."
                  accent="touching it."
                  className="mt-4 text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink md:text-[42px]"
                />

                {/* Stage copy crossfades as the dashboard advances. */}
                {/* Desktop: the three stages occupy one box and crossfade as
                    you scroll. Mobile: they stack and are all readable at once,
                    since there is no pinned scroll to drive the sequence. */}
                <div className="relative mt-9 space-y-7 lg:h-[150px] lg:space-y-0">
                  {stages.map((s, i) => (
                    <motion.div
                      key={s.label}
                      className="stage-copy lg:absolute lg:inset-0"
                      initial={false}
                      animate={{ opacity: stage === i ? 1 : 0, y: stage === i ? 0 : 12 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
                        {s.title}
                      </p>
                      <p className="mt-3 max-w-[26rem] text-[15.5px] leading-[1.65] text-slate">
                        {s.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  {stages.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-2.5">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full"
                        animate={{
                          backgroundColor:
                            stage === i ? 'rgb(53 196 139)' : 'rgba(255,255,255,0.25)',
                          scale: stage === i ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                      <motion.span
                        className="text-[13px] text-slate"
                        animate={{ opacity: stage === i ? 1 : 0.45 }}
                        transition={{ duration: 0.4 }}
                      >
                        {s.label}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </div>

              {/* The dashboard those workflows feed. Illustrative of the
                  deliverable — the references and figures are examples. */}
              <Reveal delay={160} y={28}>
                <div className="overflow-hidden rounded-panel border border-white/12 bg-card shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="ping relative inline-flex h-1.5 w-1.5 rounded-full bg-cobalt" />
                      <p className="text-[14.5px] font-medium text-ink">Consignments</p>
                    </div>
                    <span className="rounded-full border border-white/12 px-3 py-1 text-[12px] text-mute">
                      Live
                    </span>
                  </div>

                  <div className="divide-y divide-white/[0.07]">
                    {rows.map((r) => {
                      const active = r.stageAt === stage
                      return (
                        <motion.div
                          key={r.ref}
                          animate={{
                            backgroundColor: active
                              ? 'rgba(53,196,139,0.07)'
                              : 'rgba(0,0,0,0)',
                          }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="flex items-center justify-between gap-4 px-6 py-5"
                        >
                          <div className="flex items-center gap-4">
                            <motion.span
                              className="h-6 w-[2px] rounded-full"
                              animate={{
                                backgroundColor: active
                                  ? 'rgb(53 196 139)'
                                  : 'rgba(255,255,255,0.12)',
                              }}
                              transition={{ duration: 0.45 }}
                            />
                            <div>
                              <p className="text-[14.5px] font-medium text-ink">{r.ref}</p>
                              <p className="mt-1 text-[13px] text-mute">{r.lane}</p>
                            </div>
                          </div>
                          <motion.span
                            className="rounded-full px-3 py-1 text-[12px]"
                            animate={{
                              backgroundColor: active
                                ? 'rgba(53,196,139,0.14)'
                                : 'rgba(255,255,255,0.04)',
                              color: active ? 'rgb(53 196 139)' : 'rgb(117 131 123)',
                            }}
                            transition={{ duration: 0.45 }}
                          >
                            {r.status}
                          </motion.span>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                    {panels.map((p, i) => {
                      const active = stage === i
                      return (
                        <motion.div
                          key={p.k}
                          animate={{
                            backgroundColor: active
                              ? 'rgba(30,48,41,1)'
                              : 'rgb(27 42 36)',
                          }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="px-6 py-6"
                        >
                          <p className="text-[12.5px] text-mute">{p.k}</p>
                          <motion.p
                            className="mt-2.5 text-[22px] font-semibold tracking-[-0.03em]"
                            animate={{
                              color: active ? 'rgb(53 196 139)' : 'rgb(241 245 242)',
                            }}
                            transition={{ duration: 0.45 }}
                          >
                            {p.v}
                          </motion.p>
                          {p.spark ? (
                            <svg
                              viewBox="0 0 120 26"
                              className="mt-3 h-[26px] w-full"
                              aria-hidden="true"
                              preserveAspectRatio="none"
                            >
                              <motion.path
                                d="M0 18 L14 15 L28 19 L42 12 L56 16 L70 9 L84 13 L98 8 L120 11"
                                fill="none"
                                stroke={active ? '#35c48b' : 'rgba(255,255,255,0.18)'}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: active ? 1 : 0.35 }}
                                transition={{ duration: 1.1, ease: EASE }}
                              />
                            </svg>
                          ) : null}
                          <p className="mt-2 text-[12.5px] leading-relaxed text-mute">
                            {p.note}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
