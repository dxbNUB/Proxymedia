import Headline from './Headline'
import Reveal from './Reveal'

/**
 * Coloured rule, small-caps eyebrow, word-staggered headline.
 * Colours flip automatically inside `.on-ink` / `.on-cobalt` sections.
 */
export default function SectionHeading({ eyebrow, title, accent, lead, className = '' }) {
  const leadDelay = 150 + title.split(' ').length * 80

  return (
    <div className={className}>
      <Reveal>
        <div className="rule" />
        <p className="eyebrow mt-5">{eyebrow}</p>
      </Reveal>

      <Headline
        text={title}
        accent={accent}
        className="mt-4 max-w-3xl text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px]"
      />

      {lead && (
        <Reveal delay={leadDelay}>
          <p className="mt-6 max-w-[38rem] text-[17px] leading-[1.65] text-slate">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
