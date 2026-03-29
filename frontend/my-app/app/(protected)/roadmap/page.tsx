// page.tsx

"use client"

import { motion } from "framer-motion"
import {
  CheckCircle2,
  Circle,
  Rocket,
  Sparkles,
  Code,
  Database,
  Shield,
  Brain,
  Trophy
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type RoadmapItem = {
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "pending"
  icon: any
  tags: string[]
}

const roadmap: RoadmapItem[] = [
  {
    title: "Frontend Foundations",
    description:
      "Learn HTML, CSS, Tailwind, and core JavaScript concepts.",
    progress: 100,
    status: "completed",
    icon: Code,
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "React & Next.js Mastery",
    description:
      "Build dynamic UI using React and modern Next.js App Router.",
    progress: 85,
    status: "in-progress",
    icon: Sparkles,
    tags: ["React", "Next.js", "Hooks"]
  },
  {
    title: "Backend & Database",
    description:
      "Learn API creation, databases, and authentication systems.",
    progress: 60,
    status: "in-progress",
    icon: Database,
    tags: ["Node.js", "MongoDB", "Auth"]
  },
  {
    title: "Security & Optimization",
    description:
      "Improve performance, SEO, and web security practices.",
    progress: 30,
    status: "pending",
    icon: Shield,
    tags: ["Security", "Performance"]
  },
  {
    title: "AI & Advanced Systems",
    description:
      "Explore AI tools, automation, and intelligent UI features.",
    progress: 10,
    status: "pending",
    icon: Brain,
    tags: ["AI", "Automation"]
  },
  {
    title: "Launch Portfolio 🚀",
    description:
      "Publish projects and build a strong personal brand.",
    progress: 0,
    status: "pending",
    icon: Rocket,
    tags: ["Portfolio", "Deployment"]
  }
]

export default function RoadmapPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-12"
      >

        {/* Header */}
        <div className="space-y-3">

          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-400" />
            Learning Roadmap
          </h1>

          <p className="text-white/60 max-w-xl">
            Track your development journey and unlock new
            milestones as you grow your skills 🚀
          </p>

        </div>

        {/* Timeline */}
        <div className="relative space-y-12">

          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 opacity-40" />

          {roadmap.map((item, index) => {

            const Icon = item.icon

            const StatusIcon =
              item.status === "completed"
                ? CheckCircle2
                : Circle

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6"
              >

                {/* Timeline Dot */}
                <div className="relative z-10">

                  <div
                    className={`h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl border border-white/10
                      ${
                        item.status === "completed"
                          ? "bg-green-500/20"
                          : item.status === "in-progress"
                          ? "bg-yellow-500/20"
                          : "bg-white/10"
                      }`}
                  >
                    <StatusIcon className="h-5 w-5" />
                  </div>

                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1"
                >

                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">

                    <CardContent className="p-6 space-y-4">

                      {/* Title */}
                      <div className="flex items-center gap-3">

                        <Icon className="h-6 w-6 text-purple-400" />

                        <h2 className="text-lg font-semibold">
                          {item.title}
                        </h2>

                      </div>

                      {/* Description */}
                      <p className="text-white/70 text-sm">
                        {item.description}
                      </p>

                      {/* Progress */}
                      <div className="space-y-2">

                        <div className="flex justify-between text-xs text-white/60">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>

                        <Progress value={item.progress} />

                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">

                        {item.tags.map((tag, i) => (
                          <Badge
                            key={i}
                            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:scale-105 transition-transform"
                          >
                            {tag}
                          </Badge>
                        ))}

                      </div>

                    </CardContent>

                  </Card>

                </motion.div>

              </motion.div>
            )
          })}

        </div>

      </motion.div>

    </div>
  )
}