import { site, socials } from '../../data/site'
import Magnet from '../reactbits/Magnet'
import { ActionLink } from '../ui/ActionLink'
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'

const linkedIn = socials.find(link => link.icon === 'linkedin')!

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="shell">
        <div className="card-panel relative overflow-hidden p-6 md:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="absolute -right-32 -bottom-40 size-[30rem] rounded-full border border-on-panel/20"
          />
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-20 size-[18rem] rounded-full border border-on-panel/20"
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end [&>*]:min-w-0">
            <Reveal depth className="lg:col-span-8">
              <p className="label mb-6 flex items-center gap-3 text-on-panel-soft">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                ~/daniel/contact
              </p>
              <h2 id="contact-title" className="display max-w-[14ch] text-[clamp(2rem,5.4vw,5.5rem)]">
                {site.contactHeading}
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4">
              <p className="max-w-[44ch] text-on-panel-soft md:text-lg">{site.contactCopy}</p>
              <div className="mt-7">
                <ActionLink href={linkedIn.href} variant="primary" size="lg" external>
                  Message me on LinkedIn
                  <ArrowUpRight width={18} height={18} />
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <ul className="relative mt-12 grid grid-cols-1 gap-3 border-t border-on-panel/20 pt-8 sm:grid-cols-2">
            {socials.map(link => (
              <li key={link.label}>
                <Magnet padding={30} magnetStrength={6} style={{ display: 'block' }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-on-panel/25 px-5 py-4 transition-colors duration-300 hover:border-on-panel hover:bg-on-panel hover:text-panel"
                  >
                    <span className="flex items-center gap-4">
                      {link.icon === 'github' ? <GitHubIcon width={26} height={26} /> : <LinkedInIcon width={26} height={26} />}
                      <span>
                        <span className="display block text-xl">{link.label}</span>
                        <span className="font-mono text-xs">{link.handle}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </Magnet>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
