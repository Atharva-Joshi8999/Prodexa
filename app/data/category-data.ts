import {
  Bug,
  Lightbulb,
  Palette,
  Sparkle,
  Wrench,
} from "lucide-react";

export const CATEGORIES_TYPES = [
  "Feature",
  "Improvement",
  "Bug",
  "Design",
  "Other",
];

const CATEGORIES = {
  Feature: {
    bg: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl",
    text: "text-blue-400",
    border: "border border-blue-500/20",
    light: "bg-blue-500/10",
    icon: Sparkle,
  },

  Improvement: {
    bg: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl",
    text: "text-green-400",
    border: "border border-green-500/20",
    light: "bg-green-500/10",
    icon: Wrench,
  },

  Bug: {
    bg: "bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl",
    text: "text-red-400",
    border: "border border-red-500/20",
    light: "bg-red-500/10",
    icon: Bug,
  },

  Design: {
    bg: "bg-gradient-to-br from-purple-500/10 to-violet-500/10 backdrop-blur-xl",
    text: "text-purple-400",
    border: "border border-purple-500/20",
    light: "bg-purple-500/10",
    icon: Palette,
  },

  Other: {
    bg: "bg-white/5 backdrop-blur-xl",
    text: "text-gray-300",
    border: "border border-white/10",
    light: "bg-white/5",
    icon: Lightbulb,
  },
} as const;

export type CategoryType = keyof typeof CATEGORIES;

export function getCategoryDesign(
  category: string
): (typeof CATEGORIES)[keyof typeof CATEGORIES] {
  const key = category as CategoryType;
  return CATEGORIES[key] || CATEGORIES.Other;
}