import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const base =
  'group inline-flex items-center gap-2 rounded-full text-[15px] font-medium transition-colors duration-300'

const variants = {
  cobalt: 'bg-cobalt text-cobalt-ink hover:bg-cobalt-2',
  flame: 'bg-flame text-white hover:bg-flame-2',
  ink: 'bg-ink text-paper hover:bg-white',
  paper: 'bg-paper text-ink hover:bg-white',
  outline:
    'border border-white/20 text-ink hover:border-cobalt hover:text-cobalt',
  quiet:
    'text-slate underline decoration-white/25 underline-offset-[5px] hover:text-cobalt hover:decoration-cobalt',
}

const sizes = {
  md: 'px-7 py-3.5',
  sm: 'px-5 py-2.5 text-[14px]',
}

/** Pill button that gives a little under the cursor and settles on release. */
export default function Button({
  href = '/contact',
  variant = 'cobalt',
  size = 'md',
  arrow = false,
  className = '',
  children,
}) {
  const reduced = useReducedMotion()
  const padding = variant === 'quiet' ? '' : sizes[size]

  // Internal route → <Link> so navigation stays client-side.
  const internal = href.startsWith('/') && !href.startsWith('//')
  const Tag = internal ? MotionLink : motion.a
  const target = internal ? { to: href } : { href }

  return (
    <Tag
      {...target}
      className={`${base} ${variants[variant]} ${padding} ${className}`}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      {children}
      {arrow && (
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[2px] motion-reduce:transform-none"
        >
          <path
            d="M3.5 10.5 L10.5 3.5 M5 3.5 h5.5 V9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Tag>
  )
}
