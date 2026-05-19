"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FiMessageSquare, FiArrowUp, FiBell, FiSearch,
  FiFilter, FiPlus, FiX, FiCheckCircle, FiArrowUpRight,
} from "react-icons/fi";
import { LuLoader, LuUsers, LuSparkles } from "react-icons/lu";
import { TbTargetArrow, TbFlame, TbTrendingUp } from "react-icons/tb";
import { HiOutlineClock, HiOutlineFire } from "react-icons/hi";
import { MdAutoAwesome } from "react-icons/md";

/* ─── Data ─────────────────────────────────────────────── */

const CATEGORIES = [
  "All", "Feature Request", "Bug Report", "Improvement", "Integration", "Design",
];

const SORT_OPTIONS = [
  { icon: HiOutlineFire, label: "Top Voted" },
  { icon: TbTrendingUp, label: "Trending" },
  { icon: HiOutlineClock, label: "Newest" },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  in_progress: { label: "In Progress", color: "text-amber-400", bg: "bg-amber-500/10 border border-amber-500/20", dot: "bg-amber-400" },
  planned:     { label: "Planned",     color: "text-blue-400",  bg: "bg-blue-500/10 border border-blue-500/20",   dot: "bg-blue-400" },
  done:        { label: "Shipped",     color: "text-emerald-400", bg: "bg-emerald-500/10 border border-emerald-500/20", dot: "bg-emerald-400" },
  backlog:     { label: "Backlog",     color: "text-slate-400", bg: "bg-slate-500/10 border border-slate-500/20", dot: "bg-slate-400" },
};

const FEEDBACK_ITEMS = [
  {
    id: "1",
    title: "Dark mode for the feedback portal",
    description: "Would love a dark mode option for the public feedback portal. It's much easier on the eyes during late-night review sessions.",
    author: "Jordan K.",
    avatar: "JK",
    avatarColor: "from-violet-500 to-indigo-600",
    category: "Feature Request",
    votes: 312,
    comments: 24,
    status: "in_progress",
    timeAgo: "2 days ago",
    hot: true,
    voted: false,
  },
  {
    id: "2",
    title: "CSV export for all feedback data",
    description: "Need the ability to export all feedback items to CSV for our quarterly reviews and offline analysis.",
    author: "Sarah M.",
    avatar: "SM",
    avatarColor: "from-pink-500 to-rose-600",
    category: "Feature Request",
    votes: 248,
    comments: 18,
    status: "planned",
    timeAgo: "4 days ago",
    hot: true,
    voted: false,
  },
  {
    id: "3",
    title: "Webhook support for status changes",
    description: "When a feedback item changes status, trigger a webhook so we can update our internal tools automatically.",
    author: "Alex P.",
    avatar: "AP",
    avatarColor: "from-cyan-500 to-blue-600",
    category: "Integration",
    votes: 198,
    comments: 12,
    status: "backlog",
    timeAgo: "1 week ago",
    hot: false,
    voted: true,
  },
  {
    id: "4",
    title: "Bulk status update for admin",
    description: "Admins should be able to select multiple feedback items and update their status in one action.",
    author: "Chris R.",
    avatar: "CR",
    avatarColor: "from-emerald-500 to-teal-600",
    category: "Improvement",
    votes: 167,
    comments: 8,
    status: "done",
    timeAgo: "2 weeks ago",
    hot: false,
    voted: false,
  },
  {
    id: "5",
    title: "Email digest for weekly summary",
    description: "Send a weekly email digest summarizing new feedback, top voted items, and status changes from the past week.",
    author: "Priya S.",
    avatar: "PS",
    avatarColor: "from-amber-500 to-orange-600",
    category: "Feature Request",
    votes: 145,
    comments: 6,
    status: "planned",
    timeAgo: "3 weeks ago",
    hot: false,
    voted: false,
  },
  {
    id: "6",
    title: "Fix: Vote count not updating in real-time",
    description: "After voting on an item, the count doesn't update until page refresh. Expected live update behavior.",
    author: "Marcus T.",
    avatar: "MT",
    avatarColor: "from-red-500 to-rose-600",
    category: "Bug Report",
    votes: 89,
    comments: 14,
    status: "in_progress",
    timeAgo: "5 days ago",
    hot: false,
    voted: false,
  },
];

const STATS = [
  { label: "Ideas Submitted", value: "1.2K+", icon: FiMessageSquare, color: "text-violet-400", bg: "stat-card-indigo" },
  { label: "Total Votes",     value: "85K+",  icon: FiArrowUp,        color: "text-cyan-400",   bg: "stat-card-cyan"   },
  { label: "Features Shipped",value: "250+",  icon: FiCheckCircle,    color: "text-emerald-400", bg: "stat-card-emerald"},
];

/* ─── New Feedback Modal ─────────────────────────────────── */
function NewFeedbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative w-full max-w-lg glass-strong rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <LuSparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[15px]">Submit Feedback</h3>
              <p className="text-xs text-muted-foreground">Share your idea with the community</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center border border-white/8 bg-white/4 text-muted-foreground hover:text-foreground transition-all"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Title</label>
            <input
              autoFocus
              placeholder="What's your idea or issue?"
              className="w-full h-10 bg-white/4 border border-white/8 rounded-xl px-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Description</label>
            <textarea
              rows={3}
              placeholder="Describe in detail..."
              className="w-full bg-white/4 border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Category</label>
              <select className="w-full h-10 bg-white/4 border border-white/8 rounded-xl px-3 text-sm text-foreground outline-none focus:border-violet-500/50 transition-all appearance-none">
                {CATEGORIES.filter(c => c !== "All").map(c => (
                  <option key={c} className="bg-[#111827]">{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Priority</label>
              <select className="w-full h-10 bg-white/4 border border-white/8 rounded-xl px-3 text-sm text-foreground outline-none focus:border-violet-500/50 transition-all appearance-none">
                <option className="bg-[#111827]">Low</option>
                <option className="bg-[#111827]">Medium</option>
                <option className="bg-[#111827]">High</option>
              </select>
            </div>
          </div>

          {/* AI hint */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-violet-500/8 border border-violet-500/15">
            <MdAutoAwesome className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-violet-400 font-medium">AI Insight:</span> Similar ideas have been submitted. We'll check for duplicates automatically.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/8 bg-white/2">
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
          <Button className="btn-primary-glow bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 h-9 px-5 text-sm font-semibold">
            Submit Idea
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function FeedbackPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Top Voted");
  const [searchQuery, setSearchQuery] = useState("");
  const [votes, setVotes] = useState<Record<string, { count: number; voted: boolean }>>(
    Object.fromEntries(FEEDBACK_ITEMS.map((f) => [f.id, { count: f.votes, voted: f.voted }]))
  );
  const [modalOpen, setModalOpen] = useState(false);

  const toggleVote = (id: string) => {
    setVotes((prev) => ({
      ...prev,
      [id]: {
        count: prev[id].voted ? prev[id].count - 1 : prev[id].count + 1,
        voted: !prev[id].voted,
      },
    }));
  };

  const filtered = FEEDBACK_ITEMS.filter((f) => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchQ = !searchQuery || f.title.toLowerCase().includes(searchQuery.toLowerCase()) || f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen mesh-bg">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative border-b border-white/6 py-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: "radial-gradient(ellipse, #7c3aed, #4f46e5, transparent 70%)" }} />
          <div className="absolute inset-0 dot-bg opacity-30" />
        </div>

        <div className="container mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest animate-fade-up">
            <FiMessageSquare className="h-3 w-3" />
            Community Feedback
            <span className="flex h-1.5 w-1.5 rounded-full bg-violet-400 realtime-dot" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up delay-100">
            Your voice{" "}
            <span className="text-gradient-hero">shapes Prodexa</span>
          </h1>
          <p className="max-w-lg mx-auto text-muted-foreground text-lg animate-fade-up delay-200">
            Browse ideas from the community, vote on what matters most, and submit your own.
          </p>

          {/* Stats strip inline */}
          <div className="flex flex-wrap justify-center gap-6 pt-2 animate-fade-up delay-300">
            {STATS.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className={`flex items-center gap-2.5 px-4 py-2 rounded-full ${bg} text-sm`}>
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="font-bold text-foreground">{value}</span>
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8 pb-28">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ──────────────────────────────────── */}
          <aside className="lg:w-56 shrink-0 space-y-5 animate-slide-in-left">

            {/* Sort */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">Sort By</p>
              <div className="space-y-1">
                {SORT_OPTIONS.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setActiveSort(label)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                      activeSort === label
                        ? "bg-violet-500/15 text-violet-400 border border-violet-500/25 shadow-[0_0_12px_rgba(139,92,246,0.1)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">Category</p>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-between group ${
                      activeCategory === cat
                        ? "bg-violet-500/15 text-violet-400 border border-violet-500/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Insights teaser */}
            <div className="p-3.5 rounded-2xl ai-border ai-glow">
              <div className="flex items-center gap-2 mb-2">
                <MdAutoAwesome className="h-4 w-4 text-violet-400" />
                <span className="text-xs font-semibold text-violet-400">AI Summary</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dark mode & CSV export are trending. <span className="text-violet-400">3 duplicate requests</span> detected this week.
              </p>
            </div>
          </aside>

          {/* ── Feed ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ideas..."
                  className="w-full h-9 bg-white/4 border border-white/8 rounded-xl pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10 transition-all"
                />
              </div>
              <div className="text-sm text-muted-foreground hidden sm:block shrink-0">
                <span className="font-semibold text-foreground">{filtered.length}</span> ideas
              </div>
            </div>

            {/* Category tabs (mobile scroll) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                      : "text-muted-foreground border border-white/8 hover:border-white/15 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-fade-in">
                <div className="h-16 w-16 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
                  <FiMessageSquare className="h-7 w-7 text-muted-foreground/50" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground mb-1">No ideas found</p>
                  <p className="text-xs text-muted-foreground">Try a different category or search term</p>
                </div>
                <Button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  variant="outline"
                  size="sm"
                  className="border-white/8 hover:border-violet-500/30 hover:bg-violet-500/5 text-sm"
                >
                  Reset filters
                </Button>
              </div>
            )}

            {/* Feedback cards */}
            {filtered.map((item, i) => {
              const statusBadge = STATUS_MAP[item.status];
              const vote = votes[item.id];
              return (
                <div
                  key={item.id}
                  className="card-hover group relative p-5 rounded-2xl border border-white/7 bg-[#111827]/80 backdrop-blur-sm animate-fade-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {/* Gradient hover overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-indigo-500/0 group-hover:from-violet-500/4 group-hover:to-indigo-500/3 transition-all duration-500 pointer-events-none" />

                  {/* Hot badge */}
                  {item.hot && (
                    <div className="absolute top-3 right-3 badge-hot flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      <TbFlame className="h-3 w-3" />
                      Hot
                    </div>
                  )}

                  <div className="flex gap-4 relative">
                    {/* Vote block */}
                    <div className="shrink-0">
                      <button
                        onClick={() => toggleVote(item.id)}
                        className={`upvote-btn flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-xl border transition-all duration-200 ${
                          vote.voted
                            ? "bg-violet-500/15 border-violet-500/40 shadow-[0_4px_16px_rgba(139,92,246,0.2)]"
                            : "border-white/8 bg-white/4 hover:border-violet-500/30 hover:bg-violet-500/8"
                        }`}
                      >
                        <FiArrowUp className={`h-4 w-4 transition-colors duration-150 ${vote.voted ? "text-violet-400" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-bold leading-none ${vote.voted ? "text-violet-400" : "text-foreground"}`}>
                          {vote.count}
                        </span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBadge.color} ${statusBadge.bg}`}>
                          <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1.5 ${statusBadge.dot}`} />
                          {statusBadge.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-[15px] leading-snug group-hover:text-violet-300 transition-colors duration-200 flex items-center gap-1.5 pr-12">
                        {item.title}
                        <FiArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 text-violet-400" />
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 pt-1">
                        <div className="flex items-center gap-1.5">
                          <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${item.avatarColor} flex items-center justify-center text-white text-[9px] font-bold`}>
                            {item.avatar}
                          </div>
                          <span className="text-xs text-muted-foreground">{item.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <FiMessageSquare className="h-3 w-3" />
                          {item.comments}
                        </div>
                        <span className="text-xs text-muted-foreground ml-auto">{item.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Load more */}
            <div className="text-center pt-4">
              <Button
                variant="outline"
                className="border-white/8 hover:border-violet-500/30 hover:bg-violet-500/5 text-sm"
              >
                Load More Ideas
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Create Button ──────────────────────── */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-[0_8px_32px_rgba(99,60,220,0.5)] hover:shadow-[0_12px_40px_rgba(99,60,220,0.6)] transition-all duration-200 hover:-translate-y-1 shimmer group"
        aria-label="Submit new feedback"
      >
        <FiPlus className="h-4.5 w-4.5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:block">Submit Idea</span>
      </button>

      {/* ── New Feedback Modal ── */}
      <NewFeedbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}