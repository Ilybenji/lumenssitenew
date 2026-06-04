import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const BRAND_COLORS = {
  accent: { start: "#7CC8F5", end: "#2176AE" },
  outline: { start: "#7CC8F5", end: "#2176AE" },
}

function useCircles() {
  const ref = React.useRef(null)
  const [isListening, setIsListening] = React.useState(false)
  const [circles, setCircles] = React.useState([])
  const lastAdded = React.useRef(0)

  const createCircle = React.useCallback((x, y) => {
    const w = ref.current?.offsetWidth || 1
    const pct = (x / w) * 100
    const color = `linear-gradient(to right, var(--circle-start) ${pct}%, var(--circle-end) ${pct}%)`
    setCircles((prev) => [...prev, { id: Date.now(), x, y, color, fadeState: null }])
  }, [])

  const handlers = React.useMemo(() => ({
    onPointerMove(e) {
      if (!isListening) return
      const now = Date.now()
      if (now - lastAdded.current < 100) return
      lastAdded.current = now
      const rect = e.currentTarget.getBoundingClientRect()
      createCircle(e.clientX - rect.left, e.clientY - rect.top)
    },
    onPointerEnter() { setIsListening(true) },
    onPointerLeave() { setIsListening(false) },
  }), [isListening, createCircle])

  React.useEffect(() => {
    circles.forEach((c) => {
      if (c.fadeState) return
      setTimeout(() => setCircles((p) => p.map((x) => x.id === c.id ? { ...x, fadeState: "in" } : x)), 0)
      setTimeout(() => setCircles((p) => p.map((x) => x.id === c.id ? { ...x, fadeState: "out" } : x)), 1000)
      setTimeout(() => setCircles((p) => p.filter((x) => x.id !== c.id)), 2200)
    })
  }, [circles])

  return { ref, circles, handlers }
}

function CircleLayer({ circles }) {
  return circles.map(({ id, x, y, color, fadeState }) => (
    <div
      key={id}
      className={cn(
        "absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg pointer-events-none z-[-1] transition-opacity duration-300",
        fadeState === "in" && "opacity-75",
        fadeState === "out" && "opacity-0 duration-[1.2s]",
        !fadeState && "opacity-0",
      )}
      style={{ left: x, top: y, background: color }}
    />
  ))
}

const baseClass = cn(
  "relative isolate font-medium text-sm leading-6",
  "cursor-pointer overflow-hidden inline-flex items-center gap-2",
  "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:z-[1]",
  "before:transition-transform before:duration-300 active:before:scale-[0.975]",
  "transition-all duration-200 ease-out",
  "hover:scale-[1.04] hover:-translate-y-[2px]",
  "active:scale-[0.97] active:translate-y-0",
)

const accentClass = cn(
  baseClass,
  "text-white backdrop-blur-lg",
  "before:shadow-[inset_0_0_0_1px_rgba(113,196,247,0.3),inset_0_0_16px_0_rgba(113,196,247,0.15),inset_0_-3px_12px_0_rgba(33,118,174,0.25),0_1px_3px_0_rgba(0,0,0,0.4),0_4px_12px_0_rgba(33,118,174,0.35)]",
  "hover:brightness-110 hover:shadow-[0_8px_24px_rgba(33,118,174,0.45)]",
)

const outlineClass = cn(
  baseClass,
  "backdrop-blur-lg bg-[rgba(33,118,174,0.06)]",
  "before:shadow-[inset_0_0_0_1px_rgba(33,118,174,0.25),inset_0_0_16px_0_rgba(113,196,247,0.08),inset_0_-3px_12px_0_rgba(33,118,174,0.1),0_1px_3px_0_rgba(0,0,0,0.15),0_4px_12px_0_rgba(0,0,0,0.1)]",
  "hover:bg-[rgba(33,118,174,0.12)] hover:shadow-[0_6px_20px_rgba(33,118,174,0.2)]",
)

const circleStyle = {
  "--circle-start": BRAND_COLORS.accent.start,
  "--circle-end": BRAND_COLORS.accent.end,
}

const PADDING = { sm: "0.45rem 1.1rem", md: "1rem 2.5rem" }

export function HoverButton({ className, variant = "accent", size = "md", children, ...props }) {
  const { ref, circles, handlers } = useCircles()
  const cls = variant === "outline" ? outlineClass : accentClass
  return (
    <button
      ref={ref}
      className={cn(cls, className)}
      style={{
        ...circleStyle,
        padding: PADDING[size],
        borderRadius: "9999px",
        ...(variant === "accent"
          ? { background: "linear-gradient(135deg, #2A8DC7 0%, #2176AE 60%, #1A5F8A 100%)" }
          : { color: "var(--color-text)" }),
      }}
      {...handlers}
      {...props}
    >
      <CircleLayer circles={circles} />
      {children}
    </button>
  )
}

export function HoverLink({ to, className, variant = "accent", size = "md", style, children, onClick, ...props }) {
  const { ref, circles, handlers } = useCircles()
  const cls = variant === "outline" ? outlineClass : accentClass
  return (
    <Link
      to={to}
      ref={ref}
      className={cn(cls, className)}
      onClick={onClick}
      style={{
        ...circleStyle,
        padding: PADDING[size],
        borderRadius: "9999px",
        textDecoration: "none",
        ...(variant === "accent"
          ? { background: "linear-gradient(135deg, #2A8DC7 0%, #2176AE 60%, #1A5F8A 100%)", color: "#fff" }
          : { color: "var(--color-text)" }),
        ...style,
      }}
      {...handlers}
      {...props}
    >
      <CircleLayer circles={circles} />
      {children}
    </Link>
  )
}
