import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const images = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524638431109-93d95c968f03?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542773664-4106e5a2b823?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=1200&auto=format&fit=crop',
]

export function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gal-item', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })
      gsap.utils.toArray<HTMLElement>('.parallax').forEach((el) => {
        gsap.to(el, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-['Playfair_Display'] mb-10">
          Lovely Moments
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, idx) => (
            <figure
              key={idx}
              className="gal-item group relative overflow-hidden rounded-2xl aspect-[4/5] bg-white/5 border border-white/10"
            >
              <img
                src={`${src}`}
                alt="memory"
                className="parallax h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:contrast-110"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}