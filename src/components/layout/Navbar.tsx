import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { navItems, site } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { ActionLink } from '../ui/ActionLink'
import { CloseIcon, MenuIcon } from '../ui/Icons'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Navbar({ visible = true }: { visible?: boolean }) {
  const ids = useMemo(() => navItems.map(item => item.id), [])
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const mql = window.matchMedia('(min-width: 1024px)')
    const onWide = () => mql.matches && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    mql.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      mql.removeEventListener('change', onWide)
    }
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto mx-auto max-w-[1180px]"
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            'flex items-center justify-between gap-3 rounded-full border bg-glass py-1.5 pr-1.5 pl-4 backdrop-blur-xl transition-[border-color,box-shadow] duration-500',
            scrolled ? 'border-line-strong shadow-[var(--shadow)]' : 'border-line',
          )}
        >
          <a
            href="#top"
            aria-label="Daniel S, back to top"
            className="display inline-flex min-h-[44px] min-w-[44px] items-center text-xl tracking-tight"
          >
            DS<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map(item => {
              const current = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={cn(
                      'relative flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium transition-colors duration-300',
                      current ? 'text-ink' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    {current && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeSwitcher layoutId="theme-ring-nav" />
            <div className="hidden sm:block">
              <ActionLink href="#contact" variant="primary" className="h-11" magnetPadding={16}>
                Let’s Talk
              </ActionLink>
            </div>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(value => !value)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 origin-top rounded-3xl border border-line-strong bg-glass p-3 shadow-[var(--shadow)] backdrop-blur-xl lg:hidden"
            >
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.05, duration: 0.35 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? 'location' : undefined}
                      className={cn(
                        'display flex min-h-[44px] items-center justify-between rounded-2xl px-4 py-3.5 text-2xl',
                        active === item.id ? 'bg-ink/10 text-ink' : 'text-ink-soft',
                      )}
                    >
                      {item.label}
                      <span className="label text-ink-soft" aria-hidden="true">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 border-t border-line p-2 pt-4 sm:hidden">
                <ActionLink
                  href="#contact"
                  variant="primary"
                  magnetic={false}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Let’s Talk
                </ActionLink>
              </div>
              <p className="sr-only">{site.name} portfolio navigation</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
