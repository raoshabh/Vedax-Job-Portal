import { Topbar } from "@/components/app/topbar";
import { pipelineCandidates } from "@/lib/company-data";
import type { ReferralStatus } from "@/lib/data";

const columns: { stage: ReferralStatus; tint: string }[] = [
  { stage: "Submitted", tint: "border-t-slate-400" },
  { stage: "Screening", tint: "border-t-amber-400" },
  { stage: "Interviewing", tint: "border-t-blue-500" },
  { stage: "Offer", tint: "border-t-violet-500" },
  { stage: "Hired", tint: "border-t-emerald-500" },
];

export default function CandidatesPage() {
  return (
    <>
      <Topbar
        title="Candidate pipeline"
        subtitle={`${pipelineCandidates.length} referred candidates across open roles`}
      />

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {columns.map(({ stage, tint }) => {
            const cards = pipelineCandidates.filter((c) => c.stage === stage);
            return (
              <div key={stage} className="min-w-0">
                <div
                  className={`rounded-t-xl border border-t-4 border-slate-200 bg-white px-4 py-3 ${tint}`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">
                      {stage}
                    </h2>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                      {cards.length}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 rounded-b-xl border border-t-0 border-slate-200 bg-slate-50/60 p-3">
                  {cards.length === 0 && (
                    <p className="py-6 text-center text-xs text-slate-400">
                      No candidates
                    </p>
                  )}
                  {cards.map((c) => (
                    <div
                      key={c.id}
                      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                    >
                      <p className="font-semibold text-slate-900">{c.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{c.role}</p>
                      <p className="mt-2 truncate text-xs font-medium text-indigo-600">
                        {c.jobTitle}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="text-xs text-slate-500">
                          via {c.referrer.split(" ")[0]}{" "}
                          <span className="font-semibold text-emerald-600">
                            ({c.referrerScore})
                          </span>
                        </span>
                        <span className="text-xs text-slate-400">
                          {c.daysInStage}d
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Candidates move automatically as your team logs interview outcomes —
          referrers see status changes in real time.
        </p>
      </main>
    </>
  );
}
