"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, BarChart3, Zap } from "lucide-react";

/* ── Navigation columns ── */
const NAV_LINKS = {
  Product: [
    { label: "Dashboard", href: "#" },
    { label: "Analytics", href: "#" },
    { label: "Feedback", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

/* ── Proper SVG social icons ── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    Icon: GitHubIcon,
    href: "https://github.com/Atharva-Joshi8999",
    label: "GitHub",
  },
  {
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/atharva-joshi-211787359/",
    label: "LinkedIn",
  },
  {
    Icon: TwitterXIcon,
    href: "#",
    label: "Twitter / X",
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
    <footer className="relative w-full overflow-hidden bg-zinc-950 border-t border-zinc-800/50">
      {/* ── Top gradient glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, #6366f1 0%, #8b5cf6 50%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* ── Upper section ── */}
        <div className="pt-8 pb-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">

          {/* Brand + tagline + socials */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-lg shadow-indigo-500/30">
                <BarChart3 className="h-5 w-5 text-white" strokeWidth={2.2} />
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-zinc-950">
                  <Zap className="h-2 w-2 text-white" strokeWidth={3} />
                </span>
              </div>
              <span
                className="text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
              >
                Prodexa
              </span>
            </div>

            <p
              className="text-sm leading-relaxed text-zinc-400 max-w-[280px]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              The productivity intelligence platform built for modern teams.
              Turn insights into action, effortlessly.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-all duration-200 hover:border-indigo-500/60 hover:bg-indigo-950/50 hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/15 hover:-translate-y-0.5"
                >
                  <Icon />
                  {/* tooltip */}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            {Object.entries(NAV_LINKS).map(([section, links]) => (
              <div key={section} className="flex flex-col gap-4">
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {section}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="group text-sm text-zinc-400 transition-colors duration-150 hover:text-white"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-indigo-400 after:transition-all after:duration-200 group-hover:after:w-full">
                          {label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Stay in the loop
            </p>
            <p
              className="text-sm text-zinc-400 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Product updates and insights — no spam, ever.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-800/50 bg-emerald-950/30 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span
                  className="text-sm text-emerald-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  You're in — thanks!
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="you@company.com"
                  className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/15"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="group relative flex h-10 w-full items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {loading ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </>
                  )}
                  {/* shimmer */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent mt-2" />

        {/* ── Bottom bar ── */}
        <div className="py-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p
            className="text-[13px] text-zinc-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © 2026{" "}
            <span className="text-zinc-500 font-medium">Prodexa</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/40 bg-emerald-950/30 px-2.5 py-1 text-[11px] font-medium text-emerald-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}