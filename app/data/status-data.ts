import { CheckCircle, Clock, Eye, ListCheck } from "lucide-react";

export const STATUS_ORDER = [
  "under_review",
  "planned",
  "in_progress",
  "completed",
];

export const STATUS_GROUPS = {
  under_review: {
    title: "Under Review",
    description: "Ideas being evaluated",
    icon: Eye,
    color: "border-white/10",
    bgColor:
      "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg",
    textColor: "text-gray-300",
    countColor: "bg-white/10 text-gray-300",
  },

  planned: {
    title: "Planned",
    description: "Ready for development",
    icon: ListCheck,
    color: "border-blue-500/30",
    bgColor:
      "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-500/20 shadow-lg",
    textColor: "text-blue-400",
    countColor: "bg-blue-500/20 text-blue-300",
  },

  in_progress: {
    title: "In Progress",
    description: "Currently building",
    icon: Clock,
    color: "border-yellow-500/30",
    bgColor:
      "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/20 shadow-lg",
    textColor: "text-yellow-400",
    countColor: "bg-yellow-500/20 text-yellow-300",
  },

  completed: {
    title: "Completed",
    description: "Successfully shipped",
    icon: CheckCircle,
    color: "border-green-500/30",
    bgColor:
      "bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 shadow-lg",
    textColor: "text-green-400",
    countColor: "bg-green-500/20 text-green-300",
  },
};