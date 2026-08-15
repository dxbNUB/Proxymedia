import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

/* TODO — check these against what you actually commit to before launch. */
const faqs = [
  {
    q: 'How long until something is running?',
    a: 'The audit takes two weeks. A first build is usually live three to five weeks after that, and we scope it so there is something working well before the end.',
  },
  {
    q: 'Where does our data live?',
    a: 'On a server you own, in a region you choose. We deploy with Docker, hand over the keys, and nothing is used to train models.',
  },
  {
    q: 'What if we already have software for this?',
    a: 'Usually the answer is to connect it rather than replace it. Most of what we build sits on top of the CRM, ERP or spreadsheets your team already knows.',
  },
  {
    q: 'What happens if we stop working with you?',
    a: 'You keep the server, the code and the credentials. There is no licence to cancel and nothing stops working because an invoice went unpaid.',
  },
  {
    q: 'Do you work outside agricultural exports?',
    a: 'Yes — collections, trade and logistics are the other two we know well. The agri work is where we go deepest.',
  },
]

function Item({ faq, isOpen, onToggle }) {
  const reduced = useReducedMotion()

  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="text-[17.5px] font-medium tracking-[-0.015em] text-ink">
            {faq.q}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15"
          >
            <span className="absolute h-[1.5px] w-3 rounded bg-cobalt" />
            <span className="absolute h-3 w-[1.5px] rounded bg-cobalt" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[46rem] pr-10 pb-7 text-[15.5px] leading-[1.7] text-slate">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-paper-2">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Questions"
            title="The things people ask on the first call."
            accent="first call."
          />

          <Reveal delay={200} className="border-t border-white/10">
            {faqs.map((faq, i) => (
              <Item
                key={faq.q}
                faq={faq}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
