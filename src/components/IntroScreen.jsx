import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const videoRef = useRef(null)

  const dismiss = () => {
    if (fading) return
    setFading(true)
    setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 700)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {})

    const onEnd = () => dismiss()
    video.addEventListener('ended', onEnd)
    return () => video.removeEventListener('ended', onEnd)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0C0C0E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            muted
            playsInline
            preload="auto"
            title="Lumense — Branding & Motion Design Studio intro reel"
            aria-label="Lumense studio intro reel"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Skip button */}
          <button
            onClick={dismiss}
            style={{
              position: 'absolute',
              bottom: 'clamp(1.5rem, 4vw, 2.5rem)',
              right: 'clamp(1.5rem, 4vw, 2.5rem)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.1rem',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
