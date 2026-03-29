"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,
      icon,
      type = "text",
      ...props
    },
    ref
  ) => {

    return (
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className="relative w-full"
      >

        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full h-11 rounded-xl",
            "bg-white/5 backdrop-blur-xl",
            "border border-white/10",
            "px-4",
            icon && "pl-10",
            "text-white placeholder:text-white/40",
            "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
            "transition-all duration-200",
            className
          )}
          {...props}
        />

      </motion.div>
    )
  }
)

Input.displayName = "Input"

export { Input }