"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Save,
  User,
  Mail,
  MapPin,
  ImageIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type EditProfileProps = {
  defaultValues?: {
    name?: string
    email?: string
    location?: string
    bio?: string
    avatar?: string
  }

  onSave?: (data: any) => void
}

export default function EditProfile({
  defaultValues,
  onSave,
}: EditProfileProps) {

  const [form, setForm] = useState({
    name: defaultValues?.name || "",
    email: defaultValues?.email || "",
    location: defaultValues?.location || "",
    bio: defaultValues?.bio || "",
    avatar: defaultValues?.avatar || "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = () => {

    onSave?.(form)

  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 space-y-6"
    >

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-60 h-60 bg-purple-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500/20 blur-[120px] rounded-full" />

      </div>

      {/* Header */}
      <div className="space-y-1">

        <h2 className="text-2xl font-bold">
          Edit Profile ✨
        </h2>

        <p className="text-white/60 text-sm">
          Update your personal information
        </p>

      </div>

      {/* Form */}
      <div className="grid gap-5">

        {/* Name */}
        <div className="space-y-2">

          <label className="text-sm text-white/70 flex items-center gap-2">
            <User className="h-4 w-4" />
            Name
          </label>

          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="bg-white/10 border-white/10 rounded-xl"
          />

        </div>

        {/* Email */}
        <div className="space-y-2">

          <label className="text-sm text-white/70 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </label>

          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="bg-white/10 border-white/10 rounded-xl"
          />

        </div>

        {/* Location */}
        <div className="space-y-2">

          <label className="text-sm text-white/70 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>

          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Your location"
            className="bg-white/10 border-white/10 rounded-xl"
          />

        </div>

        {/* Avatar */}
        <div className="space-y-2">

          <label className="text-sm text-white/70 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Avatar URL
          </label>

          <Input
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            placeholder="Paste avatar URL"
            className="bg-white/10 border-white/10 rounded-xl"
          />

        </div>

        {/* Bio */}
        <div className="space-y-2">

          <label className="text-sm text-white/70">
            Bio
          </label>

          <Textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell something about yourself..."
            className="bg-white/10 border-white/10 rounded-xl min-h-[100px]"
          />

        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">

        <Button
          onClick={handleSubmit}
          className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>

      </div>

    </motion.div>
  )
}