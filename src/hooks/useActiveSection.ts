import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection<T extends string>(ids: readonly T[]): T | null {
  const [active, setActive] = useState<T | null>(null)

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!elements.length) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = ids.find(id => visible.has(id)) ?? null
        setActive(current)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
