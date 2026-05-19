"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiCheckCircle, FiArrowUpRight, FiArrowUp } from "react-icons/fi";
import { LuLoader, LuSparkles } from "react-icons/lu";
import { TbRoute, TbTargetArrow, TbRocket } from "react-icons/tb";
import { MdAutoAwesome } from "react-icons/md";
import { HiOutlineChevronRight } from "react-icons/hi";

/* ─── Status Config ─────────────────────────────────────── */
const STATUS_CONFIG = {
  done: {
    label: "Shipped",
    icon: FiCheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
    headerClass: "kanban-col-done",
    glow: "shadow-[0_0_24px_rgba(52,211,153,0.08)]",
    progress: 100,
  },
  in_progress: {
    label: "In Progress",
    icon: LuLoader,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
    headerClass: "kanban-col-progress",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.08)]",
    progress: 50,
  },
  planned: {
    label: "Planned",
    icon: TbTargetArrow,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
    headerClass: "kanban-col-planned",
    glow: "shadow-[0_0_24px_rgba(96,165,250,0.08)]",
    progress: 0,
  },
  backlog: {
    label: "Backlog",
    icon: TbRocket,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    dot: "bg-slate-400",
    headerClass: "kanban-col-backlog",
    glow: "shadow-[0_0_24px_rgba(148,163,184,0.04)]",
    progress: 0,
  },
} as const;

type StatusKey = keyof typeof STATUS_CONFIG;

/* ─── Roadmap Data ─────────────────────────────────────── */
const ROADMAP_ITEMS: Array<{
  id: string;
  title: string;
  description: string;
  status: StatusKey;
  category: string;
  votes: number;
  quarter: string;
  progress?: number;
}> = [
  {
    id: "1",
    title: "Advanced Analytics Dashboard",
    description: "Rich charts and KPI tracking for feedback trends, vote patterns, and team velocity.",
    status: "done",
    category: "Analytics",
    votes: 248,
    quarter: "Q1 2026",
    progress: 100,
  },
  {
    id: "2",
    title: "Team Collaboration & Comments",
    description: "Threaded comments, @mentions, and real-time collaboration on feedback items.",
    status: "done",
    category: "Collaboration",
    votes: 312,
    quarter: "Q1 2026",
    progress: 100,
  },
  {
    id: "3",
    title: "AI-Powered Prioritization",
    description: "Machine learning model that scores and ranks feedback based on business impact and user sentiment.",
    status: "in_progress",
    category: "AI / ML",
    votes: 530,
    quarter: "Q2 2026",
    progress: 68,
  },
  {
    id: "4",
    title: "Slack & Jira Integrations",
    description: "Two-way sync with Slack channels and Jira issues. Auto-create tickets from feedback.",
    status: "in_progress",
    category: "Integrations",
    votes: 419,
    quarter: "Q2 2026",
    progress: 42,
  },
  {
    id: "5",
    title: "Public Feedback Portal",
    description: "Embeddable widget and public portal for customers to submit and vote on ideas without logging in.",
    status: "planned",
    category: "Product",
    votes: 285,
    quarter: "Q3 2026",
  },
  {
    id: "6",
    title: "Custom Workflows & Automations",
    description: "Visual workflow builder to automate status changes, notifications, and team assignments.",
    status: "planned",
    category: "Automation",
    votes: 198,
    quarter: "Q3 2026",
  },
  {
    id: "7",
    title: "Mobile App (iOS & Android)",
    description: "Native mobile app for reviewing and triaging feedback on the go.",
    status: "backlog",
    category: "Mobile",
    votes: 167,
    quarter: "Q4 2026",
  },
  {
    id: "8",
    title: "Multi-Language Support",
    description: "Full i18n support including RTL languages, with auto-translation for global teams.",
    status: "backlog",
    category: "Accessibility",
    votes: 142,
    quarter: "Q4 2026",
  },
];

const STATUS_COLUMNS: StatusKey[] = ["done", "in_progress", "planned", "backlog"];

/* ─── Category color map ─────────────────────────────────── */
const CAT_COLORS: Record<string, string> = {
  "Analytics":     "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Collaboration": "text-cyan-400   bg-cyan-500/10   border-cyan-500/20",
  "AI / ML":       "text-purple-400 bg-purple-500/10 border-purple-500/20",
  "Integrations":  "text-blue-400   bg-blue-500/10   border-blue-500/20",
  "Product":       "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  "Automation":    "text-amber-400  bg-amber-500/10  border-amber-500/20",
  "Mobile":        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Accessibility": "text-rose-400   bg-rose-500/10   border-rose-500/20",
};

/* ─── Roadmap Card ──────────────────────────────────────── */
function RoadmapCard({ item, delay }: { item: typeof ROADMAP_ITEMS[0]; delay: number }) {
  const catColor = CAT_COLORS[item.category] || "text-muted-foreground bg-white/5 border-white/10";

  return (
    <div
      className="card-hover-subtle group relative p-4 rounded-2xl border border-white/7 bg-[#111827]/80 backdrop-blur-sm space-y-3 animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-indigo-500/0 group-hover:from-violet-500/4 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      {/* Category + Quarter */}
      <div className="flex items-center justify-between relative">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catColor}`}>
          {item.category}
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">{item.quarter}</span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm leading-snug group-hover:text-violet-300 transition-colors duration-200 relative">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed relative">
        {item.description}
      </p>

      {/* Progress bar (if in progress or done) */}
      {item.progress !== undefined && (
        <div className="relative space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Progress</span>
            <span className={item.progress === 100 ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
              {item.progress}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-white/6 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                item.progress === 100
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                  : "bg-gradient-to-r from-amber-500 to-orange-400"
              }`}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5 relative">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <FiArrowUp className="h-3 w-3 text-violet-400" />
          <span className="font-semibold text-foreground">{item.votes}</span>
          <span>votes</span>
        </div>
        <FiArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-violet-400" />
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function RoadmapPage() {
  const [activeFilter, setActiveFilter] = useState<StatusKey | "all">("all");

  const displayColumns = STATUS_COLUMNS.filter(
    (s) => activeFilter === "all" || activeFilter === s
  );

  const totalVotes = ROADMAP_ITEMS.reduce((sum, i) => sum + i.votes, 0);
  const shippedCount = ROADMAP_ITEMS.filter((i) => i.status === "done").length;
  const inProgressCount = ROADMAP_ITEMS.filter((i) => i.status === "in_progress").length;

  return (
    <div className="min-h-screen mesh-bg">

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative border-b border-white/6 py-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: "radial-gradient(ellipse, #7c3aed, #1d4ed8, transparent 70%)" }} />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <div className="container mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest animate-fade-up">
            <TbRoute className="h-3 w-3" />
            Product Roadmap
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 realtime-dot" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up delay-100">
            What we&apos;re{" "}
            <span className="text-gradient-hero">building next</span>
          </h1>
          <p className="max-w-lg mx-auto text-muted-foreground text-lg animate-fade-up delay-200">
            Track our progress and see how your feedback is shaping the future of Prodexa.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 pt-2 animate-fade-up delay-300">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full stat-card-emerald text-sm">
              <FiCheckCircle className="h-4 w-4 text-emerald-400" />
              <span className="font-bold text-emerald-400">{shippedCount}</span>
              <span className="text-muted-foreground">Shipped</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full stat-card-amber text-sm">
              <LuLoader className="h-4 w-4 text-amber-400 animate-rotate-slow" />
              <span className="font-bold text-amber-400">{inProgressCount}</span>
              <span className="text-muted-foreground">In Progress</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full stat-card-indigo text-sm">
              <FiArrowUp className="h-4 w-4 text-violet-400" />
              <span className="font-bold text-violet-400">{totalVotes.toLocaleString()}</span>
              <span className="text-muted-foreground">Total Votes</span>
            </div>
          </div>

          <div className="pt-2 animate-fade-up delay-400">
            <Button
              asChild
              className="btn-primary-glow bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0"
            >
              <Link href="/feedback">
                <LuSparkles className="mr-2 h-4 w-4" />
                Submit an Idea
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────── */}
      <div className="sticky top-16 z-30 border-b border-white/6 glass-strong">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {(["all", ...STATUS_COLUMNS] as Array<"all" | StatusKey>).map((key) => {
              const cfg = key !== "all" ? STATUS_CONFIG[key] : null;
              const count = key === "all" ? ROADMAP_ITEMS.length : ROADMAP_ITEMS.filter(i => i.status === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeFilter === key
                      ? cfg
                        ? `${cfg.bg} ${cfg.color} border ${cfg.border}`
                        : "bg-violet-500/15 text-violet-400 border border-violet-500/25"
                      : "text-muted-foreground border border-white/8 hover:border-white/15 hover:text-foreground"
                  }`}
                >
                  {cfg && <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />}
                  {key === "all" ? "All" : cfg!.label}
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Kanban Board ─────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className={`grid gap-6 ${displayColumns.length === 1 ? "max-w-sm mx-auto" : displayColumns.length === 2 ? "grid-cols-1 md:grid-cols-2" : displayColumns.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
          {displayColumns.map((statusKey) => {
            const { label, icon: Icon, color, bg, border, dot, headerClass, glow } = STATUS_CONFIG[statusKey];
            const items = ROADMAP_ITEMS.filter((i) => i.status === statusKey);
            return (
              <div key={statusKey} className={`rounded-2xl p-4 ${headerClass} border border-white/6 ${glow}`}>
                {/* Column Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`h-2 w-2 rounded-full ${dot}`} />
                  <Icon className={`h-4 w-4 ${color} ${statusKey === "in_progress" ? "animate-rotate-slow" : ""}`} />
                  <span className={`font-semibold text-sm ${color}`}>{label}</span>
                  <span className="ml-auto text-xs text-muted-foreground font-medium bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <RoadmapCard key={item.id} item={item} delay={i * 0.08} />
                  ))}

                  {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                      <div className="h-10 w-10 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center">
                        <Icon className={`h-5 w-5 ${color} opacity-40`} />
                      </div>
                      <p className="text-xs text-muted-foreground">Nothing here yet</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}