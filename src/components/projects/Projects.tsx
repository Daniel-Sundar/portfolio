import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { projectFilters, projects } from '../../data/projects'
import { cn } from '../../lib/cn'
import type { Project } from '../../types'
import { SectionHeading } from '../ui/SectionHeading'
import { CaseStudyModal } from './CaseStudyModal'
import { ProjectCard } from './ProjectCard'

type Filter = (typeof projectFilters)[number]

/** Column spans (out of 12) for the full seven-project Bento. */
const ALL_SPANS = [8, 4, 4, 4, 4, 4, 8]

function spansFor(list: Project[]): number[] {
  if (list.length === projects.length) return ALL_SPANS
  if (list.length === 2) return list.map(item => (item.featured ? 7 : 5))
  return list.map(() => 4)
}

const spanClass: Record<number, string> = {
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const reduced = useReducedMotion()

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter(item => item.category === filter)),
    [filter],
  )
  const spans = spansFor(visible)

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="shell">
        <SectionHeading id="projects-title" title="Selected works." marker="~/daniel/projects">
          <p>
            Seven projects, from shipped hackathon builds to early concepts. Each card says which
            is which.
          </p>
        </SectionHeading>

        <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
          {projectFilters.map(item => {
            const active = item === filter
            const count = item === 'All' ? projects.length : projects.filter(p => p.category === item).length
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={cn(
                  'relative h-11 rounded-full border px-5 text-sm font-semibold transition-colors duration-300 [font-stretch:108%]',
                  active ? 'border-transparent text-on-accent' : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-active"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {item}
                  <span className="ml-2 font-mono text-xs">{count}</span>
                </span>
              </button>
            )
          })}
        </div>

        <p className="sr-only" role="status">
          Showing {visible.length} of {projects.length} projects
        </p>

        <LayoutGroup>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, index) => {
                const span = spans[index]
                return (
                  <motion.li
                    key={project.id}
                    layout={!reduced}
                    initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={cn('min-w-0', span >= 7 && 'md:col-span-2', spanClass[span])}
                  >
                    <ProjectCard
                      project={project}
                      wide={span >= 7}
                      onInspect={setSelected}
                    />
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {selected && <CaseStudyModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
