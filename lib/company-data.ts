// Pipeline data as seen by the demo company (Zentro Labs).
import type { ReferralStatus } from "./data";

export interface PipelineCandidate {
  id: string;
  name: string;
  role: string;
  jobTitle: string;
  referrer: string;
  referrerScore: number;
  stage: ReferralStatus;
  daysInStage: number;
}

export const pipelineCandidates: PipelineCandidate[] = [
  {
    id: "c-1",
    name: "Karthik Iyer",
    role: "Backend Engineer @ PhonePe",
    jobTitle: "Senior Backend Engineer",
    referrer: "Arjun Mehta",
    referrerScore: 92,
    stage: "Interviewing",
    daysInStage: 4,
  },
  {
    id: "c-2",
    name: "Aditya Kulkarni",
    role: "Security Engineer @ Gojek",
    jobTitle: "Security Engineer",
    referrer: "Arjun Mehta",
    referrerScore: 92,
    stage: "Interviewing",
    daysInStage: 2,
  },
  {
    id: "c-3",
    name: "Nikhil Bansal",
    role: "SDE-3 @ Amazon",
    jobTitle: "Senior Backend Engineer",
    referrer: "Sandeep Rao",
    referrerScore: 88,
    stage: "Submitted",
    daysInStage: 1,
  },
  {
    id: "c-4",
    name: "Farah Khan",
    role: "Platform Engineer @ Jio",
    jobTitle: "Senior Backend Engineer",
    referrer: "Leela Nair",
    referrerScore: 76,
    stage: "Screening",
    daysInStage: 3,
  },
  {
    id: "c-5",
    name: "Tanvi Joshi",
    role: "Backend Engineer @ Razorpay",
    jobTitle: "Senior Backend Engineer",
    referrer: "Mohit Verma",
    referrerScore: 81,
    stage: "Screening",
    daysInStage: 5,
  },
  {
    id: "c-6",
    name: "Dev Patel",
    role: "AppSec Lead @ Paytm",
    jobTitle: "Security Engineer",
    referrer: "Sandeep Rao",
    referrerScore: 88,
    stage: "Offer",
    daysInStage: 2,
  },
  {
    id: "c-7",
    name: "Ritika Saxena",
    role: "Sr. Software Engineer @ Uber",
    jobTitle: "Senior Backend Engineer",
    referrer: "Leela Nair",
    referrerScore: 76,
    stage: "Hired",
    daysInStage: 12,
  },
];

export const escrowTransactions = [
  {
    id: "t-1",
    label: "Escrow funding — Senior Backend Engineer bounty pool (5×)",
    date: "02 Jun 2026",
    amount: 500000,
    type: "credit" as const,
  },
  {
    id: "t-2",
    label: "Hire payout released — Ritika Saxena (referrer: Leela Nair)",
    date: "29 May 2026",
    amount: -40000,
    type: "debit" as const,
  },
  {
    id: "t-3",
    label: "Platform fee — Ritika Saxena hire",
    date: "29 May 2026",
    amount: -20000,
    type: "debit" as const,
  },
  {
    id: "t-4",
    label: "Escrow funding — Security Engineer bounty pool (2×)",
    date: "12 May 2026",
    amount: 180000,
    type: "credit" as const,
  },
  {
    id: "t-5",
    label: "90-day refund — Mohan Das (left at day 47)",
    date: "30 Apr 2026",
    amount: 35000,
    type: "credit" as const,
  },
];
