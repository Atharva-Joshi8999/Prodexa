import { GradientHeader } from "@/components/gradient-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import {
  BarChart3,
  CheckCheck,
  Clock,
  Target,
  TrendingUp,
  Layers,
  Zap,
} from "lucide-react";
import { STATUS_GROUPS, STATUS_ORDER } from "@/app/data/status-data";
import { Badge } from "@/components/ui/badge";
import { getProjectAccess } from "@/lib/project-access";
import { notFound } from "next/navigation";

function getStatusPercentage(posts: any, status: string) {
  const total = posts.length;
  const count = posts.filter(
    (p: { status: string }) => p.status === status,
  ).length;
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

export default async function ProjectRoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const access = await getProjectAccess(slug);
  if (!access) notFound();

  const posts = await prisma.post.findMany({
    where: { projectId: access.projectId },
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      votes: { _count: "desc" },
    },
  });

  const groupedPosts = {
    under_review: posts.filter((p) => p.status === "under_review"),
    planned: posts.filter((p) => p.status === "planned"),
    in_progress: posts.filter((p) => p.status === "in_progress"),
    completed: posts.filter((p) => p.status === "completed"),
  };

  const totalVotes = posts.reduce((acc, post) => acc + post.votes.length, 0);
  const averageVotes =
    posts.length > 0 ? Math.round(totalVotes / posts.length) : 0;

  const completedPercentage = getStatusPercentage(posts, "completed");
  const inProgressPercentage = getStatusPercentage(posts, "in_progress");
  const plannedPercentage = getStatusPercentage(posts, "planned");

  const statCards = [
    {
      label: "Total Features",
      value: posts.length,
      icon: Target,
      style: "stat-card-indigo",
      iconColor: "text-indigo-500 dark:text-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-500/15",
    },
    {
      label: "Total Votes",
      value: totalVotes,
      icon: TrendingUp,
      style: "stat-card-cyan",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-100 dark:bg-cyan-500/15",
    },
    {
      label: "Completed",
      value: groupedPosts.completed.length,
      icon: CheckCheck,
      style: "stat-card-emerald",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
    },
    {
      label: "Avg Votes / Feature",
      value: averageVotes,
      icon: BarChart3,
      style: "stat-card-amber",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-500/15",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <GradientHeader
        title={`${access.projectName} — Roadmap`}
        subtitle="See what we're working on, what's coming next, and track our progress toward every milestone."
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, style, iconColor, iconBg }, i) => (
          <div
            key={label}
            className={`${style} rounded-2xl p-5 flex items-center gap-4 animate-fade-up`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className={`${iconBg} rounded-xl p-3 shrink-0`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-0.5">{label}</p>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Overall Progress ── */}
      <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
              <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Roadmap Progress</CardTitle>
              <CardDescription className="text-xs">Track the journey from idea to completion</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-muted-foreground">Overall Completion</span>
              <span className="font-bold text-foreground">{completedPercentage}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-1000"
                style={{ width: `${completedPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "In Progress", value: inProgressPercentage, color: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
              { label: "Planned", value: plannedPercentage, color: "text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
              { label: "Completed", value: completedPercentage, color: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
            ].map(({ label, value, color, bar }) => (
              <div key={label} className="text-center space-y-2">
                <p className={`text-2xl font-bold ${color}`}>{value}%</p>
                <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} />
                </div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Kanban Columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {STATUS_ORDER.map((status, colIdx) => {
          const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
          const Icon = group.icon;
          const postsInGroup = groupedPosts[status as keyof typeof groupedPosts];

          const colStyles: Record<string, string> = {
            under_review: "kanban-col-backlog",
            planned: "kanban-col-planned",
            in_progress: "kanban-col-progress",
            completed: "kanban-col-done",
          };

          return (
            <div key={status} className="space-y-3 animate-fade-up" style={{ animationDelay: `${colIdx * 0.1}s` }}>
              <div className={`rounded-xl p-4 ${group.bgColor} border`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${group.textColor}`} />
                    <h2 className={`text-sm font-semibold ${group.textColor}`}>{group.title}</h2>
                  </div>
                  <Badge variant="secondary" className={`${group.countColor} text-xs font-bold px-2`}>
                    {postsInGroup.length}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{group.description}</p>
              </div>

              <div className={`rounded-xl p-3 min-h-[200px] space-y-2.5 ${colStyles[status]} border border-border/30`}>
                {postsInGroup.map((post) => (
                  <div
                    key={post.id}
                    className={`
                      glass-card rounded-xl p-3.5
                      border-l-[3px] ${group.color}
                      hover:shadow-lg hover:-translate-y-0.5
                      transition-all duration-200
                      cursor-pointer group
                    `}
                  >
                    <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-indigo-400 transition-colors mb-1.5">
                      {post.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[10px] font-medium px-1.5 py-0">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {status === "in_progress" && (
                          <span className={`flex items-center gap-1 text-[10px] font-bold ${group.textColor}`}>
                            <Clock className="h-3 w-3" /> Active
                          </span>
                        )}
                        {status === "completed" && (
                          <span className={`flex items-center gap-1 text-[10px] font-bold ${group.textColor}`}>
                            <CheckCheck className="h-3 w-3" /> Shipped
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {post.votes.length}▲
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">
                      {post.author.name}
                    </p>
                  </div>
                ))}

                {postsInGroup.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center opacity-50">
                    <Layers className="h-7 w-7 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">No items yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
