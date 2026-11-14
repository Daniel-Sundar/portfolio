import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useCapabilities } from '../../hooks/useCapabilities'
import { cn } from '../../lib/cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. */
  max?: number
}

/**
 * Perspective hover. Tilts toward the pointer and exposes --mx / --my so a
 * child with the `spotlight` class can light up under the cursor.
 * Inactive on touch devices and when reduced motion is requested.
 */
export function TiltCard({ children, className, max = 4 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const { finePointer, reducedMotion } = useCapabilities()
  const enabled = finePointer && !reducedMotion

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
      if (enabled) {
        el.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg)`
      }
    })
  }

  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current)
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-500 ease-out will-change-transform', className)}
      style={{ transformStyle: 'preserve-3d' }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </div>
  )
}
