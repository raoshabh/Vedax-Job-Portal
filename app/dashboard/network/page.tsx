import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  MessageCircle,
  Radar,
  UserPlus,
  Users,
} from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { StatCard } from "@/components/app/stat-card";
import { networkMatches, networkSummary } from "@/lib/network";
import { jobById, companyForJob, referrerShare } from "@/lib/data";
import { inr } from "@/lib/utils";

export default function NetworkPage() {
  const potential = networkMatches.reduce(
    (sum, m) => sum + referrerShare(jobById(m.jobId)!.bounty),
    0,
  );

  return (
    <>
      <Topbar
        title="Network x-ray"
        subtitle="Your contacts, matched against live bounties"
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Contacts imported"
            value={networkSummary.contactsImported.toLocaleString("en-IN")}
            hint="LinkedIn + Google contacts"
            icon={Users}
            accent="indigo"
          />
          <StatCard
            label="Strong matches"
            value={String(networkSummary.strongMatches)}
            hint="Score 80+ against open bounties"
            icon={Radar}
            accent="violet"
          />
          <StatCard
            label="Earning potential"
            value={inr(potential)}
            hint="If your top 6 matches get hired"
            icon={BadgeCheck}
            accent="emerald"
          />
        </div>

        {/* sources */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-sm font-semibold text-slate-700">Sources:</span>
          {networkSummary.sources.map((s) => (
            <span
              key={s.name}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                s.connected
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                  : "bg-slate-50 text-slate-500 ring-slate-200"
              }`}
            >
              {s.connected && <CheckCircle2 className="h-3 w-3" />}
              {s.name}
              {s.connected ? ` · ${s.count.toLocaleString("en-IN")}` : " — connect"}
            </span>
          ))}
        </div>

        {/* matches */}
        <section className="space-y-4">
          {networkMatches.map((m) => {
            const job = jobById(m.jobId)!;
            const company = companyForJob(m.jobId)!;
            return (
              <div
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-slate-900">{m.name}</p>
                    <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-bold text-violet-700 ring-1 ring-inset ring-violet-200">
                      {m.matchScore}% match
                    </span>
                    {m.hasPassport && (
                      <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200">
                        <BadgeCheck className="h-3 w-3" /> Passport
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {m.headline} · via {m.source}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    → <span className="font-semibold">{job.title}</span> at{" "}
                    {company.name} · earn{" "}
                    <span className="font-semibold text-emerald-600">
                      {inr(referrerShare(job.bounty))}
                    </span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.reasons.map((r) => (
                      <span
                        key={r}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <button className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500">
                    <MessageCircle className="h-4 w-4" /> Nudge on WhatsApp
                  </button>
                  <Link
                    href="/dashboard/refer"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Refer now
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* second-degree invite */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-white/10 p-2.5">
              <UserPlus className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="font-bold text-white">
                Know a connector, not the candidate?
              </p>
              <p className="mt-1 max-w-xl text-sm text-slate-400">
                Invite them and split the bounty 60/20 — they refer, you both
                earn when their candidate is hired. Most great referrals are
                second-degree.
              </p>
            </div>
          </div>
          <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            Invite a connector
          </button>
        </div>
      </main>
    </>
  );
}
