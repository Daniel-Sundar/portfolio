import type { ReactNode } from 'react'

/**
 * Simplified one-colour marks for the technology marquee. They use
 * currentColor so they follow the active theme.
 */
const Mark = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
)

const marks: Record<string, ReactNode> = {
  HTML5: (
    <Mark>
      <path d="M5 3h22l-2 22-9 4-9-4L5 3Z" />
      <path d="M21 10H11l.5 5h9l-.6 6-3.9 1.5-3.9-1.5-.2-2.5" />
    </Mark>
  ),
  CSS3: (
    <Mark>
      <path d="M5 3h22l-2 22-9 4-9-4L5 3Z" />
      <path d="M11 10h10l-.4 5H13m7.6 0-.5 6-4.1 1.5-4-1.5-.2-2.5" />
    </Mark>
  ),
  Python: (
    <Mark>
      <path d="M16 3c-4 0-5 1.5-5 4v3h6v1.5H8.5c-3 0-4.5 2-4.5 5s1.5 5 4.5 5H11v-3.5c0-2 1.5-3.5 3.5-3.5h5c2 0 3.5-1.5 3.5-3.5V7c0-2.5-2-4-7-4Z" />
      <path d="M16 29c4 0 5-1.5 5-4v-3h-6v-1.5h8.5c3 0 4.5-2 4.5-5s-1.5-5-4.5-5H21" />
      <circle cx="13.5" cy="6.8" r=".9" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="25.2" r=".9" fill="currentColor" stroke="none" />
    </Mark>
  ),
  React: (
    <Mark>
      <ellipse cx="16" cy="16" rx="13" ry="5" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
      <circle cx="16" cy="16" r="1.8" fill="currentColor" stroke="none" />
    </Mark>
  ),
  'Tailwind CSS': (
    <Mark>
      <path d="M9 13c1-4 3.5-6 7-6 5.5 0 6 4 9 4.5 2 .5 3.5-.5 5-2.5-1 4-3.5 6-7 6-5.5 0-6-4-9-4.5-2-.5-3.5.5-5 2.5Z" />
      <path d="M2 22c1-4 3.5-6 7-6 5.5 0 6 4 9 4.5 2 .5 3.5-.5 5-2.5-1 4-3.5 6-7 6-5.5 0-6-4-9-4.5-2-.5-3.5.5-5 2.5Z" />
    </Mark>
  ),
  Figma: (
    <Mark>
      <path d="M12 3h4v8.5h-4a4.25 4.25 0 0 1 0-8.5ZM16 3h4a4.25 4.25 0 0 1 0 8.5h-4V3ZM12 11.5h4V20h-4a4.25 4.25 0 0 1 0-8.5ZM12 20h4v4.5a4.25 4.25 0 1 1-4-4.5Z" />
      <circle cx="20" cy="15.75" r="4.25" />
    </Mark>
  ),
  Git: (
    <Mark>
      <rect x="6" y="6" width="20" height="20" rx="3" transform="rotate(45 16 16)" />
      <circle cx="16" cy="11" r="1.8" />
      <circle cx="16" cy="21" r="1.8" />
      <circle cx="21" cy="16" r="1.8" />
      <path d="M16 12.8v6.4M17.3 12.3l2.4 2.4" />
    </Mark>
  ),
  'UI/UX Systems': (
    <Mark>
      <rect x="3" y="5" width="26" height="22" rx="3" />
      <path d="M3 11h26M11 11v16M15 16h10M15 21h6" />
    </Mark>
  ),
}

export const logoNames = Object.keys(marks)

export function TechLogo({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap">
      <span className="text-[1em] leading-none text-accent-ink">{marks[name]}</span>
      <span className="font-sans text-[0.5em] font-semibold tracking-tight [font-stretch:110%]">
        {name}
      </span>
    </span>
  )
}
