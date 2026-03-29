"use client"

import { motion } from "framer-motion"

type SpinnerProps = {
  size?: number
  label?: string
}

export default function Spinner({
  size = 40,
  label,
}: SpinnerProps) {

  return (
    <div className="flex flex-col items-center justify-center gap-3">

      {/* Spinner */}
      <motion.div
        style={{
          width: size,
          height: size,
        }}
        className="rounded-full border-[3px] border-purple-500/30 border-t-purple-400"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />

      {/* Label */}
      {label && (
        <p className="text-sm text-white/60">
          {label}
        </p>
      )}

    </div>
  )
}