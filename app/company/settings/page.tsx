import { Topbar } from "@/components/app/topbar";

const team = [
  {
    name: "Divya Krishnan",
    email: "divya@zentrolabs.com",
    role: "Admin",
    initials: "DK",
  },
  {
    name: "Rahul Nambiar",
    email: "rahul@zentrolabs.com",
    role: "Hiring manager",
    initials: "RN",
  },
  {
    name: "Shreya Gupta",
    email: "shreya@zentrolabs.com",
    role: "Recruiter",
    initials: "SG",
  },
];

export default function CompanySettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Company profile and team access" />

      <main className="max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Company profile</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Company name
              </label>
              <input
                defaultValue="Zentro Labs"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Industry
              </label>
              <input
                defaultValue="Fintech"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Tagline
              </label>
              <input
                defaultValue="Payments infrastructure for modern India"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Shown to referrers and candidates on your job pages.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Team</h2>
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Invite member
            </button>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {team.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">
                    {member.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-500">{member.email}</p>
                  </div>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
            Save changes
          </button>
        </div>
      </main>
    </>
  );
}
