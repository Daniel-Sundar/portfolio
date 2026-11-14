import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Modal dialog behaviour: moves focus in, traps Tab, closes on Escape,
 * locks page scroll, hides the app from assistive tech, and restores focus.
 */
export function useDialog<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const previous = document.activeElement as HTMLElement | null
    const app = document.getElementById('root')
    const { overflow } = document.body.style

    document.body.style.overflow = 'hidden'
    app?.setAttribute('inert', '')
    dialog.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        el => el.offsetParent !== null,
      )
      if (!items.length) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (event.shiftKey && (current === first || current === dialog)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      app?.removeAttribute('inert')
      previous?.focus({ preventScroll: true })
    }
  }, [])

  return ref
}
