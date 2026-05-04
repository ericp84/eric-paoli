"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowUpRight, Briefcase, Brain, Building2 } from "lucide-react"
import { experiences, type Experience } from "@/config/cv-data"
import { cn } from "@/lib/utils"

const colorMap = {
  cyan: {
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    icon: "text-cyan-400 bg-cyan-500/10",
    dot: "bg-cyan-400",
    highlight: "text-cyan-300",
    tech: "border-cyan-500/20 bg-cyan-500/[0.07] text-cyan-400 hover:bg-cyan-500/15",
    glow: "hover:border-cyan-500/30 hover:shadow-cyan-500/10",
  },
  indigo: {
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    icon: "text-indigo-400 bg-indigo-500/10",
    dot: "bg-indigo-400",
    highlight: "text-indigo-300",
    tech: "border-indigo-500/20 bg-indigo-500/[0.07] text-indigo-400 hover:bg-indigo-500/15",
    glow: "hover:border-indigo-500/30 hover:shadow-indigo-500/10",
  },
  amber: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    icon: "text-amber-400 bg-amber-500/10",
    dot: "bg-amber-400",
    highlight: "text-amber-300",
    tech: "border-amber-500/20 bg-amber-500/[0.07] text-amber-400 hover:bg-amber-500/15",
    glow: "hover:border-amber-500/30 hover:shadow-amber-500/10",
  },
}

const iconMap = {
  logyka: Brain,
  glanum: Briefcase,
  management: Building2,
}

function ExperienceCard({
  exp,
  className,
  delay,
}: {
  exp: Experience
  className?: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const colors = colorMap[exp.color]
  const Icon = iconMap[exp.id as keyof typeof iconMap] ?? Briefcase

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className={className}
    >
      <Card
        className={cn(
          "h-full border border-white/[0.07] bg-zinc-900/60 backdrop-blur-sm",
          "hover:bg-zinc-900/80 hover:shadow-xl transition-all duration-300 group",
          colors.glow
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className={cn("p-2 rounded-lg", colors.icon)}>
              <Icon className="size-5" />
            </div>
            <Badge variant="outline" className={cn("text-xs font-mono shrink-0", colors.badge)}>
              {exp.period}
            </Badge>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-semibold uppercase tracking-widest", colors.highlight)}>
                {exp.company}
              </span>
              {exp.type === "current" && (
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <span className={cn("size-1.5 rounded-full animate-pulse", colors.dot)} />
                  Now
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mt-1 leading-snug">{exp.tagline}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">{exp.role}</p>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">{exp.description}</p>

          {/* Highlights */}
          <ul className="space-y-1.5 mb-5">
            {exp.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm">
                <ArrowUpRight className={cn("size-3.5 mt-0.5 shrink-0", colors.highlight)} />
                <span className="text-zinc-300">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className={cn("text-xs font-mono cursor-default transition-colors", colors.tech)}
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function BentoExperience() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  const logyka = experiences.find((e) => e.id === "logyka")!
  const glanum = experiences.find((e) => e.id === "glanum")!
  const management = experiences.find((e) => e.id === "management")!

  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      {/* Section glow */}
      <div className="absolute left-1/4 top-1/2 w-96 h-96 bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            A Career Built in{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Two Acts
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            Fourteen years directing high-performance teams and profit centers, followed by a deliberate pivot to
            full-stack engineering and AI — combining strategic thinking with deep technical execution.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Logyka — large, col 1-2 */}
          <ExperienceCard exp={logyka} className="md:col-span-2" delay={0} />

          {/* Management — right column, full height */}
          <ExperienceCard exp={management} className="md:row-span-2" delay={0.15} />

          {/* Glanum — col 1-2, row 2 */}
          <ExperienceCard exp={glanum} className="md:col-span-2" delay={0.1} />
        </div>
      </div>
    </section>
  )
}
