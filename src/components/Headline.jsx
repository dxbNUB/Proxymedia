import { useEffect, useRef, useState } from 'react'

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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      data-shown={shown ? 'true' : undefined}
      className={`headline flex flex-wrap gap-x-[0.26em] gap-y-1 ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="headline-word inline-block"
          style={{ '--reveal-delay': `${delay + i * 80}ms` }}
        >
          {accentFrom >= 0 && i >= accentFrom ? (
            <em className="accent">{word}</em>
          ) : (
            word
          )}
        </span>
      ))}
    </Tag>
  )
}
