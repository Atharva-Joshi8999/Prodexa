"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { getCategoryDesign } from "@/app/data/category-data";
import { Badge } from "./ui/badge";
import {
    Edit, Save, ThumbsUp, User, X,
    Activity, CheckCircle, Clock, Eye, ListCheck,
    BarChart3, TrendingUp,
} from "lucide-react";
import { STATUS_GROUPS, STATUS_ORDER } from "@/app/data/status-data";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { toast } from "sonner";


export default function AdminFeedbackTable({ posts }: { posts: any[] }) {
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [postStatus, setPostStatus] = useState<Record<number, string>>(
        Object.fromEntries(posts.map((post) => [post.id, post.status])),
    );
    const [originalStatus, setOriginalStatus] = useState<Record<number, string>>(
        {},
    );

    const handleStatusChange = (postId: number, newStatus: string) => {
        setPostStatus((prev) => ({
            ...prev,
            [postId]: newStatus,
        }));
    };

    const startEditing = (postId: number) => {
        setOriginalStatus((prev) => ({
            ...prev,
            [postId]: postStatus[postId],
        }));
        setEditingPostId(postId);
    };

    const cancelEditing = (postId: number) => {
        if (originalStatus[postId]) {
            setPostStatus((prev) => ({
                ...prev,
                [postId]: originalStatus[postId],
            }));
        }
        setEditingPostId(null);
    };

    const saveStatus = async (postId: number) => {
        const loadingToast = toast.loading("Saving status...");
        try {
            const response = await fetch(`/api/feedback/${postId}/status`, {
                method: "PATCH",
                headers: {
                    "Contect-Type": "application/json",
                },
                body: JSON.stringify({ status: postStatus[postId] }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            toast.dismiss(loadingToast);
            toast.success("Feedback status updated successfully!");
            setEditingPostId(null);
        } catch (error) {
            console.error("Failed to update status: ", error);
            toast.dismiss(loadingToast);
            toast.error("failed to update feedback status, Please try again.");
        }
    };

    const getStatusIcon = (status: string) => {
        const statusGroup = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
        if (!statusGroup) return null;
        const Icon = statusGroup.icon;
        return <Icon className="h-3 w-3 mr-1" />;
    };

    // Compute summary stats
    const totalVotes = posts.reduce((acc, p) => acc + (p.votes?.length || 0), 0);
    const statusCounts = STATUS_ORDER.reduce((acc, s) => {
        acc[s] = posts.filter((p) => p.status === s).length;
        return acc;
    }, {} as Record<string, number>);

    const summaryCards = [
        {
            label: "Total Feedback",
            value: posts.length,
            icon: BarChart3,
            style: "stat-card-indigo",
            iconBg: "bg-indigo-100 dark:bg-indigo-500/15",
            iconColor: "text-indigo-600 dark:text-indigo-400",
        },
        {
            label: "Total Votes",
            value: totalVotes,
            icon: TrendingUp,
            style: "stat-card-cyan",
            iconBg: "bg-cyan-100 dark:bg-cyan-500/15",
            iconColor: "text-cyan-600 dark:text-cyan-400",
        },
        {
            label: "In Progress",
            value: statusCounts["in_progress"] || 0,
            icon: Activity,
            style: "stat-card-amber",
            iconBg: "bg-amber-100 dark:bg-amber-500/15",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
            label: "Completed",
            value: statusCounts["completed"] || 0,
            icon: CheckCircle,
            style: "stat-card-emerald",
            iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
    ];

    return (
        <div className="space-y-6">
            {/* ── Summary Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map(({ label, value, icon: Icon, style, iconBg, iconColor }, i) => (
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

            {/* ── Status Pipeline ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {STATUS_ORDER.map((status) => {
                    const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
                    const Icon = group.icon;
                    const count = statusCounts[status] || 0;
                    const pct = posts.length > 0 ? Math.round((count / posts.length) * 100) : 0;
                    return (
                        <div key={status} className={`rounded-xl p-3.5 ${group.bgColor} border`}>
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className={`h-3.5 w-3.5 ${group.textColor}`} />
                                <span className={`text-xs font-semibold ${group.textColor}`}>{group.title}</span>
                                <span className={`ml-auto text-xs font-bold ${group.textColor}`}>{count}</span>
                            </div>
                            <div className="h-1 w-full rounded-full bg-white/10">
                                <div
                                    className={`h-full rounded-full transition-all duration-700`}
                                    style={{
                                        width: `${pct}%`,
                                        background: status === "completed" ? "#10b981"
                                            : status === "in_progress" ? "#f59e0b"
                                                : status === "planned" ? "#60a5fa"
                                                : "#94a3b8"
                                    }}
                                />
                            </div>
                            <p className={`text-[10px] mt-1 ${group.textColor} opacity-70`}>{pct}% of total</p>
                        </div>
                    );
                })}
            </div>

            {/* ── Main Table ── */}
            <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
                {/* Top accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <div className="h-7 w-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
                                <Eye className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            Manage Feedback
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs font-semibold">
                            {posts.length} total
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">Title</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Votes</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Author</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post, idx) => {
                                    const isEditing = editingPostId === post.id;
                                    const currentStatus = postStatus[post.id];
                                    const categoryDesign = getCategoryDesign(post.category);
                                    const CategoryIcon = categoryDesign.icon;

                                    return (
                                        <TableRow
                                            key={post.id}
                                            className={`h-[68px] transition-colors ${isEditing ? "bg-indigo-50/50 dark:bg-indigo-500/5" : "hover:bg-muted/30"}`}
                                        >
                                            {/* Title */}
                                            <TableCell className="font-medium max-w-[220px] align-middle pl-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-muted-foreground/60 font-mono font-bold w-6">
                                                        {String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="truncate text-sm font-semibold">{post.title}</span>
                                                </div>
                                            </TableCell>

                                            {/* Category */}
                                            <TableCell className="align-middle">
                                                <Badge
                                                    variant="outline"
                                                    className={`${categoryDesign.border} ${categoryDesign.text} ${categoryDesign.light} text-[11px] font-semibold flex items-center gap-1 w-fit`}
                                                >
                                                    <CategoryIcon className="h-3 w-3" />
                                                    {post.category}
                                                </Badge>
                                            </TableCell>

                                            {/* Votes */}
                                            <TableCell className="align-middle">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-6 w-6 rounded-md bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
                                                        <ThumbsUp className="h-3 w-3 text-indigo-500" />
                                                    </div>
                                                    <span className="text-sm font-semibold">{post.votes.length}</span>
                                                </div>
                                            </TableCell>

                                            {/* Author */}
                                            <TableCell className="align-middle">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                                                        {post.author?.name?.substring(0, 1)?.toUpperCase() || "?"}
                                                    </div>
                                                    <span className="text-sm truncate max-w-[100px]">{post.author.name}</span>
                                                </div>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell className="align-middle">
                                                {isEditing ? (
                                                    <Select
                                                        value={currentStatus}
                                                        onValueChange={(value) => handleStatusChange(post.id, value)}
                                                    >
                                                        <SelectTrigger className="w-[150px] h-8 text-xs border-indigo-200 dark:border-indigo-500/30 focus:ring-indigo-500/30">
                                                            <SelectValue>
                                                                <div className="flex items-center">
                                                                    {getStatusIcon(currentStatus)}
                                                                    {STATUS_GROUPS[currentStatus as keyof typeof STATUS_GROUPS]?.title}
                                                                </div>
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {STATUS_ORDER.map((status) => {
                                                                const statusGroup = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
                                                                const Icon = statusGroup.icon;
                                                                return (
                                                                    <SelectItem key={status} value={status} className="text-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            <Icon className="h-3.5 w-3.5" />
                                                                            {statusGroup.title}
                                                                        </div>
                                                                    </SelectItem>
                                                                );
                                                            })}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className={`flex items-center gap-1.5 w-fit text-[11px] font-semibold ${STATUS_GROUPS[currentStatus as keyof typeof STATUS_GROUPS]?.countColor}`}
                                                    >
                                                        {getStatusIcon(currentStatus)}
                                                        {STATUS_GROUPS[currentStatus as keyof typeof STATUS_GROUPS]?.title}
                                                    </Badge>
                                                )}
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="align-middle pr-6">
                                                {isEditing ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => saveStatus(post.id)}
                                                            className="gap-1 h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-sm"
                                                        >
                                                            <Save className="h-3 w-3" />
                                                            Save
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => cancelEditing(post.id)}
                                                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                        >
                                                            <X className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => startEditing(post.id)}
                                                        className="gap-1.5 h-8 text-xs border-border/60 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                        Edit
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        {posts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                                    <BarChart3 className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-semibold text-muted-foreground">No feedback yet</p>
                                <p className="text-xs text-muted-foreground/60 mt-1">Feedback submissions will appear here</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}