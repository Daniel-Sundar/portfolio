/** Content for the UI Inspector panel. Values mirror src/styles/index.css. */

export const colorRoles = [
  { token: '--bg', key: 'bg', role: 'Page background', share: '60%' },
  { token: '--raise', key: 'raise', role: 'Raised card surface', share: '60%' },
  { token: '--panel', key: 'panel', role: 'Secondary surface', share: '30%' },
  { token: '--panel-strong', key: 'panelStrong', role: 'Secondary surface, stronger', share: '30%' },
  { token: '--accent', key: 'accent', role: 'Calls to action, highlights', share: '10%' },
  { token: '--accent-deep', key: 'accentDeep', role: 'Accent, pressed and hover', share: '10%' },
  { token: '--accent-ink', key: 'accentInk', role: 'Accent used as small text', share: '10%' },
  { token: '--ink', key: 'ink', role: 'Primary text', share: 'Text' },
  { token: '--ink-soft', key: 'inkSoft', role: 'Secondary text', share: 'Text' },
  { token: '--gold', key: 'gold', role: 'Awards only', share: 'Rare' },
] as const

export const spacingScale = [
  { name: '1', px: 4 },
  { name: '2', px: 8 },
  { name: '3', px: 12 },
  { name: '4', px: 16 },
  { name: '5', px: 20 },
  { name: '6', px: 24 },
  { name: '8', px: 32 },
  { name: '10', px: 40 },
  { name: '16', px: 64 },
] as const

export const layoutTokens = [
  { name: 'Card radius', value: '1.25rem (20px)' },
  { name: 'Control radius', value: 'Full pill' },
  { name: 'Grid', value: '12 columns, 16–20px gap' },
  { name: 'Page gutter', value: 'clamp(1rem, 4vw, 4rem)' },
  { name: 'Section spacing', value: 'clamp(4.5rem, 10vw, 9rem)' },
  { name: 'Max content width', value: '1680px' },
] as const

export const typeRoles = [
  {
    name: 'Display',
    family: 'Archivo, width 125, weight 800',
    className: 'display text-4xl',
    sample: 'Daniel S',
    use: 'Headlines and project titles. Uppercase, tight tracking.',
  },
  {
    name: 'Editorial',
    family: 'Instrument Serif, italic',
    className: 'serif text-3xl italic',
    sample: 'A life-changing factor',
    use: 'Taglines and lead statements.',
  },
  {
    name: 'Body',
    family: 'Archivo, width 100, weight 400',
    className: 'text-base',
    sample: 'Building innovative projects and showcasing the journey.',
    use: 'Paragraphs. Lines stay under about 60 characters.',
  },
  {
    name: 'Technical',
    family: 'JetBrains Mono, weight 500',
    className: 'label',
    sample: '~/daniel/projects',
    use: 'Metadata: paths, status, technology tags.',
  },
] as const

export interface TreeNode {
  name: string
  note?: string
  children?: TreeNode[]
}

export const componentTree: TreeNode = {
  name: 'App',
  children: [
    { name: 'ThemeProvider', note: 'CSS variables + localStorage' },
    { name: 'GlowCursor', note: 'React Bits, desktop only' },
    {
      name: 'Navbar',
      children: [{ name: 'ThemeSwitcher' }, { name: 'Magnet › Let’s Talk', note: 'React Bits' }],
    },
    {
      name: 'Hero',
      children: [
        { name: 'Strands', note: 'React Bits' },
        { name: 'HeroScene', note: 'React Three Fiber, lazy' },
        { name: 'DepthText', note: 'React Bits' },
        { name: 'TechText × 3', note: 'React Bits' },
      ],
    },
    {
      name: 'TechDivider',
      children: [
        { name: 'ScrollVelocity', note: 'React Bits' },
        { name: 'LogoLoop', note: 'React Bits' },
      ],
    },
    { name: 'About', children: [{ name: 'ASCIIText', note: 'React Bits' }] },
    {
      name: 'Projects',
      children: [
        { name: 'ProjectCard × 7', note: 'TiltCard + ProjectPreview' },
        { name: 'ElectricBorder', note: 'React Bits, ScanIn + Reset' },
        { name: 'MiniObject', note: 'React Three Fiber, lazy' },
        { name: 'CaseStudyModal' },
      ],
    },
    { name: 'Achievements', children: [{ name: 'ElectricBorder', note: 'React Bits' }] },
    {
      name: 'Skills',
      children: [
        { name: 'ASCIIText', note: 'React Bits' },
        { name: 'LogoLoop', note: 'React Bits' },
      ],
    },
    { name: 'Contact', children: [{ name: 'Magnet › social links', note: 'React Bits' }] },
    { name: 'Footer' },
    { name: 'Inspector', note: 'This panel' },
  ],
}

export const rationale = [
  {
    title: 'One loud thing per screen',
    body: 'The hero spends its energy on the name and the sculpture behind it. Everything around them is quiet type on a quiet background.',
  },
  {
    title: '60 / 30 / 10',
    body: 'Each theme has one colour that carries the page, one for secondary surfaces and one accent. The accent is kept for actions and for the things that matter most.',
  },
  {
    title: 'Three type voices',
    body: 'Wide display type for names, an italic serif for taglines, and mono for metadata. If text is in mono, it is information about the thing rather than the thing itself.',
  },
  {
    title: 'Honest status',
    body: 'Every project shows whether it is live, in development or a concept. Technology tags appear only where the project’s repository confirms them.',
  },
  {
    title: 'Motion that can be switched off',
    body: 'With reduced motion turned on, the 3D scene becomes a still image and entrances are removed. On phones the heavy effects are replaced with lighter ones.',
  },
] as const
