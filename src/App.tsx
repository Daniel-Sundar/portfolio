import { MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
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
  // Heavy effects start one at a time once the intro is out of the way:
  // 1 = ambient strands and tagline, 2 = 3D sculpture, 3 = cursor glow.
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (intro) return
    const timers = [0, 450, 1300].map((delay, index) => window.setTimeout(() => setStage(index + 1), delay))
    return () => timers.forEach(window.clearTimeout)
  }, [intro])

  return (
    // reducedMotion="user": every Motion animation drops transforms and layout
    // movement when the visitor asks the OS for reduced motion.
    <MotionConfig reducedMotion="user">
      {intro && <Intro onReveal={() => setRevealed(true)} onDone={() => setIntro(false)} />}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-full focus:bg-accent focus:px-5 focus:text-on-accent"
      >
        Skip to content
      </a>
      {stage >= 3 && <CursorGlow />}
      <Navbar visible={revealed} />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero paused={!revealed} stage={stage} />
        <TechDivider />
        <About />
        <Projects />
        <Achievements />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Inspector />
    </MotionConfig>
  )
}
