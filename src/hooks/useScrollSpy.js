import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently occupying the upper part of the
 * viewport, or '' when none is. Used by the nav to light the matching link.
 */
export default function useScrollSpy(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!nodes.length) return

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }

        // Whichever tracked section is showing the most wins.
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setActive(best)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.05, 0.25, 0.5, 0.75] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [ids.join('|')])

  return active
}
