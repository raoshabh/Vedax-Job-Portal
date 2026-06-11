import type { AssessmentFieldId } from "./data";

export interface SampleQuestion {
  q: string;
  options: string[];
  answer: number; // index into options
}

export interface Assessment {
  id: AssessmentFieldId;
  field: string;
  durationMins: number;
  validityMonths: number;
  sections: string[];
  takenBy: number; // candidates assessed so far
  sampleQuestions: SampleQuestion[];
}

export interface SkillPassport {
  email: string;
  candidateName: string;
  fieldId: AssessmentFieldId;
  score: number; // 0–100
  percentile: number;
  issuedOn: string;
  expiresOn: string;
  status: "Valid" | "Expired";
  badges: string[];
}

export const assessments: Assessment[] = [
  {
    id: "backend",
    field: "Backend Engineering",
    durationMins: 40,
    validityMonths: 9,
    sections: ["DSA & complexity", "System design", "Debugging a live service"],
    takenBy: 4218,
    sampleQuestions: [
      {
        q: "A payments ledger applies the same credit twice when a webhook retries. The cleanest fix is:",
        options: [
          "Lock the whole ledger table during writes",
          "An idempotency key checked before applying the mutation",
          "Retry less aggressively from the webhook sender",
          "Switch the ledger to eventual consistency",
        ],
        answer: 1,
      },
      {
        q: "Your p99 latency spikes every 10 minutes while p50 stays flat. The most likely culprit:",
        options: [
          "Steady traffic growth",
          "A periodic batch job or GC pause sharing resources",
          "Slow DNS resolution",
          "Users on slow networks",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "frontend",
    field: "Frontend Engineering",
    durationMins: 40,
    validityMonths: 9,
    sections: ["JS/TS fundamentals", "Rendering performance", "Accessibility"],
    takenBy: 5102,
    sampleQuestions: [
      {
        q: "A list of 10,000 rows scrolls at 12 FPS. The highest-leverage fix is:",
        options: [
          "Memoize every row component",
          "Virtualize the list so only visible rows render",
          "Move the list into an iframe",
          "Debounce the scroll handler",
        ],
        answer: 1,
      },
      {
        q: "Animating an element's position without triggering layout means animating:",
        options: ["top/left", "margin", "transform", "height"],
        answer: 2,
      },
    ],
  },
  {
    id: "design",
    field: "Product Design",
    durationMins: 45,
    validityMonths: 12,
    sections: ["Portfolio deep-dive", "Critique task", "Design systems"],
    takenBy: 2331,
    sampleQuestions: [
      {
        q: "A checkout form converts poorly on mobile. Which change do you test first?",
        options: [
          "Add a progress indicator",
          "Reduce fields and use input types that match the keyboard",
          "Change the brand colors",
          "Add testimonials below the form",
        ],
        answer: 1,
      },
      {
        q: "Design tokens exist primarily to:",
        options: [
          "Make designs look trendy",
          "Encode decisions once so they stay consistent across platforms",
          "Replace the need for designers",
          "Speed up Figma rendering",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "data",
    field: "Data Science & ML",
    durationMins: 45,
    validityMonths: 9,
    sections: ["SQL", "Statistics", "Model design"],
    takenBy: 1894,
    sampleQuestions: [
      {
        q: "Your model has 99% accuracy on a dataset where 99% of rows are negative. You should report:",
        options: [
          "Accuracy — it's excellent",
          "Precision/recall or PR-AUC for the positive class",
          "Training loss",
          "R-squared",
        ],
        answer: 1,
      },
      {
        q: "A feature leaks the label (computed after the outcome). The symptom is usually:",
        options: [
          "Great offline metrics, useless in production",
          "Slow training",
          "High bias",
          "Underfitting",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "management",
    field: "Engineering Management",
    durationMins: 35,
    validityMonths: 12,
    sections: ["People scenarios", "Delivery & prioritisation", "Org design"],
    takenBy: 976,
    sampleQuestions: [
      {
        q: "A strong senior engineer keeps rewriting teammates' merged code without discussion. First move:",
        options: [
          "Revoke their merge rights",
          "A direct 1:1 naming the behavior and its impact on the team",
          "Praise the rewrites — quality went up",
          "Reassign them to a solo project",
        ],
        answer: 1,
      },
      {
        q: "Two squads miss a quarter because both assumed the other owned an integration. The durable fix:",
        options: [
          "Add a weekly status meeting",
          "Explicit ownership boundaries with an interface contract",
          "Merge the squads",
          "Escalate to the CTO each sprint",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "marketing",
    field: "Growth Marketing",
    durationMins: 35,
    validityMonths: 9,
    sections: ["Funnel math", "Attribution", "Experiment design"],
    takenBy: 1422,
    sampleQuestions: [
      {
        q: "Signups doubled but activation rate halved. Overall activated users:",
        options: ["Doubled", "Unchanged", "Halved", "Cannot tell"],
        answer: 1,
      },
      {
        q: "An A/B test reaches significance after 2 days on a 14-day purchase cycle. You should:",
        options: [
          "Ship it — significance is significance",
          "Keep running it through at least one full cycle",
          "Restart the test",
          "Double the traffic",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "security",
    field: "Security Engineering",
    durationMins: 40,
    validityMonths: 9,
    sections: ["AppSec", "Cloud & infra", "Threat modeling"],
    takenBy: 689,
    sampleQuestions: [
      {
        q: "A JWT's alg header can be switched to 'none' and the API still accepts it. This is:",
        options: [
          "Fine — the payload is still base64 encoded",
          "A critical signature-bypass vulnerability",
          "Only a problem over HTTP",
          "Expected JWT behavior",
        ],
        answer: 1,
      },
      {
        q: "Secrets keep leaking into build logs. The most durable control is:",
        options: [
          "Tell engineers to be careful",
          "Centralized secret manager + log redaction in CI",
          "Private repos",
          "Rotate secrets quarterly",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "sales-cs",
    field: "Sales & Customer Success",
    durationMins: 30,
    validityMonths: 9,
    sections: ["Discovery", "Objection handling", "Renewal & QBR case"],
    takenBy: 1108,
    sampleQuestions: [
      {
        q: "A prospect says 'too expensive' in the first call. Best response:",
        options: [
          "Offer a discount immediately",
          "Ask what they're comparing it against and what outcome they need",
          "End the call — bad fit",
          "Send a longer feature list",
        ],
        answer: 1,
      },
      {
        q: "An account's usage dropped 60% two quarters before renewal. You:",
        options: [
          "Wait for renewal to discuss",
          "Trigger a save play now: exec check-in + usage review",
          "Send more newsletters",
          "Raise their price",
        ],
        answer: 1,
      },
    ],
  },
];

export const assessmentById = (id: AssessmentFieldId) =>
  assessments.find((a) => a.id === id)!;

// Passports already issued on the platform, keyed by candidate email.
export const passports: SkillPassport[] = [
  {
    email: "priya.sharma@gmail.com",
    candidateName: "Priya Sharma",
    fieldId: "frontend",
    score: 91,
    percentile: 97,
    issuedOn: "14 Mar 2026",
    expiresOn: "14 Dec 2026",
    status: "Valid",
    badges: ["Top 3%", "Performance distinction"],
  },
  {
    email: "karthik.iyer@outlook.com",
    candidateName: "Karthik Iyer",
    fieldId: "backend",
    score: 87,
    percentile: 92,
    issuedOn: "02 May 2026",
    expiresOn: "02 Feb 2027",
    status: "Valid",
    badges: ["Top 10%", "System design distinction"],
  },
  {
    email: "sneha.r@yahoo.com",
    candidateName: "Sneha Reddy",
    fieldId: "data",
    score: 78,
    percentile: 84,
    issuedOn: "21 Apr 2026",
    expiresOn: "21 Jan 2027",
    status: "Valid",
    badges: ["Top 20%"],
  },
  {
    email: "ananya.design@gmail.com",
    candidateName: "Ananya Das",
    fieldId: "design",
    score: 88,
    percentile: 94,
    issuedOn: "11 Feb 2026",
    expiresOn: "11 Feb 2027",
    status: "Valid",
    badges: ["Top 10%", "Critique distinction"],
  },
  {
    email: "rohit.m@gmail.com",
    candidateName: "Rohit Malhotra",
    fieldId: "management",
    score: 72,
    percentile: 76,
    issuedOn: "29 May 2026",
    expiresOn: "29 May 2027",
    status: "Valid",
    badges: [],
  },
  {
    email: "vikram.growth@gmail.com",
    candidateName: "Vikram Singh",
    fieldId: "marketing",
    score: 81,
    percentile: 89,
    issuedOn: "03 Jan 2026",
    expiresOn: "03 Oct 2026",
    status: "Valid",
    badges: ["Top 15%"],
  },
  {
    email: "aditya.sec@protonmail.com",
    candidateName: "Aditya Kulkarni",
    fieldId: "security",
    score: 84,
    percentile: 90,
    issuedOn: "17 Apr 2026",
    expiresOn: "17 Jan 2027",
    status: "Valid",
    badges: ["Top 10%"],
  },
  {
    email: "meera.pillai@gmail.com",
    candidateName: "Meera Pillai",
    fieldId: "sales-cs",
    score: 74,
    percentile: 79,
    issuedOn: "20 Jun 2025",
    expiresOn: "20 Mar 2026",
    status: "Expired",
    badges: [],
  },
];

export const findPassport = (email: string) =>
  passports.find(
    (p) => p.email.toLowerCase() === email.trim().toLowerCase(),
  );
