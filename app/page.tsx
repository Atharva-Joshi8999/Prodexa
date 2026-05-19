import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  Sparkles,
  BarChart3,
  Zap,
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  Star,
  ArrowUpRight,
  MessageSquare,
  Map,
  Target,
  Activity,
  ChevronRight,
  Globe,
} from "lucide-react";
import Link from "next/link";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Submit Ideas",
    description:
      "Share feature requests and suggestions in a structured, organized way. Every idea gets heard.",
    color: "from-violet-500 to-purple-600",
    glow: "oklch(0.58 0.24 285 / 30%)",
  },
  {
    step: "02",
    icon: TrendingUp,
    title: "Vote & Prioritize",
    description:
      "Your team upvotes what matters most. Data-driven prioritization that reflects real needs.",
    color: "from-blue-500 to-cyan-500",
    glow: "oklch(0.67 0.19 220 / 30%)",
  },
  {
    step: "03",
    icon: Map,
    title: "Track Progress",
    description:
      "Follow along as ideas move from backlog to in-progress to shipped. Full transparency.",
    color: "from-pink-500 to-rose-500",
    glow: "oklch(0.65 0.22 340 / 30%)",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "See Results",
    description:
      "Watch your ideas become real features. Celebrate every win with your team.",
    color: "from-emerald-500 to-teal-500",
    glow: "oklch(0.72 0.18 160 / 30%)",
  },
];

const FEATURES = [
  {
    icon: Target,
    title: "Smart Prioritization",
    description: "AI-powered scoring helps you focus on what delivers maximum value to your users.",
  },
  {
    icon: Activity,
    title: "Real-time Analytics",
    description: "Live dashboards showing feedback trends, vote patterns, and team productivity metrics.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with role-based access, SSO, and audit logs for every action.",
  },
  {
    icon: Globe,
    title: "Team Collaboration",
    description: "Invite your entire org, assign owners, leave comments, and ship features faster.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Stay in the loop with smart alerts for status changes, new votes, and milestones.",
  },
  {
    icon: BarChart3,
    title: "Advanced Reporting",
    description: "Export detailed reports, track KPIs, and present progress to stakeholders effortlessly.",
  },
];

const STATS = [
  { value: "12K+", label: "Ideas Submitted", icon: MessageSquare },
  { value: "85K+", label: "Votes Cast", icon: TrendingUp },
  { value: "2.5K+", label: "Features Built", icon: CheckCircle },
  { value: "98%", label: "Customer Satisfaction", icon: Star },
];

const TESTIMONIALS = [
  {
    quote: "Prodexa transformed how we collect and act on user feedback. Our release velocity doubled in just 3 months.",
    author: "Sarah Chen",
    role: "Head of Product @ Nexus AI",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "Finally, a tool that bridges the gap between customer needs and our engineering roadmap. Absolutely essential.",
    author: "Marcus Reid",
    role: "CTO @ Stackable",
    avatar: "MR",
    rating: 5,
  },
  {
    quote: "The analytics alone are worth it. We can now prove ROI on every feature we build. Game changer.",
    author: "Priya Sharma",
    role: "VP Engineering @ DataFlow",
    avatar: "PS",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center mesh-bg">

        {/* Ambient Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30 blur-[120px] animate-float"
            style={{ background: "radial-gradient(ellipse, oklch(0.58 0.24 285) 0%, oklch(0.67 0.19 220) 50%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-[-100px] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(ellipse, oklch(0.65 0.22 340) 0%, transparent 70%)" }} />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: "linear-gradient(oklch(0.50 0.26 285) 1px, transparent 1px), linear-gradient(90deg, oklch(0.50 0.26 285) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
        </div>

        <div className="container mx-auto px-4 py-24 lg:py-32 text-center space-y-8 animate-fade-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 text-sm font-medium text-indigo-700 dark:text-indigo-400 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Feedback Management Platform</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight max-w-4xl mx-auto text-slate-900 dark:text-white">
            Turn customer feedback{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
              into your roadmap
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed animate-fade-up delay-100">
            Prodexa unifies your product feedback, surfaces what matters most,
            and keeps every stakeholder aligned — from idea to shipped feature.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 animate-fade-up delay-200">
            <Button
              asChild
              size="lg"
              className="btn-primary-glow shimmer bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 h-12 px-8 text-[15px] font-semibold"
            >
              <Link href="/feedback/new">
                Start for Free
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 text-[15px] font-medium border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200"
            >
              <Link href="/roadmap" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                View Roadmap
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 pt-4 animate-fade-up delay-300">
            <div className="flex -space-x-2">
              {["A", "B", "C", "D", "E"].map((l, i) => (
                <div
                  key={l}
                  className="h-8 w-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white ring-0"
                  style={{
                    background: `hsl(${i * 55 + 220}, 80%, 55%)`,
                    zIndex: 5 - i,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">2,500+ teams</span> building smarter with Prodexa
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════ */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className={`text-center space-y-2 animate-fade-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {value}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section className="py-24 container mx-auto px-4">

        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-widest">
            <Zap className="h-3 w-3" /> How It Works
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            From idea to shipped —{" "}
            <span className="text-gradient-primary">in days</span>
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg">
            A streamlined process that keeps your team focused and your customers happy.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map(({ step, icon: Icon, title, description, color, glow }, i) => (
            <div
              key={title}
              className="card-hover relative group p-6 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs font-bold text-muted-foreground/40 font-mono">
                {step}
              </span>

              {/* Icon */}
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg transition-all duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 8px 24px ${glow}` }}
              >
                <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
              </div>

              <h3 className="font-semibold text-lg mb-2 tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

              {/* Hover connector */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gradient mx-auto max-w-3xl" />

      {/* ════════════════════════════════════════
          FEATURES GRID
      ════════════════════════════════════════ */}
      <section className="py-24 container mx-auto px-4">

        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-widest">
            <Star className="h-3 w-3" /> Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything your team{" "}
            <span className="text-gradient-primary">needs to ship</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
            Purpose-built tools to collect, organize, and act on product feedback at any scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="card-hover group relative p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm animate-fade-up overflow-hidden"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-blue-500/0 group-hover:from-indigo-500/5 group-hover:to-blue-500/5 transition-all duration-500 rounded-2xl" />

              <div className="relative">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-base mb-2 tracking-tight flex items-center gap-1 text-slate-900 dark:text-white">
                  {title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto" />
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gradient mx-auto max-w-3xl" />

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
      <section className="py-24 container mx-auto px-4">

        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-widest">
            <Users className="h-3 w-3" /> Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Loved by product teams{" "}
            <span className="text-gradient-primary">worldwide</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, author, role, avatar, rating }, i) => (
            <div
              key={author}
              className="card-hover group p-6 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm space-y-5 animate-fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">{author}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className="py-24 container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-transparent">
          {/* BG */}
          <div className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(99, 102, 241, 0.05) 100%)",
            }}
          />
          <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-40"
            style={{
              backgroundImage: "radial-gradient(rgba(79, 70, 229, 0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Start free, scale as you grow
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">ship smarter?</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Join thousands of product teams using Prodexa to build exactly what their customers need.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="btn-primary-glow shimmer bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 h-12 px-8 text-[15px] font-semibold"
              >
                <Link href="/feedback/new">
                  Get Started Free
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <Link href="/roadmap">Explore Roadmap</Link>
              </Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No credit card required · Free plan forever · Cancel anytime
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}