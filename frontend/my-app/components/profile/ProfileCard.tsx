"use client"

import { motion } from "framer-motion"
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  UserCheck,
  Users,
  Eye,
  Trophy,
  Rocket
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ProfileCardProps = {
  name: string
  email: string
  location?: string
  bio?: string
  avatar?: string
  onEdit?: () => void
}

export default function ProfileCard({
  name,
  email,
  location,
  bio,
  avatar,
  onEdit,
}: ProfileCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
    >

      {/* Banner */}
      <div className="h-36 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative">

        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top_left,white,transparent)]" />
        </div>

      </div>

      <div className="px-6 pb-6">

        <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14">

          {/* Avatar */}
          <motion.div whileHover={{ scale: 1.05 }}>

            <Avatar className="h-28 w-28 border-4 border-white/20 shadow-xl rounded-2xl">
              <AvatarImage src={avatar} />
              <AvatarFallback>
                {name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

          </motion.div>

          {/* Info */}
          <div className="flex-1 space-y-2">

            <div className="flex items-center gap-2">

              <h2 className="text-2xl font-bold">
                {name}
              </h2>

              <UserCheck className="h-5 w-5 text-blue-400" />

            </div>

            <p className="flex items-center gap-2 text-white/70 text-sm">
              <Mail className="h-4 w-4" />
              {email}
            </p>

            {location && (
              <p className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4" />
                {location}
              </p>
            )}

            {bio && (
              <p className="text-white/60 text-sm mt-1">
                {bio}
              </p>
            )}

            {/* Social */}
            <div className="flex gap-3 pt-2">

              <Github className="cursor-pointer hover:scale-110 transition-transform text-white/70" />

              <Linkedin className="cursor-pointer hover:scale-110 transition-transform text-white/70" />

              <Twitter className="cursor-pointer hover:scale-110 transition-transform text-white/70" />

            </div>

          </div>

          {/* Edit Button */}
          {onEdit && (
            <Button
              onClick={onEdit}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform"
            >
              Edit Profile ✏️
            </Button>
          )}

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          {[
            { label: "Projects", value: "24", icon: Rocket },
            { label: "Followers", value: "1.4K", icon: Users },
            { label: "Views", value: "18K", icon: Eye },
            { label: "Awards", value: "9", icon: Trophy },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 flex items-center gap-3"
            >

              <stat.icon className="h-5 w-5 text-purple-400" />

              <div>

                <p className="font-bold text-sm">
                  {stat.value}
                </p>

                <p className="text-xs text-white/60">
                  {stat.label}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </motion.div>
  )
}