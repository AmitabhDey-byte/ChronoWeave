"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function FullscreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* Animated Glow Background */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />

      </div>

      {/* Loader Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col items-center gap-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-10 py-8 shadow-2xl"
      >

        {/* Spinner Ring */}
        <div className="relative flex items-center justify-center">

          <div className="h-16 w-16 rounded-full border-4 border-purple-500/30 border-t-purple-400 animate-spin" />

          <Sparkles className="absolute h-6 w-6 text-purple-400 animate-pulse" />

        </div>

        {/* Text */}
        <div className="text-center space-y-1">

          <h2 className="text-lg font-semibold tracking-tight">
            Loading your experience ✨
          </h2>

          <p className="text-sm text-white/60">
            Preparing something beautiful...
          </p>

        </div>

      </motion.div>

    </div>
  )
}