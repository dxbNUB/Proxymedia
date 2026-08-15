import Headline from './Headline'
import Reveal from './Reveal'

/** Top-of-page banner for the inner pages. Sits under the transparent nav. */
export default function PageHeader({ eyebrow, title, accent, lead }) {
  return (
    <header className="bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 pt-28 pb-20 md:px-10 md:pt-36 md:pb-28">
        <Reveal>
          <div className="rule w-24" />
          <p className="eyebrow mt-5">{eyebrow}</p>
        </Reveal>

        <Headline
          as="h1"
          text={title}
          accent={accent}
          className="mt-5 max-w-4xl text-[38px] leading-[1.04] font-semibold tracking-[-0.035em] text-ink md:text-[62px]"
        />

        {lead ? (
          <Reveal delay={700}>
            <p className="mt-8 max-w-[38rem] text-[18px] leading-[1.62] text-slate">
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>
    </header>
  )
}
