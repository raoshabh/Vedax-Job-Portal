import Link from "next/link";
import {
  CalendarCheck,
  Check,
  CircleDot,
  MessageSquareQuote,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { companyForJob, demoCandidate, jobById, referrals } from "@/lib/data";
import { lpa } from "@/lib/utils";

const stages = [
  {
    name: "Referral received",
    detail: "Arjun Mehta vouched for you · consent confirmed",
    state: "done" as const,
    date: "30 May",
  },
  {
    name: "Profile screened",
    detail: "Shortlisted by the Zentro Labs hiring team",
    state: "done" as const,
    date: "02 Jun",
  },
  {
    name: "Interviews",
    detail: "Round 2 of 3 — system design, this Friday 4:00 PM",
    state: "current" as const,
    date: "In progress",
  },
  {
    name: "Offer",
    detail: "Decision expected within a week of final round",
    state: "todo" as const,
    date: "",
  },
  {
    name: "Joining",
    detail: "Offer acceptance and onboarding",
    state: "todo" as const,
    date: "",
  },
];

export default function CandidatePage() {
  const referral = referrals.find((r) => r.id === demoCandidate.referralId)!;
  const job = jobById(referral.jobId)!;
  const company = companyForJob(referral.jobId)!;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
            Candidate
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Hi {demoCandidate.name.split(" ")[0]}, here&apos;s where you stand
          </h1>
          <p className="mt-2 text-slate-600">
            You were referred for a role — track every stage here, no
            black-box applications.
          </p>
        </div>

        {/* Job card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${company.color}`}
            >
              {company.initials}
            </span>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">{job.title}</h2>
              <p className="text-sm text-slate-500">
                {company.name} · {job.location} · {job.mode} ·{" "}
                {lpa(job.salaryMin, job.salaryMax)}
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-200">
              Interviewing
            </span>
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-indigo-50/70 p-4">
            <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
            <div>
              <p className="text-sm font-semibold text-indigo-900">
                Why Arjun vouched for you
              </p>
              <p className="mt-1 text-sm leading-6 text-indigo-900/80">
                “{referral.note}”
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Your journey</h2>
          <ol className="mt-6 space-y-0">
            {stages.map((stage, i) => (
              <li key={stage.name} className="relative flex gap-4 pb-8 last:pb-0">
                {i < stages.length - 1 && (
                  <span
                    className={`absolute left-[15px] top-8 h-full w-0.5 ${
                      stage.state === "done" ? "bg-emerald-300" : "bg-slate-200"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    stage.state === "done"
                      ? "bg-emerald-500 text-white"
                      : stage.state === "current"
                        ? "bg-blue-500 text-white ring-4 ring-blue-100"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {stage.state === "done" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <CircleDot className="h-4 w-4" />
                  )}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`font-semibold ${
                        stage.state === "todo"
                          ? "text-slate-400"
                          : "text-slate-900"
                      }`}
                    >
                      {stage.name}
                    </p>
                    <span className="text-xs text-slate-400">{stage.date}</span>
                  </div>
                  <p
                    className={`mt-0.5 text-sm ${
                      stage.state === "todo"
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    {stage.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Next step */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-white/10 p-2.5">
              <CalendarCheck className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="font-semibold text-white">
                System design round — Friday, 4:00 PM
              </p>
              <p className="text-sm text-slate-400">
                With Rahul Nambiar, Engineering Lead · Google Meet
              </p>
            </div>
          </div>
          <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            Add to calendar
          </button>
        </div>

        <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <p className="text-xs leading-5 text-slate-600">
            Your profile is visible only to {company.name}&apos;s hiring team.
            You can{" "}
            <Link href="#" className="font-semibold text-indigo-600 underline">
              withdraw from this process
            </Link>{" "}
            at any time — your referrer will be notified respectfully.
          </p>
        </div>
      </main>
    </div>
  );
}
