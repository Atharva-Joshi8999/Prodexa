"use client";

import { useState } from "react";
import {
  BarChart3,
 
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";

const NAV_LINKS = {
  Product: [
    { label: "Dashboard", href: "#" },
    { label: "Feedback", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Resources: [
    { label: "Docs", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  {
    icon: ArrowRight,
    href: "https://github.com/Atharva-Joshi8999",
    label: "GitHub",
  },
  {
    icon: ArrowRight,
    href: "https://www.linkedin.com/in/atharva-joshi-211787359/",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 900);
  };

  return (
    <footer className="relative w-full border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Ambient gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full opacity-[0.06] dark:opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, #6366f1 0%, #8b5cf6 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                <BarChart3 className="h-5 w-5 text-white" strokeWidth={2.2} />
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-950">
                  <Zap className="h-2 w-2 text-white" strokeWidth={3} />
                </span>
              </div>
              <span
                className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white"
                style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
              >
                Prodexa
              </span>
            </div>

            <p
              className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-[220px]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Index your productivity with smarter insights.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition-all duration-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md hover:shadow-indigo-500/10 hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {Object.entries(NAV_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <p
                className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {section}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group inline-flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 transition-all duration-150 hover:text-indigo-600 dark:hover:text-indigo-400"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-indigo-500 after:transition-all after:duration-200 group-hover:after:w-full">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Newsletter ── */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Stay in the loop
            </p>
            <p
              className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get product updates and tips straight to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span
                  className="text-sm text-emerald-700 dark:text-emerald-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  You're subscribed — thanks!
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="you@example.com"
                  className="h-10 flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-all duration-200 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 min-w-0"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="group relative flex h-10 shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {loading ? (
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </>
                  )}
                  {/* shimmer */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="mt-6 flex flex-col items-center gap-1 text-center">
          <p
            className="text-[13px] text-zinc-400 dark:text-zinc-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © 2026 Prodexa. Built by{" "}
            <span className="font-medium text-zinc-500 dark:text-zinc-500">
              Atharva
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}