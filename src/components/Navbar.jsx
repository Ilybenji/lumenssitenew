import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from './LogoIcon'
import { HoverLink } from './ui/hover-button'

const links = [
  { to: '/', label: 'Home', exact: true },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Outer nav — always fixed full-width, adds top padding when floating */}
      <motion.nav
        animate={{
          paddingTop: (scrolled && !isMobile) ? 12 : 0,
          paddingLeft: (scrolled && !isMobile) ? 20 : 0,
          paddingRight: (scrolled && !isMobile) ? 20 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {/* Inner pill — this is what visually changes */}
        <div
          className={`nav-pill${(scrolled && !isMobile) ? ' nav-pill--floating' : ''}`}
          style={{
            maxWidth: (scrolled && !isMobile) ? '1100px' : '100%',
            margin: '0 auto',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
            transition:
              'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, border-radius 0.4s ease, box-shadow 0.4s ease, max-width 0.4s ease',
            background: scrolled ? 'rgba(12,12,14,0.88)' : 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: (scrolled && !isMobile) ? '9999px' : '0px',
            border: (scrolled && !isMobile) ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0)',
            boxShadow: (scrolled && !isMobile) ? '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Lumense home">
            <LogoIcon fill="var(--color-text)" height={28} />
          </Link>

          {/* Desktop links */}
          <ul style={{
            display: 'flex',
            gap: 'var(--space-10)',
            listStyle: 'none',
            alignItems: 'center',
          }} className="nav-desktop">
            {links.map(({ to, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  style={({ isActive }) => ({
                    fontSize: 'var(--text-sm)',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    position: 'relative',
                    paddingBottom: '2px',
                    transition: 'color var(--duration) var(--ease)',
                  })}
                  className="nav-link"
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <HoverLink to="/contact" variant="accent" size="sm">
                Start a Project →
              </HoverLink>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(v => !v)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: 'var(--space-2)',
            }}
          >
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--color-text)',
              transition: 'transform 0.25s var(--ease), opacity 0.25s',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--color-text)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.25s',
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--color-text)',
              transition: 'transform 0.25s var(--ease), opacity 0.25s',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'var(--color-bg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'var(--container-pad)',
            }}
          >
            <ul style={{ listStyle: 'none' }}>
              {links.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: 'var(--space-6) 0',
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <HoverLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              variant="accent"
              size="sm"
              style={{ marginTop: 'var(--space-10)', alignSelf: 'flex-start' }}
            >
              Start a Project →
            </HoverLink>
            <p style={{
              marginTop: 'var(--space-8)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-muted)',
              letterSpacing: '0.06em',
            }}>
              Stockholm, Sweden
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--color-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s var(--ease-out);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
        .nav-link:hover {
          color: var(--color-text) !important;
        }
        .nav-cta:hover {
          background: var(--color-accent-hover) !important;
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
