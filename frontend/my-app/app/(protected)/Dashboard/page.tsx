"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BarChart3, MessageSquare, CheckSquare,
  Settings, Bell, Search, TrendingUp, Users, DollarSign,
  ClipboardCheck, ChevronDown, Star, Zap, ArrowUpRight,
  Circle, Menu, X, Sparkles, Activity,
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

interface Task {
  id: string;
  label: string;
  done: boolean;
  priority: "high" | "mid" | "low";
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const lineData = [
  { day: "Mon", users: 420, revenue: 2400 },
  { day: "Tue", users: 580, revenue: 1398 },
  { day: "Wed", users: 510, revenue: 5800 },
  { day: "Thu", users: 790, revenue: 3908 },
  { day: "Fri", users: 630, revenue: 4800 },
  { day: "Sat", users: 940, revenue: 3800 },
  { day: "Sun", users: 1120, revenue: 7200 },
];

const barData = [
  { month: "Jan", activity: 65 },
  { month: "Feb", activity: 89 },
  { month: "Mar", activity: 72 },
  { month: "Apr", activity: 95 },
  { month: "May", activity: 58 },
  { month: "Jun", activity: 110 },
  { month: "Jul", activity: 88 },
];

const activityFeed: ActivityItem[] = [
  { id: "1", name: "Mia Chen", action: "completed onboarding flow ✨", time: "2m ago", avatar: "MC", color: "#a78bfa" },
  { id: "2", name: "Jake Torres", action: "upgraded to Pro plan 💎", time: "14m ago", avatar: "JT", color: "#34d399" },
  { id: "3", name: "Zara Ali", action: "left a 5-star review ⭐", time: "1h ago", avatar: "ZA", color: "#f472b6" },
  { id: "4", name: "Luca Rossi", action: "submitted a support ticket 📩", time: "2h ago", avatar: "LR", color: "#60a5fa" },
  { id: "5", name: "Nia Park", action: "referred 3 new users 🔗", time: "4h ago", avatar: "NP", color: "#fbbf24" },
];

const initialTasks: Task[] = [
  { id: "t1", label: "Review onboarding funnel analytics", done: false, priority: "high" },
  { id: "t2", label: "Ship v2.1 dashboard update", done: true, priority: "high" },
  { id: "t3", label: "Write Q3 growth report", done: false, priority: "mid" },
  { id: "t4", label: "Design new notification system", done: false, priority: "mid" },
  { id: "t5", label: "Update API docs", done: true, priority: "low" },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
  { id: "tasks", label: "Tasks", icon: <CheckSquare size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

const stats: StatCard[] = [
  {
    id: "users",
    label: "Total Users",
    value: "94,231",
    change: "+12.4%",
    positive: true,
    icon: <Users size={20} />,
    gradient: "from-violet-600/20 to-purple-600/10",
    glow: "shadow-violet-500/20",
  },
  {
    id: "revenue",
    label: "Revenue",
    value: "$48,920",
    change: "+8.7%",
    positive: true,
    icon: <DollarSign size={20} />,
    gradient: "from-emerald-600/20 to-teal-600/10",
    glow: "shadow-emerald-500/20",
  },
  {
    id: "tasks",
    label: "Tasks Completed",
    value: "1,847",
    change: "+23.1%",
    positive: true,
    icon: <ClipboardCheck size={20} />,
    gradient: "from-pink-600/20 to-rose-600/10",
    glow: "shadow-pink-500/20",
  },
  {
    id: "growth",
    label: "Growth Rate",
    value: "34.8%",
    change: "-2.3%",
    positive: false,
    icon: <TrendingUp size={20} />,
    gradient: "from-amber-600/20 to-orange-600/10",
    glow: "shadow-amber-500/20",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const priorityStyle: Record<Task["priority"], string> = {
  high: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  mid: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  low: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
};

function GlassCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative rounded-2xl border border-white/[0.07]
        bg-white/[0.04] backdrop-blur-xl
        shadow-xl overflow-hidden
        ${className}
      `}
    >
      {/* inner top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}

function StatCardItem({ card, index }: { card: StatCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`
        group relative rounded-2xl border border-white/[0.07]
        bg-gradient-to-br ${card.gradient}
        backdrop-blur-xl p-5 cursor-default
        shadow-lg ${card.glow}
        overflow-hidden transition-shadow duration-300
        hover:shadow-2xl
      `}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/[0.03] blur-xl group-hover:bg-white/[0.06] transition-all duration-500" />

      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-white/[0.08] border border-white/10 text-white/80">
          {card.icon}
        </div>
        <span className={`
          flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
          ${card.positive
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
            : "bg-rose-500/15 text-rose-400 border border-rose-500/20"}
        `}>
          <ArrowUpRight size={11} className={card.positive ? "" : "rotate-90"} />
          {card.change}
        </span>
      </div>

      <p className="text-2xl font-bold text-white tracking-tight mb-1">{card.value}</p>
      <p className="text-xs text-white/50 font-medium uppercase tracking-widest">{card.label}</p>
    </motion.div>
  );
}

function TaskItem({
  task,
  onToggle,
  index,
}: {
  task: Task;
  onToggle: (id: string) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index, ease: "easeOut" }}
      whileHover={{ x: 4 }}
      onClick={() => onToggle(task.id)}
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer
        hover:bg-white/[0.05] border border-transparent hover:border-white/[0.07]
        transition-all duration-200 group"
    >
      <motion.div
        animate={{ scale: task.done ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.25 }}
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
          transition-colors duration-300
          ${task.done
            ? "bg-violet-500 border-violet-500"
            : "border-white/20 group-hover:border-violet-400/60"}
        `}
      >
        {task.done && (
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
            viewBox="0 0 12 12"
            className="w-3 h-3"
          >
            <motion.path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.svg>
        )}
      </motion.div>

      <span className={`flex-1 text-sm transition-all duration-300 ${task.done ? "line-through text-white/30" : "text-white/80"}`}>
        {task.label}
      </span>

      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle[task.priority]}`}>
        {task.priority}
      </span>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f0f1a]/90 border border-white/10 rounded-xl p-3 backdrop-blur-xl shadow-2xl">
        <p className="text-white/50 text-xs mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-white text-sm font-semibold">
            {p.name === "revenue" ? "$" : ""}{p.value.toLocaleString()}
            <span className="text-white/40 font-normal ml-1">{p.name}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const toggleTask = (id: string) =>
    setTasks((prev: any[]) => prev.map((t: { id: string; done: any; }) => (t.id === id ? { ...t, done: !t.done } : t)));

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#070711] text-white font-sans relative overflow-hidden">
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/4 rounded-full blur-[150px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* ── Sidebar overlay (mobile) ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* ── Sidebar ── */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="
            fixed left-0 top-0 h-full w-64 z-40 lg:relative lg:translate-x-0 lg:flex
            flex-col border-r border-white/[0.06]
            bg-[#09091a]/80 backdrop-blur-2xl
          "
          style={{ display: "flex" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">Nexus<span className="text-violet-400">AI</span></span>
            <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/40 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-3 mb-3">Menu</p>
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-colors duration-200 relative group
                    ${isActive
                      ? "text-white bg-white/[0.08] border border-white/[0.08]"
                      : "text-white/45 hover:text-white/80 hover:bg-white/[0.04]"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-violet-400 to-pink-400 rounded-full"
                    />
                  )}
                  <span className={isActive ? "text-violet-400" : ""}>{item.icon}</span>
                  {item.label}
                  {item.id === "messages" && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-pink-500 text-[10px] font-bold flex items-center justify-center">3</span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* User mini card */}
          <div className="p-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                AK
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">Alex Kim</p>
                <p className="text-[10px] text-violet-400 font-medium">Pro Plan ✦</p>
              </div>
              <Settings size={14} className="ml-auto text-white/30 flex-shrink-0" />
            </div>
          </div>
        </motion.aside>

        {/* ── Main area ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* ── Navbar ── */}
          <header className="flex items-center gap-4 px-4 md:px-6 py-4 border-b border-white/[0.06] bg-[#07071180]/80 backdrop-blur-xl flex-shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Search */}
            <motion.div
              animate={{ width: searchFocused ? "100%" : "auto" }}
              className="flex-1 max-w-sm relative"
            >
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                type="text"
                placeholder="Search anything..."
                className="
                  w-full pl-9 pr-4 py-2 rounded-xl text-sm
                  bg-white/[0.05] border border-white/[0.08]
                  text-white placeholder-white/30
                  focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07]
                  transition-all duration-200
                "
              />
            </motion.div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Notif */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                  className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all relative"
                >
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50" />
                </motion.button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-[#0f0f1e]/95 backdrop-blur-2xl shadow-2xl z-50 p-3"
                    >
                      <p className="text-xs font-semibold text-white/50 uppercase tracking-widest px-2 mb-2">Notifications</p>
                      {["New user signup 🎉", "Revenue milestone hit 💰", "System update ready 🔧"].map((n, i) => (
                        <div key={i} className="px-3 py-2.5 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors">
                          <p className="text-sm text-white/80">{n}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">{i + 1}h ago</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-xs font-bold">
                    AK
                  </div>
                  <ChevronDown size={14} className="text-white/40" />
                </motion.button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-[#0f0f1e]/95 backdrop-blur-2xl shadow-2xl z-50 p-2"
                    >
                      {["Profile", "Settings", "Sign out"].map((item) => (
                        <button key={item} className="w-full text-left px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">
                          {item}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* ── Scrollable content ── */}
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">

            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-violet-400" />
                  <span className="text-xs text-violet-400 font-semibold uppercase tracking-widest">Overview</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Good morning, Alex 👋
                </h1>
                <p className="text-sm text-white/40 mt-1">Here's what's happening with your product today.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] text-sm text-white/50">
                <Activity size={14} className="text-emerald-400" />
                <span>Live</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </motion.div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {stats.map((card, i) => (
                <StatCardItem key={card.id} card={card} index={i} />
              ))}
            </div>

            {/* ── Charts row ── */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              {/* Area/Line chart — wider */}
              <GlassCard className="xl:col-span-3 p-5" delay={0.2}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-sm font-semibold text-white">User Growth</h2>
                    <p className="text-xs text-white/40 mt-0.5">Daily active users this week</p>
                  </div>
                  <div className="flex gap-3 text-[11px] text-white/40">
                    <span className="flex items-center gap-1.5"><Circle size={8} className="fill-violet-500 text-violet-500" /> Users</span>
                    <span className="flex items-center gap-1.5"><Circle size={8} className="fill-pink-500 text-pink-500" /> Revenue</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={lineData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="users" stroke="#7c3aed" strokeWidth={2} fill="url(#gradUsers)" dot={false} />
                    <Area type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={2} fill="url(#gradRevenue)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Bar chart */}
              <GlassCard className="xl:col-span-2 p-5" delay={0.25}>
                <div className="mb-5">
                  <h2 className="text-sm font-semibold text-white">Monthly Activity</h2>
                  <p className="text-xs text-white/40 mt-0.5">Actions per month</p>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)", radius: 6 }} />
                    <Bar dataKey="activity" fill="url(#barGrad)" radius={[6, 6, 0, 0]}>
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a78bfa" />
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>

            {/* ── Activity + Tasks ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Recent activity */}
              <GlassCard className="p-5" delay={0.3}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
                  <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">View all →</button>
                </div>
                <div className="space-y-1">
                  {activityFeed.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.06, ease: "easeOut" }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-default"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border border-white/10"
                        style={{ backgroundColor: item.color + "25", color: item.color }}
                      >
                        {item.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white font-medium truncate">{item.name}</p>
                        <p className="text-xs text-white/40 truncate">{item.action}</p>
                      </div>
                      <span className="text-[10px] text-white/25 flex-shrink-0 group-hover:text-white/50 transition-colors">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Tasks */}
              <GlassCard className="p-5" delay={0.35}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-white">Task List</h2>
                  <span className="text-xs text-white/30 font-medium">
                    {tasks.filter((t: { done: any; }) => t.done).length}/{tasks.length} done ✅
                  </span>
                </div>
                <div className="space-y-0.5">
                  {tasks.map((task: Task, i: number) => (
                    <TaskItem key={task.id} task={task} onToggle={toggleTask} index={i} />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex justify-between text-xs text-white/30 mb-2">
                    <span>Progress</span>
                    <span>{Math.round((tasks.filter((t: { done: any; }) => t.done).length / tasks.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(tasks.filter((t: { done: any; }) => t.done).length / tasks.length) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* ── Quick highlights strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {[
                { label: "Avg. Session", value: "4m 32s", emoji: "⏱️" },
                { label: "Bounce Rate", value: "21.4%", emoji: "📉" },
                { label: "NPS Score", value: "72", emoji: "⭐" },
                { label: "Uptime", value: "99.98%", emoji: "🟢" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex items-center gap-3 cursor-default"
                >
                  <span className="text-2xl leading-none">{item.emoji}</span>
                  <div>
                    <p className="text-base font-bold text-white">{item.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-wider font-medium mt-0.5">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom padding */}
            <div className="h-4" />
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-white/[0.05] animate-pulse ${className}`} />
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#070711] p-6 space-y-6">
      <div className="flex gap-4 items-center mb-8">
        <SkeletonBox className="w-32 h-8" />
        <SkeletonBox className="flex-1 h-9 max-w-sm" />
        <SkeletonBox className="w-10 h-10 rounded-xl ml-auto" />
        <SkeletonBox className="w-10 h-10 rounded-xl" />
      </div>
      <SkeletonBox className="h-8 w-64" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <SkeletonBox key={i} className="h-28 rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <SkeletonBox className="xl:col-span-3 h-72 rounded-2xl" />
        <SkeletonBox className="xl:col-span-2 h-72 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SkeletonBox className="h-80 rounded-2xl" />
        <SkeletonBox className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}
