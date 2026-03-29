"use client"

type SkeletonCardProps = {
  className?: string
}

export default function SkeletonCard({
  className,
}: SkeletonCardProps) {

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-6 animate-pulse ${className}`}
    >

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-5">

        <div className="h-12 w-12 rounded-xl bg-white/20" />

        <div className="space-y-2 flex-1">

          <div className="h-4 w-40 bg-white/20 rounded" />

          <div className="h-3 w-28 bg-white/10 rounded" />

        </div>

      </div>

      {/* Content */}
      <div className="space-y-3">

        <div className="h-4 w-full bg-white/10 rounded" />

        <div className="h-4 w-5/6 bg-white/10 rounded" />

        <div className="h-4 w-2/3 bg-white/10 rounded" />

      </div>

      {/* Footer */}
      <div className="flex gap-2 mt-6">

        <div className="h-8 w-20 bg-white/20 rounded-lg" />

        <div className="h-8 w-16 bg-white/10 rounded-lg" />

      </div>

    </div>
  )
}