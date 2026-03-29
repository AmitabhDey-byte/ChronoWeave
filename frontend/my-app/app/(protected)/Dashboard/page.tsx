"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Trophy, Target, Clock,
  TrendingUp, Star, Award, Zap,
  CheckCircle2, Circle, Sparkles, Activity,
  Code, Database, Shield, Brain
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatCard {
  id: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
}

interface ActivityItem {
  id: string;
  name: string;
  action: string;
  time: string;
  avatar: string;
  color: string;
}

interface LearningGoal {
  id: string;
  label: string;
  done: boolean;
  priority: "high" | "mid" | "low";
  category: string;
}

interface SkillProgress {
  skill: string;
  progress: number;
  level: string;
  color: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const learningProgressData = [
  { day: "Mon", studyHours: 2.5, skillsLearned: 3 },
  { day: "Tue", studyHours: 3.2, skillsLearned: 4 },
  { day: "Wed", studyHours: 1.8, skillsLearned: 2 },
  { day: "Thu", studyHours: 4.1, skillsLearned: 5 },
  { day: "Fri", studyHours: 2.9, skillsLearned: 3 },
  { day: "Sat", studyHours: 5.5, skillsLearned: 7 },
  { day: "Sun", studyHours: 3.8, skillsLearned: 4 },
];

const skillGrowthData = [
  { month: "Jan", skills: 12 },
  { month: "Feb", skills: 18 },
  { month: "Mar", skills: 25 },
  { month: "Apr", skills: 32 },
  { month: "May", skills: 28 },
  { month: "Jun", skills: 45 },
];

const learningActivities: ActivityItem[] = [
  { id: "1", name: "React Mastery", action: "Completed Advanced Hooks module 🎯", time: "2h ago", avatar: "RM", color: "#60a5fa" },
  { id: "2", name: "TypeScript", action: "Achieved 95% in generics quiz 🏆", time: "5h ago", avatar: "TS", color: "#3b82f6" },
  { id: "3", name: "Next.js", action: "Built first full-stack app 🚀", time: "1d ago", avatar: "NJ", color: "#8b5cf6" },
  { id: "4", name: "Database", action: "Mastered MongoDB aggregation 📊", time: "2d ago", avatar: "DB", color: "#10b981" },
  { id: "5", name: "UI/UX", action: "Designed responsive dashboard 🎨", time: "3d ago", avatar: "UX", color: "#f59e0b" },
];

const learningGoals: LearningGoal[] = [
  { id: "g1", label: "Complete React Advanced Patterns course", done: false, priority: "high", category: "Frontend" },
  { id: "g2", label: "Build portfolio project with Next.js", done: true, priority: "high", category: "Fullstack" },
  { id: "g3", label: "Master TypeScript advanced types", done: false, priority: "mid", category: "TypeScript" },
  { id: "g4", label: "Learn GraphQL fundamentals", done: false, priority: "mid", category: "Backend" },
  { id: "g5", label: "Complete UI/UX design principles", done: true, priority: "low", category: "Design" },
];

const skillProgress: SkillProgress[] = [
  { skill: "React", progress: 85, level: "Advanced", color: "#60a5fa", icon: <Code size={16} /> },
  { skill: "TypeScript", progress: 78, level: "Intermediate", color: "#3b82f6", icon: <Shield size={16} /> },
  { skill: "Next.js", progress: 92, level: "Expert", color: "#8b5cf6", icon: <Zap size={16} /> },
  { skill: "Node.js", progress: 65, level: "Intermediate", color: "#10b981", icon: <Database size={16} /> },
  { skill: "UI/UX", progress: 70, level: "Intermediate", color: "#f59e0b", icon: <Sparkles size={16} /> },
];

const learningStats: StatCard[] = [
  {
    id: "courses",
    label: "Courses Completed",
    value: "24",
    change: "+3 this month",
    positive: true,
    icon: <BookOpen size={20} />,
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/25"
  },
  {
    id: "skills",
    label: "Skills Mastered",
    value: "47",
    change: "+8 this week",
    positive: true,
    icon: <Trophy size={20} />,
    gradient: "from-yellow-500 to-orange-500",
    glow: "shadow-yellow-500/25"
  },
  {
    id: "hours",
    label: "Study Hours",
    value: "156",
    change: "+12% vs last month",
    positive: true,
    icon: <Clock size={20} />,
    gradient: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/25"
  },
  {
    id: "streak",
    label: "Learning Streak",
    value: "12 days",
    change: "Personal best!",
    positive: true,
    icon: <Target size={20} />,
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/25"
  }
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState<LearningGoal[]>(learningGoals);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    ));
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-400" />
              Learning Dashboard
            </h1>
            <p className="text-white/60 mt-1">Track your progress and achieve your goals 🚀</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-xl border border-white/10 transition-all"
            >
              <Star className="h-4 w-4 inline mr-2" />
              View Achievements
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {learningStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border border-white/10 shadow-xl ${stat.glow} overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-xl`}>
                    {stat.icon}
                  </div>
                  <TrendingUp className={`h-4 w-4 ${stat.positive ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/80">{stat.label}</p>
                  <p className={`text-xs ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Learning Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Weekly Learning Progress
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={learningProgressData}>
                  <defs>
                    <linearGradient id="studyHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="skillsLearned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="day" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="studyHours"
                    stroke="#60a5fa"
                    fillOpacity={1}
                    fill="url(#studyHours)"
                    name="Study Hours"
                  />
                  <Line
                    type="monotone"
                    dataKey="skillsLearned"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="Skills Learned"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Skill Mastery
              </h3>
              <div className="space-y-4">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white/60">{skill.icon}</span>
                        <span className="text-sm font-medium">{skill.skill}</span>
                      </div>
                      <span className="text-xs text-white/60">{skill.level}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Recent Learning Activities
            </h3>
            <div className="space-y-4">
              {learningActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: activity.color }}
                  >
                    {activity.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-white/60">{activity.action}</p>
                  </div>
                  <span className="text-xs text-white/40">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              Learning Goals
            </h3>
            <div className="space-y-3">
              {goals.map((goal, index) => {
                const StatusIcon = goal.done ? CheckCircle2 : Circle;
                const priorityColors = {
                  high: "text-red-400",
                  mid: "text-yellow-400",
                  low: "text-green-400"
                };

                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => toggleGoal(goal.id)}
                  >
                    <StatusIcon
                      className={`h-5 w-5 ${goal.done ? 'text-green-400' : 'text-white/40'}`}
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${goal.done ? 'line-through text-white/60' : 'text-white'}`}>
                        {goal.label}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[goal.priority]} bg-white/10`}>
                          {goal.priority}
                        </span>
                        <span className="text-xs text-white/40">{goal.category}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#070711] p-6 space-y-6">
      <div className="flex gap-4 items-center mb-8">
        <div className="w-32 h-8 bg-white/10 animate-pulse rounded-xl" />
        <div className="flex-1 h-9 max-w-sm bg-white/10 animate-pulse rounded-xl" />
        <div className="w-10 h-10 bg-white/10 animate-pulse rounded-xl ml-auto" />
        <div className="w-10 h-10 bg-white/10 animate-pulse rounded-xl" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-white/10 animate-pulse rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 h-72 bg-white/10 animate-pulse rounded-2xl" />
        <div className="h-72 bg-white/10 animate-pulse rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-80 bg-white/10 animate-pulse rounded-2xl" />
        <div className="h-80 bg-white/10 animate-pulse rounded-2xl" />
      </div>
    </div>
  );
}
