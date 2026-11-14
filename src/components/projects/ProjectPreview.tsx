import type { ReactNode } from 'react'
import { asset } from '../../lib/asset'
import { cn } from '../../lib/cn'
import type { ProjectId } from '../../types'

/**
 * Interface previews, drawn in CSS and SVG so they follow the active theme.
 * They illustrate each project's idea; only Reset uses a real screenshot.
 */

const Chip = ({ children, tone = 'quiet' }: { children: ReactNode; tone?: 'quiet' | 'accent' | 'good' | 'warn' }) => (
  <span
    className={cn(
      'label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 whitespace-nowrap',
      tone === 'quiet' && 'border-line text-ink-soft',
      tone === 'accent' && 'border-accent-ink/60 bg-accent/15 text-accent-ink',
      tone === 'good' && 'border-line-strong bg-ink/10 text-ink',
      tone === 'warn' && 'border-gold/60 bg-gold/10 text-gold',
    )}
  >
    {children}
  </span>
)

const Dot = ({ className }: { className?: string }) => (
  <span className={cn('size-1.5 rounded-full', className)} />
)

function ScanInPreview() {
  const bars = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 4, 2, 1]
  let x = 0
  return (
    <div className="flex h-full items-center justify-center gap-5 p-5 sm:gap-8">
      <div className="relative aspect-[9/16] h-[88%] max-h-[23rem] shrink-0 rounded-[1.4rem] border border-line-strong bg-raise p-2.5 shadow-[var(--shadow)]">
        <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[1rem] bg-bg">
          <div className="relative w-[78%] py-3 [--sweep:3.6rem]">
            {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'right-0 bottom-0 border-r-2 border-b-2'].map(corner => (
              <span key={corner} className={cn('absolute size-3 border-accent-ink', corner)} />
            ))}
            <svg viewBox="0 0 48 24" className="mx-auto block h-14 w-full text-ink" preserveAspectRatio="none">
              {bars.map((width, index) => {
                const rect = index % 2 === 0 ? <rect key={index} x={x} y="0" width={width} height="24" fill="currentColor" /> : null
                x += width
                return rect
              })}
            </svg>
            <span className="absolute inset-x-0 top-2 h-0.5 bg-accent shadow-[0_0_12px_2px_var(--accent)] [animation:scan-sweep_2.4s_ease-in-out_infinite]" />
          </div>
          <span className="label mt-3 text-ink-soft">Scanning</span>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Chip tone="good"><Dot className="bg-ink" />Checked in</Chip>
        <Chip tone="warn"><Dot className="bg-gold" />Already checked in</Chip>
        <Chip tone="accent"><Dot className="bg-accent-ink" />Not on roster</Chip>
        <Chip><Dot className="bg-ink-soft" />Saved offline</Chip>
      </div>
    </div>
  )
}

function ClearScriptPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      <div className="rounded-xl border border-line bg-raise p-4">
        <svg viewBox="0 0 220 34" className="h-9 w-full text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M4 22c6-14 9 10 14-2s6 8 11-1 5 9 10 0 7 6 12-3" />
          <path d="M66 20c5-12 8 9 13-1s7 9 12-2 6 10 11 0 6 7 12-2 6 6 10 0" className="text-accent-ink" stroke="currentColor" />
          <path d="M140 21c5-10 7 7 12-1s5 6 10-2 6 8 11 0 6 5 10-1 7 4 12-2" />
        </svg>
        <p className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-sm text-ink">
          <span>
            Tab.{' '}
            <mark className="rounded bg-accent/20 px-1.5 py-0.5 text-accent-ink underline decoration-dashed underline-offset-4">
              amlodipine?
            </mark>
          </span>
          <Chip tone="accent">Flagged</Chip>
        </p>
      </div>
      <ul className="space-y-1.5 font-mono text-xs">
        {[
          ['Reader 1', 'amlodipine', false],
          ['Reader 2', 'amiloride', true],
          ['Reader 3', 'amlodipine', false],
        ].map(([reader, word, differs]) => (
          <li key={reader as string} className="flex items-center justify-between rounded-lg border border-line px-3 py-1.5">
            <span className="text-ink-soft">{reader}</span>
            <span className={differs ? 'text-accent-ink' : 'text-ink'}>{word}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProofPilotPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      <div className="flex flex-wrap gap-1.5">
        <Chip tone="warn">Duplicate rows</Chip>
        <Chip tone="warn">Mixed currencies</Chip>
        <Chip tone="warn">Ambiguous dates</Chip>
      </div>
      <pre className="overflow-hidden rounded-xl border border-line bg-raise p-4 font-mono text-[0.7rem] leading-6 text-ink-soft">
        <span className="text-ink-soft/70"># proofs/q_1.py</span>
        {'\n'}
        <span className="text-ink">orders</span> = pd.read_csv(<span className="text-accent-ink">"orders.csv"</span>)
        {'\n'}
        <span className="text-ink">orders</span> = orders.drop_duplicates()
        {'\n'}
        print(<span className="text-accent-ink">"RESULT="</span>, total)
      </pre>
      <ol className="label flex items-center gap-2 text-ink-soft">
        <li>Run</li>
        <li aria-hidden="true" className="h-px flex-1 bg-line-strong" />
        <li>Re-run</li>
        <li aria-hidden="true" className="h-px flex-1 bg-line-strong" />
        <li className="text-ink">Match ✓</li>
      </ol>
    </div>
  )
}

function LaneGuardPreview() {
  return (
    <div className="relative h-full overflow-hidden">
      <svg viewBox="0 0 320 220" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M0 96h320" stroke="var(--line-strong)" />
        <path d="M118 96 20 220M202 96l98 124" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M160 100v120" stroke="var(--ink-soft)" strokeWidth="2" strokeDasharray="10 12" className="[animation:dash-flow_1.2s_linear_infinite]" />
        <path d="M136 96 84 220h152L184 96Z" fill="var(--accent)" opacity=".1" />
        {[0, 1, 2].map(index => (
          <path
            key={index}
            d={`M${44 - index * 13} 128l-12 16 12 16`}
            stroke="var(--accent-ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: `soft-pulse 1.4s ${index * 0.18}s ease-in-out infinite` }}
          />
        ))}
        <path d="M232 60a72 72 0 0 1 56 0" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" />
        <path d="M232 60a72 72 0 0 1 34-5.5" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-x-4 top-4 flex items-start justify-between">
        <Chip tone="accent">Drift left</Chip>
        <span className="label text-ink-soft">Speed</span>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 rounded-lg border border-line bg-glass px-3 py-2 backdrop-blur">
        <span className="label text-ink">Lane hold</span>
        <span className="label text-ink-soft">Following distance</span>
      </div>
    </div>
  )
}

function ParkFinderPreview() {
  const markers: Array<[number, number, number, string]> = [
    [58, 52, 24, 'var(--ink)'],
    [150, 38, 6, 'var(--gold)'],
    [236, 74, 0, 'var(--accent)'],
    [104, 132, 12, 'var(--ink)'],
    [214, 150, 3, 'var(--gold)'],
  ]
  return (
    <div className="relative h-full overflow-hidden">
      <svg viewBox="0 0 300 200" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="var(--line-strong)" strokeWidth="7" strokeLinecap="round" opacity=".7">
          <path d="M-10 96h320M128-10v220M-10 168 310 20M214-10v220" />
        </g>
        <path d="M30 186 104 132" stroke="var(--accent-ink)" strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" className="[animation:dash-flow_1.6s_linear_infinite]" />
        <circle cx="30" cy="186" r="6" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
        {markers.map(([cx, cy, free, color]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="15" fill="var(--bg)" stroke={color} strokeWidth="2.5" />
            <text x={cx} y={cy + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill={color} fontFamily="var(--font-mono)">
              {free}
            </text>
          </g>
        ))}
        <circle cx="104" cy="132" r="21" stroke="var(--ink)" strokeWidth="1" opacity=".5" className="origin-[104px_132px] [animation:soft-pulse_2s_ease-in-out_infinite]" />
      </svg>
      <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
        <Chip tone="good"><Dot className="bg-ink" />Available</Chip>
        <Chip tone="warn"><Dot className="bg-gold" />Filling fast</Chip>
        <Chip tone="accent"><Dot className="bg-accent-ink" />Full</Chip>
      </div>
    </div>
  )
}

function RouteSyncPreview() {
  return (
    <div className="relative h-full overflow-hidden">
      <svg viewBox="0 0 300 200" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" fill="none">
        <g fill="var(--raise)" stroke="var(--line-strong)">
          <rect x="22" y="22" width="78" height="46" rx="8" />
          <rect x="128" y="18" width="56" height="70" rx="8" />
          <rect x="210" y="30" width="70" height="40" rx="8" />
          <rect x="30" y="118" width="60" height="60" rx="8" />
          <rect x="196" y="104" width="84" height="56" rx="8" />
        </g>
        <path d="M60 110V92h56v20h66v18h14" stroke="var(--accent-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 7" className="[animation:dash-flow_1.6s_linear_infinite]" />
        <circle cx="60" cy="112" r="6" fill="var(--ink)" stroke="var(--bg)" strokeWidth="2" />
        <path d="M196 118c-6 0-10 4.5-10 9.5 0 7 10 15 10 15s10-8 10-15c0-5-4-9.5-10-9.5Z" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
      </svg>
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-lg border border-line bg-glass px-3 py-2 backdrop-blur">
        <span className="label text-ink">Next class</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
        <span className="label text-accent-ink">Route ready</span>
      </div>
    </div>
  )
}

function ResetPreview() {
  return (
    <div className="flex h-full items-center justify-center gap-6 overflow-hidden p-5 [perspective:900px]">
      <div className="relative h-full w-[46%] max-w-56 shrink-0">
        <img
          src={asset('reset/today-v2.png')}
          alt="Reset app Today screen: training day 9 of 66, power level, and three daily training objectives."
          loading="lazy"
          decoding="async"
          width={400}
          height={860}
          className="absolute top-[6%] left-0 h-auto w-full rounded-[1.2rem] border border-line-strong shadow-[var(--shadow)] [transform:rotateY(-16deg)_rotateX(6deg)]"
        />
      </div>
      <div className="hidden flex-col items-start gap-2 sm:flex">
        <Chip tone="warn">66-day plan</Chip>
        <Chip tone="good">Daily quests</Chip>
        <Chip tone="accent">Streak</Chip>
      </div>
    </div>
  )
}

const previews: Record<ProjectId, () => ReactNode> = {
  scanin: ScanInPreview,
  clearscript: ClearScriptPreview,
  proofpilot: ProofPilotPreview,
  laneguard: LaneGuardPreview,
  parkfinder: ParkFinderPreview,
  routesync: RouteSyncPreview,
  reset: ResetPreview,
}

interface ProjectPreviewProps {
  id: ProjectId
  className?: string
}

export function ProjectPreview({ id, className }: ProjectPreviewProps) {
  const Preview = previews[id]
  // Reset carries a real screenshot with alt text; the rest are decorative drawings.
  return (
    <div
      aria-hidden={id === 'reset' ? undefined : true}
      className={cn('grid-paper relative overflow-hidden rounded-2xl border border-line bg-bg', className)}
    >
      <Preview />
    </div>
  )
}
