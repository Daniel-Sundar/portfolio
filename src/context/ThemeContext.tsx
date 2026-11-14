import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { themes } from '../data/site'
import type { ThemeColors, ThemeId, ThemeMeta } from '../types'

const STORAGE_KEY = 'ds-theme'

interface ThemeContextValue {
  theme: ThemeId
  meta: ThemeMeta
  /** Colours resolved from the live CSS variables, for canvas and WebGL code. */
  colors: ThemeColors
  /** `origin` is the screen point the reveal animation grows from. */
  setTheme: (id: ThemeId, origin?: { x: number; y: number }) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const isThemeId = (value: unknown): value is ThemeId => themes.some(theme => theme.id === value)

function readColors(): ThemeColors {
  const styles = getComputedStyle(document.documentElement)
  const read = (name: string) => styles.getPropertyValue(name).trim()
  return {
    bg: read('--bg'),
    raise: read('--raise'),
    panel: read('--panel'),
    panelStrong: read('--panel-strong'),
    onPanel: read('--on-panel'),
    ink: read('--ink'),
    inkSoft: read('--ink-soft'),
    accent: read('--accent'),
    accentDeep: read('--accent-deep'),
    accentInk: read('--accent-ink'),
    gold: read('--gold'),
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const current = document.documentElement.dataset.theme
    return isThemeId(current) ? current : 'obsidian'
  })

  const setTheme = useCallback<ThemeContextValue['setTheme']>((id, origin) => {
    const apply = () => {
      document.documentElement.dataset.theme = id
      flushSync(() => setThemeState(id))
    }
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced && typeof document.startViewTransition === 'function') {
      const root = document.documentElement
      root.style.setProperty('--vt-x', `${origin?.x ?? window.innerWidth / 2}px`)
      root.style.setProperty('--vt-y', `${origin?.y ?? 0}px`)
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }, [])

  const value = useMemo<ThemeContextValue>(() => {
    const colors = readColors()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors.bg)
    return {
      theme,
      meta: themes.find(item => item.id === theme) ?? themes[0],
      colors,
      setTheme,
    }
  }, [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside ThemeProvider')
  return value
}
