import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const items = [
  {
    title: 'UAE PDPL',
    text: 'Consent, purpose limitation and data-subject rights designed into each workflow.',
  },
  {
    title: 'Saudi PDPL',
    text: 'Hosting region settled before anything is built, so sensitive data stays in-Kingdom.',
  },
  {
    title: 'Self-hosted',
    text: 'Your workflows run on a server you control, and you keep the keys.',
  },
]

export default function Compliance() {
  return (
    <section id="compliance" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="Compliance"
          title="Built for the region's data rules, not retrofitted."
          accent="not retrofitted."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 100}
              className="card rounded-card p-9"
            >
              <span
                aria-hidden="true"
                className="block h-[3px] w-9 rounded-full bg-flame"
              />
              <h3 className="mt-7 text-[20px] font-semibold tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-slate">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
