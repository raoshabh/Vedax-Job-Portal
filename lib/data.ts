export type ReferralStatus =
  | "Submitted"
  | "Screening"
  | "Interviewing"
  | "Offer"
  | "Hired"
  | "Paid"
  | "Rejected";

export type JobStatus = "Open" | "Paused" | "Closed";

export type AssessmentFieldId =
  | "backend"
  | "frontend"
  | "design"
  | "data"
  | "management"
  | "marketing"
  | "security"
  | "sales-cs";

export interface Company {
  id: string;
  name: string;
  initials: string;
  color: string; // tailwind bg class for the logo tile
  industry: string;
  location: string;
  tagline: string;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  location: string;
  mode: "Remote" | "Hybrid" | "Onsite";
  type: "Full-time" | "Contract";
  salaryMin: number; // LPA
  salaryMax: number; // LPA
  bounty: number; // INR, paid by company per successful hire
  skills: string[];
  postedDaysAgo: number;
  referralCount: number;
  status: JobStatus;
  description: string;
  requirements: string[];
  // prescreening gate: referrals only reach the company once the candidate
  // holds a valid Skill Passport in this field at or above the cutoff
  assessmentField: AssessmentFieldId;
  passportCutoff: number;
}

export interface Referral {
  id: string;
  jobId: string;
  candidateName: string;
  candidateRole: string;
  candidateEmail: string;
  status: ReferralStatus;
  submittedDaysAgo: number;
  note: string;
  expectedPayout: number; // referrer's 80% share of the bounty
}

export interface Payout {
  id: string;
  label: string;
  amount: number;
  date: string;
  status: "Completed" | "Processing" | "Scheduled";
}

export const PLATFORM_FEE = 0.2; // Refora keeps 20% of each bounty
export const referrerShare = (bounty: number) =>
  Math.round(bounty * (1 - PLATFORM_FEE));

export const companies: Company[] = [
  {
    id: "zentro",
    name: "Zentro Labs",
    initials: "ZL",
    color: "bg-indigo-600",
    industry: "Fintech",
    location: "Bengaluru",
    tagline: "Payments infrastructure for modern India",
  },
  {
    id: "nexa",
    name: "Nexa Commerce",
    initials: "NC",
    color: "bg-rose-500",
    industry: "E-commerce",
    location: "Mumbai",
    tagline: "Headless commerce for D2C brands",
  },
  {
    id: "aurora",
    name: "Aurora Health",
    initials: "AH",
    color: "bg-emerald-600",
    industry: "Healthtech",
    location: "Hyderabad",
    tagline: "Clinical workflows, reimagined",
  },
  {
    id: "stackline",
    name: "Stackline",
    initials: "SL",
    color: "bg-amber-500",
    industry: "Developer tools",
    location: "Remote-first",
    tagline: "Observability your on-call will love",
  },
  {
    id: "cloudnine",
    name: "Cloudnine Systems",
    initials: "CS",
    color: "bg-sky-600",
    industry: "B2B SaaS",
    location: "Pune",
    tagline: "Procurement on autopilot",
  },
  {
    id: "brightpay",
    name: "Brightpay",
    initials: "BP",
    color: "bg-violet-600",
    industry: "Fintech",
    location: "Gurugram",
    tagline: "Payroll & benefits for startups",
  },
];

export const jobs: Job[] = [
  {
    id: "j-101",
    companyId: "zentro",
    title: "Senior Backend Engineer",
    location: "Bengaluru",
    mode: "Hybrid",
    type: "Full-time",
    salaryMin: 35,
    salaryMax: 55,
    bounty: 100000,
    skills: ["Go", "PostgreSQL", "Kafka", "AWS"],
    postedDaysAgo: 3,
    referralCount: 14,
    status: "Open",
    description:
      "Own the core ledger services that move ₹500Cr+ a month. You will design high-throughput, exactly-once payment pipelines and mentor a pod of four engineers.",
    requirements: [
      "6+ years building distributed backend systems",
      "Production experience with Go or Java at scale",
      "Strong grasp of idempotency, ledgers and reconciliation",
      "Comfort owning services end-to-end (design → on-call)",
    ],
    assessmentField: "backend",
    passportCutoff: 70,
  },
  {
    id: "j-102",
    companyId: "nexa",
    title: "Product Designer",
    location: "Mumbai",
    mode: "Onsite",
    type: "Full-time",
    salaryMin: 18,
    salaryMax: 30,
    bounty: 60000,
    skills: ["Figma", "Design systems", "Prototyping"],
    postedDaysAgo: 5,
    referralCount: 9,
    status: "Open",
    description:
      "Design the merchant dashboard used by 4,000+ D2C brands. You will run discovery with merchants, own flows end-to-end and grow our design system.",
    requirements: [
      "4+ years in product design for SaaS",
      "A portfolio showing shipped, measurable work",
      "Experience partnering directly with engineers",
    ],
    assessmentField: "design",
    passportCutoff: 65,
  },
  {
    id: "j-103",
    companyId: "stackline",
    title: "Staff Frontend Engineer",
    location: "India",
    mode: "Remote",
    type: "Full-time",
    salaryMin: 45,
    salaryMax: 70,
    bounty: 125000,
    skills: ["React", "TypeScript", "WebGL", "Perf"],
    postedDaysAgo: 1,
    referralCount: 21,
    status: "Open",
    description:
      "Lead the tracing UI that renders millions of spans without dropping a frame. Deep performance work, canvas/WebGL rendering, and API design for plugins.",
    requirements: [
      "8+ years of frontend engineering",
      "Proven performance work on data-dense UIs",
      "Experience leading without authority across teams",
    ],
    assessmentField: "frontend",
    passportCutoff: 75,
  },
  {
    id: "j-104",
    companyId: "aurora",
    title: "Data Scientist — Clinical ML",
    location: "Hyderabad",
    mode: "Hybrid",
    type: "Full-time",
    salaryMin: 28,
    salaryMax: 42,
    bounty: 80000,
    skills: ["Python", "PyTorch", "MLOps", "Healthcare"],
    postedDaysAgo: 7,
    referralCount: 6,
    status: "Open",
    description:
      "Build models that flag deteriorating patients hours earlier. You will work with clinicians weekly and ship models into regulated production environments.",
    requirements: [
      "3+ years applied ML in production",
      "Strong statistics fundamentals",
      "Bonus: prior healthcare or regulated-industry work",
    ],
    assessmentField: "data",
    passportCutoff: 70,
  },
  {
    id: "j-105",
    companyId: "cloudnine",
    title: "Engineering Manager — Platform",
    location: "Pune",
    mode: "Hybrid",
    type: "Full-time",
    salaryMin: 50,
    salaryMax: 75,
    bounty: 150000,
    skills: ["People management", "Kubernetes", "SRE"],
    postedDaysAgo: 2,
    referralCount: 11,
    status: "Open",
    description:
      "Manage two platform squads (8 engineers) owning CI/CD, infra and developer experience. Heavy emphasis on coaching and operational excellence.",
    requirements: [
      "2+ years managing engineers, 5+ years hands-on before that",
      "Ran platform/infra teams at a product company",
      "Track record of growing senior engineers",
    ],
    assessmentField: "management",
    passportCutoff: 65,
  },
  {
    id: "j-106",
    companyId: "brightpay",
    title: "Growth Marketing Lead",
    location: "Gurugram",
    mode: "Onsite",
    type: "Full-time",
    salaryMin: 22,
    salaryMax: 35,
    bounty: 70000,
    skills: ["Lifecycle", "SEO", "Paid", "Analytics"],
    postedDaysAgo: 9,
    referralCount: 4,
    status: "Open",
    description:
      "Own the full acquisition funnel for our payroll product — from content engine to paid experiments to lifecycle nurture. Small team, big surface.",
    requirements: [
      "5+ years B2B SaaS growth experience",
      "Hands-on with attribution and experimentation",
      "Has owned a revenue or pipeline number before",
    ],
    assessmentField: "marketing",
    passportCutoff: 65,
  },
  {
    id: "j-107",
    companyId: "zentro",
    title: "Security Engineer",
    location: "Bengaluru",
    mode: "Hybrid",
    type: "Full-time",
    salaryMin: 30,
    salaryMax: 48,
    bounty: 90000,
    skills: ["AppSec", "Cloud security", "Threat modeling"],
    postedDaysAgo: 12,
    referralCount: 3,
    status: "Open",
    description:
      "First dedicated security hire. Build the AppSec program: threat models, secure SDLC, bug bounty triage and compliance groundwork for PCI-DSS.",
    requirements: [
      "4+ years in application or cloud security",
      "Can read and write code, not just review reports",
      "Experience with fintech compliance a plus",
    ],
    assessmentField: "security",
    passportCutoff: 70,
  },
  {
    id: "j-108",
    companyId: "nexa",
    title: "Customer Success Manager",
    location: "Mumbai",
    mode: "Hybrid",
    type: "Full-time",
    salaryMin: 12,
    salaryMax: 18,
    bounty: 40000,
    skills: ["Onboarding", "Retention", "B2B SaaS"],
    postedDaysAgo: 4,
    referralCount: 8,
    status: "Open",
    description:
      "Own a book of 60 mid-market merchants. Drive onboarding, adoption and renewals; be the voice of the merchant in our roadmap reviews.",
    requirements: [
      "3+ years in customer success or account management",
      "Comfortable with data and QBR storytelling",
    ],
    assessmentField: "sales-cs",
    passportCutoff: 60,
  },
];

// The signed-in demo referrer is Arjun Mehta.
export const referrals: Referral[] = [
  {
    id: "r-201",
    jobId: "j-103",
    candidateName: "Priya Sharma",
    candidateRole: "Senior Frontend Engineer @ Flipkart",
    candidateEmail: "priya.sharma@gmail.com",
    status: "Offer",
    submittedDaysAgo: 18,
    note: "Worked with Priya for 3 years — strongest React perf engineer I know.",
    expectedPayout: referrerShare(125000),
  },
  {
    id: "r-202",
    jobId: "j-101",
    candidateName: "Karthik Iyer",
    candidateRole: "Backend Engineer @ PhonePe",
    candidateEmail: "karthik.iyer@outlook.com",
    status: "Interviewing",
    submittedDaysAgo: 11,
    note: "Built UPI reconciliation at scale. Looking to move closer to ledger work.",
    expectedPayout: referrerShare(100000),
  },
  {
    id: "r-203",
    jobId: "j-104",
    candidateName: "Sneha Reddy",
    candidateRole: "ML Engineer @ Practo",
    candidateEmail: "sneha.r@yahoo.com",
    status: "Screening",
    submittedDaysAgo: 6,
    note: "Healthcare ML background, exactly what the JD asks for.",
    expectedPayout: referrerShare(80000),
  },
  {
    id: "r-204",
    jobId: "j-105",
    candidateName: "Rohit Malhotra",
    candidateRole: "Senior SRE @ Razorpay",
    candidateEmail: "rohit.m@gmail.com",
    status: "Submitted",
    submittedDaysAgo: 2,
    note: "Has been informally leading a team of 4; ready for the EM jump.",
    expectedPayout: referrerShare(150000),
  },
  {
    id: "r-205",
    jobId: "j-102",
    candidateName: "Ananya Das",
    candidateRole: "Product Designer @ Zomato",
    candidateEmail: "ananya.design@gmail.com",
    status: "Hired",
    submittedDaysAgo: 34,
    note: "Portfolio is stellar; she redesigned the partner app onboarding.",
    expectedPayout: referrerShare(60000),
  },
  {
    id: "r-206",
    jobId: "j-106",
    candidateName: "Vikram Singh",
    candidateRole: "Growth Manager @ CRED",
    candidateEmail: "vikram.growth@gmail.com",
    status: "Paid",
    submittedDaysAgo: 71,
    note: "Ran CRED's referral program. Knows lifecycle cold.",
    expectedPayout: referrerShare(70000),
  },
  {
    id: "r-207",
    jobId: "j-108",
    candidateName: "Meera Pillai",
    candidateRole: "CSM @ Freshworks",
    candidateEmail: "meera.pillai@gmail.com",
    status: "Rejected",
    submittedDaysAgo: 20,
    note: "Great with enterprise accounts, wants mid-market ownership.",
    expectedPayout: referrerShare(40000),
  },
  {
    id: "r-208",
    jobId: "j-107",
    candidateName: "Aditya Kulkarni",
    candidateRole: "Security Engineer @ Gojek",
    candidateEmail: "aditya.sec@protonmail.com",
    status: "Interviewing",
    submittedDaysAgo: 9,
    note: "CTF regular, did AppSec for payments at Gojek.",
    expectedPayout: referrerShare(90000),
  },
];

export const payouts: Payout[] = [
  {
    id: "p-301",
    label: "Vikram Singh → Brightpay (hire milestone)",
    amount: 28000,
    date: "12 Apr 2026",
    status: "Completed",
  },
  {
    id: "p-302",
    label: "Vikram Singh → Brightpay (90-day milestone)",
    amount: 28000,
    date: "28 May 2026",
    status: "Completed",
  },
  {
    id: "p-303",
    label: "Ananya Das → Nexa Commerce (hire milestone)",
    amount: 24000,
    date: "08 Jun 2026",
    status: "Processing",
  },
  {
    id: "p-304",
    label: "Ananya Das → Nexa Commerce (90-day milestone)",
    amount: 24000,
    date: "Est. 04 Sep 2026",
    status: "Scheduled",
  },
];

export const monthlyEarnings = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 12000 },
  { month: "Mar", amount: 0 },
  { month: "Apr", amount: 28000 },
  { month: "May", amount: 28000 },
  { month: "Jun", amount: 24000 },
];

export const jobById = (id: string) => jobs.find((j) => j.id === id);
export const companyById = (id: string) => companies.find((c) => c.id === id);
export const companyForJob = (jobId: string) => {
  const job = jobById(jobId);
  return job ? companyById(job.companyId) : undefined;
};

// Demo identities used across the app shells.
export const demoReferrer = {
  name: "Arjun Mehta",
  title: "Engineering Manager @ Swiggy",
  email: "arjun.mehta@gmail.com",
  initials: "AM",
  trustScore: 92,
};

export const demoCompanyUser = {
  name: "Divya Krishnan",
  title: "Head of Talent, Zentro Labs",
  email: "divya@zentrolabs.com",
  initials: "DK",
  companyId: "zentro",
};

export const demoCandidate = {
  name: "Karthik Iyer",
  email: "karthik.iyer@outlook.com",
  initials: "KI",
  referralId: "r-202",
};
