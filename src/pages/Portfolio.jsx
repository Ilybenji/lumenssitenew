import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import ScrollReveal from '../components/ScrollReveal'
import PortfolioCard from '../components/PortfolioCard'

const PROJECTS = [
  { id: 1, title: 'Norr Identity', category: 'Branding', year: '2024' },
  { id: 2, title: 'Sequence 001', category: 'Motion', year: '2024' },
  { id: 3, title: 'Forma Annual Report', category: 'Graphic', year: '2023' },
]

const FILTERS = ['All', 'Branding', 'Motion', 'Graphic']

export default function Portfolio() {
  useSEO({
    title: 'Creative Portfolio — Visual Identity & Motion Work | Lumense',
    description: 'Browse Lumense\'s portfolio of branding, motion design, and graphic design projects for forward-thinking companies worldwide.',
    path: '/work',
  })

  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <main id="main-content" className="page">
      <div className="container">
        {/* Page header */}
        <div style={{
          paddingTop: 'var(--space-20)',
          paddingBottom: 'var(--space-12)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-8)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <ScrollReveal>
            <div>
              <span className="accent-label" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
                Selected work
              </span>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, var(--text-6xl))',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--space-3)',
                flexWrap: 'wrap',
              }}>
                <span>Branding &amp; Design Work.</span>
                <span style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-muted)',
                  fontWeight: 400,
                  letterSpacing: '0',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  ({filtered.length})
                </span>
              </h1>
            </div>
          </ScrollReveal>

          {/* Filter bar */}
          <ScrollReveal delay={0.08}>
            <nav
              role="tablist"
              aria-label="Filter by category"
              style={{
                display: 'flex',
                gap: '2px',
                border: '1px solid var(--color-border)',
              }}
            >
              {FILTERS.map(f => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active === f}
                  onClick={() => setActive(f)}
                  style={{
                    padding: 'var(--space-3) var(--space-5)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: active === f ? 'var(--color-bg)' : 'var(--color-muted)',
                    background: active === f ? 'var(--color-accent)' : 'transparent',
                    borderRadius: 0,
                    border: 'none',
                    transition: 'background var(--duration) var(--ease), color var(--duration) var(--ease)',
                    position: 'relative',
                  }}
                >
                  {f}
                </button>
              ))}
            </nav>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-24)' }}>
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--color-border)',
            }}
            className="work-grid"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <div
                  key={project.id}
                  style={{
                    background: 'var(--color-bg)',
                    gridColumn: i === 0 ? 'span 2' : 'span 1',
                  }}
                  className={i === 0 ? 'work-featured' : ''}
                >
                  <PortfolioCard
                    title={project.title}
                    category={project.category}
                    year={project.year}
                    index={i}
                    featured={i === 0}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-32) 0',
              color: 'var(--color-muted)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.06em',
            }}>
              No projects found.
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .work-featured { grid-column: span 1 !important; }
        }
      `}</style>
    </main>
  )
}
