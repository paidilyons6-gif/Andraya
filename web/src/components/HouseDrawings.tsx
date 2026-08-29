import type { SVGProps } from 'react'
import {
  BranchedTree,
  GroundScape,
  PanelDoor,
  PaperMat,
  PorchColumn,
  WoodSashWindow,
} from './illustrations/HouseParts'

type SvgProps = SVGProps<SVGSVGElement> & { className?: string }

const strokeProps = {
  fill: 'none' as const,
  stroke: '#1c1917',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Craftsman bungalow — default hero house with trees, sash windows, panel door */
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
      <PaperMat />
      <path
        data-draw
        d="M72 118 L200 62 L328 118 L328 138 L72 138 Z"
        {...strokeProps}
        strokeWidth="2.5"
      />
      <path data-draw d="M68 168 L200 148 L332 168" {...strokeProps} strokeWidth="1.8" />
      <rect data-draw x="88" y="138" width="224" height="98" stroke="#1c1917" strokeWidth="2" fill="none" />
      <PorchColumn x={108} y={168} />
      <PorchColumn x={148} y={168} />
      <PorchColumn x={252} y={168} />
      <PorchColumn x={292} y={168} />
      <WoodSashWindow x={108} y={152} w={36} h={32} />
      <WoodSashWindow x={278} y={152} w={36} h={32} />
      <PanelDoor x={178} y={188} w={44} h={48} />
      <rect data-draw x="310" y="130" width="30" height="90" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <path data-draw d="M305 130 L325 110 L345 130" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <BranchedTree x={62} y={236} scale={1.1} />
      <BranchedTree x={338} y={234} scale={0.95} flip />
      <GroundScape y={248} />
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
      <PaperMat />
      <path data-draw d="M72 118 L200 62 L328 118 L328 138 L72 138 Z" fill="#e7e5e4" stroke="#1c1917" strokeWidth="2.5" />
      <path data-draw d="M68 168 L200 148 L332 168" fill="#ebe8e4" stroke="#1c1917" strokeWidth="1.8" />
      <rect data-draw x="88" y="138" width="224" height="98" stroke="#1c1917" strokeWidth="2" fill="#f5f5f4" />
      <PorchColumn x={108} y={168} />
      <PorchColumn x={148} y={168} />
      <PorchColumn x={252} y={168} />
      <PorchColumn x={292} y={168} />
      <WoodSashWindow x={108} y={152} w={36} h={32} />
      <WoodSashWindow x={278} y={152} w={36} h={32} />
      <PanelDoor x={178} y={188} w={44} h={48} />
      <rect data-draw x="310" y="130" width="30" height="90" stroke="#1c1917" strokeWidth="1.5" fill="#d6d3d1" />
      <path data-draw d="M305 130 L325 110 L345 130" fill="#a8a29e" stroke="#1c1917" strokeWidth="1.5" />
      <g opacity="0.15" stroke="#1c1917" strokeWidth="0.6">
        {[...Array(8)].map((_, i) => (
          <line key={`r${i}`} data-draw x1={95 + i * 8} y1="145" x2={85 + i * 8} y2="230" />
        ))}
      </g>
      <BranchedTree x={62} y={236} scale={1.1} />
      <BranchedTree x={338} y={234} scale={0.95} flip />
      <GroundScape y={248} />
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
      <PaperMat />
      <path data-draw d="M72 118 L200 62 L328 118 L328 138 L72 138 Z" fill="#c4704a" stroke="#92400e" strokeWidth="2" opacity="0.85" />
      <path data-draw d="M68 168 L200 148 L332 168" fill="#e7e5e4" stroke="#57534e" strokeWidth="1.8" />
      <rect data-draw x="88" y="138" width="224" height="98" stroke="#57534e" strokeWidth="2" fill="#fef3c7" />
      <rect data-draw x="108" y="168" width="14" height="68" stroke="#57534e" strokeWidth="1.4" fill="#78716c" />
      <rect data-draw x="148" y="168" width="14" height="68" stroke="#57534e" strokeWidth="1.4" fill="#78716c" />
      <rect data-draw x="252" y="168" width="14" height="68" stroke="#57534e" strokeWidth="1.4" fill="#78716c" />
      <rect data-draw x="292" y="168" width="14" height="68" stroke="#57534e" strokeWidth="1.4" fill="#78716c" />
      <rect data-draw x="108" y="152" width="36" height="32" stroke="#57534e" strokeWidth="1.5" fill="#bfdbfe" opacity="0.7" />
      <rect data-draw x="278" y="152" width="36" height="32" stroke="#57534e" strokeWidth="1.5" fill="#bfdbfe" opacity="0.7" />
      <rect data-draw x="178" y="188" width="44" height="48" stroke="#57534e" strokeWidth="2" fill="#92400e" />
      <circle cx="210" cy="214" r="3" fill="#fcd34d" />
      <rect data-draw x="310" y="130" width="30" height="90" stroke="#57534e" strokeWidth="1.5" fill="#a8a29e" />
      <path data-draw d="M305 130 L325 110 L345 130" fill="#78716c" stroke="#57534e" strokeWidth="1.5" />
      <ellipse data-draw cx="62" cy="236" rx="22" ry="12" fill="#86efac" stroke="#15803d" strokeWidth="1" opacity="0.7" />
      <ellipse data-draw cx="338" cy="234" rx="18" ry="10" fill="#86efac" stroke="#15803d" strokeWidth="1" opacity="0.7" />
      <GroundScape y={248} />
      <circle cx="340" cy="100" r="18" fill="#fde047" opacity="0.6" />
    </svg>
  )
}

export function VictorianHouse({ className = '', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true" {...props}>
      <path data-draw d="M30 120 L100 40 L170 120" stroke="#1c1917" strokeWidth="1.8" fill="none" />
      <rect data-draw x="45" y="85" width="110" height="35" stroke="#1c1917" strokeWidth="1.5" fill="none" />
      <WoodSashWindow x={85} y={95} w={30} h={25} />
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
      <PanelDoor x={82} y={98} w={36} h={17} />
      <BranchedTree x={45} y={118} scale={0.55} />
      <BranchedTree x={155} y={118} scale={0.55} flip />
    </svg>
  )
}

export function ModernHouse({ className = '', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true" {...props}>
      <rect data-draw x="40" y="70" width="120" height="45" stroke="#1c1917" strokeWidth="1.8" fill="none" />
      <WoodSashWindow x={55} y={85} w={35} h={30} />
      <WoodSashWindow x={110} y={85} w={35} h={30} />
      <line data-draw x1="40" y1="70" x2="160" y2="70" stroke="#1c1917" strokeWidth="2" />
      <PanelDoor x={85} y={95} w={30} h={20} />
    </svg>
  )
}
