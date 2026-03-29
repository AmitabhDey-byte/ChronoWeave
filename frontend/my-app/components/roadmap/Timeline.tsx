"use client"

import { motion } from "framer-motion"
import SkillNode from "./SkillNode"

type TimelineItem = {
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "pending"
  tags?: string[]
}

type TimelineProps = {
  items: TimelineItem[]
}

export default function Timeline({
  items,
}: TimelineProps) {

  return (
    <div className="relative space-y-10">

      {/* Vertical Line */}
      <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 opacity-40" />

      {items.map((item, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-6"
        >

          {/* Dot */}
          <div className="relative z-10">

            <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">

              <span className="text-xs font-semibold">
                {index + 1}
              </span>

            </div>

          </div>

          {/* Skill Node */}
          <div className="flex-1">

            <SkillNode
              title={item.title}
              description={item.description}
              progress={item.progress}
              status={item.status}
              tags={item.tags}
            />

          </div>

        </motion.div>

      ))}

    </div>
  )
}