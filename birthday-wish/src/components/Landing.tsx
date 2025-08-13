import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'
import { HeroPhotoFrame } from './sections/HeroPhotoFrame'

type LandingProps = {
  name: string
}

export function Landing({ name }: LandingProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.hb-title',
        { autoAlpha: 0, scale: 0.92, y: 20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1.4 }
      )
        .fromTo(
          '.hb-sub',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hb-photo',
          { autoAlpha: 0, y: 20, rotate: -3 },
          { autoAlpha: 1, y: 0, rotate: 0, duration: 0.8 },
          '-=0.6'
        )
    }, containerRef)

    // Confetti burst
    setTimeout(() => {
      const end = Date.now() + 1200
      const colors = ['#f7d6e6', '#c7b9ff', '#f5d27a', '#ffffff']
      ;(function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      })()
    }, 500)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative grid md:grid-cols-2 gap-10 min-h-[90svh] items-center px-6"
    >
      <div className="max-w-3xl">
        <h1 className="hb-title font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight drop-shadow-[0_6px_30px_rgba(247,214,230,0.35)]">
          Happy Birthday
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-300 to-yellow-200">
            {name}
          </span>
        </h1>
        <p className="hb-sub mt-6 text-lg sm:text-xl text-white/80">
          Wishing you a day as magical as you are.
        </p>
      </div>

      <div className="hb-photo justify-self-center">
        <HeroPhotoFrame src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop" />
      </div>

      {/* Glass glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-30 bg-pink-300"></div>
        <div className="absolute right-10 bottom-8 h-60 w-60 rounded-full blur-3xl opacity-25 bg-purple-300"></div>
      </div>
    </section>
  )
}