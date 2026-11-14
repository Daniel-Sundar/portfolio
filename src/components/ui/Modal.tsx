import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useDialog } from '../../hooks/useDialog'
import { cn } from '../../lib/cn'

interface ModalProps {
  labelledBy: string
  onClose: () => void
  children: ReactNode
  /** `center` is a large sheet; `side` is a drawer from the right (bottom on phones). */
  placement?: 'center' | 'side'
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Accessible modal shell. Render inside <AnimatePresence> for exit animation. */
export function Modal({ labelledBy, onClose, children, placement = 'center', className }: ModalProps) {
  const ref = useDialog<HTMLDivElement>(onClose)
  const side = placement === 'side'

  return createPortal(
    <div className={cn('fixed inset-0 z-[80] flex', side ? 'items-end justify-end' : 'items-end justify-center md:items-center md:p-6')}>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          'relative flex max-h-[92dvh] w-full flex-col overflow-hidden border border-line-strong bg-bg text-ink shadow-[var(--shadow)] outline-none',
          side
            ? 'rounded-t-3xl md:h-dvh md:max-h-none md:w-[460px] md:rounded-none md:rounded-l-3xl'
            : 'rounded-t-3xl md:max-w-6xl md:rounded-3xl',
          className,
        )}
        initial={side ? { x: 40, y: 40, opacity: 0 } : { y: 60, opacity: 0, scale: 0.98 }}
        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        exit={side ? { x: 40, opacity: 0 } : { y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>,
    document.body,
  )
}
