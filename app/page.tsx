import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Eye,
  HandCoins,
  Link2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JobCard } from "@/components/job-card";
import { companies, jobs, referrerShare } from "@/lib/data";
import { inr } from "@/lib/utils";

const steps = [
  {
    icon: Eye,
    title: "Browse bounty-backed roles",
    body: "Every job on Refora carries a cash bounty funded upfront by the company — from ₹40,000 to ₹1,50,000+ per hire.",
  },
  {
    icon: UserPlus,
    title: "Refer someone you trust",
    body: "Two minutes: their name, contact, and why you vouch for them. We handle the intro, scheduling, and follow-ups.",
  },
  {
    icon: HandCoins,
    title: "Get paid when they're hired",
    body: "Track every stage in real time. 50% of your payout lands when they join, 50% when they cross 90 days.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Bounties held in escrow",
    body: "Companies fund bounties before a job goes live. Your payout is never an IOU.",
  },
  {
    icon: Eye,
    title: "Full pipeline transparency",
    body: "See exactly where your candidate is — screening, interviews, offer — without chasing recruiters.",
  },
  {
    icon: Banknote,
    title: "Payouts to UPI or bank",
    body: "Withdraw to UPI or bank transfer in 24 hours. TDS handled, payout statements included.",
  },
  {
    icon: BadgeCheck,
    title: "Trust score that compounds",
    body: "Quality referrals raise your score, unlocking premium bounties and early access to new roles.",
  },
  {
    icon: Link2,
    title: "One-link referrals",
    body: "Share a personal link; if your contact applies through it, the referral is credited to you automatically.",
  },
  {
    icon: TrendingUp,
    title: "Built for repeat earners",
    body: "Top referrers on Refora treat it like a side income — averaging ₹2.4L a year from their network.",
  },
];

const testimonials = [
  {
    quote:
      "I've referred friends for years and got nothing but a thank-you. On Refora the same intro paid for my Goa trip — twice.",
    name: "Arjun Mehta",
    title: "Engineering Manager, Swiggy",
    initials: "AM",
  },
  {
    quote:
      "Referred hires stay longer and ramp faster. Refora gets us those candidates without paying 8% agency fees.",
    name: "Divya Krishnan",
    title: "Head of Talent, Zentro Labs",
    initials: "DK",
  },
  {
    quote:
      "A friend put me up for a role I'd never have found. I could see every interview stage. Joined in 3 weeks.",
    name: "Ananya Das",
    title: "Product Designer, Nexa Commerce",
    initials: "AD",
  },
];

const faqs = [
  {
    q: "When exactly do I get paid?",
    a: "Your payout is 80% of the job's bounty, released in two milestones: half when your candidate signs and joins, and the other half when they complete 90 days. Both payouts go to your UPI ID or bank account within 24 hours of release.",
  },
  {
    q: "What does Refora charge?",
    a: "Referrers pay nothing — ever. Companies fund the bounty plus our platform fee. Refora keeps 20% of each bounty to run escrow, payments, candidate coordination, and support.",
  },
  {
    q: "What if my candidate is rejected?",
    a: "Nothing is lost. You'll see the stage they were rejected at and any feedback the company shares. Your trust score is unaffected by rejections — it only ever drops for spam or fake referrals.",
  },
  {
    q: "Can I refer myself?",
    a: "No — Refora is for genuine third-party referrals. But you can apply through any job page directly, and companies still see you sooner than through a cold application.",
  },
  {
    q: "What happens if the hire leaves before 90 days?",
    a: "You keep the first milestone (the hire payout). The second milestone returns to the company's escrow. This keeps incentives honest for everyone.",
  },
  {
    q: "Is my candidate's data safe?",
    a: "Candidates must consent before a referral is submitted to a company. Their profile is visible only to that company's hiring team, and they can withdraw at any time.",
  },
];

export default function LandingPage() {
  const featured = jobs.slice(0, 3);

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/80 via-white to-white" />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:pt-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200">
              <Sparkles className="h-3.5 w-3.5" />
              ₹4.2 Cr paid to referrers so far
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Your network is worth more than a{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                thank-you note
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              You already refer great people to companies — for free. On
              Refora, companies put cash bounties on their open roles. Refer
              someone you trust, track them through the pipeline, and earn up
              to {inr(referrerShare(150000))} when they get hired.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                Start referring — it&apos;s free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Browse open bounties
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                ["1,800+", "successful hires"],
                ["₹68,000", "average payout"],
                ["21 days", "median time to offer"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating payout card mock */}
          <div className="mt-14 hidden flex-1 lg:mt-0 lg:block">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-indigo-200/60 to-violet-200/60 blur-2xl" />
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                <p className="text-sm font-medium text-slate-500">
                  Referral update
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                    PS
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Priya Sharma</p>
                    <p className="text-xs text-slate-500">
                      Staff Frontend Engineer · Stackline
                    </p>
                  </div>
                  <span className="ml-auto rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
                    Offer
                  </span>
                </div>
                <div className="mt-5 rounded-xl bg-emerald-50 p-4 ring-1 ring-inset ring-emerald-100">
                  <p className="text-xs font-medium text-emerald-700">
                    Your payout when Priya joins
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-emerald-700">
                    {inr(referrerShare(125000))}
                  </p>
                  <p className="mt-1 text-xs text-emerald-600">
                    50% on joining · 50% after 90 days
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {["Submitted", "Screening", "Interviewing", "Offer"].map(
                    (s, i) => (
                      <div key={s} className="flex-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            i <= 3 ? "bg-indigo-500" : "bg-slate-200"
                          }`}
                        />
                      </div>
                    ),
                  )}
                  <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-slate-200" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  4 of 5 stages complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-500">
            Hiring teams paying bounties on Refora
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {companies.map((c) => (
              <span
                key={c.id}
                className="text-base font-bold tracking-tight text-slate-400"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Three steps from intro to income
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The referral you were going to make anyway — now with a paycheck
            attached.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <span className="absolute -top-3 left-7 rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-bold text-white">
                Step {i + 1}
              </span>
              <step.icon className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured bounties */}
      <section className="bg-slate-50/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Live bounties right now
              </h2>
              <p className="mt-2 text-slate-600">
                Know someone perfect for one of these?
              </p>
            </div>
            <Link
              href="/jobs"
              className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:flex"
            >
              View all {jobs.length} roles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Built so you never chase a recruiter again
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200"
            >
              <span className="inline-flex rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For companies band */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 sm:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Hiring? Pay for results, not retainers.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Agencies charge 8–16% of CTC whether the hire works out or not.
                On Refora you set the bounty, pay only on joining, and get
                candidates pre-vouched by people who stake their reputation on
                them.
              </p>
              <Link
                href="/pricing"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                See company pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["2.3×", "higher offer-accept rate vs job boards"],
                ["88%", "of referred hires pass 90 days"],
                ["21 days", "median time to offer"],
                ["0", "upfront cost to post a role"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10"
                >
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
            Referrers, companies, candidates — everyone wins
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <blockquote className="text-sm leading-7 text-slate-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.title}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm open:ring-1 open:ring-indigo-100"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                {faq.q}
                <span className="ml-4 text-slate-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-16 text-center sm:px-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The next intro you make could pay your rent
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Join 40,000+ referrers earning from the network they already have.
            Free forever for referrers.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
          >
            Create your free account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
