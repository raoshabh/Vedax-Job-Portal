import { Clock3, HandCoins, ShieldCheck, Timer } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { StatCard } from "@/components/app/stat-card";
import {
  referralFunnel,
  responseSla,
  sourcePerformance,
} from "@/lib/analytics";
import { inr } from "@/lib/utils";

export default function AnalyticsPage() {
  const refora = sourcePerformance.find((s) => s.highlight)!;
  const boards = sourcePerformance.find((s) => s.source === "Job boards")!;
  const maxFunnel = referralFunnel[0].count;

  return (
    <>
      <Topbar
        title="Source analytics"
        subtitle="Where your good hires actually come from"
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="90-day retention (Refora)"
            value={`${refora.retention90}%`}
            hint={`vs ${boards.retention90}% from job boards`}
            icon={ShieldCheck}
            accent="emerald"
          />
          <StatCard
            label="Median time to offer"
            value={`${refora.timeToOfferDays} days`}
            hint={`vs ${boards.timeToOfferDays} days from job boards`}
            icon={Timer}
            accent="indigo"
          />
          <StatCard
            label="Cost per verified hire"
            value={inr(refora.costPerHire)}
            hint="vs ₹3,40,000 via agency"
            icon={HandCoins}
            accent="amber"
          />
          <StatCard
            label="Your response SLA"
            value={`${responseSla.medianHours}h`}
            hint={`Target ≤ ${responseSla.target}h — you're on pace`}
            icon={Clock3}
            accent="violet"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* retention by source — the chart that matters */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              90-day retention by source
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Verified from payroll via your HRMS connection — not self-reported.
            </p>
            <div className="mt-6 space-y-4">
              {sourcePerformance.map((s) => (
                <div key={s.source}>
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={
                        s.highlight
                          ? "font-bold text-slate-900"
                          : "font-medium text-slate-600"
                      }
                    >
                      {s.source}
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        {s.hires} hires
                      </span>
                    </span>
                    <span
                      className={`font-bold ${s.highlight ? "text-emerald-600" : "text-slate-700"}`}
                    >
                      {s.retention90}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        s.highlight
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          : "bg-slate-300"
                      }`}
                      style={{ width: `${s.retention90}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-900">
              Referred hires stay {refora.retention90 - boards.retention90}{" "}
              points longer than job-board hires at day 90 — someone staked
              their reputation on them.
            </p>
          </section>

          {/* referral funnel */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Referral funnel — this quarter
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Every candidate below was prescreened and vouched before reaching
              you.
            </p>
            <div className="mt-6 space-y-3">
              {referralFunnel.map((f, i) => (
                <div key={f.stage} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-sm font-medium text-slate-600">
                    {f.stage}
                  </span>
                  <div className="h-8 flex-1">
                    <div
                      className={`flex h-full items-center rounded-lg px-3 text-xs font-bold text-white ${
                        i === referralFunnel.length - 1
                          ? "bg-emerald-600"
                          : "bg-indigo-600"
                      }`}
                      style={{
                        width: `${Math.max((f.count / maxFunnel) * 100, 12)}%`,
                      }}
                    >
                      {f.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500">
              14% of referred candidates convert to hires — versus ~1–2% of
              job-board applicants industry-wide.
            </p>
          </section>
        </div>

        {/* SLA banner */}
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 text-sm leading-6 text-violet-900">
          <span className="font-bold">Response speed is a ranking input: </span>
          {responseSla.note}
        </div>
      </main>
    </>
  );
}
