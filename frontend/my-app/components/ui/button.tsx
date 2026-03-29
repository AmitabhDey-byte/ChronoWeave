"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      children,
      ...props
    },
    ref
  ) => {

    const variants = {
      primary:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl",

      secondary:
        "bg-white/10 text-white border border-white/10 hover:bg-white/20",

      ghost:
        "bg-transparent text-white/70 hover:bg-white/10",
    }

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
          "backdrop-blur-xl border border-white/10",
          variants[variant],
          sizes[size],
          loading && "opacity-60 cursor-not-allowed",
          className
        )}
        {...props}
      >

        {loading && (
          <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}

        {children}

      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button }