import Button from '../components/Button'
import Headline from '../components/Headline'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import PageHeader from '../components/PageHeader'

const beliefs = [
  {
    title: 'You should own it',
    text: 'Everything we build runs on a server in your name, in a region you choose. You keep the code, the keys and the data. If you ever stop working with us, nothing switches off.',
  },
  {
    title: 'Automate the work that pays',
    text: 'We start with whatever is closest to money — chasing payments, getting shipments out, stopping errors that cost you a claim. Novelty projects can wait.',
  },
  {
    title: 'Agree the numbers first',
    text: 'Before we build anything we write down what the current process costs you. Every month afterwards you get measured against that, so the value is a fact rather than an opinion.',
  },
  {
    title: 'Small enough to answer the phone',
    text: 'You deal directly with the person building your system. No account manager relaying messages, no offshore team you never meet.',
  },
]

const facts = [
  { k: 'Based in', v: 'Dubai, UAE' },
  { k: 'Working across', v: 'UAE, Saudi Arabia and the GCC' },
  { k: 'Languages', v: 'English and Arabic' },
  { k: 'Typical first build', v: '3–5 weeks' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="We are an automation company, not a software reseller."
        accent="software reseller."
        lead="Proxymedia builds the systems that do the repetitive work inside a business, then keeps them running. We work with companies in the UAE and the wider Gulf, and we build so that everything ends up in your hands, not ours."
      />

      <section className="bg-paper-2">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal y={32}>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
                alt="A small team working together around a desk"
                className="h-[340px] rounded-panel md:h-[480px]"
              />
            </Reveal>

            <div>
              <Reveal>
                <div className="rule w-24" />
                <p className="eyebrow mt-5">How we got here</p>
              </Reveal>

              <Headline
                text="Started because the same work kept being done twice."
                accent="done twice."
                className="mt-4 text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink md:text-[42px]"
              />

              <Reveal delay={900}>
                <div className="mt-7 space-y-5 text-[16.5px] leading-[1.68] text-slate">
                  {/* TODO — replace with your own story. Keep it to three short
                      paragraphs: what you saw, what you did about it, what you
                      do now. */}
                  <p>
                    Every business we looked at in the region was running on the
                    same three things: a spreadsheet, a WhatsApp group, and
                    somebody who remembers everything. It works, until that
                    person is on leave or the volume doubles.
                  </p>
                  <p>
                    So we started building the boring machinery instead — the
                    reminder that always goes out, the document that is always
                    correct, the dashboard that is never a week old. Not
                    software to sell, systems to run.
                  </p>
                  <p>
                    Today we do that for exporters, collections teams and
                    logistics businesses across the Gulf, hosted on
                    infrastructure they own.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            eyebrow="How we work"
            title="Four things we will not compromise on."
            accent="compromise on."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 90}
                className="bg-paper p-9 transition-colors duration-500 hover:bg-card"
              >
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {b.title}
                </h3>
                <p className="mt-3.5 text-[15.5px] leading-[1.65] text-slate">{b.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <dl className="mt-16 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.k} className="bg-paper px-7 py-7">
                  <dt className="text-[13px] text-mute">{f.k}</dt>
                  <dd className="mt-2 text-[17px] font-medium text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="on-cobalt bg-cobalt text-cobalt-ink">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-10 md:py-28">
          <Headline
            text="Come and tell us where it hurts."
            accent="where it hurts."
            className="justify-center text-[32px] leading-[1.06] font-semibold tracking-[-0.035em] md:text-[46px]"
          />
          <Reveal delay={500}>
            <div className="mt-9 flex justify-center">
              <Button
                href="/contact"
                variant="ink"
                arrow
                className="!bg-cobalt-ink !text-cobalt hover:!bg-ink-deep"
              >
                Book a 15-min call
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
