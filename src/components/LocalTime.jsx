import { useEffect, useState } from 'react'

/**
 * Real dynamic content: the actual time where we are, and whether that means
 * a reply today. Ticks once a minute — a counter that changes every 50ms is
 * motion pretending to be information.
 *
 * Renders nothing until mounted, so the prerendered HTML and the hydrated
 * output never disagree.
 */
const TZ = 'Asia/Dubai'

function dubaiNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hour12: false,
  }).formatToParts(new Date())

  const get = (type) => parts.find((p) => p.type === type)?.value ?? ''
  const hour = Number(get('hour'))
  const weekday = get('weekday')

  // Gulf working week: Monday to Friday, 9–18.
  const weekend = weekday === 'Sat' || weekday === 'Sun'
  const open = !weekend && hour >= 9 && hour < 18

  return { label: `${get('hour')}:${get('minute')}`, open }
}

export default function LocalTime({ className = '' }) {
  const [now, setNow] = useState(null)

  useEffect(() => {
    setNow(dubaiNow())
    const id = setInterval(() => setNow(dubaiNow()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!now) return null

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
          now.open ? 'ping bg-cobalt' : 'bg-current opacity-40'
        }`}
      />
      <span>
        {now.label} in Dubai —{' '}
        {now.open ? 'we’re at our desks' : 'we’ll reply next working day'}
      </span>
    </span>
  )
}
