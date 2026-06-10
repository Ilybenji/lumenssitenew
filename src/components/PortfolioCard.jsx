import { motion } from 'framer-motion'

const CARD_GRADIENT = 'linear-gradient(160deg, #1A1A22 0%, #141418 100%)'

export default function PortfolioCard({ title, category, year, image, href, index }) {
  const Card = href ? motion.a : motion.article

  return (
    <Card
      layout
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      aria-label={`${title} — ${category} project, ${year}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        color: 'inherit',
        textDecoration: 'none',
        cursor: href ? 'pointer' : 'default',
        transition: 'border-color 0.25s ease',
      }}
      whileHover="hover"
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        paddingTop: '62.5%',
        background: CARD_GRADIENT,
        overflow: 'hidden',
      }}>
        {image && (
          <img
            src={image}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Accent bar — slides in on hover */}
        <motion.div
          variants={{ hover: { scaleY: 1 }, initial: { scaleY: 0 } }}
          initial={{ scaleY: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'var(--color-accent)',
            originY: 0,
            zIndex: 2,
          }}
        />

        {/* View Project overlay — fades in on hover */}
        <motion.div
          variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 1,
          }}
        >
          <span style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            View Project <span style={{ fontSize: '1.1em' }}>→</span>
          </span>
        </motion.div>
      </div>

      {/* Card body */}
      <div style={{
        padding: 'var(--space-5) var(--space-5) var(--space-6)',
        background: 'var(--color-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
      }}>
        <div>
          <h3 style={{
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-1)',
          }}>
            {title}
          </h3>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-muted)',
            letterSpacing: '0.06em',
          }}>
            {year}
          </span>
        </div>
        <span style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          border: '1px solid var(--color-accent-border)',
          padding: '3px 8px',
          flexShrink: 0,
        }}>
          {category}
        </span>
      </div>
    </Card>
  )
}
