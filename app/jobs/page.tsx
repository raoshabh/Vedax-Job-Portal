import { SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JobCard } from "@/components/job-card";
import { jobs } from "@/lib/data";

const filters = [
  "All roles",
  "Engineering",
  "Design",
  "Data",
  "Marketing",
  "Customer success",
  "Remote only",
];

export default function JobsPage() {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Open bounties
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            {jobs.length} roles with funded bounties. Refer someone you trust
            and earn when they&apos;re hired.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <SlidersHorizontal className="h-4 w-4" /> Filter:
          </span>
          {filters.map((f, i) => (
            <button
              key={f}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                i === 0
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
