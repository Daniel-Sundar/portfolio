import gsap from 'gsap'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../../context/ThemeContext'
import { supportsWebGL2 } from '../../lib/webgl'

const IntroScene = lazy(() => import('./IntroScene'))

const SEEN_KEY = 'ds-intro-seen'

/** Play once per browser session, and never when motion should be reduced. */
export function shouldPlayIntro(): boolean {
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false
  } catch {
    // Storage blocked: fall through and play.
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return supportsWebGL2()
}

interface IntroProps {
  /** The site behind should come alive now (fired at the peak of the flash). */
  onReveal: () => void
  /** The intro is finished and can be removed. */
  onDone: () => void
}

export function Intro({ onReveal, onDone }: IntroProps) {
  const { colors } = useTheme()
  const backdrop = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const flash = useRef<HTMLDivElement>(null)
  const flare = useRef<HTMLDivElement>(null)
  const revealed = useRef(false)
  const finished = useRef(false)
  const [started, setStarted] = useState(false)
  const [skippable, setSkippable] = useState(true)
  const lowPower = !window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const reveal = useCallback(() => {
    if (revealed.current) return
    revealed.current = true
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Not critical.
    }
    document.body.style.overflow = ''
    document.getElementById('root')?.removeAttribute('inert')
    setSkippable(false)
    onReveal()
  }, [onReveal])

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    reveal()
    onDone()
  }, [reveal, onDone])

  // Hold the page still while the intro plays.
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    document.getElementById('root')?.setAttribute('inert', '')
    return () => {
      document.body.style.overflow = ''
      document.getElementById('root')?.removeAttribute('inert')
    }
  }, [])

  // If the 3D chunk never arrives (slow or failed network), don't trap the visitor.
  useEffect(() => {
    if (started) return
    const timer = window.setTimeout(finish, 7000)
    return () => window.clearTimeout(timer)
  }, [started, finish])

  const onImpact = useCallback(() => {
    // Flashbang: white-out in ~80ms, swap the black for the live site underneath,
    // then let the white decay while the fragments are still flying.
    gsap
      .timeline()
      .to(flash.current, { opacity: 1, duration: 0.08, ease: 'power4.in' })
      .to(flare.current, { opacity: 1, scaleX: 1, duration: 0.1, ease: 'power4.out' }, 0)
      .call(() => {
        if (backdrop.current) backdrop.current.style.opacity = '0'
        reveal()
      })
      .to(flash.current, { opacity: 0, duration: 1.15, ease: 'power2.out' }, 0.2)
      .to(flare.current, { opacity: 0, scaleX: 1.6, duration: 0.9, ease: 'power2.out' }, 0.2)
  }, [reveal])

  const skip = useCallback(() => {
    if (revealed.current) return
    setSkippable(false)
    gsap.to([backdrop.current, stage.current], {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: finish,
    })
  }, [finish])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skip()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [skip])

  return createPortal(
    <div className="fixed inset-0 z-[200]" role="region" aria-label="Intro animation">
      <div ref={backdrop} className="absolute inset-0 bg-bg">
        {/* The same accent glow that sits behind the hero. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 50%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 70%), radial-gradient(ellipse 50% 30% at 70% 65%, color-mix(in srgb, var(--panel-strong) 45%, transparent), transparent 70%)',
          }}
        />
      </div>
      {/* Vignette keeps the eye on the letters. */}
      <div ref={stage} className="absolute inset-0">
        <Suspense fallback={null}>
          <IntroScene colors={colors} lowPower={lowPower} onStart={() => setStarted(true)} onImpact={onImpact} onFinished={finish} />
        </Suspense>
      </div>
      <div
        ref={flare}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen"
        style={{
          transform: 'scaleX(0.4)',
          background:
            'radial-gradient(ellipse 60% 6% at 50% 50%, #fff, transparent 70%), radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 55%, #fff), transparent 34%)',
        }}
      />
      <div ref={flash} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white opacity-0" />
      {skippable && (
        <button
          type="button"
          onClick={skip}
          className="label absolute right-5 bottom-5 rounded-full border border-line-strong px-4 py-2.5 text-ink-soft transition-colors hover:border-accent hover:bg-accent hover:text-on-accent md:right-8 md:bottom-8"
        >
          Skip intro
        </button>
      )}
    </div>,
    document.body,
  )
}
