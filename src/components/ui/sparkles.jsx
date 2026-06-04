import { useId } from 'react'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { cn } from '@/lib/utils'

// Module-level stable reference — safe for multiple ParticlesProvider instances
const initEngine = async (engine) => {
  await loadSlim(engine)
}

function SparklesParticles({
  id,
  className,
  style,
  background = 'transparent',
  size = 1,
  minSize,
  density = 800,
  speed = 1,
  minSpeed,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity,
  color = '#FFFFFF',
  options = {},
}) {
  const opts = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: 'none',
        speed: { min: minSpeed ?? speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: minOpacity ?? opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: opacitySpeed },
      },
      size: { value: { min: minSize ?? size / 2.5, max: size } },
    },
    detectRetina: true,
  }

  return (
    <Particles
      id={id}
      options={{ ...opts, ...options }}
      className={cn('h-full w-full', className)}
      style={style}
    />
  )
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
  options = {},
}) {
  const id = useId()

  return (
    <ParticlesProvider init={initEngine}>
      <SparklesParticles
        id={id}
        className={className}
        style={style}
        background={background}
        size={size}
        minSize={minSize}
        density={density}
        speed={speed}
        minSpeed={minSpeed}
        opacity={opacity}
        opacitySpeed={opacitySpeed}
        minOpacity={minOpacity}
        color={color}
        options={options}
      />
    </ParticlesProvider>
  )
}
