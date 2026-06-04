import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScrollReveal({ children, delay = 0, y = 28, style, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
