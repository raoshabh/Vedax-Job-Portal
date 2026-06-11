// Network x-ray: the referrer's imported contacts matched against open
// bounties. Matching is mocked; reasons mirror what the real engine would say.

export interface NetworkMatch {
  id: string;
  name: string;
  headline: string;
  source: "LinkedIn" | "Phone contacts" | "Alumni group";
  jobId: string;
  matchScore: number; // 0–100
  reasons: string[];
  hasPassport: boolean;
}

export const networkSummary = {
  contactsImported: 1243,
  strongMatches: 14,
  sources: [
    { name: "LinkedIn", connected: true, count: 987 },
    { name: "Google contacts", connected: true, count: 256 },
    { name: "Alumni groups", connected: false, count: 0 },
  ],
};

export const networkMatches: NetworkMatch[] = [
  {
    id: "n-1",
    name: "Devika Rao",
    headline: "Senior SDE @ Flipkart · ex-Razorpay payments",
    source: "LinkedIn",
    jobId: "j-101",
    matchScore: 94,
    reasons: ["4y ledger & payments work", "Go + Kafka in skills", "Open to Bengaluru hybrid"],
    hasPassport: true,
  },
  {
    id: "n-2",
    name: "Sahil Kapoor",
    headline: "Frontend Lead @ Meesho",
    source: "LinkedIn",
    jobId: "j-103",
    matchScore: 91,
    reasons: ["Led web-perf guild", "Canvas dashboards shipped", "Followed Stackline's blog"],
    hasPassport: false,
  },
  {
    id: "n-3",
    name: "Ishita Menon",
    headline: "Product Designer @ PhonePe",
    source: "Alumni group",
    jobId: "j-102",
    matchScore: 88,
    reasons: ["B2B dashboard portfolio", "Design-system owner", "Mumbai-based"],
    hasPassport: true,
  },
  {
    id: "n-4",
    name: "Arnav Chatterjee",
    headline: "ML Engineer @ Navi · healthcare side projects",
    source: "LinkedIn",
    jobId: "j-104",
    matchScore: 86,
    reasons: ["Clinical-NLP papers", "PyTorch in production", "Wants regulated-domain work"],
    hasPassport: false,
  },
  {
    id: "n-5",
    name: "Pooja Hegde",
    headline: "SRE Manager @ Zerodha",
    source: "Phone contacts",
    jobId: "j-105",
    matchScore: 84,
    reasons: ["Manages 6 SREs", "K8s platform owner", "Pune roots"],
    hasPassport: false,
  },
  {
    id: "n-6",
    name: "Kabir Anand",
    headline: "AppSec consultant · ex-Gojek",
    source: "LinkedIn",
    jobId: "j-107",
    matchScore: 82,
    reasons: ["PCI-DSS audits done", "Writes exploit write-ups", "Fintech background"],
    hasPassport: true,
  },
];
