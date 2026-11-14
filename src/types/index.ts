export type ThemeId = 'obsidian' | 'mocha' | 'editorial'

export interface ThemeMeta {
  id: ThemeId
  name: string
  /** Swatch colours shown in the switcher: 60 / 30 / 10. */
  swatch: [string, string, string]
  mode: 'dark' | 'light'
}

/** Resolved colour values, read from the live CSS variables. */
export interface ThemeColors {
  bg: string
  raise: string
  panel: string
  panelStrong: string
  onPanel: string
  ink: string
  inkSoft: string
  accent: string
  accentDeep: string
  accentInk: string
  gold: string
}

export type SectionId = 'about' | 'projects' | 'achievements' | 'skills' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export type ProjectCategory = 'UI/UX & Systems' | 'Smart Mobility' | 'Productivity'

export type ProjectId =
  | 'scanin'
  | 'clearscript'
  | 'proofpilot'
  | 'laneguard'
  | 'parkfinder'
  | 'routesync'
  | 'reset'

export interface ProjectLink {
  label: string
  href: string
  kind: 'repo' | 'live'
}

export interface Project {
  id: ProjectId
  index: string
  title: string
  tagline: string
  description: string
  category: ProjectCategory
  status: string
  /** True when the entry is a design concept with no public build. */
  concept: boolean
  featured: boolean
  /** Only technology confirmed from the project's own repository. */
  tech: string[]
  links: ProjectLink[]
  caseStudy: {
    overview: string
    problem: string
    solution: string
    features: string[]
    designDecisions: string[]
  }
}

export interface Achievement {
  id: 'hack-a-mode' | 'hacknex'
  event: string
  result: string
  summary: string
  highlights: string[]
}

export interface SkillPillar {
  id: string
  title: string
  icon: 'design' | 'logic' | 'spark' | 'voice'
  summary: string
  points: string[]
}

export interface SocialLink {
  label: string
  href: string
  handle: string
  icon: 'github' | 'linkedin'
}
