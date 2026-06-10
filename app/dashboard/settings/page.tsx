import { Topbar } from "@/components/app/topbar";
import { demoReferrer } from "@/lib/data";

const notifications = [
  {
    label: "Referral status changes",
    desc: "When your candidate moves stages or gets an offer",
    on: true,
  },
  {
    label: "Payout confirmations",
    desc: "When money is released to your account",
    on: true,
  },
  {
    label: "New matching bounties",
    desc: "Roles matching your network's skills, weekly digest",
    on: true,
  },
  {
    label: "Product updates",
    desc: "New features and platform announcements",
    on: false,
  },
];

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Profile, payouts and notifications" />

      <main className="max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Profile */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Profile</h2>
          <div className="mt-5 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
              {demoReferrer.initials}
            </span>
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Change photo
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                defaultValue={demoReferrer.name}
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                defaultValue={demoReferrer.email}
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Headline
              </label>
              <input
                defaultValue={demoReferrer.title}
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Shown to hiring teams alongside your referrals — credibility
                matters.
              </p>
            </div>
          </div>
        </section>

        {/* Payout details */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Payout & tax details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                UPI ID
              </label>
              <input
                defaultValue="arjun@okhdfcbank"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                PAN (for TDS)
              </label>
              <input
                defaultValue="ABCPM1234K"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Notifications</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {notifications.map((n) => (
              <label
                key={n.label}
                className="flex cursor-pointer items-center justify-between gap-4 py-4"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {n.label}
                  </span>
                  <span className="block text-xs text-slate-500">{n.desc}</span>
                </span>
                <input
                  type="checkbox"
                  defaultChecked={n.on}
                  className="h-5 w-9 accent-indigo-600"
                />
              </label>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancel
          </button>
          <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
            Save changes
          </button>
        </div>
      </main>
    </>
  );
}
