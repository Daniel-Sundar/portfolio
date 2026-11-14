import { ribbonWords } from '../../data/site'
import LogoLoop from '../reactbits/LogoLoop'
import ScrollVelocity from '../reactbits/ScrollVelocity'
import { logoNames, TechLogo } from '../ui/TechLogos'

const logos = logoNames.map(name => ({ node: <TechLogo name={name} />, title: name }))

export function TechDivider() {
  return (
    <section id="stack" aria-label="Skills and technology" className="relative border-y border-line py-8 md:py-12">
      {/* Row 1: speeds up and skews with scroll velocity */}
      <div className="text-ink">
        <ScrollVelocity
          texts={[ribbonWords.join(' • ')]}
          separator="•"
          velocity={55}
          numCopies={4}
          skewWithVelocity={0.25}
          className="display px-[0.2em] text-[clamp(2.25rem,7vw,6rem)] !leading-[1.05]"
          scrollerClassName="!font-sans !tracking-[-0.035em] !drop-shadow-none"
        />
      </div>

      {/* Row 2: technology marquee */}
      <div className="mt-6 border-t border-line pt-6 text-ink-soft md:mt-10 md:pt-10">
        <LogoLoop
          logos={logos}
          speed={60}
          direction="right"
          logoHeight={34}
          gap={64}
          pauseOnHover
          fadeOut
          ariaLabel="Technologies Daniel works with"
        />
      </div>
    </section>
  )
}
