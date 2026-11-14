import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  title: string
  /** Short technical marker, e.g. the section's path. */
  marker: string
  children?: ReactNode
  className?: string
}

export function SectionHeading({ id, title, marker, children, className }: SectionHeadingProps) {
  return (
    <Reveal depth className={cn('mb-10 md:mb-16', className)}>
      <p className="label mb-5 flex items-center gap-3 text-ink-soft">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        {marker}
      </p>
      <h2 id={id} className="display max-w-[16ch] text-[clamp(2.25rem,7vw,6.5rem)]">
        {title}
      </h2>
      {children && (
        <div className="mt-6 max-w-[58ch] text-base text-ink-soft md:text-lg">{children}</div>
      )}
    </Reveal>
  )
}
