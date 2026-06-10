import { ArrowDownLeft, ArrowUpRight, Download, Plus, Wallet } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { StatCard } from "@/components/app/stat-card";
import { escrowTransactions } from "@/lib/company-data";
import { inr } from "@/lib/utils";

export default function BillingPage() {
  return (
    <>
      <Topbar
        title="Billing & escrow"
        subtitle="Bounty funding, releases and invoices"
        action={
          <button className="hidden items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 sm:flex">
            <Plus className="h-4 w-4" /> Add funds
          </button>
        }
      />

      <main className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Escrow balance"
            value={inr(655000)}
            hint="Available for new bounties"
            icon={Wallet}
            accent="indigo"
          />
          <StatCard
            label="Reserved for live roles"
            value={inr(280000)}
            hint="2 open roles × funded bounties"
            icon={ArrowUpRight}
            accent="amber"
          />
          <StatCard
            label="Released this quarter"
            value={inr(120000)}
            hint="3 hires · incl. platform fees"
            icon={ArrowDownLeft}
            accent="emerald"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="font-bold text-slate-900">Escrow activity</h2>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-y border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3 font-semibold">Transaction</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {escrowTransactions.map((t) => (
                  <tr key={t.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-lg p-1.5 ${
                            t.type === "credit"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-500"
                          }`}
                        >
                          {t.type === "credit" ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </span>
                        <span className="font-medium text-slate-900">
                          {t.label}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                      {t.date}
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-right font-semibold ${
                        t.amount > 0 ? "text-emerald-600" : "text-slate-900"
                      }`}
                    >
                      {t.amount > 0 ? "+" : "−"}
                      {inr(Math.abs(t.amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Plan</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-5">
            <div>
              <p className="font-bold text-slate-900">
                Growth — ₹49,999/month
              </p>
              <p className="mt-1 text-sm text-slate-600">
                12% bounty fee · priority distribution · ATS integrations ·
                renews 01 Jul 2026
              </p>
            </div>
            <button className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Manage plan
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
