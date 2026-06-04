import { cn } from "@/lib/utils"

export function AuroraBackground({ className, showRadialGradient = true }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className={cn(
          "[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]",
          "[background-image:var(--aurora)]",
          "[background-size:300%,_200%]",
          "[background-position:50%_50%,50%_50%]",
          "filter blur-[12px]",
          "after:content-[''] after:absolute after:inset-0",
          "after:[background-image:var(--aurora)]",
          "after:[background-size:200%,_100%]",
          "after:animate-aurora",
          "after:[background-attachment:fixed]",
          "after:mix-blend-screen",
          "animate-aurora",
          "absolute -inset-[10px] opacity-40 will-change-transform",
          showRadialGradient &&
            "[mask-image:radial-gradient(ellipse_at_60%_0%,black_20%,var(--transparent)_75%)]"
        )}
      />
    </div>
  )
}
