"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type Option = {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

type OptionSelectorProps = {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  multiple?: boolean
}

export default function OptionSelector({
  options,
  selected,
  onChange,
  multiple = false,
}: OptionSelectorProps) {

  const toggleOption = (id: string) => {
    if (multiple) {
      if (selected.includes(id)) {
        onChange(selected.filter((item) => item !== id))
      } else {
        onChange([...selected, id])
      }
    } else {
      onChange([id])
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">

      {options.map((option, index) => {

        const isSelected = selected.includes(option.id)

        return (
          <motion.button
            key={option.id}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleOption(option.id)}
            className={cn(
              "relative rounded-2xl border backdrop-blur-xl text-left p-5 transition-all duration-300",
              "bg-white/5 border-white/10 hover:bg-white/10",
              isSelected &&
                "border-purple-400 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            )}
          >

            {/* Selected Badge */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center"
              >
                <Check className="h-4 w-4 text-white" />
              </motion.div>
            )}

            {/* Content */}
            <div className="flex items-start gap-3">

              {option.icon && (
                <div className="text-purple-400">
                  {option.icon}
                </div>
              )}

              <div>

                <h3 className="font-semibold text-white">
                  {option.label}
                </h3>

                {option.description && (
                  <p className="text-sm text-white/60 mt-1">
                    {option.description}
                  </p>
                )}

              </div>

            </div>

          </motion.button>
        )
      })}

    </div>
  )
}