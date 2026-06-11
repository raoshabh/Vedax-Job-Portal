// Source-quality analytics for the company portal (Zentro Labs demo data).

export interface SourcePerformance {
  source: string;
  hires: number;
  retention90: number; // % still employed at day 90
  timeToOfferDays: number;
  costPerHire: number; // INR, all-in
  highlight?: boolean;
}

export const sourcePerformance: SourcePerformance[] = [
  {
    source: "Refora referrals",
    hires: 12,
    retention90: 92,
    timeToOfferDays: 21,
    costPerHire: 100000,
    highlight: true,
  },
  {
    source: "Agency",
    hires: 4,
    retention90: 75,
    timeToOfferDays: 33,
    costPerHire: 340000,
  },
  {
    source: "AI sourcing tools",
    hires: 7,
    retention90: 64,
    timeToOfferDays: 29,
    costPerHire: 115000,
  },
  {
    source: "Job boards",
    hires: 9,
    retention90: 61,
    timeToOfferDays: 38,
    costPerHire: 65000,
  },
];

export const referralFunnel = [
  { stage: "Referred", count: 86 },
  { stage: "Screened", count: 54 },
  { stage: "Interviewed", count: 31 },
  { stage: "Offers", count: 14 },
  { stage: "Hired", count: 12 },
];

export const responseSla = {
  medianHours: 36,
  target: 48,
  note: "Roles where your team responds within 48h get 2.1× more referrals in week one. Slow responses lower your placement in referrer feeds.",
};
