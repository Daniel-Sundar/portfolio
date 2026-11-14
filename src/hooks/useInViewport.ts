import { useEffect, useRef, useState } from 'react'

/** Tracks whether an element is on screen, so off-screen animation can pause. */
export function useInViewport<T extends Element>(rootMargin = '100px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
