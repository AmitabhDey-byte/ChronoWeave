"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

type QuestionCardProps = {
  title: string
  description?: string
  children: React.ReactNode
  onNext?: () => void
  onBack?: () => void
  isLast?: boolean
}

export default function QuestionCard({
  title,
  description,
  children,
  onNext,
  onBack,
  isLast = false,
}: QuestionCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 space-y-6"
    >

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-60 h-60 bg-purple-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500/20 blur-[120px] rounded-full" />

      </div>

      {/* Title */}
      <div className="space-y-2">

        <h2 className="text-2xl font-bold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="text-white/60 text-sm">
            {description}
          </p>
        )}

      </div>

      {/* Content */}
      <div>
        {children}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">

        {onBack ? (
          <Button
            variant="secondary"
            onClick={onBack}
            className="rounded-xl bg-white/10 hover:bg-white/20"
          >
            Back
          </Button>
        ) : (
          <div />
        )}

        {onNext && (
          <Button
            onClick={onNext}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform"
          >
            {isLast ? "Finish 🚀" : "Next"}
          </Button>
        )}

      </div>

    </motion.div>
  )
}