import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImmersiveHero } from "@/components/marketing/immersive-hero";
import { JobCard } from "@/components/job-card";
import { jobs } from "@/lib/data";

export default function HomePage() {
  const featured = [...jobs].sort((a, b) => b.bounty - a.bounty).slice(0, 3);

  return (
    <div className="bg-[#06060d]">
      <ImmersiveHero />

      {/* after the film: real, actionable content */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white">
              Live bounties right now
            </h2>
            <p className="mt-2 text-slate-400">
              Know someone perfect for one of these?
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden items-center gap-1 font-display text-sm font-semibold text-indigo-400 transition hover:text-indigo-300 sm:flex"
          >
            View all {jobs.length} roles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-500">
          Prefer the classic tour?{" "}
          <Link
            href="/classic"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            See how Refora works, step by step
          </Link>
        </p>
      </section>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Refora Technologies Pvt. Ltd.</p>
          <div className="flex gap-6">
            <Link href="/jobs" className="transition hover:text-slate-300">
              Browse jobs
            </Link>
            <Link href="/pricing" className="transition hover:text-slate-300">
              For companies
            </Link>
            <Link href="/login" className="transition hover:text-slate-300">
              Log in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
