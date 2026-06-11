import { Check, Clock, Lock, Trophy } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { claims, demoTier, tiers } from "@/lib/referrer-program";
import { jobById, companyForJob } from "@/lib/data";

export default function TierPage() {
  const current = tiers.find((t) => t.id === demoTier.currentId)!;
  const next = tiers.find((t) => t.id === demoTier.nextId)!;
  const progress = Math.min(
    100,
    Math.round((demoTier.verifiedHires / next.minHires) * 100),
  );

  return (
    <>
      <Topbar
        title="Tier & perks"
        subtitle="Verified hires move you up — every perk compounds"
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* current tier */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-6 text-white">
            <div className="flex items-center gap-4">
              <span className="rounded-2xl bg-white/20 p-3">
                <Trophy className="h-7 w-7" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Your tier
                </p>
                <p className="text-3xl font-extrabold tracking-tight">
                  {current.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold tracking-tight">
                {current.splitPct}%
              </p>
              <p className="text-xs text-white">
                your share on new referrals
              </p>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold text-slate-900">
                {demoTier.verifiedHires} verified hires —{" "}
                {demoTier.hiresToNext} more to {next.name}
              </p>
              <p className="text-slate-500">
                {next.name}: {next.splitPct}% share
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-indigo-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* active claims */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 pb-4">
            <h2 className="flex items-center gap-2 font-bold text-slate-900">
              <Lock className="h-4 w-4 text-indigo-600" /> Active claim windows
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              While a claim is live, no other referrer can submit your
              candidate for that role — your effort is never a race.
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {claims.map((c) => {
              const job = jobById(c.jobId)!;
              const company = companyForJob(c.jobId)!;
              const pct = Math.round((c.hoursLeft / c.windowHours) * 100);
              const urgent = c.hoursLeft <= 24;
              return (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">
                      {c.candidateName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {job.title} · {company.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden w-28 sm:block">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${urgent ? "bg-rose-500" : "bg-indigo-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
                        urgent
                          ? "bg-rose-50 text-rose-700 ring-rose-200"
                          : "bg-indigo-50 text-indigo-700 ring-indigo-200"
                      }`}
                    >
                      <Clock className="h-3 w-3" /> {c.hoursLeft}h left of{" "}
                      {c.windowHours}h
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* tier comparison */}
        <section>
          <h2 className="font-bold text-slate-900">All tiers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {tiers.map((t) => {
              const isCurrent = t.id === demoTier.currentId;
              return (
                <div
                  key={t.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm ${
                    isCurrent
                      ? "border-amber-400 ring-2 ring-amber-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white ${t.color}`}
                    >
                      {t.name[0]}
                    </span>
                    {isCurrent && (
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-200">
                        You
                      </span>
                    )}
                  </div>
                  <p className="mt-3 font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.minHires}+ verified hires
                  </p>
                  <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                    {t.splitPct}%
                  </p>
                  <p className="text-xs text-slate-500">bounty share · {t.payout}</p>
                  <ul className="mt-4 space-y-2">
                    {t.perks.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-xs leading-5 text-slate-600"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
