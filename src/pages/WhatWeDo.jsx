import Button from '../components/Button'
import Headline from '../components/Headline'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import PipelineDiagram from '../components/PipelineDiagram'
import Stats from '../sections/Stats'
import Foundations from '../sections/Foundations'
import Process from '../sections/Process'
import Industries from '../sections/Industries'
import Faq from '../sections/Faq'

const signs = [
  'Somebody spends their morning chasing payments on WhatsApp.',
  'The same shipment details get typed into three different places.',
  'Export documents are built by copying last month’s file.',
  'Nobody can answer “where is that consignment?” without ringing someone.',
  'Your reporting is a spreadsheet that is always a week behind.',
  'A person leaving would take half the process with them.',
]

export default function WhatWeDo() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="We build the systems that do your repetitive work."
        accent="repetitive work."
        lead="Four systems cover most of what a trading or exporting business does by hand. We build the ones you need, connect them to the tools you already use, and run them for you."
      />

      <section className="bg-paper-2">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
          <Reveal>
            <div className="rule w-24" />
            <p className="eyebrow mt-5">You probably need this if</p>
          </Reveal>

          <ul className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {signs.map((s, i) => (
              <Reveal
                as="li"
                key={s}
                delay={i * 70}
                className="flex gap-4 border-t border-white/10 pt-5 text-[16.5px] leading-[1.6] text-slate"
              >
                <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-flame" />
                <span>{s}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
          <Reveal>
            <div className="rule w-24" />
            <p className="eyebrow mt-5">How a job moves</p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-5 max-w-3xl text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink md:text-[42px]">
              One order, from the moment it arrives to the moment it is done.
            </h2>
            <p className="mt-6 max-w-[42rem] text-[17px] leading-[1.65] text-slate">
              This is the shape of every system we build. The line runs on its
              own; a person only gets involved when something does not match.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-14 overflow-x-auto">
            <div className="min-w-[720px] rounded-card border border-white/10 bg-paper-2 px-6 py-10 md:min-w-0 md:px-10">
              <PipelineDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />
      <Process />
      <Foundations />
      <Industries />
      <Faq />

      <section className="on-cobalt bg-cobalt text-cobalt-ink">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-10 md:py-28">
          <Headline
            text="Not sure which one you need? That is what the audit is for."
            accent="audit is for."
            className="mx-auto justify-center text-[30px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[44px]"
          />
          <Reveal delay={700}>
            <div className="mt-9 flex justify-center">
              <Button
                href="/contact"
                variant="ink"
                arrow
                className="!bg-cobalt-ink !text-cobalt hover:!bg-ink-deep"
              >
                Book the audit
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
