# Daniel S — Portfolio

Interactive developer portfolio built with React, Vite, TypeScript, Tailwind CSS v4,
Motion (Framer Motion) and React Three Fiber.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # type-check and build to dist/
npm run preview  # serve the production build
```

## Where things live

```
src/
  data/         All portfolio content. Edit text here, not in components.
    site.ts       Name, intro, nav, social links, themes, achievements, skills
    projects.ts   The seven projects and their case studies
    inspector.ts  Content for the UI Inspector panel
  styles/       index.css: design tokens and the three themes (CSS variables)
  context/      ThemeContext: theme switching, saved in localStorage
  hooks/        Media queries, active section, dialog behaviour
  components/
    reactbits/  Components from reactbits.dev (TS + Tailwind variants)
    hero/       Hero, the 3D scene and its static fallback
    three/      Small 3D objects used on the featured project cards
    projects/   Grid, cards, drawn previews, case-study modal
    sections/   Tech divider, About, Achievements, Skills, Contact
    layout/     Navbar, theme switcher, footer
    ui/         Shared pieces: links, modal, tilt card, inspector, icons
```

## Themes

Three themes are defined as CSS variables in `src/styles/index.css` under
`[data-theme='obsidian' | 'mocha' | 'editorial']`. Components only use the variables,
so changing a value there changes it everywhere, including the WebGL effects.

## React Bits components

Installed from the official registry (`https://reactbits.dev/r/<Name>-TS-TW.json`) and kept
unmodified in `src/components/reactbits/`, apart from one renamed unused parameter in
`ScrollVelocity.tsx` so the strict TypeScript build passes:

Strands, GlowCursor, DepthText, TechText, ASCIIText, ScrollVelocity, ElectricBorder,
LogoLoop, Magnet.

## Performance and accessibility notes

- three.js is in its own chunk and is only downloaded on screens 768px and wider with
  WebGL2 and motion allowed. Phones get a static CSS version of the hero sculpture.
- 3D canvases stop rendering when they are off screen.
- With `prefers-reduced-motion`, the 3D scene, cursor glow and entrance animations are off.
- Modals trap focus, close on Escape, and return focus to the button that opened them.

## SEO, accessibility and security notes

- `index.html` holds the title, description, canonical URL, Open Graph / Twitter tags and a
  JSON-LD `@graph` (WebSite, ProfilePage, Person, and an ItemList of the seven projects).
  Update it when projects change. `public/og-image.png` is the 1200×630 share image.
- `public/sitemap.xml` and `public/robots.txt` ship with the build. Crawlers only read
  `robots.txt` at a domain root, so on GitHub Pages submit the sitemap in Google Search Console.
- The page has exactly one `<h1>` (Hero). DepthText draws its depth layers with CSS `content`,
  so the name exists once in the DOM. Canvas text (TechText, ASCIIText) takes an `ariaLabel`.
- Interactive controls are at least 44×44px; the focus ring is a 3px `:focus-visible` outline.
  All theme text pairs meet WCAG AA 4.5:1.
- The production build adds a Content-Security-Policy `<meta>` (see `vite.config.ts`); inline
  scripts are allowed by SHA-256 hash, computed at build time.
