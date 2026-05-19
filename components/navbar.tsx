"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";
import { LuLayoutDashboard, LuUsers, LuLoader } from "react-icons/lu";
import { TbRoute } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/themeToggle";

const NAV_LINKS = [
  { label: "Feedback",    href: "/feedback",  icon: FiMessageSquare  },
  { label: "Roadmap",     href: "/roadmap",   icon: TbRoute          },
  { label: "AI Insights", href: "/insights",  icon: MdAutoAwesome    },
  { label: "Analytics",   href: "/admin",     icon: HiOutlineChartBar},
];



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* ── Main Navbar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-strong shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">

          {/* ── Left: Brand ── */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-2.5" aria-label="Prodexa Home">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-indigo-500/50 group-hover:scale-105">
                <BarChart3 className="h-4 w-4 text-white" strokeWidth={2.3} />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background">
                  <Zap className="h-1.5 w-1.5 text-white" strokeWidth={3} />
                </span>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground hidden sm:block">
                Prodexa
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-400 transition-all duration-200 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: Actions ── */}
          <div className="flex items-center gap-1.5">

            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-background/60 text-muted-foreground text-sm hover:border-border hover:bg-muted transition-all duration-200 group"
              aria-label="Open search"
            >
              <FiSearch className="h-3.5 w-3.5" />
              <span className="text-xs">Search...</span>
              <span className="ml-2 flex items-center gap-0.5 text-[10px] text-muted-foreground/50 font-mono border border-border rounded px-1 py-0.5">
                ⌘K
              </span>
            </button>

            {/* Mobile search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg border border-border bg-background/60 text-muted-foreground hover:text-foreground transition-all"
              aria-label="Search"
            >
              <FiSearch className="h-4 w-4" />
            </button>



            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth */}
            <SignedOut>
              <SignInButton>
                <Button
                  asChild
                  size="sm"
                  className="hidden md:inline-flex btn-primary-glow bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 transition-all duration-200 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 ring-2 ring-indigo-500/30 hover:ring-indigo-500/60 transition-all duration-200 rounded-lg",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg border border-border bg-background/60 text-muted-foreground hover:text-foreground transition-all"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile Drawer ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border glass-card px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-150"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/6">
              <SignedOut>
                <SignInButton>
                  <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </header>

      {/* ── Command Palette / Search Modal ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-md" />
          <div
            className="relative w-full max-w-xl glass-strong rounded-2xl border border-border shadow-[0_32px_80px_rgba(0,0,0,0.4)] animate-slide-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <FiSearch className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feedback, roadmap, users..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <kbd className="text-[10px] font-mono text-muted-foreground/50 border border-border rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            {/* Quick links */}
            <div className="p-2">
              <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">Quick Navigate</p>
              {[
                { icon: LuLayoutDashboard, label: "Dashboard", sub: "Overview & analytics" },
                { icon: FiMessageSquare, label: "Feedback Board", sub: "Browse & vote on ideas" },
                { icon: TbRoute, label: "Roadmap", sub: "See what's coming" },
                { icon: MdAutoAwesome, label: "AI Insights", sub: "Smart analysis & trends" },
              ].map(({ icon: Icon, label, sub }) => (
                <button
                  key={label}
                  onClick={() => setSearchOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group"
                >
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center border border-border group-hover:border-violet-500/30 transition-colors">
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}