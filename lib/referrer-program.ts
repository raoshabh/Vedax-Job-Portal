// Referrer tiers and candidate claim windows (anti winner-takes-all).

export interface Tier {
  id: string;
  name: string;
  minHires: number;
  splitPct: number; // referrer's share of the bounty
  payout: string;
  perks: string[];
  color: string; // tile bg
}

export const tiers: Tier[] = [
  {
    id: "bronze",
    name: "Bronze",
    minHires: 0,
    splitPct: 80,
    payout: "Within 24h of release",
    perks: ["All open bounties", "Standard 72h claim window"],
    color: "bg-amber-700",
  },
  {
    id: "silver",
    name: "Silver",
    minHires: 2,
    splitPct: 80,
    payout: "Same-day",
    perks: ["12h early access to new bounties", "Priority support"],
    color: "bg-slate-400",
  },
  {
    id: "gold",
    name: "Gold",
    minHires: 5,
    splitPct: 82,
    payout: "Instant to UPI",
    perks: [
      "24h early access + premium bounties",
      "96h claim window",
      "Bulk submissions (up to 5/role)",
    ],
    color: "bg-amber-500",
  },
  {
    id: "platinum",
    name: "Platinum",
    minHires: 10,
    splitPct: 85,
    payout: "Instant to UPI",
    perks: [
      "First access to every bounty",
      "120h claim window",
      "Recruiter workspace + dedicated manager",
    ],
    color: "bg-indigo-600",
  },
];

// Demo referrer (Arjun): Gold, 7 verified hires, 3 away from Platinum.
export const demoTier = {
  currentId: "gold",
  verifiedHires: 7,
  nextId: "platinum",
  hiresToNext: 3,
};

export interface Claim {
  id: string;
  candidateName: string;
  jobId: string;
  hoursLeft: number;
  windowHours: number;
}

// Active exclusivity windows: while a claim is live, no other referrer can
// submit the same candidate for that role.
export const claims: Claim[] = [
  {
    id: "cl-1",
    candidateName: "Karthik Iyer",
    jobId: "j-101",
    hoursLeft: 41,
    windowHours: 96,
  },
  {
    id: "cl-2",
    candidateName: "Aditya Kulkarni",
    jobId: "j-107",
    hoursLeft: 63,
    windowHours: 96,
  },
  {
    id: "cl-3",
    candidateName: "Rohit Malhotra",
    jobId: "j-105",
    hoursLeft: 12,
    windowHours: 96,
  },
];
