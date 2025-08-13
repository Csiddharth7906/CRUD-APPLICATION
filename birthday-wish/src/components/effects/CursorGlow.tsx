import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    >
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(closest-side, rgba(245,210,122,0.4), rgba(245,210,122,0.2), transparent)',
          mixBlendMode: 'screen',
        }}
        animate={{ x: pos.x - 160, y: pos.y - 160 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.4 }}
      />
    </motion.div>
  )
}