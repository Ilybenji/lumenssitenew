import { useEffect, useRef } from 'react'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

const PARTICLE_COUNT = 90
const ACCENT_RGB = hexToRgb('#57B8FF')
const PALE_RGB = [60, 55, 50]

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let particles = []
    let w, h

    function resize() {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const isAccent = Math.random() < 0.25
        const [r, g, b] = isAccent ? ACCENT_RGB : PALE_RGB
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          size: Math.random() * 1.4 + 0.4,
          alpha: isAccent ? Math.random() * 0.18 + 0.06 : Math.random() * 0.10 + 0.04,
          r, g, b,
        }
      })
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.x < -2) p.x = w + 2
        else if (p.x > w + 2) p.x = -2
        if (p.y < -2) p.y = h + 2
        else if (p.y > h + 2) p.y = -2
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      createParticles()
    })
    resizeObserver.observe(canvas)

    resize()
    createParticles()
    draw()

    return () => {
      resizeObserver.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
