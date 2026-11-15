import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import {
  colorRoles,
  componentTree,
  layoutTokens,
  rationale,
  spacingScale,
  typeRoles,
  type TreeNode,
} from '../../data/inspector'
import { asset } from '../../lib/asset'
import { cn } from '../../lib/cn'
import { contrastRatio } from '../../lib/color'
import { ThemeSwitcher } from '../layout/ThemeSwitcher'
import Magnet from '../reactbits/Magnet'
import { CheckIcon, CloseIcon, InspectIcon } from './Icons'
import { Modal } from './Modal'

const tabs = ['Colour', 'Type', 'Spacing', 'Structure', 'Rationale', 'Iterations'] as const
type Tab = (typeof tabs)[number]

function ColourTab() {
  const { colors, meta } = useTheme()
  const [copied, setCopied] = useState<string | null>(null)
  const ratio = contrastRatio(colors.ink, colors.bg)
  const softRatio = contrastRatio(colors.inkSoft, colors.bg)

  const copy = async (token: string) => {
    try {
      await navigator.clipboard.writeText(`var(${token})`)
      setCopied(token)
      window.setTimeout(() => setCopied(current => (current === token ? null : current)), 1600)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-soft">
          Active theme: <strong className="text-ink">{meta.name}</strong>. Values below are read live
          from the page.
        </p>
        <div className="mt-4 flex h-10 overflow-hidden rounded-xl border border-line-strong" aria-hidden="true">
          <span className="grid w-[60%] place-items-center font-mono text-xs" style={{ background: colors.bg, color: colors.ink }}>60</span>
          <span className="grid w-[30%] place-items-center font-mono text-xs" style={{ background: colors.panel, color: colors.onPanel }}>30</span>
          <span className="grid w-[10%] place-items-center bg-accent font-mono text-xs text-on-accent">10</span>
        </div>
      </div>

      <ul className="space-y-1.5">
        {colorRoles.map(item => (
          <li key={item.token}>
            <button
              type="button"
              onClick={() => copy(item.token)}
              className="flex w-full items-center gap-3 rounded-xl border border-line p-2 text-left transition-colors hover:border-line-strong"
            >
              <span className="size-9 shrink-0 rounded-lg border border-line-strong" style={{ background: colors[item.key] }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-xs text-ink">{item.token}</span>
                <span className="block truncate text-xs text-ink-soft">{item.role}</span>
              </span>
              <span className="font-mono text-xs text-ink-soft uppercase">
                {copied === item.token ? (
                  <span className="flex items-center gap-1 text-accent-ink">
                    <CheckIcon width={14} height={14} /> Copied
                  </span>
                ) : (
                  colors[item.key]
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-soft">Select a token to copy its CSS variable.</p>

      <dl className="grid grid-cols-2 gap-3">
        {[
          ['Text on background', ratio],
          ['Secondary text on background', softRatio],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-xl border border-line p-3">
            <dt className="text-xs text-ink-soft">{label}</dt>
            <dd className="display m-0 mt-1 text-2xl">
              {typeof value === 'number' ? `${value.toFixed(1)}:1` : 'n/a'}
            </dd>
            {typeof value === 'number' && (
              <p className="label mt-1 text-accent-ink">{value >= 7 ? 'WCAG AAA' : value >= 4.5 ? 'WCAG AA' : 'Large text only'}</p>
            )}
          </div>
        ))}
      </dl>
    </div>
  )
}

function TypeTab() {
  return (
    <ul className="space-y-3">
      {typeRoles.map(item => (
        <li key={item.name} className="rounded-xl border border-line p-4">
          <p className="label flex justify-between gap-3 text-ink-soft">
            <span className="text-accent-ink">{item.name}</span>
            <span className="text-right normal-case tracking-normal">{item.family}</span>
          </p>
          <p className={cn('mt-4 text-ink', item.className)}>{item.sample}</p>
          <p className="mt-3 text-xs text-ink-soft">{item.use}</p>
        </li>
      ))}
    </ul>
  )
}

function SpacingTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="label mb-3 text-accent-ink">Spacing scale (4px base)</h3>
        <ul className="space-y-2">
          {spacingScale.map(step => (
            <li key={step.name} className="flex items-center gap-3">
              <span className="w-8 font-mono text-xs text-ink-soft">{step.name}</span>
              <span className="h-3 rounded-sm bg-accent" style={{ width: step.px * 2 }} aria-hidden="true" />
              <span className="font-mono text-xs text-ink-soft">{step.px}px</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="label mb-3 text-accent-ink">Layout</h3>
        <dl className="divide-y divide-line rounded-xl border border-line">
          {layoutTokens.map(item => (
            <div key={item.name} className="flex justify-between gap-4 px-3 py-2.5 text-sm">
              <dt className="text-ink-soft">{item.name}</dt>
              <dd className="m-0 text-right font-mono text-xs text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function Tree({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  return (
    <li>
      <div className="flex items-baseline gap-2 py-1" style={{ paddingLeft: depth * 16 }}>
        <span className="font-mono text-xs text-accent-ink" aria-hidden="true">{node.children ? '▾' : '·'}</span>
        <span className="font-mono text-[0.8rem] text-ink">&lt;{node.name}&gt;</span>
        {node.note && <span className="text-xs text-ink-soft">{node.note}</span>}
      </div>
      {node.children && (
        <ul>
          {node.children.map(child => (
            <Tree key={child.name} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

function StructureTab({ outline, onToggle }: { outline: boolean; onToggle: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-line p-3">
        <div>
          <p className="text-sm font-semibold">Show layout outlines</p>
          <p className="text-xs text-ink-soft">Draws the box of every element on the page.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={outline}
          aria-label="Show layout outlines"
          onClick={onToggle}
          className="grid min-h-[44px] min-w-[56px] shrink-0 place-items-center rounded-full"
        >
          <span aria-hidden="true" className={cn('relative block h-7 w-12 rounded-full border transition-colors', outline ? 'border-accent bg-accent' : 'border-line-strong')}>
            <motion.span
              className={cn('absolute top-0.5 left-0.5 size-5 rounded-full', outline ? 'bg-on-accent' : 'bg-ink-soft')}
              animate={{ x: outline ? 20 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          </span>
        </button>
      </div>
      <ul className="rounded-xl border border-line p-3">
        <Tree node={componentTree} />
      </ul>
    </div>
  )
}

function RationaleTab() {
  return (
    <ul className="space-y-3">
      {rationale.map(item => (
        <li key={item.title} className="rounded-xl border border-line p-4">
          <h3 className="font-semibold [font-stretch:108%]">{item.title}</h3>
          <p className="mt-1.5 text-sm text-ink-soft">{item.body}</p>
        </li>
      ))}
    </ul>
  )
}

function IterationsTab() {
  const [split, setSplit] = useState(50)
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        Real screens from Reset. The first version was plain and light; the second turned the same
        information into a game interface. Drag the slider to compare.
      </p>
      <div className="relative mx-auto aspect-[400/840] w-full max-w-[280px] overflow-hidden rounded-2xl border border-line-strong">
        <img src={asset('reset/today-v2.png')} alt="Reset Today screen, version 2: dark game-styled layout." className="absolute inset-0 size-full object-cover object-top" />
        <img
          src={asset('reset/today-v1.png')}
          alt="Reset Today screen, version 1: plain light layout."
          className="absolute inset-0 size-full object-cover object-top"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        />
        <span className="absolute inset-y-0 w-0.5 bg-accent" style={{ left: `${split}%` }} aria-hidden="true" />
        <span className="label absolute top-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-white">v1</span>
        <span className="label absolute top-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-white">v2</span>
      </div>
      <label className="block">
        <span className="label text-ink-soft">Version 1 shown: {split}%</span>
        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={event => setSplit(Number(event.target.value))}
          className="mt-2 w-full accent-[var(--accent)]"
        />
      </label>
      <p className="text-xs text-ink-soft">
        Wireframes for the other projects are not included because no source files exist for them
        yet.
      </p>
    </div>
  )
}

export function Inspector() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('Colour')
  const [outline, setOutline] = useState(false)

  useEffect(() => {
    document.documentElement.toggleAttribute('data-outline', outline)
    return () => document.documentElement.removeAttribute('data-outline')
  }, [outline])

  return (
    <>
      <div className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-6">
        <Magnet padding={40} magnetStrength={4}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="flex h-12 items-center gap-2.5 rounded-full border border-line-strong bg-glass px-3.5 text-sm sm:pr-5 sm:pl-4 font-semibold shadow-[var(--shadow)] backdrop-blur-xl transition-colors duration-300 [font-stretch:108%] hover:border-accent hover:bg-accent hover:text-on-accent"
          >
            <InspectIcon />
            <span className="sr-only sm:not-sr-only">
              <span className="sr-only">Open the </span>UI Inspector
            </span>
          </button>
        </Magnet>
      </div>

      <AnimatePresence>
        {open && (
          <Modal labelledBy="inspector-title" onClose={() => setOpen(false)} placement="side">
            <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <h2 id="inspector-title" className="display text-xl">
                  UI Inspector
                </h2>
                <p className="label mt-1 text-ink-soft">How this site is put together</p>
              </div>
              <div className="flex items-center gap-2">
                <ThemeSwitcher layoutId="theme-ring-inspector" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close inspector"
                  className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  <CloseIcon />
                </button>
              </div>
            </header>

            <div role="tablist" aria-label="Inspector sections" className="flex gap-0.5 overflow-x-auto border-b border-line px-3 py-2 [scrollbar-width:none]">
              {tabs.map(item => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  id={`inspector-tab-${item}`}
                  aria-selected={tab === item}
                  aria-controls="inspector-panel"
                  onClick={() => setTab(item)}
                  className={cn(
                    'relative flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full px-2.5 font-mono text-[0.7rem] transition-colors',
                    tab === item ? 'text-on-accent' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {tab === item && (
                    <motion.span layoutId="inspector-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{item}</span>
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id="inspector-panel"
              aria-labelledby={`inspector-tab-${tab}`}
              className="flex-1 overflow-y-auto overscroll-contain p-5"
            >
              <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {tab === 'Colour' && <ColourTab />}
                {tab === 'Type' && <TypeTab />}
                {tab === 'Spacing' && <SpacingTab />}
                {tab === 'Structure' && <StructureTab outline={outline} onToggle={() => setOutline(value => !value)} />}
                {tab === 'Rationale' && <RationaleTab />}
                {tab === 'Iterations' && <IterationsTab />}
              </motion.div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
