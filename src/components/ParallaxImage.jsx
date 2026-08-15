import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Photograph that drifts against the scroll and settles as it enters frame.
 * The image is over-sized by `range * 2` so the drift never exposes an edge.
 */
export default function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  range = 40,
  fade = false,
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })

  const y = useTransform(smooth, [0, 1], [range, -range])
  const scale = useTransform(smooth, [0, 0.5, 1], [1.06, 1, 1.06])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
        ref={(node) => {
          // Cached images can finish before React attaches onLoad.
          if (node?.complete) node.setAttribute('data-loaded', 'true')
        }}
        style={reduced ? undefined : { y, scale }}
        className={`img-fade block h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
      {/* Grain + a breath of ink at the edges so photographs sit in the page
          rather than on top of it. */}
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      {fade && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,17,18,0.8),transparent_45%)]"
        />
      )}
    </div>
  )
}
