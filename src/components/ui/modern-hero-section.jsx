import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric({
  badge = "Stockholm Creative Studio — Est. 2022",
  title1 = "We make your",
  title2 = "ideas move.",
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F0EDE8]"
      style={{ paddingTop: "var(--nav-height)" }}
    >
      {/* Background gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-rose-500/[0.07] blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] mb-8 md:mb-12"
        >
          <Sparkles className="w-3.5 h-3.5 text-black/40" />
          <span className="text-xs text-black/40 tracking-widest uppercase">{badge}</span>
        </motion.div>

        {/* Headline */}
        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0A0A0A] to-[#0A0A0A]/75">
              {title1}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-[#2176AE] to-rose-400">
              {title2}
            </span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
          <p className="text-base sm:text-lg text-black/40 mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto">
            Branding that holds. Motion that resonates. Design that earns attention.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link to="/contact" className="btn btn-accent">
            Start a Project →
          </Link>
          <Link
            to="/work"
            className="btn btn-outline"
            style={{ color: "var(--color-text)", borderColor: "var(--color-border)" }}
          >
            View Our Work
          </Link>
        </motion.div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F0EDE8] via-transparent to-[#F0EDE8]/60 pointer-events-none" />
    </div>
  )
}
