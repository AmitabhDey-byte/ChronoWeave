"use client"

import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import Timeline from "./Timeline"

export default function Roadmap() {

  const roadmapItems = [

    {
      title: "Frontend Foundations",
      description:
        "Learn HTML, CSS, JavaScript fundamentals.",
      progress: 100,
      status: "completed" as const,
      tags: ["HTML", "CSS", "JavaScript"],
    },

    {
      title: "React & Next.js",
      description:
        "Build dynamic UI with React & Next.js.",
      progress: 80,
      status: "in-progress" as const,
      tags: ["React", "Next.js", "Hooks"],
    },

    {
      title: "Backend Development",
      description:
        "Understand APIs and databases.",
      progress: 60,
      status: "in-progress" as const,
      tags: ["Node.js", "MongoDB"],
    },

    {
      title: "Deployment & DevOps",
      description:
        "Deploy apps and optimize performance.",
      progress: 30,
      status: "pending" as const,
      tags: ["Docker", "CI/CD"],
    },

    {
      title: "AI Integration",
      description:
        "Integrate AI workflows and automation.",
      progress: 10,
      status: "pending" as const,
      tags: ["AI", "Automation"],
    },

  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />

      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-10"
      >

        {/* Header */}
        <div className="space-y-2">

          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-400" />
            Skill Roadmap
          </h1>

          <p className="text-white/60 max-w-xl">
            Track your journey and unlock milestones as you grow 🚀
          </p>

        </div>

        {/* Timeline */}
        <Timeline items={roadmapItems} />

      </motion.div>

    </div>
  )
}