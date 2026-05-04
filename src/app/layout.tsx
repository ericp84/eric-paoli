import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Eric Paoli — Full Stack & AI Engineer",
  description:
    "Senior Full Stack & AI Engineer with 15+ years of experience. Specialising in Next.js, Python/FastAPI, PyTorch, and Kubernetes. Former Profit Center Director turned engineer.",
  keywords: ["Full Stack Engineer", "AI Engineer", "Next.js", "FastAPI", "PyTorch", "Kubernetes", "France"],
  authors: [{ name: "Eric Paoli" }],
  openGraph: {
    title: "Eric Paoli — Full Stack & AI Engineer",
    description: "Engineering High-Availability AI & Web Architectures",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  )
}
