import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps): IconProps => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  ...props,
})

export const GitHubIcon = (props: IconProps) => (
  <svg {...base(props)} fill="currentColor" stroke="none">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
)

export const LinkedInIcon = (props: IconProps) => (
  <svg {...base(props)} fill="currentColor" stroke="none">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.88 2.5 4.88 5.9V21h-4v-4.95c0-1.3-.03-2.97-1.86-2.97-1.87 0-2.14 1.4-2.14 2.87V21h-4V9.75Z" />
  </svg>
)

export const ArrowUpRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowDown = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

export const ArrowUp = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)

export const InspectIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3.5" y="3.5" width="12" height="12" rx="2" strokeDasharray="2.5 2.5" />
    <path d="m12 12 8.5 3.2-3.6 1.7-1.7 3.6L12 12Z" fill="currentColor" stroke="none" />
  </svg>
)

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

/* Skill pillar marks. Drawn for this site rather than taken from an icon set. */

export const DesignMark = (props: IconProps) => (
  <svg {...base(props)} viewBox="0 0 32 32" width={32} height={32}>
    <rect x="4" y="4" width="24" height="24" rx="3" />
    <path d="M4 12h24M13 12v16" />
    <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
    <path d="M17 17h7M17 21h5" />
  </svg>
)

export const LogicMark = (props: IconProps) => (
  <svg {...base(props)} viewBox="0 0 32 32" width={32} height={32}>
    <rect x="12" y="3" width="8" height="6" rx="1.5" />
    <rect x="3" y="23" width="8" height="6" rx="1.5" />
    <rect x="21" y="23" width="8" height="6" rx="1.5" />
    <path d="M16 9v6M7 23v-4a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4" />
  </svg>
)

export const SparkMark = (props: IconProps) => (
  <svg {...base(props)} viewBox="0 0 32 32" width={32} height={32}>
    <path d="M16 3c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11Z" />
    <path d="M25 22v6M22 25h6" />
  </svg>
)

export const VoiceMark = (props: IconProps) => (
  <svg {...base(props)} viewBox="0 0 32 32" width={32} height={32}>
    <path d="M5 13v6M10 9v14M15 5v22M20 10v12M25 14v4" />
    <path d="M28 8c1.6 2.3 2.4 5 2.4 8s-.8 5.7-2.4 8" opacity=".5" />
  </svg>
)

export const TrophyMark = (props: IconProps) => (
  <svg {...base(props)} viewBox="0 0 120 140" width={120} height={140} strokeWidth={2}>
    <path d="M34 14h52v34a26 26 0 0 1-52 0V14Z" />
    <path d="M34 22H14v8a20 20 0 0 0 21 20M86 22h20v8a20 20 0 0 1-21 20" />
    <path d="M60 74v24M42 98h36l5 16H37l5-16ZM30 114h60v12H30z" />
    <path d="M52 30 60 24v26M52 50h16" strokeWidth={3} />
  </svg>
)
