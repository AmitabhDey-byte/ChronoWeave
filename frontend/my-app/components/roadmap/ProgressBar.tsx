"use client"

import { motion } from "framer-motion"

type ProgressBarProps = {
  value: number
  label?: string
}

export default function ProgressBar({
  value,
  label,
}: ProgressBarProps) {

  return (
    <div className="space-y-2">

      {/* Label */}
      {label && (
        <div className="flex justify-between text-xs text-white/60">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}

      {/* Track */}
      <div className="relative w-full h-2 rounded-full bg-white/10 overflow-hidden">

        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6 }}
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
        />

      </div>

    </div>
  )
}