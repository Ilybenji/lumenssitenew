import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import ScrollReveal from '../components/ScrollReveal'

const CHANNELS = [
  {
    label: 'Email',
    handle: 'hello@lumense.se',
    href: 'mailto:hello@lumense.se',
    description: 'For project enquiries & general questions',
  },
  {
    label: 'Dribbble',
    handle: '@lumense',
    href: 'https://dribbble.com/lumense',
    description: 'See our design process & shots',
  },
  {
    label: 'Instagram',
    handle: '@lumense.studio',
    href: 'https://instagram.com/lumense.studio',
    description: 'Behind the scenes & finished work',
  },
]

export default function Contact() {
  useSEO({
    title: 'Start Your Branding Project — Contact Lumense',
    description: 'Ready to build a brand that converts? Get in touch with Lumense, Stockholm\'s leading creative studio for branding, motion design, and visual identity.',
    path: '/contact',
  })

  return (
    <main id="main-content" className="page" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-100px', left: '-200px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(33,118,174,0.22) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-150px', right: '-150px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(87,184,255,0.18) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Page header */}
        <div style={{
          paddingTop: 'var(--space-20)',
          paddingBottom: 'var(--space-16)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <ScrollReveal>
            <span className="accent-label" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>
              Get in touch
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, var(--text-6xl))',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
            }}>
              Start your<br />branding project.
            </h1>
          </ScrollReveal>
        </div>

        {/* Channel rows */}
        <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-24)' }}>
          {CHANNELS.map(({ label, handle, href, description }, i) => (
            <ScrollReveal key={label} delay={i * 0.07}>
              <motion.a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover="hover"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr auto',
                  alignItems: 'center',
                  gap: 'var(--space-8)',
                  padding: 'var(--space-10) var(--space-8)',
                  marginBottom: 'var(--space-3)',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  background: 'rgba(18,18,22,0.72)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'transform 0.3s var(--ease-liquid, cubic-bezier(0.34,1.56,0.64,1)), box-shadow 0.3s ease, background 0.2s ease',
                }}
                className="channel-row"
              >
                {/* Platform label */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </span>

                {/* Handle + description */}
                <div>
                  <span style={{
                    display: 'block',
                    fontSize: 'clamp(1.25rem, 3vw, var(--text-3xl))',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    marginBottom: 'var(--space-1)',
                    transition: 'color var(--duration) var(--ease)',
                  }} className="channel-handle">
                    {handle}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.02em',
                  }}>
                    {description}
                  </span>
                </div>

                {/* Arrow */}
                <motion.span
                  variants={{ hover: { x: 6, color: 'var(--color-accent)' } }}
                  initial={{ x: 0, color: 'var(--color-muted)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ fontSize: 'var(--text-xl)', display: 'inline-block' }}
                >
                  →
                </motion.span>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer note */}
        <ScrollReveal delay={0.2}>
          <div style={{
            paddingBottom: 'var(--space-20)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--color-accent)', flexShrink: 0 }} />
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-muted)',
              letterSpacing: '0.04em',
            }}>
              We reply to all enquiries within 48 hours.
            </p>
          </div>
        </ScrollReveal>

      </div>

      <style>{`
        .channel-row:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07) !important;
          background: rgba(24,24,30,0.88) !important;
        }
        .channel-row:hover .channel-handle {
          color: var(--color-accent);
        }
        @media (max-width: 640px) {
          .channel-row {
            grid-template-columns: 1fr auto !important;
            gap: var(--space-4) !important;
          }
          .channel-row > span:first-child {
            display: none;
          }
        }
      `}</style>
    </main>
  )
}
