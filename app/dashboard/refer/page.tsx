"use client";

import { useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { companyById, jobs, referrerShare } from "@/lib/data";
import { assessmentById, findPassport } from "@/lib/assessments";
import { inr } from "@/lib/utils";

type Gate =
  | { kind: "unchecked" }
  | { kind: "eligible"; name: string; score: number; percentile: number }
  | { kind: "below-cutoff"; name: string; score: number }
  | { kind: "field-mismatch"; name: string; heldField: string }
  | { kind: "expired"; name: string }
  | { kind: "missing" };

export default function ReferPage() {
  const [jobId, setJobId] = useState(jobs[0].id);
  const [email, setEmail] = useState("");
  const [gate, setGate] = useState<Gate>({ kind: "unchecked" });
  const [submitted, setSubmitted] = useState(false);
  const job = jobs.find((j) => j.id === jobId)!;
  const company = companyById(job.companyId)!;
  const payout = referrerShare(job.bounty);
  const assessment = assessmentById(job.assessmentField);

  const checkPassport = (forJobId = jobId, forEmail = email) => {
    const j = jobs.find((x) => x.id === forJobId)!;
    if (!forEmail.trim()) {
      setGate({ kind: "unchecked" });
      return;
    }
    const p = findPassport(forEmail);
    if (!p) setGate({ kind: "missing" });
    else if (p.status === "Expired")
      setGate({ kind: "expired", name: p.candidateName });
    else if (p.fieldId !== j.assessmentField)
      setGate({
        kind: "field-mismatch",
        name: p.candidateName,
        heldField: assessmentById(p.fieldId).field,
      });
    else if (p.score < j.passportCutoff)
      setGate({ kind: "below-cutoff", name: p.candidateName, score: p.score });
    else
      setGate({
        kind: "eligible",
        name: p.candidateName,
        score: p.score,
        percentile: p.percentile,
      });
  };

  const gateReady = gate.kind === "eligible";

  if (submitted) {
    return (
      <>
        <Topbar title="New referral" />
        <main className="flex flex-col items-center px-4 py-24 text-center">
          <span className="rounded-full bg-emerald-50 p-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </span>
          <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
            Referral submitted!
          </h2>
          <p className="mt-3 max-w-md text-slate-600">
            We&apos;ve emailed your candidate for consent. Once they accept,
            their profile goes straight to {company.name}&apos;s hiring team
            and you can track every stage from your dashboard.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="/dashboard/referrals"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Track my referrals
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Refer someone else
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Topbar
        title="New referral"
        subtitle="Two minutes from intro to income"
      />

      <main className="grid gap-6 p-4 sm:p-6 lg:grid-cols-3 lg:p-8">
        {/* Form */}
        <form
          className="space-y-6 lg:col-span-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">1 · Pick the role</h2>
            <select
              value={jobId}
              onChange={(e) => {
                setJobId(e.target.value);
                checkPassport(e.target.value);
              }}
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} — {companyById(j.companyId)!.name} (earn{" "}
                  {inr(referrerShare(j.bounty))})
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">2 · Who are you referring?</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="candidate-name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="candidate-name"
                  required
                  placeholder="e.g. Priya Sharma"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label
                  htmlFor="candidate-email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="candidate-email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setGate({ kind: "unchecked" });
                  }}
                  onBlur={() => checkPassport()}
                  placeholder="priya@example.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="candidate-role"
                  className="block text-sm font-medium text-slate-700"
                >
                  Current role & company
                </label>
                <input
                  id="candidate-role"
                  placeholder="e.g. Senior Frontend Engineer @ Flipkart"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="candidate-link"
                  className="block text-sm font-medium text-slate-700"
                >
                  LinkedIn or resume URL{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="candidate-link"
                  placeholder="https://linkedin.com/in/…"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* skill passport gate */}
            <div
              aria-live="polite"
              className={`mt-5 rounded-xl border p-4 text-sm ${
                gate.kind === "eligible"
                  ? "border-emerald-200 bg-emerald-50"
                  : gate.kind === "unchecked"
                    ? "border-slate-200 bg-slate-50"
                    : "border-amber-200 bg-amber-50"
              }`}
            >
              <p className="flex items-center gap-2 font-semibold text-slate-900">
                {gate.kind === "eligible" ? (
                  <BadgeCheck className="h-4 w-4 text-emerald-600" />
                ) : (
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                )}
                Skill passport check — {assessment.field} ≥ {job.passportCutoff}
              </p>
              <p className="mt-1.5 leading-6 text-slate-600">
                {gate.kind === "unchecked" &&
                  "Enter your candidate's email and we'll look up their passport. This role only accepts referrals that clear the cutoff."}
                {gate.kind === "eligible" &&
                  `${gate.name} holds a valid ${assessment.field} passport — ${gate.score}/100 (${gate.percentile}th percentile). Clears this role's cutoff; your referral goes straight to ${company.name}.`}
                {gate.kind === "below-cutoff" &&
                  `${gate.name} scored ${gate.score}/100 — below this role's ${job.passportCutoff} cutoff. We'll invite them to retake the assessment; your referral submits automatically once they clear it.`}
                {gate.kind === "field-mismatch" &&
                  `${gate.name} holds a ${gate.heldField} passport, but this role requires ${assessment.field}. We'll send them the ${assessment.durationMins}-minute ${assessment.field} assessment; your referral queues until they pass.`}
                {gate.kind === "expired" &&
                  `${gate.name}'s passport has expired. We'll invite them to re-certify (${assessment.durationMins} minutes); your referral queues until they clear ${job.passportCutoff}.`}
                {gate.kind === "missing" &&
                  `No passport on file for this email. Submitting will send them the ${assessment.durationMins}-minute ${assessment.field} assessment — your referral reaches ${company.name} as soon as they score ${job.passportCutoff}+.`}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">3 · Why do you vouch for them?</h2>
            <p className="mt-1 text-xs text-slate-500">
              This note goes directly to the hiring team — specific beats
              generic. It&apos;s also what protects your trust score.
            </p>
            <textarea
              required
              rows={4}
              placeholder="I worked with Priya for 3 years at Flipkart. She led the checkout perf rewrite that cut p95 latency 40%…"
              className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <label className="mt-4 flex items-start gap-2.5 text-sm text-slate-600">
              <input type="checkbox" required className="mt-1 accent-indigo-600" />
              I have told this person I&apos;m referring them, and they&apos;re
              open to hearing from {company.name}.
            </label>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            <Send className="h-4 w-4" />
            {gateReady || gate.kind === "unchecked"
              ? "Submit referral"
              : "Submit & send assessment invite"}
          </button>
        </form>

        {/* Payout summary */}
        <aside>
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white ${company.color}`}
                >
                  {company.initials}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{job.title}</p>
                  <p className="text-xs text-slate-500">{company.name}</p>
                </div>
              </div>
              <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Company bounty</dt>
                  <dd className="font-semibold text-slate-900">
                    {inr(job.bounty)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Your share (80%)</dt>
                  <dd className="font-bold text-emerald-600">{inr(payout)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">On joining</dt>
                  <dd className="text-slate-700">{inr(payout / 2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">After 90 days</dt>
                  <dd className="text-slate-700">{inr(payout / 2)}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <dt className="text-slate-500">Passport required</dt>
                  <dd className="font-medium text-slate-700">
                    {assessment.field} ≥ {job.passportCutoff}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl bg-indigo-50 p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
              <p className="text-xs leading-5 text-indigo-900">
                This bounty is funded in escrow. Your candidate must consent
                before anything is shared with {company.name}.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
