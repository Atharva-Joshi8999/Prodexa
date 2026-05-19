"use client";

import { useState } from "react";
import {
  FiUsers, FiMessageSquare, FiArrowUp, FiCheckCircle,
  FiSettings, FiShield, FiTrash2, FiEdit, FiMoreVertical,
  FiSearch, FiDownload, FiFilter,
} from "react-icons/fi";
import { LuLayoutDashboard, LuTrendingUp } from "react-icons/lu";
import { HiOutlineChartBar } from "react-icons/hi";
import { MdAutoAwesome } from "react-icons/md";
import { TbRoute } from "react-icons/tb";

/* ── Data ─────────────────────────────── */
const STATS = [
  { label: "Total Feedback",  value: "1,248", delta: "+12%", icon: FiMessageSquare, style: "stat-card-indigo",  color: "text-violet-500 dark:text-violet-400" },
  { label: "Active Users",    value: "3,842", delta: "+8%",  icon: FiUsers,         style: "stat-card-cyan",    color: "text-cyan-500 dark:text-cyan-400"   },
  { label: "Total Votes",     value: "85.4K", delta: "+24%", icon: FiArrowUp,       style: "stat-card-amber",   color: "text-amber-500 dark:text-amber-400"  },
  { label: "Features Shipped",value: "248",   delta: "+5%",  icon: FiCheckCircle,   style: "stat-card-emerald", color: "text-emerald-500 dark:text-emerald-400" },
];

const RECENT_USERS = [
  { name: "Jordan Kim",   email: "jordan@nexusai.com",   role: "Admin",  avatar: "JK", avatarBg: "from-violet-500 to-indigo-600", status: "active",   joined: "2d ago" },
  { name: "Sarah Miller", email: "sarah@stackable.io",   role: "Member", avatar: "SM", avatarBg: "from-pink-500 to-rose-600",     status: "active",   joined: "5d ago" },
  { name: "Alex Park",    email: "alex@dataflow.com",    role: "Member", avatar: "AP", avatarBg: "from-cyan-500 to-blue-600",     status: "inactive", joined: "1w ago" },
  { name: "Chris Ray",    email: "chris@vercelapp.co",   role: "Viewer", avatar: "CR", avatarBg: "from-emerald-500 to-teal-600",  status: "active",   joined: "2w ago" },
  { name: "Priya Sharma", email: "priya@framer.design",  role: "Member", avatar: "PS", avatarBg: "from-amber-500 to-orange-600",  status: "pending",  joined: "3w ago" },
];

const RECENT_FEEDBACK = [
  { title: "Dark mode for portal",       category: "Feature Request", votes: 312, status: "in_progress", author: "Jordan K." },
  { title: "CSV export for data",        category: "Feature Request", votes: 248, status: "planned",     author: "Sarah M."  },
  { title: "Webhook support",            category: "Integration",     votes: 198, status: "backlog",     author: "Alex P."   },
  { title: "Bulk status update",         category: "Improvement",     votes: 167, status: "done",        author: "Chris R."  },
];

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  in_progress: { label: "In Progress", color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-500/10 border border-amber-500/20"   },
  planned:     { label: "Planned",     color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-500/10 border border-blue-500/20"     },
  done:        { label: "Shipped",     color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border border-emerald-500/20" },
  backlog:     { label: "Backlog",     color: "text-slate-500 dark:text-slate-400",   bg: "bg-slate-500/10 border border-slate-500/20"   },
};

const ACTIVITY = [
  { text: "Jordan voted on \"Dark mode portal\"",       time: "2m ago",  dot: "bg-violet-400" },
  { text: "Feature \"CSV Export\" status → Shipped",   time: "1h ago",  dot: "bg-emerald-400" },
  { text: "New user Sarah Miller joined",              time: "3h ago",  dot: "bg-cyan-400" },
  { text: "AI detected 3 duplicate requests",         time: "5h ago",  dot: "bg-purple-400" },
  { text: "Chris updated roadmap Q3 items",           time: "1d ago",  dot: "bg-amber-400" },
];

const BAR_DATA = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 82 },
  { label: "Wed", value: 54 },
  { label: "Thu", value: 91 },
  { label: "Fri", value: 76 },
  { label: "Sat", value: 38 },
  { label: "Sun", value: 47 },
];

const SIDEBAR_ITEMS = [
  { icon: LuLayoutDashboard, label: "Overview",  active: true  },
  { icon: FiUsers,           label: "Users",     active: false },
  { icon: FiMessageSquare,   label: "Feedback",  active: false },
  { icon: TbRoute,           label: "Roadmap",   active: false },
  { icon: HiOutlineChartBar, label: "Analytics", active: false },
  { icon: MdAutoAwesome,     label: "AI Insights", active: false },
  { icon: FiSettings,        label: "Settings",  active: false },
];

/* ── Admin Page ─────────────────────────────────────────── */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "feedback">("overview");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen mesh-bg flex">

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 sidebar-surface pt-6 pb-8 px-3 gap-1 sticky top-16 h-[calc(100vh-4rem)]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 mb-2">Admin Panel</p>
        {SIDEBAR_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left w-full ${
              active
                ? "bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/20"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}

        <div className="mt-auto">
          <div className="p-3 rounded-2xl ai-border">
            <div className="flex items-center gap-2 mb-1.5">
              <MdAutoAwesome className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">AI Status</span>
            </div>
            <p className="text-[10px] text-muted-foreground">All systems nominal. Last sync 2m ago.</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="flex-1 min-w-0 p-6 space-y-6 overflow-auto">

        {/* Header */}
        <div className="flex items-center justify-between animate-fade-up">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Welcome back. Here&apos;s what&apos;s happening.
              <span className="ml-2 inline-flex items-center gap-1 text-emerald-500 dark:text-emerald-400 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 realtime-dot" />
                Live
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-border bg-background text-muted-foreground text-sm hover:text-foreground hover:border-border/80 transition-all">
              <FiDownload className="h-3.5 w-3.5" />
              <span className="hidden sm:block">Export</span>
            </button>
            <button className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:from-violet-500 hover:to-indigo-500 transition-all shadow-[0_4px_16px_rgba(99,60,220,0.3)]">
              <FiSettings className="h-3.5 w-3.5" />
              <span className="hidden sm:block">Settings</span>
            </button>
          </div>
        </div>

        {/* ── Stats Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
          {STATS.map(({ label, value, delta, icon: Icon, style, color }, i) => (
            <div
              key={label}
              className={`card-hover-subtle relative p-5 rounded-2xl ${style} overflow-hidden`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                  {delta}
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Charts Row ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-up delay-200">

          {/* Bar Chart */}
          <div className="lg:col-span-2 p-5 rounded-2xl panel-surface backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-[15px] text-foreground">Weekly Feedback</h3>
                <p className="text-xs text-muted-foreground mt-0.5">New submissions this week</p>
              </div>
              <select className="h-7 bg-background border border-border rounded-lg px-2 text-xs text-muted-foreground outline-none focus:border-violet-500/40">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="flex items-end gap-2 h-32">
              {BAR_DATA.map(({ label, value }) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="relative w-full flex items-end justify-center" style={{ height: "100px" }}>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-violet-600/80 to-violet-400/60 transition-all duration-300 group-hover:from-violet-500 group-hover:to-violet-300 cursor-pointer"
                      style={{ height: `${value}%` }}
                    />
                    <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-violet-500 dark:text-violet-400 whitespace-nowrap">
                      {value}
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="p-5 rounded-2xl panel-surface backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <LuTrendingUp className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
              <h3 className="font-semibold text-[15px] text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="relative mt-1.5 shrink-0">
                    <span className={`h-2 w-2 rounded-full ${item.dot} block`} />
                    {i < ACTIVITY.length - 1 && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-6 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed text-foreground">{item.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ────────────────────────────────────────── */}
        <div className="flex items-center gap-1 border-b border-border animate-fade-up delay-300">
          {(["overview", "users", "feedback"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-violet-600 dark:text-violet-400 border-violet-500"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Users Table ─────────────────────────────────── */}
        {(activeTab === "overview" || activeTab === "users") && (
          <div className="rounded-2xl panel-surface overflow-hidden animate-fade-up delay-400">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FiUsers className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                <h3 className="font-semibold text-[15px] text-foreground">Team Members</h3>
                <span className="text-xs text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-full">
                  {RECENT_USERS.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="h-8 bg-background border border-border rounded-lg pl-7 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-violet-500/40 transition-all w-44"
                  />
                </div>
                <button className="flex items-center gap-1 h-8 px-3 rounded-lg border border-border bg-background text-muted-foreground text-xs hover:text-foreground transition-all">
                  <FiFilter className="h-3 w-3" />
                  Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["User", "Role", "Status", "Joined", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_USERS.filter(u =>
                    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
                  ).map((user) => (
                    <tr key={user.email} className="border-b border-border hover:bg-black/3 dark:hover:bg-white/3 transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${user.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                            {user.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          user.role === "Admin"
                            ? "text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20"
                            : user.role === "Member"
                            ? "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
                            : "text-slate-500 dark:text-slate-400 bg-slate-500/10 border border-slate-500/20"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`flex items-center gap-1.5 text-[11px] font-medium ${
                          user.status === "active" ? "text-emerald-600 dark:text-emerald-400" : user.status === "pending" ? "text-amber-600 dark:text-amber-400" : "text-slate-500 dark:text-slate-400"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "active" ? "bg-emerald-500" : user.status === "pending" ? "bg-amber-500" : "bg-slate-400"
                          }`} />
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{user.joined}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="h-7 w-7 rounded-lg flex items-center justify-center border border-border bg-background text-muted-foreground hover:text-foreground transition-all">
                            <FiEdit className="h-3 w-3" />
                          </button>
                          <button className="h-7 w-7 rounded-lg flex items-center justify-center border border-red-500/20 bg-red-500/8 text-red-500 dark:text-red-400 hover:bg-red-500/15 transition-all">
                            <FiTrash2 className="h-3 w-3" />
                          </button>
                          <button className="h-7 w-7 rounded-lg flex items-center justify-center border border-border bg-background text-muted-foreground hover:text-foreground transition-all">
                            <FiMoreVertical className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Feedback Moderation ─────────────────────────── */}
        {(activeTab === "overview" || activeTab === "feedback") && (
          <div className="rounded-2xl panel-surface overflow-hidden animate-fade-up delay-500">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FiMessageSquare className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                <h3 className="font-semibold text-[15px] text-foreground">Feedback Moderation</h3>
              </div>
              <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-background text-muted-foreground text-xs hover:text-foreground transition-all">
                <FiShield className="h-3 w-3" />
                Moderate All
              </button>
            </div>
            <div className="divide-y divide-border">
              {RECENT_FEEDBACK.map((item, i) => {
                const badge = STATUS_BADGE[item.status];
                return (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors group">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <FiArrowUp className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400 shrink-0" />
                        <span className="text-sm font-semibold text-foreground">{item.votes}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.author} · {item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full hidden sm:block ${badge.color} ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="h-7 px-2.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground text-xs transition-all">Edit</button>
                        <button className="h-7 w-7 rounded-lg flex items-center justify-center border border-red-500/20 bg-red-500/8 text-red-500 dark:text-red-400 hover:bg-red-500/15 transition-all">
                          <FiTrash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}