import React, { useRef } from "react"
import { useScroll, useTransform, useSpring, motion } from "framer-motion"

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scaleDimensions = () => (isMobile ? [0.9, 1] : [1.05, 1])

  const spring = { stiffness: 60, damping: 20, restDelta: 0.001 }

  const rotateRaw = useTransform(scrollYProgress, [0, 1], isMobile ? [5, 0] : [20, 0])
  const scaleRaw = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translateRaw = useTransform(scrollYProgress, [0, 1], [0, -100])

  const rotate = useSpring(rotateRaw, spring)
  const scale = useSpring(scaleRaw, spring)
  const translate = useSpring(translateRaw, spring)

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? '40rem' : '62rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        padding: isMobile ? '0 1rem' : '0 5rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ paddingTop: isMobile ? '1.5rem' : '5rem', width: '100%', position: 'relative', perspective: '1000px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{ translateY: translate, maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({ rotate, scale, isMobile, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        maxWidth: '64rem',
        marginTop: isMobile ? '1.5rem' : '2.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: isMobile ? '18rem' : '40rem',
        width: '100%',
        border: `${isMobile ? '2px' : '4px'} solid #6C6C6C`,
        padding: isMobile ? '0.5rem' : '1.5rem',
        background: '#222222',
        borderRadius: isMobile ? '16px' : '30px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ height: '100%', width: '100%', overflow: 'hidden', borderRadius: isMobile ? '10px' : '1rem', background: '#0C0C0E' }}>
        {children}
      </div>
    </motion.div>
  )
}
