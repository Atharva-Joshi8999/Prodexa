"use client";

import { Map, MessageSquare, Shield, Sparkles, Settings, LayoutDashboard, ChevronDown, Plus, Globe, Lock } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

export default function Navbar() {
  const pathname = usePathname();

  // Extract project slug from URL if we're in a project context
  const projectMatch = pathname?.match(/^\/projects\/([^/]+)/);
  const currentSlug = projectMatch?.[1] || null;

  // Build nav links based on context
  const projectNavLinks = currentSlug
    ? [
        { href: `/projects/${currentSlug}/feedback`, label: "Feedback", icon: MessageSquare },
        { href: `/projects/${currentSlug}/roadmap`, label: "Roadmap", icon: Map },
      ]
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-0">
      <nav
        className="
          mx-auto max-w-6xl
          flex h-14 items-center justify-between
          px-4 rounded-2xl
          bg-white/80 dark:bg-slate-900/80
          backdrop-blur-xl saturate-150
          border border-white/60 dark:border-white/10
          shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]
          dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]
          transition-all duration-300
        "
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
          </div>
          <span className="text-[17px] font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Prodexa
          </span>
        </Link>

        {/* ── Center Nav Links ── */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-white/5 rounded-xl px-1.5 py-1.5">
          {/* Dashboard link */}
          <SignedIn>
            <Link
              href="/dashboard"
              className={`
                relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  pathname === "/dashboard"
                    ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-black/5"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                }
              `}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
              {pathname === "/dashboard" && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-indigo-500 opacity-70" />
              )}
            </Link>
          </SignedIn>

          {/* Project-scoped nav links */}
          {currentSlug && projectNavLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname?.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-black/5"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  }
                `}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-indigo-500 opacity-70" />
                )}
              </Link>
            );
          })}

          {/* Admin & Settings — only in project context and signed in */}
          {currentSlug && (
            <SignedIn>
              <Link
                href={`/projects/${currentSlug}/admin`}
                className={`
                  relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    pathname === `/projects/${currentSlug}/admin`
                      ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-black/5"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  }
                `}
              >
                <Shield className="h-3.5 w-3.5" />
                Admin
                {pathname === `/projects/${currentSlug}/admin` && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-indigo-500 opacity-70" />
                )}
              </Link>
              <Link
                href={`/projects/${currentSlug}/settings`}
                className={`
                  relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    pathname === `/projects/${currentSlug}/settings`
                      ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-black/5"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  }
                `}
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
                {pathname === `/projects/${currentSlug}/settings` && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-indigo-500 opacity-70" />
                )}
              </Link>
            </SignedIn>
          )}

          {/* Non-project context: show landing nav links */}
          {!currentSlug && pathname === "/" && (
            <>
              <Link
                href="/roadmap"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-200"
              >
                <Map className="h-3.5 w-3.5" />
                Roadmap
              </Link>
              <Link
                href="/feedback"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-200"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Feedback
              </Link>
            </>
          )}
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <SignedOut>
            <SignInButton>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white border-0 shadow-md shadow-indigo-500/25 text-[13px] font-semibold px-4 h-8 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="ring-2 ring-indigo-500/20 rounded-full transition-all duration-200 hover:ring-indigo-500/40">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-1 mt-2 mx-auto max-w-xs justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-xl px-2 py-1.5 shadow-sm overflow-x-auto">
        <SignedIn>
          <Link
            href="/dashboard"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 ${
              pathname === "/dashboard"
                ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="h-3 w-3" />
            Dashboard
          </Link>
        </SignedIn>
        {currentSlug && projectNavLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </Link>
          );
        })}
        {currentSlug && (
          <SignedIn>
            <Link
              href={`/projects/${currentSlug}/admin`}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 ${
                pathname === `/projects/${currentSlug}/admin`
                  ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Shield className="h-3 w-3" />
              Admin
            </Link>
          </SignedIn>
        )}
      </div>
    </header>
  );
}