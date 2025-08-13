import { useEffect, useMemo } from 'react'
import { gsap } from 'gsap'

export function FloatingBalloons() {
  const balloons = useMemo(() => Array.from({ length: 12 }), [])

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.balloon').forEach((el) => {
      const duration = gsap.utils.random(16, 28)
      const delay = gsap.utils.random(0, 8)
      gsap.fromTo(
        el,
        { yPercent: 40, x: gsap.utils.random(-20, 20) },
        {
          yPercent: -120,
          x: `+=${gsap.utils.random(-40, 40)}`,
          duration,
          delay,
          repeat: -1,
          ease: 'sine.inOut',
        }
      )
    })
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {balloons.map((_, i) => (
        <div
          key={i}
          className="balloon absolute bottom-[-10%] w-6 h-7 md:w-8 md:h-10 rounded-full"
          style={{
            left: `${(i * 100) / balloons.length}%`,
            background:
              i % 3 === 0
                ? 'radial-gradient(circle at 30% 30%, #fff6, transparent 60%), linear-gradient(to bottom, #f7d6e6, #e86b91)'
                : i % 3 === 1
                ? 'radial-gradient(circle at 30% 30%, #fff6, transparent 60%), linear-gradient(to bottom, #c7b9ff, #8e79ff)'
                : 'radial-gradient(circle at 30% 30%, #fff6, transparent 60%), linear-gradient(to bottom, #f5d27a, #f1b80b)'
          }}
        />
      ))}
    </div>
  )
}