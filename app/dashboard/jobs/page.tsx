import { Topbar } from "@/components/app/topbar";
import { JobCard } from "@/components/job-card";
import { jobs } from "@/lib/data";

const filters = ["All", "Engineering", "Design", "Data", "Marketing", "Remote"];

export default function DashboardJobsPage() {
  return (
    <>
      <Topbar
        title="Browse jobs"
        subtitle={`${jobs.length} roles with funded bounties`}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                i === 0
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} referHref="/dashboard/refer" />
          ))}
        </div>
      </main>
    </>
  );
}
