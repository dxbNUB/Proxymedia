import { useEffect, useRef, useState } from 'react'

/**
 * What happens to one piece of work, end to end. The home page diagram shows
 * inputs and outputs; this one shows the middle — including the branch to a
 * person when something does not match, which is the part clients ask about.
 *
 * Paths draw themselves in when the diagram enters view, then a job travels
 * the line. Everything is CSS and SMIL, so it costs no JavaScript per frame.
 */
const stages = [
  { x: 96, label: 'Arrives', sub: 'Email · WhatsApp · PDF' },
  { x: 316, label: 'Read', sub: 'Details pulled out' },
  { x: 536, label: 'Checked', sub: 'Against your rules' },
  { x: 756, label: 'Actioned', sub: 'Written & sent' },
]

const Y = 92

export default function PipelineDiagram() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return
    if (typeof IntersectionObserver === 'undefined') return setShown(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      // Not a fraction — on a narrow screen this diagram stacks taller than
      // the viewport, and an unfired observer leaves the pipes undrawn and the
      // nodes at opacity 0, i.e. an empty box.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <div ref={ref} data-shown={shown ? 'true' : undefined} className="diagram">
      <svg
        viewBox="0 0 900 260"
        className="h-auto w-full"
        role="img"
        aria-label="Diagram: work arrives by email, WhatsApp or PDF; it is read, the details are pulled out, it is checked against your rules, then written and sent. Anything that does not match is sent to a person to approve before it continues."
      >
        {/* Main line, drawn in segment by segment */}
        <g fill="none" stroke="var(--color-cobalt)" strokeWidth="1.5" strokeLinecap="round">
          {stages.slice(0, -1).map((s, i) => (
            <line
              key={s.label}
              className="pipe"
              style={{ '--i': i }}
              x1={s.x + 52}
              y1={Y}
              x2={stages[i + 1].x - 52}
              y2={Y}
            />
          ))}
        </g>

        {/* Exception branch — amber, dashed, because it is the path that
            involves a person */}
        <path
          className="pipe pipe-branch"
          style={{ '--i': 3 }}
          d={`M${stages[2].x} ${Y + 34} C ${stages[2].x} ${Y + 90}, ${stages[2].x + 60} ${Y + 96}, ${stages[2].x + 128} ${Y + 96}`}
          fill="none"
          stroke="var(--color-flame)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />

        {/* The job travelling the line */}
        <g className="motion-only">
          <circle r="4.5" fill="var(--color-cobalt)" opacity="0.9">
            <animateMotion
              dur="5s"
              begin="1.4s"
              repeatCount="indefinite"
              path={`M${stages[0].x} ${Y} L${stages[3].x} ${Y}`}
            />
          </circle>
          <circle r="10" fill="var(--color-cobalt)" opacity="0.18">
            <animateMotion
              dur="5s"
              begin="1.4s"
              repeatCount="indefinite"
              path={`M${stages[0].x} ${Y} L${stages[3].x} ${Y}`}
            />
          </circle>
        </g>

        {/* Stage nodes */}
        {stages.map((s, i) => (
          <g key={s.label} className="node" style={{ '--i': i }}>
            <rect
              x={s.x - 52}
              y={Y - 34}
              width="104"
              height="68"
              rx="16"
              fill="var(--color-card)"
              stroke="var(--color-rule)"
            />
            <text
              x={s.x}
              y={Y - 4}
              textAnchor="middle"
              fontFamily="Geist, system-ui, sans-serif"
              fontSize="15"
              fontWeight="500"
              fill="var(--color-ink)"
            >
              {s.label}
            </text>
            <text
              x={s.x}
              y={Y + 58}
              textAnchor="middle"
              fontFamily="Geist, system-ui, sans-serif"
              fontSize="12.5"
              fill="var(--color-mute)"
            >
              {s.sub}
            </text>
          </g>
        ))}

        {/* Human review */}
        <g className="node" style={{ '--i': 4 }}>
          <rect
            x={stages[2].x + 128}
            y={Y + 68}
            width="150"
            height="56"
            rx="14"
            fill="none"
            stroke="var(--color-flame)"
            strokeOpacity="0.45"
            strokeDasharray="5 6"
          />
          <text
            x={stages[2].x + 203}
            y={Y + 94}
            textAnchor="middle"
            fontFamily="Geist, system-ui, sans-serif"
            fontSize="13.5"
            fontWeight="500"
            fill="var(--color-flame)"
          >
            A person checks
          </text>
          <text
            x={stages[2].x + 203}
            y={Y + 112}
            textAnchor="middle"
            fontFamily="Geist, system-ui, sans-serif"
            fontSize="11.5"
            fill="var(--color-mute)"
          >
            only when something looks wrong
          </text>
        </g>
      </svg>
    </div>
  )
}
