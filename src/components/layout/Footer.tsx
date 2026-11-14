import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site, socials } from '../../data/site'
import Magnet from '../reactbits/Magnet'
import { ArrowUp, GitHubIcon, LinkedInIcon } from '../ui/Icons'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  // Each line slides in from a different side as the footer scrolls into place.
  const shifts = [
    useTransform(scrollYProgress, [0, 1], [-60, 0]),
    useTransform(scrollYProgress, [0, 1], [60, 0]),
    useTransform(scrollYProgress, [0, 1], [-30, 0]),
  ]

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line pt-16 pb-24 md:pt-24 md:pb-28">
      <div className="shell">
        <p className="display text-[clamp(1.75rem,7.6vw,9.75rem)]">
          {site.footerHeadline.map((line, index) => (
            <motion.span
              key={line}
              className={index === 2 ? 'block text-accent-ink' : 'block'}
              style={reduced ? undefined : { x: shifts[index] }}
            >
              {line}
            </motion.span>
          ))}
        </p>

        <div className="mt-14 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink-soft">{site.copyright}</p>

          <div className="flex items-center gap-3">
            {socials.map(link => (
              <Magnet key={link.label} padding={30} magnetStrength={3}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  {link.icon === 'github' ? <GitHubIcon /> : <LinkedInIcon />}
                </a>
              </Magnet>
            ))}
            <Magnet padding={30} magnetStrength={3}>
              <a
                href="#top"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-5 text-sm font-semibold text-bg transition-colors duration-300 [font-stretch:108%] hover:bg-accent hover:text-on-accent"
              >
                Back to top
                <ArrowUp width={18} height={18} />
              </a>
            </Magnet>
          </div>
        </div>
      </div>
    </footer>
  )
}
