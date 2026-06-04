import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import { HoverLink } from '../components/ui/hover-button'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | Lumense',
    description: 'The page you\'re looking for doesn\'t exist. Return to Lumense — Stockholm\'s branding and motion design studio.',
    path: '/',
  })

  return (
    <main id="main-content" style={{
      display: 'flex',
      alignItems: 'center',
      minHeight: '100dvh',
      paddingTop: 'var(--nav-height)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(33,118,174,0.09) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-2vw',
        right: '-1vw',
        fontSize: '40vw',
        fontWeight: 700,
        color: 'var(--color-text)',
        opacity: 0.02,
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.06em',
      }}>
        404
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 'var(--space-6)',
          }}>
            404 — Page not found
          </span>

          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            marginBottom: 'var(--space-8)',
          }}>
            Nothing<br />
            <span style={{ color: 'var(--color-accent)' }}>here.</span>
          </h1>

          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            fontWeight: 300,
            maxWidth: '400px',
            lineHeight: 1.65,
            marginBottom: 'var(--space-12)',
          }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <HoverLink to="/" variant="accent">Back to home →</HoverLink>
            <HoverLink to="/work" variant="outline">View our work</HoverLink>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
