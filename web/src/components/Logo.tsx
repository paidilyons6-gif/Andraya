type LogoVariant = 'full' | 'mark' | 'wordmark'
type LogoTone = 'default' | 'light' | 'dark'

type LogoProps = {
  variant?: LogoVariant
  tone?: LogoTone
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showTagline?: boolean
}

const tones = {
  default: { ink: '#2c2825', accent: '#9c4a32', muted: '#6b6560', frame: '#faf8f4' },
  light: { ink: '#f7f3ed', accent: '#d4a574', muted: '#c9bfb2', frame: 'transparent' },
  dark: { ink: '#2c2825', accent: '#9c4a32', muted: '#6b6560', frame: '#faf8f4' },
}

const sizes = {
  sm: { mark: 'h-8 w-8', name: 'text-lg', sub: 'text-[9px]' },
  md: { mark: 'h-10 w-10', name: 'text-xl', sub: 'text-[10px]' },
  lg: { mark: 'h-12 w-12', name: 'text-2xl', sub: 'text-[11px]' },
}

export function LogoMark({
  tone = 'default',
  className = '',
}: {
  tone?: LogoTone
  className?: string
}) {
  const c = tones[tone]
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="40" height="40" rx="2" stroke={c.ink} strokeWidth="1.75" fill={c.frame} />
      <path
        d="M12 30 L24 14 L36 30"
        stroke={c.accent}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 30 L19 24 Q24 20 29 24 L29 30"
        stroke={c.ink}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12"
        y1="30"
        x2="36"
        y2="30"
        stroke={c.ink}
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

export function Logo({
  variant = 'full',
  tone = 'default',
  size = 'md',
  className = '',
  showTagline = false,
}: LogoProps) {
  const c = tones[tone]
  const s = sizes[size]

  if (variant === 'mark') {
    return <LogoMark tone={tone} className={`${s.mark} ${className}`} />
  }

  if (variant === 'wordmark') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className={`font-serif font-semibold leading-none tracking-tight ${s.name}`} style={{ color: c.ink }}>
          Andraya
        </span>
        <span
          className={`mt-1 font-sans font-medium uppercase tracking-[0.22em] ${s.sub}`}
          style={{ color: c.muted }}
        >
          Studio
        </span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark tone={tone} className={s.mark} />
      <div className="flex flex-col">
        <span className={`font-serif font-semibold leading-none tracking-tight ${s.name}`} style={{ color: c.ink }}>
          Andraya
        </span>
        <span
          className={`mt-1 font-sans font-medium uppercase tracking-[0.22em] ${s.sub}`}
          style={{ color: c.muted }}
        >
          Studio
        </span>
        {showTagline && (
          <span className="mt-1.5 hidden text-[11px] tracking-wide text-ink-muted sm:block">
            Hand-drawn home portraits
          </span>
        )}
      </div>
    </div>
  )
}
