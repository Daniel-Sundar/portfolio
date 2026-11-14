import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import Magnet from '../reactbits/Magnet'

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
  size?: 'md' | 'lg'
  /** Pull toward the cursor (React Bits Magnet). */
  magnetic?: boolean
  /** How far outside the link the pull starts, in px. */
  magnetPadding?: number
  external?: boolean
}

const variants = {
  primary:
    'bg-accent text-on-accent hover:bg-accent-deep border border-transparent shadow-[0_10px_30px_-12px_var(--accent)]',
  outline: 'border border-line-strong text-ink hover:border-accent-ink hover:text-accent-ink',
} as const

const sizes = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[0.95rem]',
} as const

export function ActionLink({
  children,
  variant = 'outline',
  size = 'md',
  magnetic = true,
  magnetPadding = 50,
  external = false,
  className,
  ...rest
}: ActionLinkProps) {
  const link = (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-colors duration-300 [font-stretch:108%]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )

  if (!magnetic) return link
  return (
    <Magnet padding={magnetPadding} magnetStrength={3}>
      {link}
    </Magnet>
  )
}
