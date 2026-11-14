import type { ReactNode } from 'react'
import { asset } from '../../lib/asset'
import type { Project } from '../../types'
import { ActionLink } from '../ui/ActionLink'
import { ArrowUpRight, CloseIcon, GitHubIcon } from '../ui/Icons'
import { Modal } from '../ui/Modal'
import { ProjectPreview } from './ProjectPreview'

interface CaseStudyModalProps {
  project: Project
  onClose: () => void
}

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-line py-6 first:border-t-0 first:pt-0">
    <h3 className="label mb-3 text-accent-ink">{title}</h3>
    {children}
  </section>
)

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map(item => (
      <li key={item} className="flex gap-3 text-ink-soft">
        <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const titleId = `case-${project.id}-title`
  const { caseStudy } = project

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      <header className="flex items-start justify-between gap-4 border-b border-line p-5 md:p-8">
        <div>
          <p className="label text-ink-soft">
            <span className="text-accent-ink">{project.index}</span> / {project.category} / {project.status}
          </p>
          <h2 id={titleId} className="display mt-3 text-[clamp(2rem,5vw,4rem)]">
            {project.title}
          </h2>
          <p className="serif mt-1 text-xl text-ink-soft italic md:text-2xl">{project.tagline}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
        >
          <CloseIcon />
        </button>
      </header>

      <div className="grid gap-8 overflow-y-auto overscroll-contain p-5 md:grid-cols-12 md:gap-10 md:p-8">
        <div className="md:col-span-7">
          {project.concept && (
            <p className="mb-6 rounded-2xl border border-line bg-raise p-4 text-sm text-ink-soft">
              This is a design concept. There is no build of it yet, so this page describes the
              idea and the thinking behind the interface.
            </p>
          )}
          <Block title="Overview">
            <p className="serif text-2xl leading-snug text-ink md:text-[1.75rem]">{caseStudy.overview}</p>
          </Block>
          <Block title="Problem">
            <p className="text-ink-soft">{caseStudy.problem}</p>
          </Block>
          <Block title="Solution">
            <p className="text-ink-soft">{caseStudy.solution}</p>
          </Block>
          <Block title="Features">
            <List items={caseStudy.features} />
          </Block>
          <Block title="Design decisions">
            <List items={caseStudy.designDecisions} />
          </Block>
          <Block title="Technology">
            {project.tech.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {project.tech.map(item => (
                  <li key={item} className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-soft">Not chosen yet. This project is at the concept stage.</p>
            )}
          </Block>
        </div>

        <aside className="md:col-span-5">
          <div className="md:sticky md:top-0">
            <h3 className="label mb-3 text-accent-ink">UI preview</h3>
            <ProjectPreview id={project.id} className="h-72 md:h-80" />
            {project.id !== 'reset' && (
              <p className="mt-2 text-xs text-ink-soft">Illustration of the interface, not a screenshot.</p>
            )}

            {project.id === 'reset' && (
              <figure className="mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <img
                    src={asset('reset/today-v1.png')}
                    alt="First version of the Reset Today screen: a plain, light layout with a progress bar and a list of quests."
                    loading="lazy"
                    width={400}
                    height={820}
                    className="w-full rounded-xl border border-line"
                  />
                  <img
                    src={asset('reset/today-v2.png')}
                    alt="Second version of the Reset Today screen: a dark, game-styled layout with a power level and training objectives."
                    loading="lazy"
                    width={400}
                    height={860}
                    className="w-full rounded-xl border border-line"
                  />
                </div>
                <figcaption className="label mt-3 flex justify-between text-ink-soft">
                  <span>Version 1</span>
                  <span>Version 2</span>
                </figcaption>
              </figure>
            )}

            <h3 className="label mt-8 mb-3 text-accent-ink">Links</h3>
            {project.links.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {project.links.map(link => (
                  <ActionLink
                    key={link.href}
                    href={link.href}
                    external
                    magnetic={false}
                    variant={link.kind === 'live' ? 'primary' : 'outline'}
                  >
                    {link.kind === 'repo' ? <GitHubIcon width={18} height={18} /> : null}
                    {link.label}
                    {link.kind === 'live' ? <ArrowUpRight width={16} height={16} /> : null}
                  </ActionLink>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-soft">No public repository or live demo yet.</p>
            )}
          </div>
        </aside>
      </div>
    </Modal>
  )
}
