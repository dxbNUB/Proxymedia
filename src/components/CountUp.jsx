import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Counts a figure up when it scrolls into view.
 *
 * `value` is the finished string — '3–5', '$1,500', '42%', '— days'. Only the
 * first run of digits is animated and everything around it is preserved, so
 * currency, ranges, units and the not-yet-filled placeholders all pass through
 * untouched.
 *
 * The final value is what renders on the server, so prerendered HTML and search
 * engines always see the real number. The count only starts after hydration.
 */
export default function CountUp({ value, duration = 1100, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return

    const match = String(value).match(/\d[\d,]*/)
    if (!match) return

    const target = Number(match[0].replace(/,/g, ''))
    if (!Number.isFinite(target) || target === 0) return

    const grouped = match[0].includes(',')
    const render = (n) => {
      const text = grouped ? n.toLocaleString('en-US') : String(n)
      return String(value).replace(match[0], text)
    }

    let raf = 0
    let started = false

    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        setDisplay(render(Math.round(target * EASE_OUT(t))))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          setDisplay(render(0))
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
