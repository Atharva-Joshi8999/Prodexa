"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  Send,
  Lightbulb,
  Bug,
  TrendingUp,
  Puzzle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CATEGORIES = [
  { id: "feature", label: "Feature Request", icon: Lightbulb, color: "violet" },
  { id: "bug", label: "Bug Report", icon: Bug, color: "red" },
  { id: "improvement", label: "Improvement", icon: TrendingUp, color: "blue" },
  { id: "integration", label: "Integration", icon: Puzzle, color: "emerald" },
];

const PRIORITIES = [
  { id: "low", label: "Low", description: "Nice to have" },
  { id: "medium", label: "Medium", description: "Important" },
  { id: "high", label: "High", description: "Urgent / Blocking" },
];

export default function NewFeedbackPage() {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-sm animate-fade-up">
          <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Feedback Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you! Your idea has been added to the community board. Our team will review it soon.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 btn-primary-glow"
            >
              <Link href="/feedback">View All Feedback</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => { setSubmitted(false); setTitle(""); setDescription(""); setCategory(""); }}
            >
              Submit Another Idea
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg py-12 px-4">

      {/* Back link */}
      <div className="container mx-auto max-w-2xl mb-6">
        <Link
          href="/feedback"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Feedback
        </Link>
      </div>

      {/* Card */}
      <div className="container mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">

          {/* Header */}
          <div className="relative px-8 py-8 border-b border-border/50 overflow-hidden">
            <div className="absolute inset-0 -z-10"
              style={{ background: "linear-gradient(135deg, oklch(0.50 0.26 285 / 8%) 0%, oklch(0.67 0.19 220 / 5%) 100%)" }}
            />
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Submit Feedback</h1>
                <p className="text-sm text-muted-foreground">Share your idea with the team</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-7">

            {/* Category */}
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-tight">
                Category <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(({ id, label, icon: Icon, color }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCategory(id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                      category === id
                        ? "border-violet-500/50 bg-violet-500/12 text-violet-400"
                        : "border-border/60 bg-accent/20 text-muted-foreground hover:border-border hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${category === id ? "text-violet-400" : ""}`} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-semibold tracking-tight">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your idea or issue?"
                maxLength={100}
                className="w-full h-11 px-4 rounded-xl border border-border/60 bg-background/60 text-sm placeholder-muted-foreground outline-none transition-all duration-200 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15"
              />
              <p className="text-xs text-muted-foreground text-right">{title.length}/100</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold tracking-tight">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your idea in detail. What problem does it solve? What's the expected behavior?"
                rows={5}
                maxLength={1000}
                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/60 text-sm placeholder-muted-foreground outline-none transition-all duration-200 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15 resize-none leading-relaxed"
              />
              <p className="text-xs text-muted-foreground text-right">{description.length}/1000</p>
            </div>

            {/* Priority */}
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-tight">Priority</label>
              <div className="flex gap-2">
                {PRIORITIES.map(({ id, label, description: desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPriority(id)}
                    className={`flex-1 flex flex-col items-center gap-1 px-3 py-3 rounded-xl border text-center transition-all duration-200 ${
                      priority === id
                        ? "border-violet-500/50 bg-violet-500/12 text-violet-400"
                        : "border-border/60 bg-accent/20 text-muted-foreground hover:border-border hover:bg-accent/50"
                    }`}
                  >
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-xs opacity-70">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading || !title.trim() || !category}
                className="flex-1 btn-primary-glow shimmer bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 h-11 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                asChild
                className="h-11 border-border/60 hover:border-violet-500/30"
              >
                <Link href="/feedback">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Help note */}
        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          By submitting feedback you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}