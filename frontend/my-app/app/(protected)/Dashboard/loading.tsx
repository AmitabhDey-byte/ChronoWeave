// loading.tsx

"use client"


export default function DashboardLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">

        {/* Header Skeleton */}
        <div className="flex items-center justify-between">

          <div className="space-y-3">
            <div className="h-7 w-48 bg-white/20 rounded-lg" />
            <div className="h-4 w-72 bg-white/10 rounded-lg" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20" />
            <div className="h-10 w-10 rounded-full bg-white/10" />
          </div>

        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
            />
          ))}

        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 h-80 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10" />

          <div className="h-80 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10" />

        </div>

        {/* Table Section */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-5">

          <div className="h-6 w-52 bg-white/20 rounded-lg" />

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-xl bg-white/20" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-white/10 rounded-lg" />
                <div className="h-3 w-1/3 bg-white/5 rounded-lg" />
              </div>
              <div className="h-8 w-20 bg-white/10 rounded-lg" />
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}