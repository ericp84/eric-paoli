"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Brain, Briefcase, Building2 } from "lucide-react"
import { experiences, type Experience } from "@/config/cv-data"
import { cn } from "@/lib/utils"

// Timeline display order: past → present (Management → Glanum → Logyka)
const timelineExperiences = [
  experiences.find((e) => e.id === "management")!,
  experiences.find((e) => e.id === "glanum")!,
  experiences.find((e) => e.id === "logyka")!,
]

// Timeline-specific palette — amber maps to purple for the "legacy" era
const palette = {
  cyan: {
    nodeBorder: "border-cyan-500",
    nodeShadow: "shadow-cyan-500/50",
    nodeFg: "text-cyan-400",
    nodeBg: "bg-cyan-500/10",
    prompt: "text-cyan-400",
    arrow: "text-cyan-300",
    tag: "border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-400",
    badgePeriod: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    connector: "bg-gradient-to-r from-cyan-500/70 to-cyan-500/10",
    cardBorder: "border-cyan-500/25",
    cardHover: "hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10",
    pulseRing: "border-cyan-400/60",
  },
  indigo: {
    nodeBorder: "border-indigo-500",
    nodeShadow: "shadow-indigo-500/40",
    nodeFg: "text-indigo-400",
    nodeBg: "bg-indigo-500/10",
    prompt: "text-indigo-400",
    arrow: "text-indigo-300",
    tag: "border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-400",
    badgePeriod: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    connector: "bg-gradient-to-r from-indigo-500/70 to-indigo-500/10",
    cardBorder: "border-indigo-500/25",
    cardHover: "hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10",
    pulseRing: null,
  },
  // Management uses purple to represent the "legacy/foundation" era
  amber: {
    nodeBorder: "border-purple-500",
    nodeShadow: "shadow-purple-500/40",
    nodeFg: "text-purple-400",
    nodeBg: "bg-purple-500/10",
    prompt: "text-purple-400",
    arrow: "text-purple-300",
    tag: "border-purple-500/25 bg-purple-500/[0.07] text-purple-400",
    badgePeriod: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    connector: "bg-gradient-to-r from-purple-500/70 to-purple-500/10",
    cardBorder: "border-purple-500/25",
    cardHover: "hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10",
    pulseRing: null,
  },
}

const iconMap = {
  logyka: Brain,
  glanum: Briefcase,
  management: Building2,
}

// ─── Terminal Card ────────────────────────────────────────────────────────────

function TerminalCard({ exp }: { exp: Experience }) {
  const p = palette[exp.color]
  const filename = exp.company.toLowerCase().replace(/\s+/g, "_")
  const isLegacy = exp.type === "legacy"

  return (
    <Card
      className={cn(
        "overflow-hidden ring-0 bg-zinc-900/80 backdrop-blur-sm border py-0 gap-0",
        "transition-all duration-300",
        p.cardBorder,
        p.cardHover
      )}
    >
      {/* ── Window chrome ─────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-900/90 border-b border-white/[0.06]">
        <div className="flex gap-1.5 shrink-0">
          <span className="size-2.5 rounded-full bg-red-500/70" />
          <span className="size-2.5 rounded-full bg-yellow-500/70" />
          <span className="size-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-xs text-zinc-500 flex-1 truncate">{filename}.sh</span>
        <Badge
          variant="outline"
          className={cn("font-mono text-xs shrink-0 gap-1.5", p.badgePeriod)}
        >
          {exp.type === "current" && (
            <span className={cn("size-1.5 rounded-full animate-pulse", p.nodeBg, p.nodeFg.replace("text-", "bg-").replace("-400", "-500"))} />
          )}
          {exp.period}
        </Badge>
      </div>

      {/* ── Terminal body ──────────────────────────────────────── */}
      <div className="p-5 font-mono text-xs space-y-4 text-zinc-300 leading-relaxed">

        {/* whoami */}
        <div>
          <span className={cn("select-none", p.prompt)}>❯ </span>
          <span className="text-white">whoami</span>
          <div className="mt-1 pl-4 text-zinc-400">{exp.role} @ {exp.company}</div>
        </div>

        {/* Description — different commands per role type */}
        {isLegacy ? (
          /* Legacy: show as metrics JSON */
          <div>
            <span className={cn("select-none", p.prompt)}>❯ </span>
            <span className="text-white">cat legacy_record.json</span>
            <div className="mt-1 pl-4 space-y-0.5 text-zinc-400">
              <div><span className="text-zinc-600">{"{"}</span></div>
              <div className="pl-3">
                <span className="text-blue-300">&quot;tenure&quot;</span>
                <span className="text-zinc-600">: </span>
                <span className="text-green-400">&quot;14 years — {exp.period}&quot;</span>
                <span className="text-zinc-600">,</span>
              </div>
              <div className="pl-3">
                <span className="text-blue-300">&quot;team_size&quot;</span>
                <span className="text-zinc-600">: </span>
                <span className="text-green-400">&quot;10–80 employees&quot;</span>
                <span className="text-zinc-600">,</span>
              </div>
              <div className="pl-3">
                <span className="text-blue-300">&quot;peak_revenue&quot;</span>
                <span className="text-zinc-600">: </span>
                <span className="text-green-400">&quot;€6M annual turnover&quot;</span>
                <span className="text-zinc-600">,</span>
              </div>
              <div className="pl-3">
                <span className="text-blue-300">&quot;scope&quot;</span>
                <span className="text-zinc-600">: </span>
                <span className="text-green-400">&quot;Multi-site operations across France&quot;</span>
              </div>
              <div><span className="text-zinc-600">{"}"}</span></div>
            </div>
          </div>
        ) : (
          /* Engineering: narrative description */
          <div>
            <span className={cn("select-none", p.prompt)}>❯ </span>
            <span className="text-white">cat mission.txt</span>
            <div className="mt-1 pl-4 border-l border-zinc-700/60 text-zinc-400">{exp.tagline}</div>
          </div>
        )}

        {/* Achievements */}
        <div>
          <span className={cn("select-none", p.prompt)}>❯ </span>
          <span className="text-white">./achievements.sh</span>
          <ul className="mt-2 pl-4 space-y-1.5">
            {exp.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className={cn("shrink-0 mt-px leading-none", p.arrow)}>▸</span>
                <span className="text-zinc-300">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech / Skills */}
        <div>
          <span className={cn("select-none", p.prompt)}>❯ </span>
          <span className="text-white">{isLegacy ? "ls skills/" : "ls tech/"}</span>
          <div className="mt-2 pl-4 flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className={cn("px-2 py-0.5 rounded-md border font-mono text-xs", p.tag)}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Status line for active role */}
        {exp.type === "current" && (
          <div className="pt-1 border-t border-white/[0.06]">
            <span className={cn("select-none", p.prompt)}>❯ </span>
            <span className="text-white">echo $STATUS</span>
            <div className="mt-1 pl-4">
              <span className="text-emerald-400">✓ Active — currently in this role</span>
            </div>
          </div>
        )}

        {/* Blinking cursor */}
        <div className="flex items-center gap-0">
          <span className={cn("select-none", p.prompt)}>❯ </span>
          <motion.span
            className={cn("inline-block w-1.5 h-3.5 ml-0.5", p.nodeBg, p.nodeFg.replace("text-", "bg-").replace("-400", "-500"))}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1] }}
          />
        </div>
      </div>
    </Card>
  )
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({
  exp,
  index,
  isLast,
}: {
  exp: Experience
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const p = palette[exp.color]
  const Icon = iconMap[exp.id as keyof typeof iconMap] ?? Briefcase

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className={cn("relative pl-16 sm:pl-20", !isLast && "pb-14 sm:pb-16")}
    >
      {/* ── Node ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.35,
          delay: index * 0.12 + 0.15,
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        className={cn(
          "absolute left-0 top-0 z-10",
          "size-10 rounded-full border-2 bg-zinc-950",
          "flex items-center justify-center shadow-lg",
          p.nodeBorder,
          p.nodeShadow
        )}
      >
        {/* Node background tint */}
        <div className={cn("absolute inset-0 rounded-full", p.nodeBg)} />
        {/* Icon */}
        <Icon className={cn("size-4 relative z-10", p.nodeFg)} />

        {/* Active pulse ring — only for current role */}
        {exp.type === "current" && (
          <motion.div
            className={cn("absolute inset-[-3px] rounded-full border-2", p.pulseRing)}
            animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
          />
        )}
      </motion.div>

      {/* ── Horizontal connector ───────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.12 + 0.25, ease: "easeOut" }}
        className={cn(
          "absolute left-10 sm:left-10 top-5 w-6 sm:w-8 h-px origin-left",
          p.connector
        )}
      />

      {/* ── Card ──────────────────────────────────────────────── */}
      <TerminalCard exp={exp} />
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  // Scroll-driven line draw: purple (past/top) → cyan (present/bottom)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.55"],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-purple-600/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ──────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-3 font-mono text-xs text-zinc-500">
            <span className="text-cyan-400 select-none">❯ </span>
            <span>git log --graph --oneline career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            From the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Boardroom
            </span>{" "}
            to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
              Production AI
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            A deliberate, decade-long journey: leadership and P&amp;L mastery as the foundation for
            engineering AI systems and cloud-native platforms.
          </p>
        </motion.div>

        {/* ── Timeline ────────────────────────────────────────── */}
        <div className="relative">

          {/* Gradient line — glow layer */}
          <motion.div
            className="absolute left-[17px] top-5 bottom-5 w-[6px] origin-top bg-gradient-to-b from-purple-600/30 via-indigo-500/25 to-cyan-500/35 blur-[5px] pointer-events-none"
            style={{ scaleY: lineScaleY }}
          />
          {/* Gradient line — crisp layer */}
          <motion.div
            className="absolute left-[19px] top-5 bottom-5 w-[2px] origin-top bg-gradient-to-b from-purple-600 via-indigo-500 to-cyan-500 pointer-events-none"
            style={{ scaleY: lineScaleY }}
          />

          {/* Items */}
          {timelineExperiences.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === timelineExperiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
