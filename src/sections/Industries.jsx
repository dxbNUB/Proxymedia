import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'

const industries = [
  {
    name: 'Agricultural exports',
    help: 'Export documents, cold-chain alerts, consignment tracking.',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80',
    alt: 'Crates of fresh produce ready for packing',
  },
  {
    name: 'Collections & receivables',
    help: 'Reminder sequences, promise-to-pay tracking, agent dashboards.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80',
    alt: 'Ledger and calculator on a desk',
  },
  {
    name: 'Trade & logistics',
    help: 'Shipment status updates, customs paperwork, supplier chasing.',
    image:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=80',
    alt: 'Containers stacked at a port terminal',
  },
]

export default function Industries() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <Reveal>
          <div className="rule" />
          <p className="eyebrow mt-5">Who we work with</p>
          <p className="mt-4 max-w-[34rem] text-[17px] leading-[1.6] text-slate">
            Three industries we know well enough to be useful in week one.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 100}>
              <ParallaxImage
                src={ind.image}
                alt={ind.alt}
                className="h-[260px] rounded-card"
                range={26}
              />
              <h3 className="mt-6 text-[17.5px] font-medium text-ink">
                {ind.name}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">{ind.help}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
