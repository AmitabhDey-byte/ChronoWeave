// loading.tsx

"use client"

export default function RoadmapLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 animate-pulse">

        {/* Header */}
        <div className="space-y-3">
          <div className="h-8 w-64 bg-white/20 rounded-lg" />
          <div className="h-4 w-96 bg-white/10 rounded-lg" />
        </div>

        {/* Timeline Skeleton */}
        <div className="relative space-y-10">

          {/* Vertical Line */}
          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/10" />

          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-6">

              {/* Dot */}
              <div className="h-10 w-10 rounded-full bg-white/20 shrink-0" />

              {/* Card */}
              <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">

                <div className="h-5 w-48 bg-white/20 rounded" />
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-3/4 bg-white/10 rounded" />

                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-white/20 rounded-lg" />
                  <div className="h-6 w-20 bg-white/10 rounded-lg" />
                  <div className="h-6 w-14 bg-white/10 rounded-lg" />
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}