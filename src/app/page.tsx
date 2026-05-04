import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { ExperienceTimeline } from "@/components/ExperienceTimeline"
import { SkillsMatrix } from "@/components/SkillsMatrix"
import { Terminal } from "@/components/Terminal"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <ExperienceTimeline />
      <SkillsMatrix />
      <Terminal />
      <Footer />
    </main>
  )
}
