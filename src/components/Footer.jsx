import { Link } from 'react-router-dom'
import LogoFull from './LogoFull'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Dribbble' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      background: 'var(--color-bg)',
    }}>
      {/* Main footer body */}
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 'var(--space-16)',
        padding: 'var(--space-12) var(--container-pad)',
        alignItems: 'start',
      }} className="footer-grid">

        {/* Left: brand */}
        <div>
          <Link to="/" aria-label="Lumense home" style={{ display: 'inline-block', marginBottom: 'var(--space-4)' }}>
            <LogoFull fill="var(--color-text)" height={24} />
          </Link>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: '280px',
            marginBottom: 'var(--space-4)',
          }}>
            An independent creative studio.<br />Stockholm, Sweden.
          </p>
          <a
            href="mailto:hello@lumense.se"
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-muted)',
              transition: 'color var(--duration) var(--ease)',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}
          >
            hello@lumense.se
          </a>
        </div>

        {/* Right: nav columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-12)',
        }}>
          <div>
            <span className="label" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>
              Pages
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      transition: 'color var(--duration) var(--ease)',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                    onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>
              Connect
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      transition: 'color var(--duration) var(--ease)',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--container-pad)',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
            © 2025 Lumense Studio AB. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
            <a
              href="/privacy"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', transition: 'color var(--duration) var(--ease)' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}
            >
              Privacy
            </a>
            <a
              href="/terms"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', transition: 'color var(--duration) var(--ease)' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-10) !important;
          }
        }
      `}</style>
    </footer>
  )
}
