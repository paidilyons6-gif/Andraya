import type { ReactNode } from 'react'

export const INK = '#2c2825'
export const INK_LIGHT = '#57534e'
export const PAPER = '#f7f3ed'

export const stroke = {
  fill: 'none' as const,
  stroke: INK,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type FrameProps = {
  children: ReactNode
  className?: string
}

/** Paper mat with subtle border — matches site aesthetic */
export function PaperFrame({ children, className = '' }: FrameProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="400" height="300" fill={PAPER} />
      <rect x="8" y="8" width="384" height="284" fill="#faf8f4" stroke="#e7e2d9" strokeWidth="1" />
      {children}
    </svg>
  )
}

export function GroundLine({ y = 248 }: { y?: number }) {
  return (
    <>
      <path
        d={`M24 ${y} Q120 ${y - 4} 200 ${y} Q280 ${y + 3} 376 ${y}`}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        opacity="0.35"
      />
      <ellipse cx="52" cy={y - 6} rx="22" ry="10" stroke={INK} strokeWidth="0.9" fill="none" opacity="0.45" />
      <ellipse cx="348" cy={y - 5} rx="18" ry="9" stroke={INK} strokeWidth="0.9" fill="none" opacity="0.45" />
    </>
  )
}

export function CrossHatch({
  x,
  y,
  w,
  h,
  opacity = 0.12,
}: {
  x: number
  y: number
  w: number
  h: number
  opacity?: number
}) {
  const lines = []
  for (let i = 0; i < Math.ceil(w / 6); i++) {
    lines.push(
      <line
        key={`h${i}`}
        x1={x + i * 6}
        y1={y}
        x2={x + i * 6 - h}
        y2={y + h}
        stroke={INK}
        strokeWidth="0.5"
        opacity={opacity}
      />,
    )
  }
  return <g>{lines}</g>
}
