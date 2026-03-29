"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10">
          <div className="h-40 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20" />
          
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              
              {/* Avatar */}
              <div className="h-24 w-24 rounded-2xl bg-white/20" />

              {/* Name */}
              <div className="flex-1 space-y-3">
                <div className="h-5 w-40 rounded bg-white/20" />
                <div className="h-4 w-56 rounded bg-white/10" />
              </div>

              {/* Button */}
              <div className="h-10 w-32 rounded-xl bg-white/20" />
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl h-24 bg-white/10 backdrop-blur-xl border border-white/10"
            />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Cards */}
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl h-40 bg-white/10 backdrop-blur-xl border border-white/10"
              />
            ))}
          </div>

          {/* Right Activity */}
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10"
              >
                <div className="h-10 w-10 rounded-full bg-white/20" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-white/20 rounded" />
                  <div className="h-3 w-1/4 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}