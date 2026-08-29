import { AnimatedText } from './AnimatedText'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  titleMode?: 'lines' | 'chars'
  dark?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  titleMode = 'lines',
  dark = false,
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`section-rule ${dark ? 'section-rule-light' : ''}`} aria-hidden="true" />
        <p className={`section-eyebrow ${dark ? 'text-gallery-muted' : ''}`}>{eyebrow}</p>
      </div>
      <AnimatedText
        as="h2"
        mode={titleMode}
        trigger="scroll"
        className={`section-title mt-4 ${dark ? 'text-gallery-spot' : 'text-ink'}`}
      >
        {title}
      </AnimatedText>
      {description && (
        <p className={`section-lead mt-4 ${dark ? 'text-gallery-muted' : 'text-ink-muted'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
