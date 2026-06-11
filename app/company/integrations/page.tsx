import {
  AlertTriangle,
  BadgePercent,
  CheckCircle2,
  Minus,
  RefreshCcw,
} from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { connectors, joinerEvents } from "@/lib/integrations";

const eventStyles = {
  ok: {
    icon: CheckCircle2,
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    iconColor: "text-emerald-600",
  },
  flag: {
    icon: AlertTriangle,
    chip: "bg-rose-50 text-rose-700 ring-rose-200",
    iconColor: "text-rose-600",
  },
  none: {
    icon: Minus,
    chip: "bg-slate-100 text-slate-600 ring-slate-200",
    iconColor: "text-slate-400",
  },
} as const;

export default function IntegrationsPage() {
  const hrms = connectors.filter((c) => c.kind === "HRMS");
  const ats = connectors.filter((c) => c.kind === "ATS");

  return (
    <>
      <Topbar
        title="Integrations"
        subtitle="HRMS & ATS connections power zero-touch payouts and hire verification"
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* discount banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-emerald-600 p-2 text-white">
              <BadgePercent className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-emerald-900">
                Verified automation discount — active
              </p>
              <p className="mt-0.5 text-sm text-emerald-800">
                Because Keka is connected, joining and 90-day milestones are
                verified from payroll and your bounty fee is 12% instead of
                20%.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
            12% fee tier
          </span>
        </div>

        {/* connectors */}
        {[
          {
            heading: "HRMS — joiners, exits & payroll verification",
            list: hrms,
          },
          { heading: "ATS — automatic pipeline stage sync", list: ats },
        ].map((group) => (
          <section key={group.heading}>
            <h2 className="font-bold text-slate-900">{group.heading}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {group.list.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm ${
                    c.status === "Connected"
                      ? "border-indigo-200 ring-1 ring-inset ring-indigo-100"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">{c.name}</p>
                    {c.status === "Connected" ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        <CheckCircle2 className="h-3 w-3" /> Connected
                      </span>
                    ) : (
                      <button className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                        Connect
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {c.blurb}
                  </p>
                  {c.status === "Connected" && (
                    <p className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <RefreshCcw className="h-3 w-3" /> Synced {c.lastSync} ·{" "}
                      {c.eventsThisMonth} events this month
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* joiner match monitor */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 pb-4">
            <h2 className="font-bold text-slate-900">Joiner-match monitor</h2>
            <p className="mt-1 text-sm text-slate-500">
              Every new joiner from your HRMS is matched against candidates
              referred to you in the last 12 months. Matches release milestones
              automatically; mismatches raise a review.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-y border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3 font-semibold">Joiner</th>
                  <th className="px-6 py-3 font-semibold">Source</th>
                  <th className="px-6 py-3 font-semibold">Match</th>
                  <th className="px-6 py-3 font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {joinerEvents.map((e) => {
                  const s = eventStyles[e.kind];
                  return (
                    <tr key={e.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{e.name}</p>
                        <p className="text-xs text-slate-500">{e.date}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{e.source}</td>
                      <td className="max-w-xs px-6 py-4">
                        <p className="flex items-start gap-2 text-slate-600">
                          <s.icon
                            className={`mt-0.5 h-4 w-4 shrink-0 ${s.iconColor}`}
                          />
                          {e.match}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${s.chip}`}
                        >
                          {e.outcome}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
