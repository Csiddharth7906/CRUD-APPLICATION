import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'

const messageText = `On your special day, I hope your heart sparkles a little brighter, your smile shines a little wider, and your dreams feel a little closer. Thank you for being the beautiful light you are. Happy Birthday!`

export function Message() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const words = useMemo(() => messageText.split(' '), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.msg-word', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="px-6 py-20">
      <div className="max-w-3xl mx-auto glass-card p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] mb-4">
          A little note
        </h2>
        <p className="text-base md:text-lg leading-8 text-white/85">
          {words.map((w, i) => (
            <span key={i} className="msg-word inline-block mr-1">
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}