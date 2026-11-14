import { useState } from 'react'
import { Hero } from './components/hero/Hero'
import { Intro, shouldPlayIntro } from './components/intro/Intro'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Projects } from './components/projects/Projects'
import { About } from './components/sections/About'
import { Achievements } from './components/sections/Achievements'
import { Contact } from './components/sections/Contact'
import { Skills } from './components/sections/Skills'
import { TechDivider } from './components/sections/TechDivider'
import { CursorGlow } from './components/ui/CursorGlow'
import { Inspector } from './components/ui/Inspector'

export default function App() {
  // The site renders underneath the intro from the start, so the reveal is instant.
  const [intro, setIntro] = useState(shouldPlayIntro)
  const [revealed, setRevealed] = useState(!intro)

  return (
    <>
      {intro && <Intro onReveal={() => setRevealed(true)} onDone={() => setIntro(false)} />}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      {revealed && <CursorGlow />}
      <Navbar visible={revealed} />
      <main id="main">
        <Hero paused={!revealed} />
        <TechDivider />
        <About />
        <Projects />
        <Achievements />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Inspector />
    </>
  )
}
