// error.tsx

"use client"

import { motion } from "framer-motion"
import { AlertTriangle, RefreshCcw, Home } from "lucide-react"
//import { Button } from "@/components/ui/button"

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function DashboardError({
  error,
  reset,
}: ErrorProps) {

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />

      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 text-center space-y-6">

          {/* Icon */}
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-red-500/20 shadow-lg"
          >

            <AlertTriangle className="h-10 w-10 text-red-400" />

          </motion.div>

          {/* Text */}
          <div className="space-y-2">

            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Failed to Load 🚨
            </h1>

            <p className="text-white/60 text-sm leading-relaxed">
              Something unexpected happened while loading
              your dashboard. Don't worry — try refreshing
              or restarting the process.
            </p>

          </div>

          {/* Dev Error */}
          {process.env.NODE_ENV === "development" && (
            <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-left overflow-auto max-h-40">
              {error.message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">

            <Button
              onClick={() => reset()}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:scale-105 transition-transform"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            <Button
              variant="secondary"
              className="flex-1 rounded-xl bg-white/10 hover:bg-white/20"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>

          </div>

          {/* Footer Note */}
          <p className="text-xs text-white/40">
            If the issue persists, contact support ⚡
          </p>

        </div>

      </motion.div>

    </div>
  )
}