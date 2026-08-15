/**
 * The Proxymedia mark — an automation loop drawn as one continuous stroke that
 * crosses over itself, with a flame dot on the path. The work goes round; the
 * dot is the job moving through it.
 *
 *   <Logo />                     mark + wordmark (nav, footer)
 *   <Logo wordmark={false} />    mark alone
 *   <Logo motion="run" />        dot travels the loop
 *
 * The mark is static wherever it identifies the company. `motion="run"` exists
 * for loading states — a moving logo in the header is a distraction, not a
 * brand.
 */

// One shape, declared once. The trailing `L11 22` closes the path so the
// travelling dot loops seamlessly instead of snapping back to the start.
const LOOP = 'M11 22 A6.5 6.5 0 1 1 11 10 L21 22 A6.5 6.5 0 1 0 21 10'
const LOOP_CLOSED = `${LOOP} L11 22`

function Mark({ size = 26, stroke = 2.8, motion = 'none', className = '' }) {
  const running = motion === 'run' || motion === 'float'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={LOOP}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {running ? (
        <circle r={stroke} fill="var(--color-flame)">
          <animateMotion dur="4s" repeatCount="indefinite" path={LOOP_CLOSED} />
        </circle>
      ) : (
        <circle cx="21" cy="10" r={stroke} fill="var(--color-flame)" />
      )}
    </svg>
  )
}

export default function Logo({
  size = 26,
  stroke = 2.8,
  motion = 'none',
  wordmark = true,
  className = '',
  wordmarkClass = 'text-[18px] font-semibold tracking-[-0.03em] text-ink',
}) {
  const mark = <Mark size={size} stroke={stroke} motion={motion} className="text-cobalt" />

  if (!wordmark) return <span className={className}>{mark}</span>

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      <span className={wordmarkClass}>Proxymedia</span>
    </span>
  )
}
