/**
 * What goes in, what comes out. The only decorative-looking element on the
 * page that is actually load-bearing — it explains the product in one glance.
 *
 * Pulses are SMIL, which CSS cannot pause, so they carry `.motion-only` and are
 * hidden entirely under prefers-reduced-motion. The diagram still reads.
 */
const inputs = [
  { label: 'Email', y: 46 },
  { label: 'WhatsApp', y: 130 },
  { label: 'PDF & sheets', y: 214 },
]

const outputs = [
  { label: 'Export documents', y: 46 },
  { label: 'CRM & ERP', y: 130 },
  { label: 'Live dashboard', y: 214 },
]

const IN_X = 168
const OUT_X = 752
const MID = 130

export default function FlowDiagram() {
  return (
    <svg
      viewBox="0 0 920 260"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram: email, WhatsApp, PDFs and spreadsheets go into the Proxymedia system, which produces export documents, CRM and ERP records, and a live dashboard."
    >
      {/* Paths in */}
      <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1">
        {inputs.map((n, i) => (
          <path
            key={n.label}
            id={`in-${i}`}
            d={`M${IN_X} ${n.y} C 300 ${n.y}, 340 ${MID}, 412 ${MID}`}
          />
        ))}
        {outputs.map((n, i) => (
          <path
            key={n.label}
            id={`out-${i}`}
            d={`M508 ${MID} C 580 ${MID}, 620 ${n.y}, ${OUT_X} ${n.y}`}
          />
        ))}
      </g>

      {/* Travelling pulses — staggered so the flow reads left to right */}
      {inputs.map((n, i) => (
        <circle key={`p-in-${i}`} className="motion-only" r="3" fill="#e8853a">
          <animateMotion dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite">
            <mpath href={`#in-${i}`} />
          </animateMotion>
        </circle>
      ))}
      {outputs.map((n, i) => (
        <circle key={`p-out-${i}`} className="motion-only" r="3" fill="#35c48b">
          <animateMotion dur="3.6s" begin={`${1.8 + i * 0.6}s`} repeatCount="indefinite">
            <mpath href={`#out-${i}`} />
          </animateMotion>
        </circle>
      ))}

      {/* Labels */}
      <g
        fontFamily="Geist, system-ui, sans-serif"
        fontSize="14"
        fill="#a7b5ad"
        textAnchor="end"
      >
        {inputs.map((n) => (
          <text key={n.label} x={IN_X - 16} y={n.y + 5}>
            {n.label}
          </text>
        ))}
      </g>
      <g fill="rgba(255,255,255,0.25)">
        {inputs.map((n) => (
          <circle key={n.label} cx={IN_X} cy={n.y} r="3" />
        ))}
      </g>

      <g
        fontFamily="Geist, system-ui, sans-serif"
        fontSize="14"
        fill="#a7b5ad"
        textAnchor="start"
      >
        {outputs.map((n) => (
          <text key={n.label} x={OUT_X + 16} y={n.y + 5}>
            {n.label}
          </text>
        ))}
      </g>
      <g fill="#35c48b">
        {outputs.map((n) => (
          <circle key={n.label} cx={OUT_X} cy={n.y} r="3" />
        ))}
      </g>

      {/* The system itself */}
      <rect
        x="412"
        y={MID - 34}
        width="96"
        height="68"
        rx="16"
        fill="#1b2a24"
        stroke="rgba(53,196,139,0.5)"
      />
      <text
        x="460"
        y={MID - 4}
        textAnchor="middle"
        fontFamily="Geist, system-ui, sans-serif"
        fontSize="13"
        fontWeight="500"
        fill="#f1f5f2"
      >
        Your
      </text>
      <text
        x="460"
        y={MID + 14}
        textAnchor="middle"
        fontFamily="Geist, system-ui, sans-serif"
        fontSize="13"
        fontWeight="500"
        fill="#f1f5f2"
      >
        system
      </text>
    </svg>
  )
}
