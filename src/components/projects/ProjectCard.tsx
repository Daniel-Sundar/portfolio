import { lazy, Suspense } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useCapabilities } from '../../hooks/useCapabilities'
import { useInViewport } from '../../hooks/useInViewport'
import { cn } from '../../lib/cn'
import type { Project } from '../../types'
import ElectricBorder from '../reactbits/ElectricBorder'
import type { MiniShape } from '../three/MiniObject'
import { ArrowUpRight } from '../ui/Icons'
import { TiltCard } from '../ui/TiltCard'
import { ProjectPreview } from './ProjectPreview'

const MiniObject = lazy(() => import('../three/MiniObject'))

const miniShapes: Partial<Record<Project['id'], MiniShape>> = {
  scanin: 'bars',
  reset: 'ring',
}

interface ProjectCardProps {
  project: Project
  wide: boolean
  onInspect: (project: Project) => void
}

export function ProjectCard({ project, wide, onInspect }: ProjectCardProps) {
  const { colors, meta } = useTheme()
  const { rich3d, finePointer, webgl2 } = useCapabilities()
  const [ref, inView] = useInViewport<HTMLDivElement>('120px')
  const shape = miniShapes[project.id]
  const titleId = `project-${project.id}-title`

  const body = (
    <article
      aria-labelledby={titleId}
      className={cn(
        'card spotlight flex h-full flex-col gap-5 p-4 md:p-5',
        wide && 'lg:flex-row lg:gap-7',
      )}
    >
      <div className={cn('relative', wide ? 'lg:w-[54%] lg:shrink-0' : '')}>
        <ProjectPreview id={project.id} className={cn('h-64', wide ? 'md:h-80 lg:h-full lg:min-h-[26rem]' : 'md:h-72')} />
        {shape && rich3d && finePointer && (
          <div className="pointer-events-none absolute -top-5 -right-3 size-28 md:size-32">
            <Suspense fallback={null}>
              <MiniObject shape={shape} colors={colors} active={inView} />
            </Suspense>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col px-1 pb-1">
        <div className="label flex flex-wrap items-center justify-between gap-2 text-ink-soft">
          <span>
            <span className="text-accent-ink">{project.index}</span> / {project.category}
          </span>
          {project.featured && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-on-accent">
              {project.id === 'scanin' ? 'Flagship' : 'Featured'}
            </span>
          )}
        </div>

        <h3 id={titleId} className={cn('display mt-4', wide ? 'text-[clamp(2.25rem,4.4vw,4.25rem)]' : 'text-[clamp(1.75rem,2.6vw,2.5rem)]')}>
          {project.title}
        </h3>
        <p className="serif mt-2 text-xl text-ink-soft italic md:text-2xl">{project.tagline}</p>
        <p className="mt-4 max-w-[52ch] text-[0.95rem] text-ink-soft">{project.description}</p>

        {project.tech.length > 0 && (
          <ul aria-label="Technology" className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map(item => (
              <li key={item} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="label flex items-center gap-2 text-ink-soft">
            <span className={cn('size-1.5 rounded-full', project.concept ? 'bg-ink-soft' : 'bg-accent')} aria-hidden="true" />
            {project.status}
          </span>
          <button
            type="button"
            onClick={() => onInspect(project)}
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold transition-colors duration-300 [font-stretch:108%] hover:border-accent hover:bg-accent hover:text-on-accent"
          >
            Inspect Case Study
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  )

  return (
    <div ref={ref} className="h-full">
      <TiltCard className="h-full" max={wide ? 2 : 3.5}>
        {project.featured && webgl2 ? (
          <ElectricBorder
            color={colors.accent}
            glowColor={colors.accentDeep}
            borderRadius={20}
            thickness={1.2}
            strands={2}
            chaos={0.35}
            glow={meta.mode === 'light' ? 0.15 : 0.35}
            intensity={0.55}
            arcs={0.4}
            flicker={0.25}
            speed={0.7}
            theme={meta.mode}
            className="h-full"
          >
            {body}
          </ElectricBorder>
        ) : (
          body
        )}
      </TiltCard>
    </div>
  )
}
