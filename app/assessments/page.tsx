import { BadgeCheck, RefreshCcw, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { AssessmentExperience } from "@/components/assessment-experience";

const promises = [
  {
    icon: BadgeCheck,
    title: "Prove it once",
    body: "One proctored test per field issues a scored, percentile-ranked Skill Passport — reused across every referral and application on Refora.",
  },
  {
    icon: ShieldCheck,
    title: "Companies trust the pipeline",
    body: "Referrals only reach a hiring team once the candidate clears the role's cutoff. Vouched and verified — that's the whole point.",
  },
  {
    icon: RefreshCcw,
    title: "Fair retakes",
    body: "Didn't clear the bar? Retake after 14 days with a rotated question bank. Passports stay valid for 9–12 months.",
  },
];

export default function AssessmentsPage() {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Prove it once.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Use it everywhere.
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            The Skill Passport is Refora&apos;s prescreening layer: a short,
            proctored, field-specific assessment that turns &ldquo;trust
            me&rdquo; into a verified score.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {promises.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
            >
              <p.icon className="h-6 w-6 text-indigo-600" />
              <h2 className="mt-3 font-bold text-slate-900">{p.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-extrabold tracking-tight text-slate-900">
          Pick your field
        </h2>
        <p className="mt-2 text-slate-600">
          Try a short sample of any assessment right now — no account needed.
        </p>
        <div className="mt-8">
          <AssessmentExperience />
        </div>
      </section>

      <Footer />
    </div>
  );
}
