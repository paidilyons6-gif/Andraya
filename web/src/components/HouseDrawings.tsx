import type { SVGProps } from 'react'

type SvgProps = SVGProps<SVGSVGElement> & { className?: string }

const strokeProps = {
  fill: 'none' as const,
  stroke: '#1c1917',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function HouseLineDrawing({ className = '', ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="20" y="20" width="360" height="280" rx="2" fill="#faf9f7" stroke="#e7e5e4" strokeWidth="1" />
      <path
        data-draw
        d="M60 220 L200 80 L340 220"
        {...strokeProps}
        strokeWidth="2.5"
      />
      <rect data-draw x="90" y="160" width="220" height="60" stroke="#1c1917" strokeWidth="2" fill="none" />
      <rect data-draw x="120" y="185" width="40" height="35" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <rect data-draw x="240" y="185" width="40" height="35" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <line data-draw x1="140" y1="185" x2="140" y2="220" stroke="#1c1917" strokeWidth="1" />
      <line data-draw x1="160" y1="185" x2="160" y2="220" stroke="#1c1917" strokeWidth="1" />
      <line data-draw x1="260" y1="185" x2="260" y2="220" stroke="#1c1917" strokeWidth="1" />
      <line data-draw x1="280" y1="185" x2="280" y2="220" stroke="#1c1917" strokeWidth="1" />
      <rect data-draw x="175" y="175" width="50" height="45" stroke="#1c1917" strokeWidth="2" fill="none" />
      <path data-draw d="M175 195 L200 175 L225 195" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <circle cx="210" cy="200" r="3" fill="#1c1917" />
      <rect data-draw x="310" y="130" width="30" height="90" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <path data-draw d="M305 130 L325 110 L345 130" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <path data-draw d="M50 240 Q120 235 200 240 Q280 245 350 240" stroke="#1c1917" strokeWidth="1" opacity="0.4" />
      <ellipse data-draw cx="80" cy="230" rx="25" ry="15" stroke="#1c1917" strokeWidth="1" fill="none" opacity="0.5" />
      <ellipse data-draw cx="320" cy="228" rx="20" ry="12" stroke="#1c1917" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  )
}

export function HouseShadedDrawing({ className = '', ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="20" y="20" width="360" height="280" rx="2" fill="#faf9f7" stroke="#e7e5e4" strokeWidth="1" />
      <path data-draw d="M60 220 L200 80 L340 220" fill="#e7e5e4" stroke="#1c1917" strokeWidth="2.5" />
      <rect data-draw x="90" y="160" width="220" height="60" stroke="#1c1917" strokeWidth="2" fill="#f5f5f4" />
      <rect data-draw x="120" y="185" width="40" height="35" stroke="#1c1917" strokeWidth="1.5" fill="white" />
      <rect data-draw x="240" y="185" width="40" height="35" stroke="#1c1917" strokeWidth="1.5" fill="white" />
      <line data-draw x1="140" y1="185" x2="140" y2="220" stroke="#1c1917" strokeWidth="0.8" />
      <line data-draw x1="160" y1="185" x2="160" y2="220" stroke="#1c1917" strokeWidth="0.8" />
      <line data-draw x1="260" y1="185" x2="260" y2="220" stroke="#1c1917" strokeWidth="0.8" />
      <line data-draw x1="280" y1="185" x2="280" y2="220" stroke="#1c1917" strokeWidth="0.8" />
      <rect data-draw x="175" y="175" width="50" height="45" stroke="#1c1917" strokeWidth="2" fill="#d6d3d1" />
      <path data-draw d="M175 195 L200 175 L225 195" stroke="#1c1917" strokeWidth="1.5" fill="#a8a29e" />
      <circle cx="210" cy="200" r="3" fill="#1c1917" />
      <rect data-draw x="310" y="130" width="30" height="90" stroke="#1c1917" strokeWidth="1.5" fill="#d6d3d1" />
      <path data-draw d="M305 130 L325 110 L345 130" stroke="#1c1917" strokeWidth="1.5" fill="#a8a29e" />
      <g opacity="0.15" stroke="#1c1917" strokeWidth="0.6">
        {[...Array(8)].map((_, i) => (
          <line key={`r${i}`} data-draw x1={95 + i * 8} y1="165" x2={85 + i * 8} y2="215" />
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={`l${i}`} data-draw x1={130 + i * 6} y1="190" x2={125 + i * 6} y2="218" />
        ))}
      </g>
      <path data-draw d="M50 240 Q120 235 200 240 Q280 245 350 240" stroke="#1c1917" strokeWidth="1" opacity="0.4" />
      <ellipse data-draw cx="80" cy="230" rx="25" ry="15" fill="#d6d3d1" stroke="#1c1917" strokeWidth="1" opacity="0.6" />
      <ellipse data-draw cx="320" cy="228" rx="20" ry="12" fill="#d6d3d1" stroke="#1c1917" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

export function HouseColorDrawing({ className = '', ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="20" y="20" width="360" height="280" rx="2" fill="#faf9f7" stroke="#e7e5e4" strokeWidth="1" />
      <path data-draw d="M60 220 L200 80 L340 220" fill="#c4704a" stroke="#92400e" strokeWidth="2" opacity="0.85" />
      <rect data-draw x="90" y="160" width="220" height="60" stroke="#57534e" strokeWidth="2" fill="#fef3c7" />
      <rect data-draw x="120" y="185" width="40" height="35" stroke="#57534e" strokeWidth="1.5" fill="#bfdbfe" opacity="0.7" />
      <rect data-draw x="240" y="185" width="40" height="35" stroke="#57534e" strokeWidth="1.5" fill="#bfdbfe" opacity="0.7" />
      <line data-draw x1="140" y1="185" x2="140" y2="220" stroke="#57534e" strokeWidth="0.8" />
      <line data-draw x1="160" y1="185" x2="160" y2="220" stroke="#57534e" strokeWidth="0.8" />
      <line data-draw x1="260" y1="185" x2="260" y2="220" stroke="#57534e" strokeWidth="0.8" />
      <line data-draw x1="280" y1="185" x2="280" y2="220" stroke="#57534e" strokeWidth="0.8" />
      <rect data-draw x="175" y="175" width="50" height="45" stroke="#57534e" strokeWidth="2" fill="#78716c" />
      <path data-draw d="M175 195 L200 175 L225 195" stroke="#57534e" strokeWidth="1.5" fill="#44403c" />
      <circle cx="210" cy="200" r="3" fill="#fcd34d" />
      <rect data-draw x="310" y="130" width="30" height="90" stroke="#57534e" strokeWidth="1.5" fill="#a8a29e" />
      <path data-draw d="M305 130 L325 110 L345 130" stroke="#57534e" strokeWidth="1.5" fill="#78716c" />
      <path data-draw d="M50 240 Q120 235 200 240 Q280 245 350 240" stroke="#65a30d" strokeWidth="2" opacity="0.5" />
      <ellipse data-draw cx="80" cy="230" rx="25" ry="15" fill="#86efac" stroke="#15803d" strokeWidth="1" opacity="0.7" />
      <ellipse data-draw cx="320" cy="228" rx="20" ry="12" fill="#86efac" stroke="#15803d" strokeWidth="1" opacity="0.7" />
      <circle cx="340" cy="100" r="18" fill="#fde047" opacity="0.6" />
    </svg>
  )
}

export function VictorianHouse({ className = '', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true" {...props}>
      <path data-draw d="M30 120 L100 40 L170 120" stroke="#1c1917" strokeWidth="1.8" fill="none" />
      <rect data-draw x="45" y="85" width="110" height="35" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <rect data-draw x="85" y="95" width="30" height="25" stroke="#1c1917" strokeWidth="1.2" fill="none" />
      <rect data-draw x="55" y="95" width="18" height="18" stroke="#1c1917" strokeWidth="0.8" fill="none" />
      <rect data-draw x="127" y="95" width="18" height="18" stroke="#1c1917" strokeWidth="0.8" fill="none" />
      <rect data-draw x="150" y="60" width="15" height="60" stroke="#1c1917" strokeWidth="1" fill="none" />
      <path data-draw d="M147 60 L157 48 L167 60" stroke="#1c1917" strokeWidth="1" fill="none" />
    </svg>
  )
}

export function CottageHouse({ className = '', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true" {...props}>
      <path data-draw d="M40 115 L100 55 L160 115" stroke="#1c1917" strokeWidth="1.8" fill="none" />
      <rect data-draw x="55" y="90" width="90" height="25" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <rect data-draw x="82" y="98" width="36" height="17" stroke="#1c1917" strokeWidth="1.2" fill="none" />
      <path data-draw d="M82 107 Q100 100 118 107" stroke="#1c1917" strokeWidth="0.8" fill="none" />
      <ellipse data-draw cx="45" cy="118" rx="12" ry="8" stroke="#1c1917" strokeWidth="0.8" fill="none" />
      <ellipse data-draw cx="155" cy="118" rx="12" ry="8" stroke="#1c1917" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

export function ModernHouse({ className = '', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true" {...props}>
      <rect data-draw x="40" y="70" width="120" height="45" stroke="#1c1917" strokeWidth="1.8" fill="none" />
      <rect data-draw x="55" y="85" width="35" height="30" stroke="#1c1917" strokeWidth="1.2" fill="none" />
      <rect data-draw x="110" y="85" width="35" height="30" stroke="#1c1917" strokeWidth="1.2" fill="none" />
      <line data-draw x1="40" y1="70" x2="160" y2="70" stroke="#1c1917" strokeWidth="2" />
      <rect data-draw x="85" y="95" width="30" height="20" stroke="#1c1917" strokeWidth="1.5" fill="#e7e5e4" />
    </svg>
  )
}
