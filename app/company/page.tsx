import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { pipelineCandidates } from "@/lib/company-data";
import { jobs } from "@/lib/data";
import { inr } from "@/lib/utils";

export default function CompanyOverviewPage() {
  const zentroJobs = jobs.filter((j) => j.companyId === "zentro");
  const inPipeline = pipelineCandidates.filter(
    (c) => !["Hired", "Paid", "Rejected"].includes(c.stage),
  );
  const recent = [...pipelineCandidates]
    .sort((a, b) => a.daysInStage - b.daysInStage)
    .slice(0, 5);

  return (
    <>
      <Topbar
        title="Zentro Labs — Hiring overview"
        subtitle="Referral pipeline across your open roles"
        action={
          <Link
            href="/company/jobs/new"
            className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 sm:block"
          >
            + Post a role
          </Link>
        }
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Open roles"
            value={String(zentroJobs.length)}
            hint="All with funded bounties"
            icon={Briefcase}
            accent="indigo"
          />
          <StatCard
            label="Candidates in pipeline"
            value={String(inPipeline.length)}
            hint="Referred this month"
            icon={Users}
            accent="violet"
          />
          <StatCard
            label="Hires this quarter"
            value="3"
            hint="All passed 90-day mark"
            icon={Trophy}
            accent="emerald"
          />
          <StatCard
            label="Escrow balance"
            value={inr(655000)}
            hint="Covers 6 more bounties"
            icon={Wallet}
            accent="amber"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {/* Recent candidates */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="font-bold text-slate-900">Latest referrals</h2>
              <Link
                href="/company/candidates"
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Pipeline board <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-y border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-3 font-semibold">Candidate</th>
                    <th className="px-6 py-3 font-semibold">Role</th>
                    <th className="px-6 py-3 font-semibold">Referred by</th>
                    <th className="px-6 py-3 font-semibold">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recent.map((c) => (
                    <tr key={c.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.role}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{c.jobTitle}</td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700">{c.referrer}</p>
                        <p className="text-xs text-emerald-600">
                          Trust {c.referrerScore}/100
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={c.stage} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role performance */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Role performance</h2>
            <div className="mt-4 space-y-4">
              {zentroJobs.map((job) => {
                const count = pipelineCandidates.filter(
                  (c) => c.jobTitle === job.title,
                ).length;
                return (
                  <div
                    key={job.id}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">
                        {job.title}
                      </p>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        Open
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>{count} in pipeline</span>
                      <span>Bounty {inr(job.bounty)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${Math.min(count * 20, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/company/jobs/new"
              className="mt-5 flex items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Post another role <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
