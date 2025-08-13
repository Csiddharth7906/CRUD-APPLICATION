import { useEffect, useRef } from 'react'
import './index.css'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Landing } from './components/Landing'
import { Message } from './components/Message'
import { Gallery } from './components/Gallery'
import { MemoriesTimeline } from './components/MemoriesTimeline'
import { Surprise } from './components/Surprise'
import { Finale } from './components/Finale'
import { FloatingBalloons } from './components/effects/FloatingBalloons'
import { CursorGlow } from './components/effects/CursorGlow'
import { BackgroundParticles } from './components/effects/BackgroundParticles'
import { AudioControl } from './components/AudioControl'
import { Preloader } from './components/Preloader'

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.07,
      wheelMultiplier: 0.9,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Preloader />
      <BackgroundParticles />
      <FloatingBalloons />
      <CursorGlow />
      <AudioControl />

      <main className="relative z-10">
        <Landing name="Her Name" />
        <Message />
        <Gallery />
        <MemoriesTimeline />
        <Surprise />
        <Finale />
      </main>
    </div>
  )
}

export default App
