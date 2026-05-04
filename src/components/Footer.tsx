"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, ExternalLink, Mail, MapPin, Terminal } from "lucide-react"
import { personal } from "@/config/cv-data"

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <footer id="contact" className="relative pt-24 pb-12 bg-zinc-950 border-t border-white/[0.06]">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-cyan-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* CTA block */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-8 sm:p-12 text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-4">
              <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
                Open to Opportunities
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Looking for a senior engineer who bridges product strategy with production-grade AI and web
              systems? Let&apos;s talk.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold h-11 px-6 gap-2"
              >
                <a href={`mailto:${personal.email}`}>
                  <Mail className="size-4" />
                  {personal.email}
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
            </div>
          </div>

          <Separator className="bg-white/[0.06] mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-cyan-400" />
              <span className="font-mono text-sm font-semibold text-white">Eric Paoli</span>
              <span className="text-zinc-600 text-sm">·</span>
              <span className="text-sm text-zinc-500">Full Stack &amp; AI Engineer</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-zinc-600">
              <MapPin className="size-3" />
              France
            </div>

            <p className="text-xs text-zinc-600 font-mono">
              Built with Next.js · shadcn/ui · Framer Motion
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
