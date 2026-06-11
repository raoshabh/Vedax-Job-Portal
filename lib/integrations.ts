// HRMS/ATS connectors and the joiner-match + dispute data the trust layer
// runs on, as seen by the demo company (Zentro Labs) and platform admins.

export interface Connector {
  id: string;
  name: string;
  kind: "HRMS" | "ATS";
  status: "Connected" | "Available";
  lastSync?: string;
  eventsThisMonth?: number;
  blurb: string;
}

export const connectors: Connector[] = [
  {
    id: "keka",
    name: "Keka",
    kind: "HRMS",
    status: "Connected",
    lastSync: "Today, 06:10",
    eventsThisMonth: 412,
    blurb: "Joiner & exit events, payroll presence for retention checks",
  },
  {
    id: "darwinbox",
    name: "Darwinbox",
    kind: "HRMS",
    status: "Available",
    blurb: "Joiner & exit events, org directory matching",
  },
  {
    id: "greythr",
    name: "greytHR",
    kind: "HRMS",
    status: "Available",
    blurb: "Payroll-verified joining dates and exits",
  },
  {
    id: "zoho-people",
    name: "Zoho People",
    kind: "HRMS",
    status: "Available",
    blurb: "Employee directory sync and exit events",
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    kind: "ATS",
    status: "Connected",
    lastSync: "Today, 06:25",
    eventsThisMonth: 198,
    blurb: "Pipeline stages sync automatically — no manual updates",
  },
  {
    id: "lever",
    name: "Lever",
    kind: "ATS",
    status: "Available",
    blurb: "Stage sync and interview feedback events",
  },
  {
    id: "zoho-recruit",
    name: "Zoho Recruit",
    kind: "ATS",
    status: "Available",
    blurb: "Stage sync for Zoho-first hiring teams",
  },
];

export interface JoinerEvent {
  id: string;
  name: string;
  date: string;
  source: string;
  match: string;
  outcome: string;
  kind: "ok" | "flag" | "none";
}

export const joinerEvents: JoinerEvent[] = [
  {
    id: "je-1",
    name: "Dev Patel",
    date: "09 Jun 2026",
    source: "Keka",
    match: "Referred candidate — offer accepted on platform",
    outcome: "Joining verified · day-90 retention timer started",
    kind: "ok",
  },
  {
    id: "je-2",
    name: "Nikhil Bansal",
    date: "08 Jun 2026",
    source: "Keka",
    match: "Matches a referral marked “Rejected” 24 days ago",
    outcome: "Hidden-hire invoice raised · under review",
    kind: "flag",
  },
  {
    id: "je-3",
    name: "Tanvi Desai",
    date: "05 Jun 2026",
    source: "Keka",
    match: "No referral match in the last 12 months",
    outcome: "Direct hire · no action",
    kind: "none",
  },
  {
    id: "je-4",
    name: "Ritika Saxena",
    date: "29 May 2026",
    source: "Keka",
    match: "Referred candidate — hired on platform",
    outcome: "Milestone 1 released automatically",
    kind: "ok",
  },
];

export type EvidenceState =
  | "confirmed"
  | "pending"
  | "requested"
  | "mismatch"
  | "applies"
  | "unavailable";

export interface Dispute {
  id: string;
  referrer: string;
  candidate: string;
  claim: string;
  filed: string;
  status: string;
  evidence: { label: string; state: EvidenceState }[];
  actions: string[];
}

export const disputes: Dispute[] = [
  {
    id: "d-1",
    referrer: "Sandeep Rao",
    candidate: "Nikhil Bansal → Zentro Labs",
    claim:
      "Keka joiner webhook matched a candidate marked “Rejected” 24 days before joining.",
    filed: "08 Jun 2026 · auto-detected",
    status: "Verified hidden hire",
    evidence: [
      { label: "HRMS joiner match", state: "confirmed" },
      { label: "EPFO employment check", state: "confirmed" },
      { label: "12-month clause", state: "applies" },
    ],
    actions: ["Release payout + 2× penalty", "Review evidence"],
  },
  {
    id: "d-2",
    referrer: "Arjun Mehta",
    candidate: "Meera Pillai → Nexa Commerce",
    claim:
      "Candidate now lists Nexa Commerce on LinkedIn; was rejected on platform 20 days ago.",
    filed: "09 Jun 2026 · referrer report",
    status: "Investigating",
    evidence: [
      { label: "EPFO employment check", state: "pending" },
      { label: "Candidate attestation", state: "requested" },
      { label: "HRMS joiner match", state: "unavailable" },
    ],
    actions: ["Run EPFO check", "Dismiss"],
  },
  {
    id: "d-3",
    referrer: "Leela Nair",
    candidate: "Farah Khan → Zentro Labs",
    claim:
      "Candidate-reported joining date differs from the company-reported date by 3 weeks.",
    filed: "06 Jun 2026 · attestation mismatch",
    status: "Awaiting company response",
    evidence: [
      { label: "Candidate attestation", state: "confirmed" },
      { label: "HRMS joining date", state: "mismatch" },
    ],
    actions: ["Request payroll record", "Escalate"],
  },
];
