import { Banknote, Download, HandCoins, Hourglass, Landmark } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { StatCard } from "@/components/app/stat-card";
import { BarChart } from "@/components/app/bar-chart";
import { monthlyEarnings, payouts } from "@/lib/data";
import { inr } from "@/lib/utils";

const payoutStatusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Processing: "bg-amber-50 text-amber-800 ring-amber-200",
  Scheduled: "bg-slate-100 text-slate-600 ring-slate-200",
} as const;

export default function EarningsPage() {
  const completed = payouts
    .filter((p) => p.status === "Completed")
    .reduce((s, p) => s + p.amount, 0);
  const processing = payouts
    .filter((p) => p.status === "Processing")
    .reduce((s, p) => s + p.amount, 0);
  const scheduled = payouts
    .filter((p) => p.status === "Scheduled")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <Topbar
        title="Earnings"
        subtitle="Payouts, milestones and statements"
        action={
          <button className="hidden items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex">
            <Download className="h-4 w-4" /> Statement
          </button>
        }
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Paid out"
            value={inr(completed)}
            hint="Lifetime, after TDS"
            icon={HandCoins}
            accent="emerald"
          />
          <StatCard
            label="Processing"
            value={inr(processing)}
            hint="Lands in 24 hours"
            icon={Hourglass}
            accent="amber"
          />
          <StatCard
            label="Scheduled"
            value={inr(scheduled)}
            hint="Future milestone releases"
            icon={Landmark}
            accent="indigo"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <h2 className="font-bold text-slate-900">Monthly earnings</h2>
            <div className="mt-6">
              <BarChart data={monthlyEarnings} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Payout method</h2>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 p-4">
              <span className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                <Banknote className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  UPI · arjun@okhdfcbank
                </p>
                <p className="text-xs text-slate-500">Default · verified</p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Manage payout methods
            </button>
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
              <strong className="text-slate-900">How milestones work:</strong>{" "}
              50% of your payout releases when your candidate joins, the rest
              when they complete 90 days. TDS (10%) is deducted at source and
              reflected in your Form 26AS.
            </div>
          </div>
        </div>

        {/* Payout history */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <h2 className="p-6 pb-4 font-bold text-slate-900">Payout history</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-y border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3 font-semibold">Payout</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payouts.map((p) => (
                  <tr key={p.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {p.label}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                      {p.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${payoutStatusStyles[p.status]}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-slate-900">
                      {inr(p.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
