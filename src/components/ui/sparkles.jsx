import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 255, g: 255, b: 255 }
}

export function Sparkles({
  className,
  style,
  size = 1,
  minSize,
  density = 800,
  speed = 1,
  minSpeed,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity,
  color = '#FFFFFF',
  background = 'transparent',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rgb = hexToRgb(color)
    let raf

    const maxSize   = size
    const minSz     = minSize   ?? size / 2.5
    const maxSpeed  = speed
    const minSpd    = minSpeed  ?? speed / 10
    const maxOp     = opacity
    const minOp     = minOpacity ?? opacity / 10

    const rand = (lo, hi) => lo + Math.random() * (hi - lo)

    const make = () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      r:   rand(minSz, maxSize),
      vx:  (Math.random() < 0.5 ? -1 : 1) * rand(minSpd, maxSpeed),
      vy:  (Math.random() < 0.5 ? -1 : 1) * rand(minSpd, maxSpeed),
      op:  rand(minOp, maxOp),
      dop: (Math.random() * opacitySpeed * 0.008 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
    })

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || canvas.clientWidth  || 300
      canvas.height = canvas.offsetHeight || canvas.clientHeight || 300
    }

    resize()
    const particles = Array.from({ length: density }, make)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x  += p.vx
        p.y  += p.vy
        p.op += p.dop
        if (p.x < 0) p.x = canvas.width
        else if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        else if (p.y > canvas.height) p.y = 0
        if (p.op >= maxOp || p.op <= minOp) p.dop = -p.dop
        p.op = Math.min(maxOp, Math.max(minOp, p.op))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.op})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    tick()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [color, density, opacity, opacitySpeed, minOpacity, size, minSize, speed, minSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={cn('h-full w-full', className)}
      style={{ display: 'block', background, ...style }}
    />
  )
}
