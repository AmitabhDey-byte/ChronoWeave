"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ProgressBar from "./ProgressBar"

type SkillNodeProps = {
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "pending"
  tags?: string[]
  icon?: React.ReactNode
}

export default function SkillNode({
  title,
  description,
  progress,
  status,
  tags,
  icon,
}: SkillNodeProps) {

  const StatusIcon =
    status === "completed"
      ? CheckCircle2
      : Circle

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-6 space-y-4"
    >

      {/* Glow */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 blur-[100px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/20 blur-[100px] rounded-full" />

      </div>

      {/* Header */}
      <div className="flex items-center gap-3">

        <div
          className={`h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-xl border border-white/10
          ${
            status === "completed"
              ? "bg-green-500/20"
              : status === "in-progress"
              ? "bg-yellow-500/20"
              : "bg-white/10"
          }`}
        >
          <StatusIcon className="h-5 w-5" />
        </div>

        <div>

          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-xs text-white/60">
            {description}
          </p>

        </div>

      </div>

      {/* Progress */}
      <ProgressBar
        value={progress}
        label="Progress"
      />

      {/* Tags */}
      {tags && (
        <div className="flex flex-wrap gap-2 pt-2">

          {tags.map((tag, i) => (
            <Badge
              key={i}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            >
              {tag}
            </Badge>
          ))}

        </div>
      )}

    </motion.div>
  )
}