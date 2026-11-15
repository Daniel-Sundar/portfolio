import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { skillPillars, techStack } from '../../data/site'
import { useCapabilities } from '../../hooks/useCapabilities'
import { cn } from '../../lib/cn'
import type { SkillPillar } from '../../types'
import ASCIIText from '../reactbits/ASCIIText'
import LogoLoop from '../reactbits/LogoLoop'
import { DesignMark, LogicMark, SparkMark, VoiceMark } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TechLogo } from '../ui/TechLogos'

const icons: Record<SkillPillar['icon'], ReactNode> = {
  design: <DesignMark />,
  logic: <LogicMark />,
  spark: <SparkMark />,
  voice: <VoiceMark />,
}

/** Word the ASCII centrepiece renders for each pillar. */
const asciiWord: Record<string, string> = {
  uiux: 'UI/UX',
  problem: 'LOGIC',
  creative: 'IDEAS',
  leadership: 'VOICE',
}

const stackLogos = techStack.map(name => ({ node: <TechLogo name={name} />, title: name }))

export function Skills() {
  const { colors, meta } = useTheme()
  const { webgl2 } = useCapabilities()
  const [activeId, setActiveId] = useState(skillPillars[0].id)
  const active = skillPillars.find(item => item.id === activeId) ?? skillPillars[0]

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="shell">
        <SectionHeading id="skills-title" title="Skills & design thinking." marker="~/daniel/skills">
          <p>Four ways I approach a project. Pick one to see what sits behind it.</p>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 [&>*]:min-w-0">
          {/* Pillar selector */}
          <Reveal className="lg:col-span-7">
            <div role="tablist" aria-label="Skill pillars" aria-orientation="vertical" className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5">
              {skillPillars.map((pillar, index) => {
                const selected = pillar.id === activeId
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    id={`pillar-tab-${pillar.id}`}
                    aria-selected={selected}
                    aria-controls="pillar-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(pillar.id)}
                    onKeyDown={event => {
                      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
                      if (!step) return
                      event.preventDefault()
                      const next = skillPillars[(index + step + skillPillars.length) % skillPillars.length]
                      setActiveId(next.id)
                      document.getElementById(`pillar-tab-${next.id}`)?.focus()
                    }}
                    className={cn(
                      'group relative flex items-center gap-4 overflow-hidden rounded-[1.25rem] border p-4 text-left transition-colors duration-500 sm:min-h-44 sm:flex-col sm:items-stretch sm:justify-between sm:p-5 md:min-h-52 md:p-6',
                      selected ? 'border-transparent text-on-accent' : 'border-line bg-raise text-ink hover:border-line-strong',
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="pillar-active"
                        className="absolute inset-0 bg-accent"
                        style={{ borderRadius: '1.25rem' }}
                        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                      />
                    )}
                    <span className={cn('relative shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5', !selected && 'text-accent-ink')}>
                      {icons[pillar.icon]}
                    </span>
                    <span className="relative">
                      <span className="display block text-[clamp(1.15rem,1.8vw,1.75rem)] [overflow-wrap:anywhere]">{pillar.title}</span>
                      <span className={cn('mt-2 hidden text-sm sm:block', selected ? '' : 'text-ink-soft')}>
                        {pillar.summary}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Detail panel with the ASCII centrepiece */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <div
              role="tabpanel"
              id="pillar-panel"
              aria-labelledby={`pillar-tab-${active.id}`}
              tabIndex={0}
              className="card flex h-full flex-col overflow-hidden"
            >
              <div className="relative h-44 border-b border-line md:h-52">
                {webgl2 ? (
                  <ASCIIText
                    key={active.id}
                    text={asciiWord[active.id]}
                    ariaLabel={`${active.title}, drawn in ASCII characters`}
                    fontFamily="'Archivo Variable', sans-serif"
                    fontWeight={800}
                    asciiFontSize={6}
                    textScale={1.6}
                    textColor={colors.ink}
                    colors={[colors.ink, colors.accentInk, colors.accent]}
                    theme={meta.mode}
                    waves={0.6}
                    waveSpeed={0.6}
                    hueShift={0}
                    chroma={0.35}
                  />
                ) : (
                  <div className="display absolute inset-0 grid place-items-center text-5xl">
                    {asciiWord[active.id]}
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 md:p-8">
                <h3 className="label text-accent-ink">{active.title}</h3>
                <motion.ul
                  key={active.id}
                  className="mt-5 space-y-3"
                  initial="hidden"
                  animate="shown"
                  variants={{ shown: { transition: { staggerChildren: 0.05 } } }}
                >
                  {active.points.map(point => (
                    <motion.li
                      key={point}
                      variants={{ hidden: { opacity: 0, x: 12 }, shown: { opacity: 1, x: 0 } }}
                      className="flex items-baseline gap-3 border-b border-line pb-3 text-lg font-medium [font-stretch:108%] last:border-b-0"
                    >
                      <span className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-accent" aria-hidden="true" />
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </Reveal>

          {/* Technical stack */}
          <Reveal delay={0.05} className="card overflow-hidden lg:col-span-12">
            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:gap-10 md:p-8">
              <div className="shrink-0">
                <h3 className="label text-ink-soft">Technical stack</h3>
                <p className="serif mt-1 text-2xl italic">What I build with</p>
              </div>
              <div className="min-w-0 flex-1 text-ink">
                <LogoLoop
                  logos={stackLogos}
                  speed={45}
                  logoHeight={30}
                  gap={56}
                  pauseOnHover
                  fadeOut
                  ariaLabel="Technical stack"
                />
              </div>
            </div>
            <ul className="sr-only">
              {techStack.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
