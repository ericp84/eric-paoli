"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Download, ExternalLink, Cpu, Server, GitBranch } from "lucide-react"
import { personal, stats } from "@/config/cv-data"

const floatingIcons = [
  { Icon: Cpu, delay: 0, x: "15%", y: "25%" },
  { Icon: Server, delay: 0.4, x: "82%", y: "20%" },
  { Icon: GitBranch, delay: 0.8, x: "78%", y: "72%" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
      </div>

      {/* Subtle top-right glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-500/[0.05] blur-[100px] pointer-events-none" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, x, y: iconY }) => (
        <motion.div
          key={delay}
          className="absolute hidden lg:flex items-center justify-center size-12 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm text-zinc-600"
          style={{ left: x, top: iconY }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + delay, duration: 0.6 }}
        >
          <Icon className="size-5" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Status badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <Badge
              variant="outline"
              className="border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono px-3 py-1.5 gap-1.5"
            >
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
              Open to new opportunities
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              High-Availability
            </span>
            <br />
            AI &amp; Web Architectures
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {personal.subHeadline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold h-11 px-6 gap-2"
            >
              <a href="#experience">
                View My Work
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] text-white h-11 px-6 gap-2"
            >
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-zinc-400 hover:text-white h-11 px-6 gap-2"
            >
              <a href={personal.cvPath} download>
                <Download className="size-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
