import { useEffect, useRef, useState } from 'react'
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

const MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c7a82b8aa8.mp3?filename=romantic-piano-112199.mp3'

export function AudioControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio(MUSIC_URL)
    audio.loop = true
    audio.volume = 0.4
    audio.muted = true
    audioRef.current = audio
    audio.addEventListener('canplaythrough', () => setReady(true), { once: true })

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = async () => {
    if (!audioRef.current) return
    const audio = audioRef.current
    if (isMuted) {
      audio.muted = false
      setIsMuted(false)
      try {
        await audio.play()
      } catch {}
    } else {
      audio.muted = true
      setIsMuted(true)
      audio.pause()
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        disabled={!ready}
        onClick={toggle}
        className="glass-card px-4 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-white/15 disabled:opacity-60"
        aria-label="Toggle background music"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        <span>{isMuted ? 'Play' : 'Pause'}</span>
      </button>
    </div>
  )
}