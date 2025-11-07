import type { Orderings, TaskStatus } from "./types";

export const STATUS_CHOICES: readonly [TaskStatus, string][] = [
    ["open", "Open"],
    ["in_progress", "In Progress"],
    ["completed", "Completed"],
];

export const ORDERING_CHOICES: readonly [Orderings, string][] = [
    ["", "---"],
    ["title", "Title (A-Z)"],
    ["-title", "Title (Z-A)"],
    ["created_at", "Created At (Oldest First)"],
    ["-created_at", "Created At (Newest First)"],
    ["updated_at", "Updated At (Oldest First)"],
    ["-updated_at", "Updated At (Newest First)"],
];

// Truncates a text string to a maximum length and adds an ellipsis if it exceeds that limit.
export function truncate(text: string, max = 100) {
  if (!text) return "";
  return text.length <= max ? text : text.slice(0, max).trimEnd() + "…";
}

// Formats a timestamp string into a human-readable local date and time.
export function fmt(ts?: string) {
  if (!ts) return "-";
  const d = new Date(ts);
  return isNaN(d.getTime()) ? "-" : d.toLocaleString();
}

