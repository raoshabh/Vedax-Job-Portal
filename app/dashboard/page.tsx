import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  HandCoins,
  Hourglass,
  Users,
} from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { BarChart } from "@/components/app/bar-chart";
import {
  companyForJob,
  demoReferrer,
  jobById,
  jobs,
  monthlyEarnings,
  payouts,
  referrals,
  referrerShare,
} from "@/lib/data";
import { inr, daysAgo } from "@/lib/utils";

export default function DashboardPage() {
  const active = referrals.filter(
    (r) => !["Paid", "Rejected"].includes(r.status),
  );
  const lifetime = payouts
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pending = payouts
    .filter((p) => p.status !== "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const recent = [...referrals]
    .sort((a, b) => a.submittedDaysAgo - b.submittedDaysAgo)
    .slice(0, 5);
  const hotJobs = [...jobs].sort((a, b) => b.bounty - a.bounty).slice(0, 3);

  return (
    <>
      <Topbar
        title={`Good morning, ${demoReferrer.name.split(" ")[0]}`}
        subtitle="Here's how your referrals are doing"
        action={
          <Link
            href="/dashboard/refer"
            className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 sm:block"
          >
            + New referral
          </Link>
        }
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Lifetime earnings"
            value={inr(lifetime)}
            hint="Across 2 successful hires"
            icon={HandCoins}
            accent="emerald"
          />
          <StatCard
            label="Pending payouts"
            value={inr(pending)}
            hint="Releases on upcoming milestones"
            icon={Hourglass}
            accent="amber"
          />
          <StatCard
            label="Active referrals"
            value={String(active.length)}
            hint="In pipeline right now"
            icon={Users}
            accent="indigo"
          />
          <StatCard
            label="Trust score"
            value={`${demoReferrer.trustScore}/100`}
            hint="Top 5% of referrers"
            icon={BadgeCheck}
            accent="violet"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {/* Earnings chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">
                Earnings — last 6 months
              </h2>
              <Link
                href="/dashboard/earnings"
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6">
              <BarChart data={monthlyEarnings} />
            </div>
          </div>

          {/* Hot bounties */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Highest bounties open</h2>
            <div className="mt-4 space-y-4">
              {hotJobs.map((job) => {
                const company = companyForJob(job.id)!;
                return (
                  <Link
                    key={job.id}
                    href="/dashboard/jobs"
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-200 hover:bg-indigo-50/40"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${company.color}`}
                    >
                      {company.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {job.title}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {company.name}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">
                      {inr(referrerShare(job.bounty))}
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/dashboard/jobs"
              className="mt-4 flex items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Browse all jobs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Recent referrals */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="font-bold text-slate-900">Recent referrals</h2>
            <Link
              href="/dashboard/referrals"
              className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-y border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3 font-semibold">Candidate</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Submitted</th>
                  <th className="px-6 py-3 text-right font-semibold">
                    Potential payout
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((r) => {
                  const job = jobById(r.jobId)!;
                  const company = companyForJob(r.jobId)!;
                  return (
                    <tr key={r.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {r.candidateName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {r.candidateRole}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700">{job.title}</p>
                        <p className="text-xs text-slate-500">{company.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {daysAgo(r.submittedDaysAgo)}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">
                        {inr(r.expectedPayout)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
