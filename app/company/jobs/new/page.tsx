"use client";

import { useState } from "react";
import { Rocket, Wallet } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { PLATFORM_FEE, referrerShare } from "@/lib/data";
import { inr } from "@/lib/utils";

export default function NewJobPage() {
  const [bounty, setBounty] = useState(100000);

  return (
    <>
      <Topbar title="Post a role" subtitle="Live to 40,000+ referrers in minutes" />

      <main className="grid gap-6 p-4 sm:p-6 lg:grid-cols-3 lg:p-8">
        <form className="space-y-6 lg:col-span-2" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Role details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Job title
                </label>
                <input
                  placeholder="e.g. Senior Backend Engineer"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Location
                </label>
                <input
                  placeholder="Bengaluru"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Work mode
                </label>
                <select className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Hybrid</option>
                  <option>Remote</option>
                  <option>Onsite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Salary range (LPA)
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    placeholder="35"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                  <span className="text-slate-400">—</span>
                  <input
                    placeholder="55"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Key skills (comma separated)
                </label>
                <input
                  placeholder="Go, PostgreSQL, Kafka"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Role description
                </label>
                <textarea
                  rows={5}
                  placeholder="What will this person own? What does success look like in 12 months?"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Referral bounty</h2>
            <p className="mt-1 text-xs text-slate-500">
              Higher bounties attract more — and better — referrals. The full
              amount is held in escrow when the role goes live.
            </p>
            <div className="mt-6">
              <input
                type="range"
                min={40000}
                max={300000}
                step={5000}
                value={bounty}
                onChange={(e) => setBounty(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>₹40,000</span>
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {inr(bounty)}
                </span>
                <span>₹3,00,000</span>
              </div>
            </div>
            <dl className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Referrer receives (80%)</dt>
                <dd className="font-semibold text-slate-900">
                  {inr(referrerShare(bounty))}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">
                  Refora fee ({PLATFORM_FEE * 100}%)
                </dt>
                <dd className="font-semibold text-slate-900">
                  {inr(bounty - referrerShare(bounty))}
                </dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <dt className="font-semibold text-slate-700">
                  Escrow deposit on publish
                </dt>
                <dd className="font-bold text-indigo-600">{inr(bounty)}</dd>
              </div>
            </dl>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              <Rocket className="h-4 w-4" /> Publish role
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Save draft
            </button>
          </div>
        </form>

        <aside>
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-bold text-slate-900">
                <Wallet className="h-4 w-4 text-indigo-600" /> Escrow balance
              </h3>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {inr(655000)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {inr(bounty)} will be reserved when this role publishes.
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-5 text-sm leading-6 text-indigo-900">
              <p className="font-semibold">Tips for more referrals</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-5">
                <li>Bounties ≥ ₹75,000 get 3× referrals in week one</li>
                <li>Name the team and the mission, not just the stack</li>
                <li>Respond to referrals within 48h — referrers notice</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
