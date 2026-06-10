import { Topbar } from "@/components/app/topbar";
import { StatusBadge } from "@/components/app/status-badge";
import { companyForJob, jobById, referrals } from "@/lib/data";
import { inr, daysAgo, PIPELINE_ORDER } from "@/lib/utils";
import Link from "next/link";

export default function ReferralsPage() {
  const counts = PIPELINE_ORDER.map((stage) => ({
    stage,
    count: referrals.filter((r) => r.status === stage).length,
  }));

  return (
    <>
      <Topbar
        title="My referrals"
        subtitle={`${referrals.length} total · ${
          referrals.filter((r) => !["Paid", "Rejected"].includes(r.status))
            .length
        } active`}
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
        {/* Pipeline summary */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {counts.map(({ stage, count }) => (
            <div
              key={stage}
              className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm"
            >
              <p className="text-xl font-bold text-slate-900">{count}</p>
              <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                {stage}
              </p>
            </div>
          ))}
        </div>

        {/* Full table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4 font-semibold">Candidate</th>
                  <th className="px-6 py-4 font-semibold">Role & company</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Your note</th>
                  <th className="px-6 py-4 font-semibold">Submitted</th>
                  <th className="px-6 py-4 text-right font-semibold">Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {referrals.map((r) => {
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
                      <td className="max-w-xs px-6 py-4">
                        <p className="truncate text-xs text-slate-500">
                          {r.note}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                        {daysAgo(r.submittedDaysAgo)}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 text-right font-semibold ${
                          r.status === "Rejected"
                            ? "text-slate-400 line-through"
                            : r.status === "Paid"
                              ? "text-emerald-600"
                              : "text-slate-900"
                        }`}
                      >
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
