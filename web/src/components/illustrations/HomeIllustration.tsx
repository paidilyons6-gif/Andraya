import type { ComponentType } from 'react'
import type { PortraitStyle } from '../../data/portraits'
import type { ArchitectureType } from '../../data/portraits'
import { CrossHatch, GroundLine, INK, INK_LIGHT, PaperFrame, stroke } from './shared'

type Props = {
  architecture: ArchitectureType
  variant: Exclude<PortraitStyle, 'photo'>
  className?: string
}

type Variant = Exclude<PortraitStyle, 'photo'>

function windowPane(x: number, y: number, w: number, h: number, variant: Variant) {
  const fill =
    variant === 'line' ? 'none' : variant === 'shaded' ? '#e7e2d9' : 'rgba(191, 219, 254, 0.55)'
  const strokeW = variant === 'line' ? 1.4 : 1.2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} {...stroke} strokeWidth={strokeW} fill={fill} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={INK} strokeWidth="0.8" />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={INK} strokeWidth="0.8" />
    </g>
  )
}

function roofFill(variant: Variant, color: string, shaded: string) {
  if (variant === 'line') return 'none'
  if (variant === 'shaded') return shaded
  return color
}

function wallFill(variant: Variant, color: string, shaded: string) {
  if (variant === 'line') return 'none'
  if (variant === 'shaded') return shaded
  return color
}

function CraftsmanDrawing({ variant }: { variant: Variant }) {
  const roof = roofFill(variant, '#b45309', '#d6d3d1')
  const wall = wallFill(variant, '#fef3c7', '#f5f5f4')
  const porch = wallFill(variant, '#e7e5e4', '#ebe8e4')

  return (
    <>
      {/* Roof */}
      <path
        d="M72 118 L200 62 L328 118 L328 138 L72 138 Z"
        stroke={INK}
        strokeWidth="2.2"
        fill={roof}
        strokeLinejoin="round"
      />
      {variant === 'shaded' && <CrossHatch x={130} y={78} w={140} h={50} />}
      {/* Body */}
      <rect x="88" y="138" width="224" height="98" stroke={INK} strokeWidth="2" fill={wall} />
      {/* Porch roof */}
      <path d="M68 168 L200 148 L332 168" stroke={INK} strokeWidth="1.8" fill={porch} />
      {/* Columns */}
      {[108, 148, 252, 292].map((x) => (
        <rect
          key={x}
          x={x}
          y="168"
          width="14"
          height="68"
          stroke={INK}
          strokeWidth="1.4"
          fill={variant === 'color' ? '#78716c' : variant === 'shaded' ? '#d6d3d1' : 'none'}
        />
      ))}
      {windowPane(108, 152, 36, 32, variant)}
      {windowPane(278, 152, 36, 32, variant)}
      {/* Door */}
      <rect
        x="178"
        y="188"
        width="44"
        height="48"
        stroke={INK}
        strokeWidth="1.6"
        fill={variant === 'color' ? '#92400e' : variant === 'shaded' ? '#a8a29e' : 'none'}
      />
      <circle cx="214" cy="214" r="2.5" fill={INK} />
      {/* Foundation */}
      <rect x="88" y="232" width="224" height="12" stroke={INK} strokeWidth="1" fill={variant === 'color' ? '#78716c' : '#d6d3d1'} opacity={variant === 'line' ? 0.5 : 1} />
      <GroundLine />
    </>
  )
}

function VictorianDrawing({ variant }: { variant: Variant }) {
  const roof = roofFill(variant, '#7c2d12', '#c4b5a8')
  const wall = wallFill(variant, '#fce7f3', '#f5f5f4')
  const trim = variant === 'line' ? 'none' : variant === 'shaded' ? '#d6d3d1' : '#fbcfe8'

  return (
    <>
      {/* Main roof */}
      <path d="M80 128 L200 58 L320 128 L320 148 L80 148 Z" stroke={INK} strokeWidth="2.2" fill={roof} />
      {/* Turret */}
      <rect x="268" y="88" width="52" height="112" stroke={INK} strokeWidth="1.6" fill={wall} />
      <path d="M262 88 L294 52 L326 88" stroke={INK} strokeWidth="1.8" fill={variant === 'color' ? '#9f1239' : roof} />
      {/* Body */}
      <rect x="96" y="148" width="208" height="88" stroke={INK} strokeWidth="2" fill={wall} />
      {/* Bay window */}
      <path d="M148 148 L148 236 L188 236 L188 148 L168 132 Z" stroke={INK} strokeWidth="1.4" fill={trim} />
      {windowPane(152, 162, 28, 26, variant)}
      {windowPane(152, 198, 28, 26, variant)}
      {windowPane(108, 158, 28, 28, variant)}
      {windowPane(248, 158, 28, 28, variant)}
      {/* Ornate trim */}
      <path d="M96 148 L304 148" stroke={INK} strokeWidth="1.2" />
      <path d="M168 236 L232 236" stroke={INK} strokeWidth="2" fill={variant === 'color' ? '#44403c' : 'none'} />
      {/* Door */}
      <rect x="196" y="196" width="36" height="40" stroke={INK} strokeWidth="1.4" fill={variant === 'color' ? '#57534e' : 'none'} />
      <path d="M196 196 L214 182 L232 196" stroke={INK} strokeWidth="1.2" fill={variant === 'color' ? '#44403c' : 'none'} />
      <GroundLine />
    </>
  )
}

function CottageDrawing({ variant }: { variant: Variant }) {
  const roof = roofFill(variant, '#854d0e', '#c4b5a8')
  const wall = wallFill(variant, '#fffbeb', '#f5f5f4')

  return (
    <>
      {/* Thatched roof curve */}
      <path
        d="M88 142 Q200 48 312 142 L312 158 L88 158 Z"
        stroke={INK}
        strokeWidth="2"
        fill={roof}
      />
      {variant !== 'line' && (
        <path d="M100 150 Q200 70 300 150" stroke={INK} strokeWidth="0.6" fill="none" opacity="0.25" />
      )}
      <rect x="112" y="158" width="176" height="78" stroke={INK} strokeWidth="1.8" fill={wall} />
      {/* Chimney */}
      <rect x="268" y="98" width="22" height="62" stroke={INK} strokeWidth="1.2" fill={variant === 'color' ? '#78716c' : '#d6d3d1'} />
      {windowPane(128, 172, 30, 26, variant)}
      {windowPane(242, 172, 30, 26, variant)}
      {/* Arched door */}
      <path
        d="M178 236 L178 200 Q200 178 222 200 L222 236 Z"
        stroke={INK}
        strokeWidth="1.6"
        fill={variant === 'color' ? '#166534' : variant === 'shaded' ? '#a8a29e' : 'none'}
      />
      {/* Garden bushes */}
      <ellipse cx="118" cy="242" rx="28" ry="14" stroke={INK} strokeWidth="1" fill={variant === 'color' ? '#86efac' : variant === 'shaded' ? '#d6d3d1' : 'none'} opacity={variant === 'line' ? 0.6 : 0.85} />
      <ellipse cx="282" cy="242" rx="24" ry="12" stroke={INK} strokeWidth="1" fill={variant === 'color' ? '#86efac' : variant === 'shaded' ? '#d6d3d1' : 'none'} opacity={variant === 'line' ? 0.6 : 0.85} />
      <GroundLine y={252} />
    </>
  )
}

function ModernDrawing({ variant }: { variant: Variant }) {
  const wall = wallFill(variant, '#f5f5f4', '#ebe8e4')
  const accent = variant === 'color' ? '#0ea5e9' : variant === 'shaded' ? '#a8a29e' : 'none'

  return (
    <>
      {/* Flat roof slab */}
      <rect x="64" y="108" width="272" height="18" stroke={INK} strokeWidth="2" fill={variant === 'color' ? '#57534e' : '#d6d3d1'} />
      <rect x="72" y="126" width="256" height="112" stroke={INK} strokeWidth="2" fill={wall} />
      {/* Large glass */}
      <rect x="92" y="142" width="88" height="72" stroke={INK} strokeWidth="1.6" fill={accent} opacity={variant === 'line' ? 1 : 0.75} />
      <line x1="136" y1="142" x2="136" y2="214" stroke={INK} strokeWidth="0.8" />
      <line x1="92" y1="178" x2="180" y2="178" stroke={INK} strokeWidth="0.8" />
      <rect x="220" y="142" width="88" height="72" stroke={INK} strokeWidth="1.6" fill={accent} opacity={variant === 'line' ? 1 : 0.75} />
      <line x1="264" y1="142" x2="264" y2="214" stroke={INK} strokeWidth="0.8" />
      {/* Entry */}
      <rect x="186" y="198" width="28" height="40" stroke={INK} strokeWidth="1.4" fill={variant === 'color' ? '#44403c' : 'none'} />
      {/* Palm — Palm Springs cue */}
      <path d="M340 248 L340 178" stroke={INK} strokeWidth="1.4" />
      <path d="M340 178 Q320 168 308 182" stroke={INK} strokeWidth="1" fill="none" />
      <path d="M340 178 Q360 165 372 180" stroke={INK} strokeWidth="1" fill="none" />
      <path d="M340 188 Q325 182 318 198" stroke={INK} strokeWidth="1" fill="none" />
      {variant === 'color' && <circle cx="352" cy="118" r="16" fill="#fde047" opacity="0.55" />}
      <GroundLine />
    </>
  )
}

function ColonialDrawing({ variant }: { variant: Variant }) {
  const roof = roofFill(variant, '#44403c', '#a8a29e')
  const wall = wallFill(variant, '#fff7ed', '#f5f5f4')

  return (
    <>
      <path d="M96 132 L200 72 L304 132 L304 150 L96 150 Z" stroke={INK} strokeWidth="2.2" fill={roof} />
      <rect x="108" y="150" width="184" height="86" stroke={INK} strokeWidth="2" fill={wall} />
      {/* Columns */}
      {[128, 168, 232, 272].map((x) => (
        <rect key={x} x={x} y="150" width="10" height="86" stroke={INK} strokeWidth="1.2" fill={variant === 'color' ? '#fafafa' : variant === 'shaded' ? '#e7e5e4' : 'none'} />
      ))}
      {/* Pediment */}
      <path d="M168 150 L200 118 L232 150" stroke={INK} strokeWidth="1.6" fill={variant === 'color' ? '#fef3c7' : 'none'} />
      {windowPane(118, 162, 26, 28, variant)}
      {windowPane(256, 162, 26, 28, variant)}
      {/* Center door */}
      <rect x="184" y="188" width="32" height="48" stroke={INK} strokeWidth="1.4" fill={variant === 'color' ? '#92400e' : 'none'} />
      {/* Shutters */}
      <rect x="112" y="162" width="8" height="28" stroke={INK} strokeWidth="0.8" fill={variant === 'color' ? '#166534' : 'none'} opacity={0.8} />
      <rect x="280" y="162" width="8" height="28" stroke={INK} strokeWidth="0.8" fill={variant === 'color' ? '#166534' : 'none'} opacity={0.8} />
      <GroundLine />
    </>
  )
}

function BrownstoneDrawing({ variant }: { variant: Variant }) {
  const brick = wallFill(variant, '#fecaca', '#e7e5e4')
  const stoop = variant === 'color' ? '#78716c' : '#d6d3d1'

  return (
    <>
      {/* Adjacent building edge */}
      <rect x="48" y="88" width="36" height="164" stroke={INK} strokeWidth="1" fill={variant === 'shaded' ? '#d6d3d1' : '#e7e5e4'} opacity="0.6" />
      {/* Main facade — tall narrow */}
      <rect x="84" y="88" width="148" height="164" stroke={INK} strokeWidth="2" fill={brick} />
      {variant === 'shaded' && <CrossHatch x={90} y={95} w={130} h={150} opacity={0.08} />}
      {/* Stacked windows */}
      {[108, 148, 188].map((y) => (
        <g key={y}>
          {windowPane(108, y, 32, 28, variant)}
          {windowPane(176, y, 32, 28, variant)}
        </g>
      ))}
      {/* Stoop */}
      <path d="M148 252 L148 228 L188 228 L188 252" stroke={INK} strokeWidth="1.4" fill={stoop} />
      <rect x="156" y="212" width="24" height="16" stroke={INK} strokeWidth="1.2" fill={variant === 'color' ? '#44403c' : 'none'} />
      {/* Iron railing */}
      <path d="M148 228 L188 228" stroke={INK} strokeWidth="1.2" />
      <line x1="152" y1="228" x2="152" y2="240" stroke={INK} strokeWidth="0.8" />
      <line x1="164" y1="228" x2="164" y2="240" stroke={INK} strokeWidth="0.8" />
      <line x1="176" y1="228" x2="176" y2="240" stroke={INK} strokeWidth="0.8" />
      {/* Parapet */}
      <rect x="84" y="80" width="148" height="12" stroke={INK} strokeWidth="1.2" fill={variant === 'color' ? '#57534e' : '#a8a29e'} />
      <GroundLine y={254} />
    </>
  )
}

const DRAWINGS: Record<ArchitectureType, ComponentType<{ variant: Variant }>> = {
  craftsman: CraftsmanDrawing,
  victorian: VictorianDrawing,
  cottage: CottageDrawing,
  modern: ModernDrawing,
  colonial: ColonialDrawing,
  brownstone: BrownstoneDrawing,
}

export function HomeIllustration({ architecture, variant, className = '' }: Props) {
  const Drawing = DRAWINGS[architecture]
  return (
    <PaperFrame className={className}>
      <Drawing variant={variant} />
      {variant !== 'line' && (
        <rect x="8" y="8" width="384" height="284" fill="url(#grain)" opacity="0.04" pointerEvents="none" />
      )}
      <defs>
        <pattern id="grain" patternUnits="userSpaceOnUse" width="4" height="4">
          <circle cx="1" cy="1" r="0.5" fill={INK_LIGHT} />
        </pattern>
      </defs>
    </PaperFrame>
  )
}
