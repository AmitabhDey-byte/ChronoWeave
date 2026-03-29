"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CardProps
  extends Omit<React.ComponentProps<typeof motion.div>, "size" | "children"> {
  hover?: boolean
  children?: React.ReactNode
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(
  (
    {
      className,
      hover = true,
      children,
      ...props
    },
    ref
  ) => {

    return (
      <motion.div
        ref={ref}
        whileHover={
          hover
            ? { scale: 1.02 }
            : undefined
        }
        className={cn(
          "relative rounded-2xl p-6",
          "bg-white/5 backdrop-blur-xl",
          "border border-white/10",
          "shadow-xl",
          className
        )}
        {...props}
      >

        {/* Glow Effects */}
        <div className="absolute inset-0 -z-10">

          <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 blur-[100px] rounded-full" />

          <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/20 blur-[100px] rounded-full" />

        </div>

        {children}

      </motion.div>
    )
  }
)

Card.displayName = "Card"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }