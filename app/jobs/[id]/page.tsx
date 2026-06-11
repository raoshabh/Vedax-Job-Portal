import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Clock,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { companyById, jobById, jobs, referrerShare } from "@/lib/data";
import { inr, lpa, daysAgo } from "@/lib/utils";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = jobById(id);
  if (!job) notFound();
  const company = companyById(job.companyId)!;
  const payout = referrerShare(job.bounty);

  return (
    <div className="bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" /> All open bounties
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4">
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white ${company.color}`}
              >
                {company.initials}
              </span>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {job.title}
                </h1>
                <p className="mt-1 text-slate-600">
                  {company.name} · {company.tagline}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {job.location} · {job.mode}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" /> {job.type} ·{" "}
                {lpa(job.salaryMin, job.salaryMax)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Posted {daysAgo(job.postedDaysAgo)}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {job.referralCount} referrals so
                far
              </span>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  About the role
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  {job.description}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  What {company.name} is looking for
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {job.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Skills</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bounty sidebar */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-sm font-medium text-slate-500">
                Referral bounty
              </p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-emerald-600">
                {inr(payout)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Your share of the {inr(job.bounty)} bounty · 50% on joining,
                50% after 90 days
              </p>

              <Link
                href="/signup"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Refer someone <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Apply yourself
              </Link>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <p className="text-xs leading-5 text-slate-600">
                    This bounty is fully funded and held in Refora escrow.
                    Payout is guaranteed when your candidate meets the
                    milestones.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-indigo-50/60 p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                  <p className="text-xs leading-5 text-slate-600">
                    Prescreening: candidates need a{" "}
                    <Link
                      href="/assessments"
                      className="font-semibold text-indigo-600 underline-offset-2 hover:underline"
                    >
                      Skill Passport
                    </Link>{" "}
                    score of {job.passportCutoff}+ in this field before the
                    referral reaches {company.name}.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
