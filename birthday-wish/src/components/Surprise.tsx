import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Surprise() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
      tl.fromTo(
        '.cake',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.candle',
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.15 },
          '-=0.2'
        )
        .fromTo(
          '.flame',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }
        )

      gsap.to({}, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          onEnter: () => tl.play(),
        }
      })

      // Flicker loop
      gsap.utils.toArray<HTMLElement>('.flame').forEach((el) => {
        gsap.to(el, {
          scale: 1.06,
          y: -2,
          repeat: -1,
          yoyo: true,
          duration: 0.6,
          ease: 'sine.inOut',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] mb-8">
          Make a Wish
        </h2>
        <div className="cake mx-auto relative w-72 h-72">
          {/* Cake base */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-28 bg-gradient-to-b from-rose-200/80 to-pink-300/60 rounded-b-[36px] rounded-t-[24px] border border-white/20 shadow-2xl" />
          {/* Icing layers */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-60 h-10 bg-white/70 rounded-full blur-[1px]" />
          <div className="absolute bottom-18 left-1/2 -translate-x-1/2 w-56 h-8 bg-white/60 rounded-full blur-[1px]" />
          {/* Candles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="candle absolute bottom-36 left-1/2 -translate-x-1/2"
              style={{ transform: `translateX(${(i - 2) * 24}px)` }}
            >
              <div className="w-2 h-10 bg-pink-200 rounded-sm border border-white/30 mx-auto" />
              <div className="flame mx-auto -mt-2 w-3 h-4 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_12px_rgba(245,210,122,0.9)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}