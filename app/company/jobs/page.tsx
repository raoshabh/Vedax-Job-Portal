import Link from "next/link";
import { MoreHorizontal, Plus } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { pipelineCandidates } from "@/lib/company-data";
import { jobs } from "@/lib/data";
import { inr, daysAgo } from "@/lib/utils";

export default function CompanyJobsPage() {
  const zentroJobs = jobs.filter((j) => j.companyId === "zentro");

  return (
    <>
      <Topbar
        title="Jobs & bounties"
        subtitle={`${zentroJobs.length} open roles`}
        action={
          <Link
            href="/company/jobs/new"
            className="hidden items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 sm:flex"
          >
            <Plus className="h-4 w-4" /> Post a role
          </Link>
        }
      />

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Bounty per hire</th>
                  <th className="px-6 py-4 font-semibold">In pipeline</th>
                  <th className="px-6 py-4 font-semibold">Total referrals</th>
                  <th className="px-6 py-4 font-semibold">Posted</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {zentroJobs.map((job) => {
                  const inPipeline = pipelineCandidates.filter(
                    (c) =>
                      c.jobTitle === job.title &&
                      !["Hired", "Paid", "Rejected"].includes(c.stage),
                  ).length;
                  return (
                    <tr key={job.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {job.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {job.location} · {job.mode} · {job.type}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {inr(job.bounty)}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{inPipeline}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {job.referralCount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                        {daysAgo(job.postedDaysAgo)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Job actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
          <h3 className="font-semibold text-slate-900">
            Hiring for another role?
          </h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Roles with bounties of ₹75,000+ get 3× more referrals in the first
            week.
          </p>
          <Link
            href="/company/jobs/new"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4" /> Post a role
          </Link>
        </div>
      </main>
    </>
  );
}
