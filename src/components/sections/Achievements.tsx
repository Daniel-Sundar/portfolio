import { useTheme } from '../../context/ThemeContext'
import { achievements } from '../../data/site'
import { useCapabilities } from '../../hooks/useCapabilities'
import ElectricBorder from '../reactbits/ElectricBorder'
import { TrophyMark } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TiltCard } from '../ui/TiltCard'

const [winner, qualifier] = achievements

function WinnerCard() {
  return (
    <article
      aria-labelledby="achievement-winner"
      className="card spotlight relative flex h-full flex-col justify-between gap-10 overflow-hidden p-6 md:flex-row md:items-end md:p-10"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-80 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--gold), transparent 70%)' }}
      />
      <div className="relative">
        <p className="label text-gold">{winner.event}</p>
        <h3 id="achievement-winner" className="display mt-5 text-[clamp(2.5rem,5.6vw,5.25rem)]">
          1st Place
          <span className="block text-accent-ink">Winner</span>
        </h3>
        <p className="mt-6 max-w-[46ch] text-ink-soft md:text-lg">{winner.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {winner.highlights.map(item => (
            <li key={item} className="rounded-full border border-gold/50 px-3 py-1.5 font-mono text-xs text-gold">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden="true" className="relative shrink-0 self-end [perspective:700px]">
        <div className="text-gold [animation:drift_7s_ease-in-out_infinite] [transform-style:preserve-3d]">
          <TrophyMark className="h-40 w-auto drop-shadow-[0_18px_30px_rgb(0_0_0/0.45)] md:h-56" />
        </div>
      </div>
    </article>
  )
}

export function Achievements() {
  const { colors, meta } = useTheme()
  const { webgl2 } = useCapabilities()

  return (
    <section id="achievements" aria-labelledby="achievements-title" className="section">
      <div className="shell">
        <SectionHeading id="achievements-title" title="Achievements." marker="~/daniel/achievements" />

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 [&>*]:min-w-0">
          <Reveal className="lg:col-span-7">
            <TiltCard className="h-full" max={2}>
              {webgl2 ? (
                <ElectricBorder
                  color={colors.gold}
                  glowColor={colors.accent}
                  borderRadius={20}
                  thickness={1.2}
                  strands={2}
                  chaos={0.3}
                  glow={meta.mode === 'light' ? 0.15 : 0.45}
                  intensity={0.65}
                  arcs={0.3}
                  flicker={0.2}
                  speed={0.6}
                  theme={meta.mode}
                  className="h-full"
                >
                  <WinnerCard />
                </ElectricBorder>
              ) : (
                <WinnerCard />
              )}
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <article
              aria-labelledby="achievement-qualifier"
              className="card-panel relative flex h-full flex-col overflow-hidden p-6 md:p-10"
            >
              {/* Structural grid: the card reads like a blueprint */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--on-panel) 1px, transparent 1px), linear-gradient(90deg, var(--on-panel) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  maskImage: 'linear-gradient(135deg, #000, transparent 70%)',
                  WebkitMaskImage: 'linear-gradient(135deg, #000, transparent 70%)',
                }}
              />
              <div className="relative flex h-full flex-col">
                <p className="label text-on-panel-soft">{qualifier.event}</p>
                <h3 id="achievement-qualifier" className="display mt-5 text-[clamp(1.75rem,3.4vw,3rem)]">
                  {qualifier.result}
                </h3>
                <p className="mt-6 max-w-[44ch] text-on-panel-soft md:text-lg">{qualifier.summary}</p>

                {/* The route from internal round to external stage */}
                <ol className="mt-auto grid grid-cols-[auto_1fr_auto] items-center gap-3 pt-10">
                  <li className="rounded-xl border border-on-panel/30 px-3 py-2.5">
                    <span className="label block text-on-panel-soft">Round 1</span>
                    <span className="font-semibold [font-stretch:108%]">Internal screening</span>
                  </li>
                  <li aria-hidden="true" className="relative h-px bg-on-panel/40">
                    <span className="absolute -top-1 right-0 size-2 rotate-45 border-t border-r border-on-panel/70" />
                  </li>
                  <li className="rounded-xl border border-on-panel bg-on-panel px-3 py-2.5 text-panel">
                    <span className="label block opacity-70">Qualified</span>
                    <span className="font-semibold [font-stretch:108%]">External stage</span>
                  </li>
                </ol>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
