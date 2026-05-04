"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { skills, type SkillLevel } from "@/config/cv-data"
import { cn } from "@/lib/utils"

const levelConfig: Record<SkillLevel, { label: string; classes: string; dotColor: string }> = {
  expert: {
    label: "Expert",
    classes: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20",
    dotColor: "bg-cyan-400",
  },
  advanced: {
    label: "Advanced",
    classes: "border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20",
    dotColor: "bg-blue-400",
  },
  intermediate: {
    label: "Intermediate",
    classes: "border-zinc-600/60 bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700/60",
    dotColor: "bg-zinc-500",
  },
}

const tabCategories = Object.keys(skills)

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

function SkillBadge({ name, level }: { name: string; level: SkillLevel }) {
  const config = levelConfig[level]
  return (
    <motion.div variants={badgeVariants}>
      <Badge
        variant="outline"
        className={cn(
          "text-sm font-mono cursor-default transition-colors duration-150 gap-1.5 py-1.5 px-3",
          config.classes
        )}
        title={config.label}
      >
        <span className={cn("size-1.5 rounded-full shrink-0", config.dotColor)} />
        {name}
      </Badge>
    </motion.div>
  )
}

function SkillGrid({ category }: { category: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-wrap gap-2.5 pt-6"
    >
      {skills[category].map((skill) => (
        <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
      ))}
    </motion.div>
  )
}

export function SkillsMatrix() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-zinc-950/50">
      {/* Subtle right glow */}
      <div className="absolute right-0 top-1/2 w-80 h-80 bg-indigo-500/[0.05] rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Full-Spectrum{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Technical Stack
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            From pixel-perfect frontends to GPU inference pipelines and production Kubernetes clusters.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {(Object.entries(levelConfig) as [SkillLevel, (typeof levelConfig)[SkillLevel]][]).map(
            ([, config]) => (
              <div key={config.label} className="flex items-center gap-2 text-xs text-zinc-500">
                <span className={cn("size-2 rounded-full", config.dotColor)} />
                {config.label}
              </div>
            )
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue={tabCategories[0]}>
          <TabsList className="bg-zinc-900/80 border border-white/[0.06] h-auto p-1 flex-wrap gap-1">
            {tabCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="text-sm data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:shadow-none text-zinc-400 hover:text-zinc-200 transition-all font-mono"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabCategories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <SkillGrid category={cat} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
