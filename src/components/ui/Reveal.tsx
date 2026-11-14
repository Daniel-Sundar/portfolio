import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Tilt the content up out of the page as it enters. */
  depth?: boolean
}

/** One-time entrance when the content scrolls into view. */
export function Reveal({ children, className, delay = 0, depth = false }: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      style={depth ? { transformPerspective: 1200, transformOrigin: '50% 100%' } : undefined}
      initial={{ opacity: 0, y: 28, rotateX: depth ? 14 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
