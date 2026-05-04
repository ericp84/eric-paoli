"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { terminalLines } from "@/config/cv-data"

function renderLine(text: string, type: string) {
  switch (type) {
    case "command":
      return (
        <span>
          <span className="text-cyan-400 select-none">❯ </span>
          <span className="text-white">{text}</span>
        </span>
      )
    case "json-key":
      return <span className="text-yellow-300">{text}</span>
    case "json-entry": {
      const match = text.match(/^(\s*"[^"]+":)\s*(.+)$/)
      if (match) {
        return (
          <span>
            <span className="text-zinc-500">{text.match(/^\s+/)?.[0]}</span>
            <span className="text-blue-300">{match[1]}</span>
            <span className="text-white"> {match[2]}</span>
          </span>
        )
      }
      return <span className="text-zinc-300">{text}</span>
    }
    case "table-header":
      return <span className="text-zinc-500 font-bold">{text}</span>
    case "table-row":
      return <span className="text-green-400">{text}</span>
    case "success":
      return (
        <span className="text-emerald-400 font-semibold">
          <span className="text-emerald-500 mr-1">✓</span>
          {text}
        </span>
      )
    case "blank":
      return <span>&nbsp;</span>
    default:
      return <span className="text-zinc-300">{text}</span>
  }
}

const cursorBlink = {
  animate: { opacity: [1, 1, 0, 0] },
  transition: { repeat: Infinity, duration: 0.8, times: [0, 0.5, 0.5, 1] },
}

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [visibleCount, setVisibleCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isInView) return

    setVisibleCount(0)
    let count = 0

    intervalRef.current = setInterval(() => {
      count += 1
      setVisibleCount(count)
      if (count >= terminalLines.length) {
        clearInterval(intervalRef.current!)
      }
    }, 90)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isInView])

  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section id="terminal" className="py-24 lg:py-32 relative">
      <div className="absolute left-1/2 top-1/4 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />

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
            <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">DevOps / Hard Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Thinking Like a{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              Platform Engineer
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            Production systems don&apos;t fail silently. Here&apos;s how I operate at the infrastructure layer.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/40"
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-zinc-500 flex-1 text-center">
              zsh — eric@portfolio ~ — 80×24
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-zinc-950 px-6 py-5 min-h-[420px] overflow-auto">
            <div className="font-mono text-sm space-y-1 leading-relaxed">
              {terminalLines.slice(0, visibleCount).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {renderLine(line.text, line.type)}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <div className="flex items-center mt-1">
                <span className="text-cyan-400 select-none">❯ </span>
                <motion.span
                  className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle"
                  animate={cursorBlink.animate}
                  transition={cursorBlink.transition}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
