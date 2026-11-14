import { motion, useReducedMotion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { site, socials } from '../../data/site'
import { useCapabilities } from '../../hooks/useCapabilities'
import { useInViewport } from '../../hooks/useInViewport'
import DepthText from '../reactbits/DepthText'
import Strands from '../reactbits/Strands'
import TechText from '../reactbits/TechText'
import { ActionLink } from '../ui/ActionLink'
import { ArrowDown, GitHubIcon, LinkedInIcon } from '../ui/Icons'
import { HeroStatic } from './HeroStatic'

// three.js is only downloaded when the device will actually run the scene.
const HeroScene = lazy(() => import('./HeroScene'))

const EASE = [0.16, 1, 0.3, 1] as const

interface HeroProps {
  /** True while the intro is covering the page: hold entrances and heavy effects. */
  paused?: boolean
}

export function Hero({ paused = false }: HeroProps) {
  const { colors, meta } = useTheme()
  const { rich3d, finePointer, webgl2 } = useCapabilities()
  const reduced = useReducedMotion()
  const [ref, inView] = useInViewport<HTMLElement>('0px')

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: paused ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-10 md:pb-14"
    >
      {/* Layer 1: ambient strands */}
      {webgl2 && !paused && (
        <div aria-hidden="true" className="absolute inset-0 opacity-50">
          <Strands
            colors={[colors.accent, colors.panelStrong, colors.accentDeep]}
            count={3}
            glass={false}
            speed={0.45}
            amplitude={1.1}
            thickness={0.8}
            glow={0.9}
            intensity={meta.mode === 'light' ? 0.9 : 0.7}
            lightMode={meta.mode === 'light'}
            interactive={false}
            clickPulse={false}
            maxDevicePixelRatio={1.5}
          />
        </div>
      )}

      {/* Layer 2: 3D sculpture, or its static stand-in */}
      <div className="absolute inset-0">
        {rich3d ? (
          <Suspense fallback={<HeroStatic />}>
            <HeroScene colors={colors} active={inView && !paused} lowPower={!finePointer} />
          </Suspense>
        ) : (
          <HeroStatic />
        )}
      </div>

      {/* Soft fade into the page so the scene never ends on a hard edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg"
      />

      {/* Layer 3: editorial content */}
      <div className="shell relative">
        <motion.p {...enter(0.35)} className="label mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-soft md:mb-6">
          {site.eyebrow.map((item, index) => (
            <span key={item} className="flex items-center gap-3">
              {index > 0 && <span className="text-accent" aria-hidden="true">•</span>}
              {item}
            </span>
          ))}
        </motion.p>

        <motion.h1 {...enter(0.45)} className="display -ml-[0.04em]">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden="true" className="block">
            <DepthText
              text="DANIEL S"
              fontSize="clamp(3.1rem, 14.6vw, 17rem)"
              fontWeight={800}
              faceColor={colors.ink}
              depthColor={colors.accent}
              layers={22}
              depth={1.4}
              tilt={5}
              autoOrbit={false}
              pointerTracking
              shadow={meta.mode === 'dark'}
            />
          </span>
        </motion.h1>

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:gap-10 lg:grid-cols-12 lg:items-end [&>*]:min-w-0">
          <motion.div {...enter(0.6)} className="-ml-[1.1rem] md:-ml-[1.7rem] lg:col-span-6">
            {site.taglines.map((line, index) => (
              <div key={line} className="h-8 w-full max-w-[34rem] md:h-10">
                {!paused && <TechText
                  text={line}
                  fontFamily="'JetBrains Mono Variable', monospace"
                  fontWeight={500}
                  fontSize={26}
                  letterSpacing={0.02}
                  align="left"
                  color={index === 2 ? colors.accentInk : colors.ink}
                  accentColor={colors.accentInk}
                  intro="type"
                  introDuration={1.2 + index * 0.5}
                  reach={120}
                  labels={false}
                  selection={false}
                  draggable={false}
                  specks={6}
                />}
              </div>
            ))}
          </motion.div>

          <motion.div
            {...enter(0.72)}
            className="rounded-[1.75rem] border border-line bg-glass p-5 backdrop-blur-xl md:p-7 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8"
          >
            <p className="max-w-[60ch] text-[0.975rem] leading-relaxed text-ink md:text-base">
              {site.intro}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ActionLink href="#projects" variant="primary" size="lg">
                Explore Selected Works
                <ArrowDown width={18} height={18} />
              </ActionLink>
              {socials.map(link => (
                <ActionLink key={link.label} href={link.href} size="lg" external>
                  {link.icon === 'github' ? <GitHubIcon /> : <LinkedInIcon />}
                  {link.label}
                </ActionLink>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.a
          {...(reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: paused ? 0 : 1 }, transition: { delay: 1.4, duration: 1 } })}
          href="#stack"
          className="label mt-12 hidden items-center gap-4 text-ink-soft transition-colors hover:text-ink md:inline-flex"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-line-strong" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-4 bg-accent [animation:scroll-hint_1.8s_ease-in-out_infinite]" />
          </span>
          Scroll
        </motion.a>
      </div>
    </section>
  )
}
