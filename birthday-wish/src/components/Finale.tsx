import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Finale() {
  const [open, setOpen] = useState(false)
  return (
    <section className="px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] mb-6">
          Wishing you the best year ahead ❤️
        </h2>
        <p className="text-white/85 mb-10">
          May your days be filled with love, laughter, and all the wonders you deserve.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-300 to-yellow-200 text-black font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Open Your Gift
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 glass-card p-4"
            >
              <img
                alt="gift"
                className="w-full rounded-2xl"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWRjaWFsN3hkNDFxdzN5MHFodjc0OHVtN3Q4a2VwZXd5cDZ4MG5xdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cn1J1Ww6C3iT2/giphy.gif"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}