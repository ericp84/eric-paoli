export const personal = {
  name: "Eric Paoli",
  title: "Full Stack & AI Engineer",
  headline: "Engineering High-Availability AI & Web Architectures",
  subHeadline:
    "15+ years of leadership and P&L management, now channelled into production-grade AI systems, Next.js platforms, and Kubernetes-powered DevOps — bridging business strategy with engineering excellence.",
  location: "France",
  linkedin: "https://www.linkedin.com/in/eric-paoli-dev",
  email: "ericpaoli65@gmail.com",
  cvPath: "/CV_ERIC_PAOLI.pdf",
}

export const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "€6M", label: "Peak Revenue Led" },
  { value: "80", label: "Max Team Size" },
  { value: "2021", label: "Engineering Pivot" },
]

export type ExperienceColor = "cyan" | "indigo" | "amber"

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  startYear: number
  endYear: number | null
  type: "current" | "previous" | "legacy"
  tagline: string
  description: string
  highlights: string[]
  tech: string[]
  color: ExperienceColor
}

export const experiences: Experience[] = [
  {
    id: "logyka",
    company: "Logyka",
    role: "Full Stack & AI Engineer",
    period: "2021 — Present",
    startYear: 2021,
    endYear: null,
    type: "current",
    tagline: "AI-Powered Medical Imaging & Zero-Downtime Infrastructure",
    description:
      "Architecting and shipping AI-driven medical image segmentation pipelines using nnU-Net (PyTorch). Building high-performance asynchronous APIs with FastAPI, and operating Blue-Green Kubernetes deployments for zero-downtime production releases.",
    highlights: [
      "nnU-Net medical image segmentation (PyTorch + GPU)",
      "FastAPI async REST backend with Pydantic validation",
      "Blue-Green Kubernetes deployment — zero downtime",
      "GPU-accelerated inference infrastructure",
    ],
    tech: ["Python", "FastAPI", "PyTorch", "nnU-Net", "Docker", "Kubernetes", "TensorFlow", "PostgreSQL"],
    color: "cyan",
  },
  {
    id: "glanum",
    company: "Glanum",
    role: "Lead Full Stack Engineer",
    period: "2022 — 2026",
    startYear: 2022,
    endYear: 2026,
    type: "previous",
    tagline: "Enterprise ETL, E-Commerce & Headless Migration",
    description:
      "Led full-stack development of enterprise integrations: Royal Canin product ETL pipeline, Ortec e-commerce data synchronisation, and a headless CMS migration for BPC. Owned CI/CD pipelines, Kubernetes cluster governance, and cross-team technical leadership.",
    highlights: [
      "Royal Canin ETL pipeline — large-scale data transformation",
      "Ortec e-commerce synchronisation system",
      "BPC headless CMS migration (Next.js + Contentful)",
      "Kubernetes cluster & CI/CD ownership",
    ],
    tech: ["Next.js", "Laravel", "Python", "Node.js", "Docker", "Kubernetes", "GitHub Actions", "MySQL", "Redis"],
    color: "indigo",
  },
  {
    id: "management",
    company: "Profit Center Director",
    role: "Senior Leadership — Multiple Organisations",
    period: "2006 — 2020",
    startYear: 2006,
    endYear: 2020,
    type: "legacy",
    tagline: "14 Years Building High-Performance Teams & Profitable Businesses",
    description:
      "Directed multiple profit centers across France, leading teams of 10–80 people with annual revenues reaching €6M. Built a proven track record in operational strategy, P&L management, and people development — a foundation that now drives every architecture and product decision I make.",
    highlights: [
      "Teams of 10–80 employees across multiple sites",
      "Profit centers up to €6M annual revenue",
      "Multi-site operational strategy & execution",
      "Full P&L ownership and financial governance",
    ],
    tech: ["Leadership", "P&L Management", "Team Building", "Operations", "Strategy"],
    color: "amber",
  },
]

export type SkillLevel = "expert" | "advanced" | "intermediate"

export interface Skill {
  name: string
  level: SkillLevel
}

export const skills: Record<string, Skill[]> = {
  Frontend: [
    { name: "Next.js", level: "expert" },
    { name: "React", level: "expert" },
    { name: "TypeScript", level: "expert" },
    { name: "Tailwind CSS", level: "expert" },
    { name: "Framer Motion", level: "advanced" },
    { name: "shadcn/ui", level: "advanced" },
    { name: "Radix UI", level: "advanced" },
  ],
  Backend: [
    { name: "Python", level: "expert" },
    { name: "FastAPI", level: "expert" },
    { name: "Laravel", level: "advanced" },
    { name: "Node.js", level: "advanced" },
    { name: "REST APIs", level: "expert" },
    { name: "PostgreSQL", level: "advanced" },
    { name: "MySQL", level: "advanced" },
    { name: "Redis", level: "intermediate" },
  ],
  "AI / ML": [
    { name: "PyTorch", level: "advanced" },
    { name: "nnU-Net", level: "expert" },
    { name: "TensorFlow", level: "intermediate" },
    { name: "LangChain", level: "advanced" },
    { name: "OpenAI API", level: "advanced" },
    { name: "Hugging Face", level: "intermediate" },
    { name: "scikit-learn", level: "intermediate" },
  ],
  DevOps: [
    { name: "Docker", level: "expert" },
    { name: "Kubernetes", level: "advanced" },
    { name: "GitHub Actions", level: "advanced" },
    { name: "GitLab CI", level: "advanced" },
    { name: "Blue-Green Deploy", level: "expert" },
    { name: "Nginx", level: "advanced" },
    { name: "Linux", level: "expert" },
    { name: "AWS", level: "intermediate" },
  ],
}

export type TerminalLineType =
  | "command"
  | "output"
  | "json-key"
  | "json-entry"
  | "table-header"
  | "table-row"
  | "success"
  | "blank"

export interface TerminalLine {
  type: TerminalLineType
  text: string
}

export const terminalLines: TerminalLine[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "eric_paoli  ·  Full Stack & AI Engineer  ·  France" },
  { type: "blank", text: "" },
  { type: "command", text: "cat tech-stack.json" },
  { type: "json-key", text: "{" },
  { type: "json-entry", text: '  "languages":  ["Python", "TypeScript", "PHP"],' },
  { type: "json-entry", text: '  "frameworks": ["FastAPI", "Next.js", "Laravel"],' },
  { type: "json-entry", text: '  "ai_stack":   ["PyTorch", "nnU-Net", "LangChain"],' },
  { type: "json-entry", text: '  "devops":     ["Docker", "Kubernetes", "GitHub Actions"]' },
  { type: "json-key", text: "}" },
  { type: "blank", text: "" },
  { type: "command", text: "kubectl get deployments -n production" },
  { type: "table-header", text: "NAME                READY   STATUS    AGE" },
  { type: "table-row", text: "nnunet-inference    3/3     Running   47d" },
  { type: "table-row", text: "fastapi-backend     2/2     Running   47d" },
  { type: "table-row", text: "nextjs-frontend     1/1     Running   47d" },
  { type: "blank", text: "" },
  { type: "command", text: "git log --oneline -3" },
  { type: "output", text: "a1b2c3d  feat: blue-green K8s deployment pipeline" },
  { type: "output", text: "b2c3d4e  feat: nnU-Net inference API (FastAPI + GPU)" },
  { type: "output", text: "c3d4e5f  feat: Royal Canin ETL pipeline" },
  { type: "blank", text: "" },
  { type: "command", text: "echo $AVAILABILITY" },
  { type: "success", text: "Open to new opportunities" },
]
