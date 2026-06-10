import type { ReferralStatus } from "./data";

export function inr(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export function lpa(min: number, max: number): string {
  return `₹${min}–${max} LPA`;
}

export function daysAgo(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

export const statusStyles: Record<ReferralStatus, string> = {
  Submitted: "bg-slate-100 text-slate-700 ring-slate-200",
  Screening: "bg-amber-50 text-amber-800 ring-amber-200",
  Interviewing: "bg-blue-50 text-blue-700 ring-blue-200",
  Offer: "bg-violet-50 text-violet-700 ring-violet-200",
  Hired: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Paid: "bg-emerald-600 text-white ring-emerald-600",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const PIPELINE_ORDER: ReferralStatus[] = [
  "Submitted",
  "Screening",
  "Interviewing",
  "Offer",
  "Hired",
  "Paid",
];
