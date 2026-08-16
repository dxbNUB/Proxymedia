import { Fragment, useEffect, useRef, useState } from 'react'

/**
 * Word-by-word fade-up headline. `text` is the plain headline; any trailing
 * words listed in `accent` are dropped a weight and set in colour.
 *
 *   <Headline as="h1" text="We automate the admin behind every shipment." accent="every shipment." />
 *
 * Same reasoning as Reveal: the words are visible in the prerendered HTML and
 * only start hidden once `.js` is on <html>, so a headline is never a blank
 * space while the bundle downloads.
 */
export default function Headline({
  as: Tag = 'h2',
  text,
  accent = '',
  delay = 150,
  className = '',
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  const words = text.split(' ')
  const accentWords = accent ? accent.split(' ') : []
  const accentFrom = accentWords.length ? words.length - accentWords.length : -1

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      // See Reveal.jsx: a fractional threshold strands anything taller than
      // the viewport at opacity 0. A big hero headline on a short screen is
      // exactly that case.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      data-shown={shown ? 'true' : undefined}
      className={`headline ${className}`}
    >
      {/* Real spaces between the words, not a flexbox gap. With `display:flex`
          the whitespace between items is discarded, so textContent came out as
          "Weautomateyourbusiness." — which is what a crawler, a reader mode, a
          translation tool, or anyone copying the headline actually gets. The
          words are inline-block so they can still be transformed individually;
          normal inline layout wraps them and puts the spaces back. */}
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="headline-word inline-block"
            style={{ '--reveal-delay': `${delay + i * 80}ms` }}
          >
            {accentFrom >= 0 && i >= accentFrom ? (
              <em className="accent">{word}</em>
            ) : (
              word
            )}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
