"use client"

import { motion } from "framer-motion"
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  UserCheck,
  Settings,
  Lock,
  Edit,
  Trophy,
  Eye,
  Users,
  Rocket
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Activity = {
  id: number
  action: string
  time: string
}

const activities: Activity[] = [
  { id: 1, action: "Created new project 🚀", time: "2 min ago" },
  { id: 2, action: "Updated profile info ✏️", time: "1 hour ago" },
  { id: 3, action: "Completed dashboard UI 🎨", time: "Yesterday" },
  { id: 4, action: "Reached 1k followers 🎉", time: "2 days ago" },
]

const skills = [
  "Next.js",
  "TypeScript",
  "Tailwind",
  "React",
  "UI/UX",
  "Framer Motion",
]

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl"
        >
          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">

              {/* Avatar */}
              <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">
                    Soumyajit Dey
                  </h1>

                  <UserCheck className="h-5 w-5 text-blue-400" />
                </div>

                <p className="text-white/70">
                  soumyajit@example.com
                </p>

                <p className="text-white/60 text-sm mt-1">
                  Building beautiful Gen-Z dashboards ✨
                </p>
              </div>

              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform rounded-xl">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>

            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Projects", value: "24", icon: Rocket },
            { label: "Followers", value: "1.2K", icon: Users },
            { label: "Views", value: "18K", icon: Eye },
            { label: "Achievements", value: "12", icon: Trophy },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-white/10 backdrop-blur-xl border border-white/10 hover:scale-105 transition-transform rounded-2xl"
            >
              <CardContent className="p-5 flex items-center gap-4">
                <stat.icon className="h-6 w-6 text-purple-400" />
                <div>
                  <p className="text-lg font-bold">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Personal Info */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-lg">
                  Personal Info
                </h2>

                <div className="flex items-center gap-2 text-white/70">
                  <Mail className="h-4 w-4" />
                  soumyajit@example.com
                </div>

                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="h-4 w-4" />
                  India 🌏
                </div>

                <Badge className="bg-purple-500/20 text-purple-300">
                  Frontend Developer
                </Badge>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-lg">
                  Social Links
                </h2>

                <div className="flex gap-3">
                  <Github className="hover:scale-110 cursor-pointer" />
                  <Linkedin className="hover:scale-110 cursor-pointer" />
                  <Twitter className="hover:scale-110 cursor-pointer" />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-lg">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <Badge
                      key={i}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:scale-105"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-lg">
                  Settings
                </h2>

                <Button
                  variant="secondary"
                  className="w-full justify-start"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>

                <Button
                  variant="secondary"
                  className="w-full justify-start"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>

                <Button
                  variant="secondary"
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-4">

            <h2 className="text-xl font-semibold">
              Recent Activity
            </h2>

            {activities.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <CardContent className="p-4 flex items-center gap-4">
                    
                    <Avatar>
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p>{item.action}</p>
                      <p className="text-sm text-white/60">
                        {item.time}
                      </p>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </motion.div>
  )
}