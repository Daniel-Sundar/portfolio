import { motion } from 'motion/react'
import { useTheme } from '../../context/ThemeContext'
import { themes } from '../../data/site'
import { cn } from '../../lib/cn'

interface ThemeSwitcherProps {
  /** Unique per instance so the two switchers animate independently. */
  layoutId: string
  className?: string
}

export function ThemeSwitcher({ layoutId, className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn('flex items-center gap-0.5 rounded-full border border-line p-1', className)}
    >
      {themes.map(item => {
        const active = item.id === theme
        const [base, secondary, accent] = item.swatch
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            aria-label={`${item.name} theme`}
            title={item.name}
            onClick={event => {
              const rect = event.currentTarget.getBoundingClientRect()
              setTheme(item.id, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              })
            }}
            className="relative grid size-8 place-items-center rounded-full"
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full border border-accent-ink bg-ink/10"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <motion.span
              aria-hidden="true"
              className="relative block size-4 rounded-full ring-1 ring-line-strong"
              style={{
                background: `conic-gradient(${base} 0 60%, ${secondary} 60% 90%, ${accent} 90% 100%)`,
              }}
              animate={{ rotate: active ? 0 : -90, scale: active ? 1.1 : 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            />
          </button>
        )
      })}
    </div>
  )
}
