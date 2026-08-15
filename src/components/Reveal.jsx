import { useEffect, useRef, useState } from 'react'

/**
 * Fade-up on enter, once.
 *
 * Deliberately CSS-driven rather than Framer-driven. A motion component
 * renders `opacity: 0` into the prerendered HTML, which leaves the page blank
 * until hydration finishes — the worst possible first impression on a slow
 * connection. Here the element is visible by default and only hidden once the
 * inline script in index.html has added `.js` to <html>, which runs before
 * first paint. No flash, no blank page, and ~90 fewer animated components.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y = 24,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      data-shown={shown ? 'true' : undefined}
      style={{ '--reveal-delay': `${delay}ms`, '--reveal-y': `${y}px` }}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
