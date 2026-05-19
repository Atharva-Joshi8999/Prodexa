"use client";

import { useState } from "react";
import { MdAutoAwesome } from "react-icons/md";
import { FiArrowUp, FiArrowDown, FiAlertCircle, FiCheckCircle, FiRefreshCw, FiMessageSquare } from "react-icons/fi";
import { LuBrainCircuit, LuTrendingUp, LuSparkles, LuCopy } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";

/* ─── Data ──────────────────────────────────────────── */
const SENTIMENT_DATA = [
  { label: "Positive", value: 64, color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400", barColor: "from-emerald-500 to-teal-400" },
  { label: "Neutral",  value: 23, color: "bg-blue-500",    textColor: "text-blue-600 dark:text-blue-400",    barColor: "from-blue-500 to-cyan-400"   },
  { label: "Negative", value: 13, color: "bg-rose-500",    textColor: "text-rose-600 dark:text-rose-400",    barColor: "from-rose-500 to-red-400"    },
];

const TRENDS = [
  { label: "Dark mode requests",       delta: "+38%", up: true,  icon: LuTrendingUp,  color: "text-emerald-600 dark:text-emerald-400", bg: "stat-card-emerald" },
  { label: "API integration asks",     delta: "+22%", up: true,  icon: LuTrendingUp,  color: "text-cyan-600 dark:text-cyan-400",    bg: "stat-card-cyan"    },
  { label: "Bug report volume",        delta: "-14%", up: false, icon: FiArrowDown,   color: "text-rose-600 dark:text-rose-400",    bg: "stat-card-rose"    },
  { label: "Mobile feature requests",  delta: "+51%", up: true,  icon: LuTrendingUp,  color: "text-amber-600 dark:text-amber-400",   bg: "stat-card-amber"   },
];

const DUPLICATES = [
  {
    group: "Dark mode & Theme switching",
    count: 7,
    topVotes: 312,
    items: ["Dark mode for feedback portal", "Support system dark theme", "Night mode option", "Theme switcher"],
    confidence: 94,
  },
  {
    group: "Export & Reporting",
    count: 4,
    topVotes: 248,
    items: ["CSV export for all data", "Download feedback report", "Export to Excel", "Bulk data export"],
    confidence: 87,
  },
  {
    group: "Slack & Notification integrations",
    count: 5,
    topVotes: 198,
    items: ["Slack webhook support", "Slack notifications for status", "Slack bot integration"],
    confidence: 81,
  },
];

const AI_SUMMARIES = [
  {
    title: "Weekly AI Report",
    timestamp: "Generated 2h ago",
    body: "This week saw a 38% surge in UI/UX related requests, particularly around dark mode and accessibility. User sentiment is trending positive at 64%. The top request cluster around theme customization suggests a strong demand for personalised product experiences. Recommend prioritising the dark mode feature in the next sprint.",
    tags: ["UI/UX", "Trending", "High Impact"],
  },
  {
    title: "Duplicate Detection Summary",
    timestamp: "Generated 5h ago",
    body: "AI identified 16 duplicate or highly similar feedback items across 3 clusters. Merging these would consolidate 1,248 votes into cleaner signal. The export/reporting cluster alone has 248 cumulative votes, making it a high-priority candidate for Q3 planning.",
    tags: ["Duplicates", "Votes", "Cleanup"],
  },
];

const CATEGORY_INSIGHTS = [
  { label: "Feature Requests", count: 482, pct: 72,  color: "from-violet-500 to-indigo-500" },
  { label: "Bug Reports",      count: 98,  pct: 15,  color: "from-rose-500   to-red-400"    },
  { label: "Improvements",     count: 87,  pct: 13,  color: "from-cyan-500   to-blue-400"   },
];

const IMPACT_ITEMS = [
  { title: "AI-Powered Prioritization", impact: 95, effort: 60, label: "Quick Win",  badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
  { title: "Dark Mode Portal",          impact: 88, effort: 30, label: "High ROI",   badge: "bg-violet-500/15  text-violet-600  dark:text-violet-400  border-violet-500/25"  },
  { title: "Slack Integration",         impact: 75, effort: 45, label: "Planned",    badge: "bg-blue-500/15    text-blue-600    dark:text-blue-400    border-blue-500/25"     },
  { title: "CSV Export",                impact: 70, effort: 20, label: "Quick Win",  badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
];

/* ─── Sentiment Ring ────────────────────────────────── */
function SentimentRing() {
  const [hovered, setHovered] = useState<number | null>(null);
  const SIZE = 120;
  const STROKE = 14;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  let offset = 0;

  const arcs = SENTIMENT_DATA.map((s, i) => {
    const dash = (s.value / 100) * CIRC;
    const gap  = CIRC - dash;
    const arc  = { ...s, dash, gap, offset, i };
    offset += dash;
    return arc;
  });

  const COLORS = ["#34d399", "#38bdf8", "#fb7185"];

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ transform: "rotate(-90deg)" }}>
          {arcs.map((arc, i) => (
            <circle
              key={arc.label}
              cx={SIZE / 2} cy={SIZE / 2} r={R}
              fill="none"
              stroke={COLORS[i]}
              strokeWidth={STROKE}
              strokeDasharray={`${arc.dash} ${arc.gap}`}
              strokeDashoffset={-arc.offset}
              strokeLinecap="butt"
              opacity={hovered === null || hovered === i ? 1 : 0.3}
              className="transition-opacity duration-200 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">64%</span>
          <span className="text-[10px] text-muted-foreground">Positive</span>
        </div>
      </div>
      <div className="space-y-2">
        {SENTIMENT_DATA.map(({ label, value, textColor, color }, i) => (
          <div
            key={label}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={`h-2 w-2 rounded-full ${color}`} />
            <span className="text-xs text-muted-foreground w-16">{label}</span>
            <span className={`text-xs font-bold ${textColor}`}>{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────── */
export default function InsightsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen mesh-bg">

      {/* ── Hero ────────────────────────────────────────── */}
      <div className="relative border-b border-border py-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[80px]"
            style={{ background: "radial-gradient(ellipse, #a855f7, #7c3aed, transparent 70%)" }}
          />
          <div className="absolute inset-0 dot-bg opacity-20" />
        </div>
        <div className="container mx-auto px-4 animate-fade-up">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-widest">
                <MdAutoAwesome className="h-3 w-3 animate-pulse" />
                AI Intelligence
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                AI <span className="text-gradient-hero">Insights</span>
              </h1>
              <p className="text-muted-foreground text-sm max-w-md">
                Machine-generated analysis of your feedback patterns, sentiment, and trends.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 h-9 px-4 rounded-xl border border-border bg-background text-sm text-muted-foreground hover:text-foreground hover:border-border/80 transition-all"
            >
              <FiRefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-rotate-slow" : ""}`} />
              Refresh AI
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-24 space-y-6">

        {/* ── Trend Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
          {TRENDS.map(({ label, delta, up, icon: Icon, color, bg }, i) => (
            <div
              key={label}
              className={`card-hover-subtle p-4 rounded-2xl ${bg} overflow-hidden relative`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                  up ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/25"
                     : "text-rose-600 dark:text-rose-400 bg-rose-500/15 border border-rose-500/25"
                }`}>
                  {up ? <FiArrowUp className="h-3 w-3" /> : <FiArrowDown className="h-3 w-3" />}
                  {delta}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">vs last week</p>
            </div>
          ))}
        </div>

        {/* ── Main Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up delay-200">

          {/* Sentiment Widget */}
          <div className="p-5 rounded-2xl panel-surface backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2">
              <HiOutlineLightBulb className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <h3 className="font-semibold text-[15px] text-foreground">Sentiment Analysis</h3>
            </div>
            <SentimentRing />
            <div className="pt-2 border-t border-border space-y-2">
              {SENTIMENT_DATA.map(({ label, value, barColor, textColor }) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={`font-semibold ${textColor}`}>{value}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-1000`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="p-5 rounded-2xl panel-surface backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2">
              <TbTargetArrow className="h-4 w-4 text-violet-500 dark:text-violet-400" />
              <h3 className="font-semibold text-[15px] text-foreground">Category Breakdown</h3>
            </div>
            <div className="space-y-4">
              {CATEGORY_INSIGHTS.map(({ label, count, pct, color }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="text-muted-foreground text-xs">{count} items</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{pct}% of total feedback</p>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="text-violet-600 dark:text-violet-400 font-semibold">+12%</span> increase in Feature Requests vs last month
              </p>
            </div>
          </div>

          {/* Impact / Effort Matrix */}
          <div className="p-5 rounded-2xl panel-surface backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2">
              <LuBrainCircuit className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
              <h3 className="font-semibold text-[15px] text-foreground">Impact Scores</h3>
            </div>
            <div className="space-y-3">
              {IMPACT_ITEMS.map(({ title, impact, effort, label, badge }) => (
                <div key={title} className="p-3 rounded-xl border border-border bg-background/50 space-y-2 hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-foreground">{title}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge}`}>{label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Impact</p>
                      <div className="h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" style={{ width: `${impact}%` }} />
                      </div>
                      <p className="text-[10px] text-violet-600 dark:text-violet-400 font-semibold">{impact}%</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Effort</p>
                      <div className="h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400" style={{ width: `${effort}%` }} />
                      </div>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{effort}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Duplicate Detection ──────────────────────────── */}
        <div className="animate-fade-up delay-300">
          <div className="flex items-center gap-2 mb-4">
            <LuCopy className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            <h3 className="font-semibold text-[15px] text-foreground">Duplicate Detection</h3>
            <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
              {DUPLICATES.reduce((s, d) => s + d.count, 0)} detected
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DUPLICATES.map(({ group, count, topVotes, items, confidence }, i) => (
              <div
                key={group}
                className="card-hover-subtle p-4 rounded-2xl border border-amber-500/15 bg-amber-500/5 backdrop-blur-sm space-y-3 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <FiAlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0" />
                    <h4 className="text-sm font-semibold leading-tight text-foreground">{group}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span><span className="font-bold text-foreground">{count}</span> similar</span>
                  <span><span className="font-bold text-violet-600 dark:text-violet-400">{topVotes}</span> votes</span>
                  <span className="ml-auto text-amber-600 dark:text-amber-400 font-semibold">{confidence}% match</span>
                </div>
                <div className="space-y-1">
                  {items.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <FiMessageSquare className="h-2.5 w-2.5 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-[10px] text-muted-foreground/50 pl-4">+{items.length - 3} more...</p>
                  )}
                </div>
                <button className="w-full h-7 rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium hover:bg-amber-500/15 transition-all">
                  Merge Cluster
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI Summaries ─────────────────────────────────── */}
        <div className="animate-fade-up delay-400">
          <div className="flex items-center gap-2 mb-4">
            <MdAutoAwesome className="h-4 w-4 text-purple-500 dark:text-purple-400" />
            <h3 className="font-semibold text-[15px] text-foreground">AI-Generated Reports</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_SUMMARIES.map(({ title, timestamp, body, tags }, i) => (
              <div
                key={title}
                className="card-hover-subtle p-5 rounded-2xl ai-border ai-glow space-y-3 animate-fade-up"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <LuSparkles className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                      <h4 className="font-semibold text-sm text-foreground">{title}</h4>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{timestamp}</p>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground transition-all cursor-pointer shrink-0">
                    <FiCheckCircle className="h-3 w-3" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-purple-500/30 pl-3">
                  {body}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
