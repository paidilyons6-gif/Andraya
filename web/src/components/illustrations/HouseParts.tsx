const INK = '#1c1917'

/** Mature branched tree — many small strokes for DrawSVG scrub */
export function BranchedTree({
  x = 0,
  y = 0,
  scale = 1,
  flip = false,
}: {
  x?: number
  y?: number
  scale?: number
  flip?: boolean
}) {
  const sx = flip ? -scale : scale
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale})`}>
      <path data-draw d="M0 0 L0 -35" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -12 L-18 -28" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -12 L14 -24" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -22 L-12 -38" stroke={INK} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -22 L10 -36" stroke={INK} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -30 L-8 -42" stroke={INK} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -30 L8 -40" stroke={INK} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -35 L-6 -48" stroke={INK} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path data-draw d="M0 -35 L5 -46" stroke={INK} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <ellipse data-draw cx="0" cy="4" rx="14" ry="8" stroke={INK} strokeWidth="1" fill="none" opacity="0.5" />
    </g>
  )
}

/** Wood-sash window with mullions */
export function WoodSashWindow({
  x,
  y,
  w = 40,
  h = 35,
}: {
  x: number
  y: number
  w?: number
  h?: number
}) {
  return (
    <g>
      <rect data-draw x={x} y={y} width={w} height={h} stroke={INK} strokeWidth="1.5" fill="none" />
      <line data-draw x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={INK} strokeWidth="0.9" />
      <line data-draw x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={INK} strokeWidth="0.9" />
      <line data-draw x1={x + 4} y1={y + 4} x2={x + w - 4} y2={y + 4} stroke={INK} strokeWidth="0.5" opacity="0.4" />
      <line data-draw x1={x + 4} y1={y + h - 4} x2={x + w - 4} y2={y + h - 4} stroke={INK} strokeWidth="0.5" opacity="0.4" />
    </g>
  )
}

/** Panel front door with inset panels */
export function PanelDoor({
  x,
  y,
  w = 50,
  h = 45,
}: {
  x: number
  y: number
  w?: number
  h?: number
}) {
  return (
    <g>
      <rect data-draw x={x} y={y} width={w} height={h} stroke={INK} strokeWidth="2" fill="none" />
      <rect data-draw x={x + 8} y={y + 8} width={w - 16} height={h * 0.35} stroke={INK} strokeWidth="1" fill="none" />
      <rect data-draw x={x + 8} y={y + h * 0.52} width={w - 16} height={h * 0.35} stroke={INK} strokeWidth="1" fill="none" />
      <line data-draw x1={x + w * 0.75} y1={y + h * 0.55} x2={x + w * 0.75} y2={y + h * 0.65} stroke={INK} strokeWidth="1.2" />
      <circle cx={x + w * 0.78} cy={y + h * 0.6} r="2" fill={INK} />
    </g>
  )
}

/** Craftsman tapered porch column */
export function PorchColumn({ x, y, h = 68 }: { x: number; y: number; h?: number }) {
  return (
    <path
      data-draw
      d={`M${x + 4} ${y} L${x} ${y + h} L${x + 14} ${y + h} L${x + 10} ${y} Z`}
      stroke={INK}
      strokeWidth="1.4"
      fill="none"
      strokeLinejoin="round"
    />
  )
}

/** Ground line with subtle texture */
export function GroundScape({ y = 240 }: { y?: number }) {
  return (
    <g>
      <path
        data-draw
        d={`M24 ${y} Q120 ${y - 4} 200 ${y} Q280 ${y + 3} 376 ${y}`}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      <path data-draw d={`M50 ${y - 2} Q70 ${y - 8} 90 ${y - 2}`} stroke={INK} strokeWidth="0.6" fill="none" opacity="0.3" />
      <path data-draw d={`M300 ${y} Q320 ${y - 6} 340 ${y}`} stroke={INK} strokeWidth="0.6" fill="none" opacity="0.3" />
    </g>
  )
}

export function PaperMat() {
  return (
    <rect x="20" y="20" width="360" height="280" rx="2" fill="#faf9f7" stroke="#e7e5e4" strokeWidth="1" />
  )
}
