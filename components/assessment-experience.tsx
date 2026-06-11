"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock,
  Eye,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { assessments, type Assessment } from "@/lib/assessments";

type Stage =
  | { step: "catalog" }
  | { step: "intro"; a: Assessment }
  | { step: "question"; a: Assessment; i: number; answers: number[] }
  | { step: "result"; a: Assessment; answers: number[] };

function scoreFor(a: Assessment, answers: number[]) {
  const correct = answers.filter(
    (ans, i) => ans === a.sampleQuestions[i].answer,
  ).length;
  const score = 62 + Math.round((correct / a.sampleQuestions.length) * 28);
  // same calibration as issued passports (percentile ≈ score + 6, capped)
  const percentile = Math.min(99, score + 6);
  return { correct, score, percentile };
}

export function AssessmentExperience() {
  const [stage, setStage] = useState<Stage>({ step: "catalog" });

  if (stage.step === "catalog") {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {assessments.map((a) => (
          <div
            key={a.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
          >
            <h3 className="font-bold text-slate-900">{a.field}</h3>
            <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {a.durationMins} min
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />{" "}
                {a.takenBy.toLocaleString("en-IN")} assessed
              </span>
            </div>
            <ul className="mt-4 flex-1 space-y-1.5">
              {a.sections.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              Passport valid {a.validityMonths} months
            </p>
            <button
              onClick={() => setStage({ step: "intro", a })}
              className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Try the sample test
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (stage.step === "intro") {
    const { a } = stage;
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <button
          onClick={() => setStage({ step: "catalog" })}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" /> All assessments
        </button>
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
          {a.field} — sample assessment
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The real assessment runs {a.durationMins} minutes across{" "}
          {a.sections.length} sections ({a.sections.join(", ")}). This demo
          gives you {a.sampleQuestions.length} sample questions so you can feel
          the format.
        </p>
        <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
          <p className="flex items-start gap-2.5">
            <Eye className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
            Proctored: tab switches and paste events are recorded; question
            banks rotate per attempt.
          </p>
          <p className="flex items-start gap-2.5">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
            Pass once, use everywhere: your passport applies to every{" "}
            {a.field} role on Refora for {a.validityMonths} months.
          </p>
          <p className="flex items-start gap-2.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
            Companies see your score and percentile — never your raw answers.
          </p>
        </div>
        <button
          onClick={() => setStage({ step: "question", a, i: 0, answers: [] })}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Start sample <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (stage.step === "question") {
    const { a, i, answers } = stage;
    const q = a.sampleQuestions[i];
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>
            {a.field} · question {i + 1} of {a.sampleQuestions.length}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700 ring-1 ring-inset ring-amber-200">
            <Clock className="h-3.5 w-3.5" /> 02:31
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {a.sampleQuestions.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 flex-1 rounded-full ${
                idx <= i ? "bg-indigo-500" : "bg-slate-100"
              }`}
            />
          ))}
        </div>
        <p className="mt-6 text-lg font-semibold leading-7 text-slate-900">
          {q.q}
        </p>
        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
              onClick={() => {
                const next = [...answers, idx];
                if (i + 1 < a.sampleQuestions.length)
                  setStage({ step: "question", a, i: i + 1, answers: next });
                else setStage({ step: "result", a, answers: next });
              }}
              className="block w-full rounded-xl border border-slate-200 px-5 py-3.5 text-left text-sm text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              <span className="mr-3 font-bold text-slate-400">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // result
  const { a, answers } = stage;
  const { correct, score, percentile } = scoreFor(a, answers);
  const passed = score >= 70;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div
          className={`px-8 py-7 text-white ${
            passed
              ? "bg-gradient-to-r from-indigo-600 to-violet-600"
              : "bg-slate-700"
          }`}
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
            <Sparkles className="h-4 w-4" /> Refora skill passport · sample
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-3xl font-extrabold tracking-tight">
                {a.field}
              </p>
              <p className="mt-1 text-sm text-white/80">
                {correct} of {a.sampleQuestions.length} correct ·{" "}
                {percentile}th percentile
              </p>
            </div>
            <p className="text-6xl font-extrabold tracking-tight">{score}</p>
          </div>
        </div>
        <div className="space-y-4 px-8 py-6">
          <p className="text-sm leading-6 text-slate-600">
            {passed ? (
              <>
                On the full assessment this score would issue a passport valid
                for {a.validityMonths} months — clearing the bar for many{" "}
                {a.field} bounties on Refora (each role sets its own cutoff),
                and travelling with you across every application.
              </>
            ) : (
              <>
                Below most role cutoffs — on the real platform you could retake
                after 14 days. Referrals stay queued until the passport clears
                the role&apos;s bar, so companies only ever see verified
                candidates.
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setStage({ step: "catalog" })}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Try another field
            </button>
            <Link
              href="/signup"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Create account to take the full test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
