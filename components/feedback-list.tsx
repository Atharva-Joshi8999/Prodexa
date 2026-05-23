"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import {
  MessageSquare,
  ChevronUp,
  Search,
  Layers,
} from "lucide-react";
import { STATUS_GROUPS, STATUS_ORDER } from "@/app/data/status-data";
import { Badge } from "./ui/badge";
import { getCategoryDesign, CATEGORIES_TYPES } from "@/app/data/category-data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FeedbackList({
  initialPosts,
  dbUserId,
}: {
  initialPosts: any[];
  /** Internal DB integer user ID — used to detect if the current user has voted */
  dbUserId: number | null;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"votes" | "newest">("votes");
  const [votingPostId, setVotingPostId] = useState<number | null>(null);

  const handleVote = async (postId: number) => {
    if (!dbUserId) {
      toast.error("Please sign in to vote on feedback");
      return;
    }

    if (votingPostId === postId) return; // prevent double-click
    setVotingPostId(postId);

    const loadingToast = toast.loading("Submitting vote...");

    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Vote failed");
      }
      const data = await response.json();

      toast.dismiss(loadingToast);
      toast.success(data.voted ? "🎉 Vote added!" : "Vote removed");

      // Optimistically update local state using dbUserId (integer)
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              votes: data.voted
                ? [...post.votes, { userId: dbUserId }]
                : post.votes.filter((v: any) => v.userId !== dbUserId),
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Failed to submit vote.", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to submit vote. Please try again");
    } finally {
      setVotingPostId(null);
    }
  };

  // Compute categories and dynamic counts based on the unfiltered posts
  const categoriesList = CATEGORIES_TYPES.map((catName) => {
    const design = getCategoryDesign(catName);
    const count = posts.filter((p) => p.category === catName).length;
    return { name: catName, design, count };
  });

  const totalPostsCount = posts.length;

  const getStatusCount = (statusKey: string) => {
    return posts.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      return p.status === statusKey;
    }).length;
  };

  const getFilteredPostsCount = () => {
    return posts.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      return true;
    }).length;
  };

  // Apply filters and sorting
  const filteredPosts = posts
    .filter((post) => {
      if (selectedCategory && post.category !== selectedCategory) return false;
      if (selectedStatus && post.status !== selectedStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDesc = post.description.toLowerCase().includes(query);
        const matchesAuthor = post.author?.name?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesAuthor) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "votes") {
        const votesA = a.votes?.length || 0;
        const votesB = b.votes?.length || 0;
        if (votesA !== votesB) return votesB - votesA;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      {/* ── Categories Sidebar ── */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="glass border border-border/40 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Categories</CardTitle>
            <CardDescription className="text-xs">Browse feedback by category</CardDescription>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="space-y-1">
              {/* All Categories */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === null
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                    : "hover:bg-muted/50 border border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-md ${
                    selectedCategory === null ? "bg-indigo-600/20 text-indigo-400" : "bg-muted text-muted-foreground"
                  }`}>
                    <Layers className="h-4 w-4" />
                  </div>
                  <span>All Feedback</span>
                </div>
                <Badge variant="secondary" className={`text-xs ${
                  selectedCategory === null ? "bg-indigo-600/20 text-indigo-300" : "bg-muted text-muted-foreground"
                }`}>
                  {totalPostsCount}
                </Badge>
              </button>

              {/* Individual Categories */}
              {categoriesList.map((cat) => {
                const Icon = cat.design.icon;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? `${cat.design.light} ${cat.design.text} ${cat.design.border} border`
                        : "hover:bg-muted/50 border border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-md ${
                        isSelected ? `${cat.design.light} ${cat.design.text}` : "bg-muted text-muted-foreground"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{cat.name}</span>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${
                      isSelected ? `${cat.design.light} ${cat.design.text}` : "bg-muted text-muted-foreground"
                    }`}>
                      {cat.count}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Main Content ── */}
      <div className="lg:col-span-3 space-y-5">
        {/* Filters / Search / Sort */}
        <Card className="glass border border-border/40 p-4 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, description or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/50 border-border/40 focus-visible:ring-indigo-500/50"
              />
            </div>
            {/* Sorting */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "votes" | "newest")}
                className="px-3 py-1.5 border border-border/40 rounded-lg bg-background/50 backdrop-blur-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
              >
                <option value="votes">Most Voted</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Status Filter Pills */}
          <div className="border-t border-border/30 pt-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              <button
                onClick={() => setSelectedStatus(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border shrink-0 ${
                  selectedStatus === null
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-background/40 hover:bg-muted border-border/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                All Statuses ({getFilteredPostsCount()})
              </button>
              {STATUS_ORDER.map((statusKey) => {
                const statusGroup = STATUS_GROUPS[statusKey as keyof typeof STATUS_GROUPS];
                if (!statusGroup) return null;
                const isSelected = selectedStatus === statusKey;
                const StatusIcon = statusGroup.icon;
                return (
                  <button
                    key={statusKey}
                    onClick={() => setSelectedStatus(statusKey)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center gap-1 shrink-0 ${
                      isSelected
                        ? `${statusGroup.bgColor} ${statusGroup.textColor} ${statusGroup.color} shadow-sm`
                        : "bg-background/40 hover:bg-muted border-border/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    <span>{statusGroup.title}</span>
                    <span className="opacity-75 font-bold">({getStatusCount(statusKey)})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* ── Feedback Cards ── */}
        <div className="space-y-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              // Compare integer userId stored in votes with integer dbUserId
              const hasVoted = dbUserId !== null
                ? post.votes.some((v: any) => v.userId === dbUserId)
                : false;
              const isVoting = votingPostId === post.id;
              const authorInitials = post.author?.name
                ? post.author.name.substring(0, 2).toUpperCase()
                : "?";

              return (
                <Card
                  key={post.id}
                  className="overflow-hidden border border-border/40 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex flex-row items-stretch min-h-[110px]">

                    {/* ── Vote Button ── */}
                    <button
                      onClick={() => handleVote(post.id)}
                      disabled={isVoting}
                      title={
                        !dbUserId
                          ? "Sign in to vote"
                          : hasVoted
                          ? "Remove your vote"
                          : "Upvote this idea"
                      }
                      className={`
                        relative w-[72px] shrink-0 flex flex-col items-center justify-center gap-1
                        border-r transition-all duration-200 select-none
                        ${isVoting ? "opacity-60 cursor-wait" : "cursor-pointer"}
                        ${
                          hasVoted
                            ? "bg-indigo-500/10 border-indigo-400/30 text-indigo-500 dark:text-indigo-400"
                            : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-500 hover:border-indigo-300/40"
                        }
                      `}
                    >
                      {/* Voted glow ring */}
                      {hasVoted && (
                        <span className="absolute inset-0 rounded-none bg-indigo-400/5 pointer-events-none" />
                      )}

                      {/* Arrow icon */}
                      <div className={`
                        flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200
                        ${hasVoted
                          ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/40"
                          : "bg-muted/60 group-hover:bg-indigo-100"
                        }
                        ${isVoting ? "" : "hover:scale-110"}
                      `}>
                        <ChevronUp
                          className={`h-4 w-4 transition-transform duration-200 ${hasVoted ? "scale-110" : ""}`}
                          strokeWidth={2.5}
                        />
                      </div>

                      {/* Vote count */}
                      <span className={`text-lg font-extrabold leading-none tracking-tight ${hasVoted ? "text-indigo-500 dark:text-indigo-400" : ""}`}>
                        {post.votes.length}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-widest opacity-50">
                        {post.votes.length === 1 ? "vote" : "votes"}
                      </span>
                    </button>

                    {/* ── Card Content ── */}
                    <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <h3 className="font-semibold text-base sm:text-[15px] leading-snug tracking-tight text-foreground">
                            {post.title}
                          </h3>

                          {/* Badges */}
                          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                            {/* Status Badge */}
                            {(() => {
                              const statusGroup = STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS];
                              if (!statusGroup) return null;
                              const StatusIcon = statusGroup.icon;
                              return (
                                <Badge className={`${statusGroup.textColor} ${statusGroup.bgColor} border border-border/30 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 flex items-center gap-1`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {statusGroup.title}
                                </Badge>
                              );
                            })()}

                            {/* Category Badge */}
                            {(() => {
                              const design = getCategoryDesign(post.category);
                              const Icon = design.icon;
                              return (
                                <Badge variant="outline" className={`text-[10px] font-semibold ${design.border} ${design.light} ${design.text} flex items-center gap-1 px-2 py-0.5`}>
                                  <Icon className="h-3 w-3" />
                                  {post.category}
                                </Badge>
                              );
                            })()}
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-border/20 pt-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10">
                            {authorInitials}
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">
                            {post.author?.name || "Anonymous"}
                          </span>
                          <span className="text-xs text-muted-foreground/30">•</span>
                          <span className="text-xs text-muted-foreground/75">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline text-[11px]">Comments</span>
                          <span className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="glass border border-border/40 p-10 text-center shadow-sm">
              <div className="max-w-md mx-auto space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Search className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-lg">No feedback found</h4>
                <p className="text-sm text-muted-foreground">
                  No feedback matches your current filters. Try adjusting or resetting them.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedStatus(null);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Reset all filters
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}