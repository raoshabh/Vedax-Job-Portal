import {
  AlertTriangle,
  Building2,
  HandCoins,
  TrendingUp,
  Users,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { StatCard } from "@/components/app/stat-card";
import { inr } from "@/lib/utils";

const pendingPayouts = [
  {
    id: "pp-1",
    referrer: "Arjun Mehta",
    candidate: "Ananya Das → Nexa Commerce",
    milestone: "Hire milestone",
    amount: 24000,
    due: "Today",
  },
  {
    id: "pp-2",
    referrer: "Leela Nair",
    candidate: "Ritika Saxena → Zentro Labs",
    milestone: "Hire milestone",
    amount: 40000,
    due: "Tomorrow",
  },
  {
    id: "pp-3",
    referrer: "Sandeep Rao",
    candidate: "Dev Patel → Zentro Labs",
    milestone: "Awaiting joining confirmation",
    amount: 36000,
    due: "12 Jun",
  },
];

const flagged = [
  {
    id: "f-1",
    referrer: "rohan.k**@gmail.com",
    reason: "11 referrals in 30 min, identical vouch notes",
    severity: "High",
  },
  {
    id: "f-2",
    referrer: "priya.j**@yahoo.com",
    reason: "Candidate reported they never consented",
    severity: "High",
  },
  {
    id: "f-3",
    referrer: "amit.s**@outlook.com",
    reason: "Self-referral suspected (same device fingerprint)",
    severity: "Medium",
  },
];

const topReferrers = [
  { name: "Arjun Mehta", hires: 7, earned: 312000, score: 92 },
  { name: "Sandeep Rao", hires: 5, earned: 248000, score: 88 },
  { name: "Mohit Verma", hires: 4, earned: 176000, score: 81 },
  { name: "Leela Nair", hires: 3, earned: 144000, score: 76 },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
            Platform admin
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Platform operations
        </h1>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="GMV this month"
            value={inr(2860000)}
            hint="Bounties released · +18% MoM"
            icon={TrendingUp}
            accent="indigo"
          />
          <StatCard
            label="Platform revenue"
            value={inr(572000)}
            hint="Fees + subscriptions"
            icon={HandCoins}
            accent="emerald"
          />
          <StatCard
            label="Active referrers"
            value="8,412"
            hint="Made ≥1 referral in 30 days"
            icon={Users}
            accent="violet"
          />
          <StatCard
            label="Paying companies"
            value="143"
            hint="12 new this month"
            icon={Building2}
            accent="amber"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* Pending payouts */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <h2 className="p-6 pb-4 font-bold text-slate-900">
              Payouts awaiting release
            </h2>
            <div className="divide-y divide-slate-100">
              {pendingPayouts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {p.candidate}
                    </p>
                    <p className="text-xs text-slate-500">
                      {p.milestone} · referrer {p.referrer} · due {p.due}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-semibold text-slate-900">
                      {inr(p.amount)}
                    </span>
                    <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500">
                      Release
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust & safety */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <h2 className="flex items-center gap-2 p-6 pb-4 font-bold text-slate-900">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Trust & safety queue
            </h2>
            <div className="divide-y divide-slate-100">
              {flagged.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {f.referrer}
                    </p>
                    <p className="text-xs text-slate-500">{f.reason}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        f.severity === "High"
                          ? "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"
                          : "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200"
                      }`}
                    >
                      {f.severity}
                    </span>
                    <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top referrers */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <h2 className="p-6 pb-4 font-bold text-slate-900">
            Top referrers (all time)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-y border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3 font-semibold">Referrer</th>
                  <th className="px-6 py-3 font-semibold">Successful hires</th>
                  <th className="px-6 py-3 font-semibold">Trust score</th>
                  <th className="px-6 py-3 text-right font-semibold">
                    Total earned
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topReferrers.map((r, i) => (
                  <tr key={r.name} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <span className="mr-3 text-xs font-bold text-slate-400">
                        #{i + 1}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {r.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{r.hires}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-emerald-600">
                        {r.score}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                      {inr(r.earned)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
