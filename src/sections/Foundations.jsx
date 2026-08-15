import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

/* The "are you just wrapping ChatGPT?" objection, answered in one screen. */
const foundations = [
  {
    title: 'Versioned infrastructure',
    text: 'Every deploy is code in a repo. Nothing lives only on someone’s laptop.',
  },
  {
    title: 'Least-privilege access',
    text: 'Each workflow gets the narrowest credentials that let it do its job.',
  },
  {
    title: 'Encrypted secrets',
    text: 'Keys and tokens are stored encrypted, never in a spreadsheet or a prompt.',
  },
  {
    title: 'Human in the loop',
    text: 'Anything uncertain goes to a review queue instead of silently through.',
  },
  {
    title: 'Monitoring & alerts',
    text: 'If a workflow stalls, we hear about it before you do.',
  },
  {
    title: 'Your data stays yours',
    text: 'Nothing is used to train models, and you keep the server and the keys.',
  },
]

export default function Foundations() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="How we build it"
          title="We build systems that keep running after we hand them over."
          accent="hand them over."
        />

        <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {foundations.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 70}
              className="border-t border-white/10 pt-6"
            >
              <div className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mt-[3px] shrink-0"
                >
                  <path
                    d="M2.5 8.5 L6.2 12 L13.5 4.5"
                    stroke="var(--color-cobalt)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h3 className="text-[16.5px] font-semibold tracking-[-0.015em] text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.65] text-slate">
                    {f.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
