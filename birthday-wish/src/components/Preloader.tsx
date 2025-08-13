import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export function Preloader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onLoad = () => {
      const tl = gsap.timeline()
      tl.to('#preloader', { autoAlpha: 0, duration: 0.6, ease: 'power2.out' })
        .add(() => setHidden(true))
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])

  if (hidden) return null

  return (
    <div id="preloader" className="fixed inset-0 z-50 grid place-items-center bg-[#0e0f1f]">
      <div className="relative flex items-center gap-3 text-white/90">
        <div className="w-3 h-3 rounded-full bg-pink-300 animate-ping" />
        <div className="w-3 h-3 rounded-full bg-purple-300 animate-ping [animation-delay:150ms]" />
        <div className="w-3 h-3 rounded-full bg-yellow-200 animate-ping [animation-delay:300ms]" />
      </div>
    </div>
  )
}