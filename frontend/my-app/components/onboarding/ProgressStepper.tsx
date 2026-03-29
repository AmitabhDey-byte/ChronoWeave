"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ProgressStepperProps = {
  steps: string[]
  currentStep: number
}

export default function ProgressStepper({
  steps,
  currentStep,
}: ProgressStepperProps) {

  return (
    <div className="w-full flex items-center justify-between">

      {steps.map((step, index) => {

        const isCompleted = index < currentStep
        const isActive = index === currentStep

        return (
          <div
            key={index}
            className="flex-1 flex items-center"
          >

            {/* Step */}
            <div className="flex flex-col items-center text-center">

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-full border backdrop-blur-xl",
                  "bg-white/5 border-white/10",
                  isCompleted &&
                    "bg-green-500/20 border-green-400",
                  isActive &&
                    "bg-purple-500/20 border-purple-400"
                )}
              >

                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                ) : (
                  <span className="text-sm font-semibold">
                    {index + 1}
                  </span>
                )}

              </motion.div>

              <p
                className={cn(
                  "text-xs mt-2 max-w-[80px]",
                  isActive
                    ? "text-white"
                    : "text-white/50"
                )}
              >
                {step}
              </p>

            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-[2px] mx-2 bg-white/10",
                  isCompleted &&
                    "bg-gradient-to-r from-purple-500 to-pink-500"
                )}
              />
            )}

          </div>
        )
      })}

    </div>
  )
}