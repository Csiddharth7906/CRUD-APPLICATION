import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const timelineItems = [
  {
    title: 'The day we met',
    text: 'A moment that became the start of so many beautiful memories.',
    img: 'https://images.unsplash.com/photo-1529336953121-a9d0a325d83e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Smiles and sunsets',
    text: 'We watched the sky paint stories while laughing at little things.',
    img: 'https://images.unsplash.com/photo-1520976601715-b65de0c9c8df?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'A favorite day',
    text: 'Because you were there, it was perfect.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
  },
]

export function MemoriesTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.tl-item').forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 30,
          x: i % 2 === 0 ? -30 : 30,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-['Playfair_Display'] mb-14">
          Our Memories
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 -ml-[1px] h-full w-[2px] bg-white/15" />
          <div className="space-y-12">
            {timelineItems.map((item, i) => (
              <div key={i} className={`tl-item flex flex-col ${i % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6`}>
                <img
                  src={item.img}
                  className="w-full md:w-[44%] aspect-video object-cover rounded-2xl border border-white/10 shadow-2xl"
                  loading="lazy"
                />
                <div className="w-full md:w-[44%] glass-card p-6">
                  <h3 className="text-xl md:text-2xl font-['Playfair_Display'] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/85 leading-7">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}