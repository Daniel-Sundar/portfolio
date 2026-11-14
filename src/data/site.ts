import type { Achievement, NavItem, SkillPillar, SocialLink, ThemeMeta } from '../types'

export const site = {
  name: 'Daniel S',
  monogram: 'DS.',
  eyebrow: ['18 Y/O', 'B.E. CSE', 'Design Thinker'],
  taglines: ['ASPIRING DEVELOPER //', 'UI/UX ENTHUSIAST //', 'CREATIVE PROBLEM SOLVER'],
  intro:
    'Hi, I’m Daniel S, a first-year B.E. Computer Science and Engineering student with a passion for technology and software development. I have knowledge of HTML, CSS, Python, and React, and I’m continuously exploring new technologies to improve my skills. I enjoy problem-solving, creative thinking, leadership, and public speaking. I’m passionate about learning, building innovative projects, and showcasing my journey as an aspiring developer.',
  contactHeading: 'Have an idea? Let’s build something great.',
  contactCopy:
    'I’m always interested in exploring ideas, learning new technologies, collaborating on creative projects, and connecting with people who enjoy building meaningful digital experiences.',
  footerHeadline: ['Let’s build', 'something', 'unforgettable.'],
  copyright: '© 2026 Daniel S. Crafted with meticulous design thinking.',
} as const

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Daniel-Sundar',
    handle: 'Daniel-Sundar',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/daniel-s-47b01b426/',
    handle: 'daniel-s',
    icon: 'linkedin',
  },
]

export const themes: ThemeMeta[] = [
  { id: 'obsidian', name: 'Obsidian Crimson', swatch: ['#121314', '#1B3B2B', '#DC143C'], mode: 'dark' },
  { id: 'mocha', name: 'Mocha Champagne', swatch: ['#231916', '#E6D2B5', '#C85A17'], mode: 'dark' },
  { id: 'editorial', name: 'Editorial', swatch: ['#FEEDED', '#B17375', '#B11D1D'], mode: 'light' },
]

export const ribbonWords = [
  'UI/UX DESIGN',
  'CREATIVE THINKING',
  'PROBLEM SOLVING',
  'PUBLIC SPEAKING',
  'REACT',
  'PYTHON',
  'HACKATHON WINNER',
]

export const techStack = ['HTML5', 'CSS3', 'Python', 'React', 'Tailwind CSS', 'Figma', 'Git'] as const

export const about = {
  heading: 'A little about myself.',
  lead: 'I’m a first-year Computer Science and Engineering student finding my way into software by building things.',
  body: [
    'Right now that means exploring software development and frontend engineering, and learning how good UI/UX turns an idea into something people can actually use.',
    'I like the overlap between creative coding and practical digital solutions: projects that look considered and also solve a real problem.',
  ],
  exploring: [
    'Software development',
    'Frontend engineering',
    'UI/UX',
    'Creative coding',
    'Practical digital solutions',
  ],
  facts: [
    { key: 'age', value: '18' },
    { key: 'degree', value: 'B.E. Computer Science and Engineering' },
    { key: 'year', value: 'First year' },
    { key: 'knows', value: 'HTML, CSS, Python, React' },
    { key: 'enjoys', value: 'Problem-solving, creative thinking, leadership, public speaking' },
  ],
} as const

export const achievements: Achievement[] = [
  {
    id: 'hack-a-mode',
    event: 'Hack-a-Mode Hackathon',
    result: '1st Place Winner',
    summary:
      'Recognized for rapid product execution, UI/UX design thinking, and live stage pitching.',
    highlights: ['Rapid product execution', 'UI/UX design thinking', 'Live stage pitching'],
  },
  {
    id: 'hacknex',
    event: 'Hacknex',
    result: 'Internal Qualified External Participant',
    summary:
      'Qualified through competitive internal screening to represent and compete at the external hackathon stage.',
    highlights: ['Competitive internal screening', 'External hackathon stage'],
  },
]

export const skillPillars: SkillPillar[] = [
  {
    id: 'uiux',
    title: 'UI/UX Design',
    icon: 'design',
    summary: 'Making interfaces that are clear first and good-looking second.',
    points: [
      'Design systems',
      'Wireframing',
      'Color theory',
      'Micro-interactions',
      'Responsive hierarchy',
    ],
  },
  {
    id: 'problem',
    title: 'Problem Solving',
    icon: 'logic',
    summary: 'Taking something tangled and turning it into steps.',
    points: [
      'Analytical thinking',
      'Logical reasoning',
      'Breaking complex problems into workflows',
    ],
  },
  {
    id: 'creative',
    title: 'Creative Thinking',
    icon: 'spark',
    summary: 'Looking for the idea that makes a project worth building.',
    points: ['Ideation', 'Digital experiences', 'Aesthetic and functional balance'],
  },
  {
    id: 'leadership',
    title: 'Leadership & Communication',
    icon: 'voice',
    summary: 'Explaining the work and bringing people along with it.',
    points: ['Public speaking', 'Collaboration', 'Leadership', 'Technical presentations'],
  },
]
