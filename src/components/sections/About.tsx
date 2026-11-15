import { useTheme } from '../../context/ThemeContext'
import { about } from '../../data/site'
import { useCapabilities } from '../../hooks/useCapabilities'
import ASCIIText from '../reactbits/ASCIIText'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Small CSS-only wireframe cube. Decorative. */
function WireCube() {
  const face = 'absolute inset-0 border border-accent-ink/70 bg-accent/5'
  return (
    <div aria-hidden="true" className="size-16 [perspective:600px]">
      <div className="relative size-full [transform-style:preserve-3d] [animation:spin-cube_18s_linear_infinite]">
        <span className={`${face} [transform:translateZ(2rem)]`} />
        <span className={`${face} [transform:rotateY(180deg)_translateZ(2rem)]`} />
        <span className={`${face} [transform:rotateY(90deg)_translateZ(2rem)]`} />
        <span className={`${face} [transform:rotateY(-90deg)_translateZ(2rem)]`} />
        <span className={`${face} [transform:rotateX(90deg)_translateZ(2rem)]`} />
        <span className={`${face} [transform:rotateX(-90deg)_translateZ(2rem)]`} />
      </div>
    </div>
  )
}

export function About() {
  const { colors, meta } = useTheme()
  const { webgl2 } = useCapabilities()

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="shell">
        <SectionHeading id="about-title" title={about.heading} marker="~/daniel/about" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 [&>*]:min-w-0">
          {/* Statement */}
          <Reveal className="card p-6 md:col-span-7 md:p-10">
            <p className="serif text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.12] text-ink">
              {about.lead}
            </p>
            <div className="mt-8 grid gap-5 text-ink-soft md:grid-cols-2 md:gap-8">
              {about.body.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {/* ASCII centrepiece */}
          <Reveal delay={0.08} className="card relative min-h-[300px] overflow-hidden md:col-span-5 md:row-span-2 md:min-h-[420px]">
            <div className="label absolute inset-x-5 top-5 z-10 flex justify-between text-ink-soft">
              <span>ascii.render()</span>
              <span>hover / click</span>
            </div>
            {webgl2 ? (
              <ASCIIText
                text="DANIEL"
                ariaLabel="Daniel, drawn in ASCII characters"
                fontFamily="'Archivo Variable', sans-serif"
                fontWeight={800}
                asciiFontSize={7}
                textScale={0.5}
                textColor={colors.ink}
                colors={[colors.ink, colors.accentInk, colors.accent]}
                theme={meta.mode}
                waves={0.7}
                waveSpeed={0.6}
                hueShift={0}
                chroma={0.35}
              />
            ) : (
              <div className="display absolute inset-0 grid place-items-center text-6xl text-ink">
                DANIEL
              </div>
            )}
            <div className="absolute right-5 bottom-5 z-10">
              <WireCube />
            </div>
            <p className="label absolute bottom-5 left-5 z-10 text-ink-soft">
              charset: ░▒▓ <span className="text-accent-ink">/</span> 7px cell
            </p>
          </Reveal>

          {/* Code-styled facts */}
          <Reveal delay={0.05} className="card-panel overflow-hidden md:col-span-4">
            <div className="label flex items-center gap-2 border-b border-on-panel/15 px-5 py-3 text-on-panel-soft">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              daniel.ts
            </div>
            <dl className="p-5 font-mono text-[0.8125rem] leading-7 md:p-6">
              <p aria-hidden="true" className="text-on-panel-soft">{'const daniel = {'}</p>
              {about.facts.map(fact => (
                <div key={fact.key} className="flex gap-2 pl-4">
                  <dt className="shrink-0 text-on-panel-soft">{fact.key}:</dt>
                  <dd className="m-0 text-on-panel">
                    <span aria-hidden="true">“</span>
                    {fact.value}
                    <span aria-hidden="true">”,</span>
                  </dd>
                </div>
              ))}
              <p aria-hidden="true" className="text-on-panel-soft">{'}'}</p>
            </dl>
          </Reveal>

          {/* Exploring */}
          <Reveal delay={0.1} className="card p-6 md:col-span-3">
            <h3 className="label mb-5 text-ink-soft">Currently exploring</h3>
            <ul className="space-y-2.5">
              {about.exploring.map(item => (
                <li key={item} className="flex items-baseline gap-3 font-medium [font-stretch:108%]">
                  <span className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
