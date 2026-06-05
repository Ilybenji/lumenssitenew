import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import ScrollReveal from '../components/ScrollReveal'
import { HoverLink } from '../components/ui/hover-button'

const SERVICES = [
  {
    num: '01',
    title: 'Branding',
    tagline: 'Identities built to endure.',
    description:
      'We build visual identities that hold — from strategy to symbol, typeface to texture. A brand isn\'t a logo. It\'s a system of decisions that compounds over time. We\'re here for the long version.',
    deliverables: ['Brand strategy', 'Visual identity system', 'Logo & mark design', 'Typography system', 'Colour & tone guidelines', 'Brand book & standards'],
  },
  {
    num: '02',
    title: 'Motion Design',
    tagline: 'Ideas that move with intention.',
    description:
      'We animate ideas into life. Brand films, title sequences, UI transitions — motion is the difference between a message and a memory. Every frame is a deliberate decision.',
    deliverables: ['Brand films', 'Title sequences', 'Social content', 'UI animation', 'Motion style guides', 'Explainer videos'],
  },
  {
    num: '03',
    title: 'Graphic Design',
    tagline: 'Print and digital, executed with precision.',
    description:
      'Editorial layouts, campaign materials, packaging, and print — executed with precision. We treat graphic design as applied rigour: every grid, every type size, every margin has a reason.',
    deliverables: ['Editorial design', 'Campaign materials', 'Packaging design', 'Print production', 'Digital assets', 'Art direction'],
  },
]

export default function Services() {
  useSEO({
    title: 'Branding, Motion & Graphic Design Services | Lumense',
    description: 'Expert branding, motion design, and graphic design for ambitious brands. Visual identity systems, brand films, and editorial design from Stockholm.',
    path: '/services',
  })

  return (
    <main id="main-content" className="page" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Page-level gradient accents */}
      <div style={{ position: 'fixed', top: '-200px', right: '-300px', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(87,184,255,0.18) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-200px', left: '-200px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(33,118,174,0.2) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Page header */}
        <div style={{
          paddingTop: 'var(--space-20)',
          paddingBottom: 'var(--space-16)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <ScrollReveal>
            <span className="accent-label" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>
              What we do
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, var(--text-6xl))',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: 'var(--color-text)',
              maxWidth: '700px',
            }}>
              Branding, Motion<br />&amp; Graphic Design.
            </h1>
          </ScrollReveal>
        </div>

        {/* Service blocks */}
        {SERVICES.map(({ num, title, tagline, description, deliverables }, i) => (
          <ScrollReveal key={title} delay={0.05}>
            <motion.div
              whileHover="hover"
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: 'var(--space-8)',
                padding: 'var(--space-20) 0',
                borderBottom: '1px solid var(--color-border)',
                alignItems: 'start',
                position: 'relative',
              }}
              className="service-row"
            >
              {/* Number */}
              <div style={{ paddingTop: '6px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.06em',
                }}>
                  {num}
                </span>
              </div>

              {/* Content: title + description + deliverables stacked */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'start' }} className="service-inner">
                {/* Left: title + tagline */}
                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.75rem, 4vw, var(--text-4xl))',
                    fontWeight: 400,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    marginBottom: 'var(--space-4)',
                  }}>
                    {title}
                  </h2>
                  <span style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-accent)',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    marginBottom: 'var(--space-6)',
                  }}>
                    {tagline}
                  </span>

                  {/* Arrow that shifts right on row hover */}
                  <motion.span
                    variants={{ hover: { x: 6, color: 'var(--color-accent)' }, initial: { x: 0, color: 'var(--color-muted)' } }}
                    initial={{ x: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                      display: 'inline-block',
                      fontSize: 'var(--text-xl)',
                      color: 'var(--color-muted)',
                    }}
                  >
                    →
                  </motion.span>
                </div>

                {/* Right: description + deliverables */}
                <div>
                  <p style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.75,
                    marginBottom: 'var(--space-8)',
                    fontWeight: 300,
                  }}>
                    {description}
                  </p>

                  <div>
                    <span className="label" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
                      Deliverables
                    </span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {deliverables.map(item => (
                        <li key={item} style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                        }}>
                          <span style={{
                            width: '4px',
                            height: '4px',
                            background: 'var(--color-accent)',
                            flexShrink: 0,
                          }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}

        {/* Bottom CTA */}
        <div style={{
          position: 'relative',
          padding: 'var(--space-32) 0',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-10)',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            height: '60vh',
            background: 'radial-gradient(ellipse at center, rgba(33,118,174,0.22) 0%, rgba(87,184,255,0.1) 45%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <ScrollReveal>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, var(--text-4xl))',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              maxWidth: '520px',
              position: 'relative',
            }}>
              Have a project in mind? Let's make it something worth talking about.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <HoverLink to="/contact" variant="accent">Get in touch →</HoverLink>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-row { grid-template-columns: 1fr !important; gap: var(--space-4) !important; }
          .service-inner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .service-row { padding: var(--space-10) 0 !important; }
        }
      `}</style>
    </main>
  )
}
