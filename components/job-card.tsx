import Link from "next/link";
import { MapPin, Users, Clock } from "lucide-react";
import type { Job } from "@/lib/data";
import { companyById, referrerShare } from "@/lib/data";
import { inr, lpa, daysAgo } from "@/lib/utils";

export function JobCard({
  job,
  referHref = "/signup",
}: {
  job: Job;
  referHref?: string;
}) {
  const company = companyById(job.companyId)!;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${company.color}`}
          >
            {company.initials}
          </span>
          <div>
            <Link
              href={`/jobs/${job.id}`}
              className="font-semibold text-slate-900 hover:text-indigo-600"
            >
              {job.title}
            </Link>
            <p className="text-sm text-slate-500">{company.name}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
          Earn {inr(referrerShare(job.bounty))}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location} · {job.mode}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {job.referralCount} referrals
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {daysAgo(job.postedDaysAgo)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
          Prescreened ≥{job.passportCutoff}
        </span>
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm font-semibold text-slate-700">
          {lpa(job.salaryMin, job.salaryMax)}
        </span>
        <Link
          href={referHref}
          className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Refer someone
        </Link>
      </div>
    </div>
  );
}
