import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const plans = [
  {
    name: "Pay per hire",
    price: "20%",
    unit: "of each bounty",
    blurb:
      "For teams making occasional hires. Post roles free, fund bounties in escrow, pay our fee only when someone joins.",
    cta: "Post a role free",
    highlight: false,
    features: [
      "Unlimited job posts",
      "Bounty escrow & milestone payouts",
      "Referrer trust-score filtering",
      "Candidate pipeline dashboard",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "₹49,999",
    unit: "/month + 12% per bounty",
    blurb:
      "For teams hiring 5+ roles a quarter. Lower take rate, branded company page, and priority distribution to top referrers.",
    cta: "Start 14-day trial",
    highlight: true,
    features: [
      "Everything in Pay per hire",
      "Reduced 12% bounty fee",
      "Branded company careers page",
      "Priority placement to top referrers",
      "ATS integrations (Greenhouse, Lever)",
      "Dedicated success manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "annual contract",
    blurb:
      "For 200+ employee organisations running referral programs across business units, with compliance and SSO needs.",
    cta: "Talk to sales",
    highlight: false,
    features: [
      "Everything in Growth",
      "Custom bounty fee structure",
      "Internal employee-referral mode",
      "SSO / SAML & audit logs",
      "Custom payout & TDS workflows",
      "SLA-backed support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Pricing that only wins when you hire
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Referrers always use Refora free. Companies choose how they pay —
            no retainers, no fee until a candidate actually joins.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                plan.highlight
                  ? "border-indigo-600 bg-slate-900 shadow-2xl"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white">
                  Most popular
                </span>
              )}
              <h2
                className={`text-lg font-bold ${
                  plan.highlight ? "text-white" : "text-slate-900"
                }`}
              >
                {plan.name}
              </h2>
              <p className="mt-3 flex items-baseline gap-2">
                <span
                  className={`text-4xl font-extrabold tracking-tight ${
                    plan.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlight ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {plan.unit}
                </span>
              </p>
              <p
                className={`mt-4 text-sm leading-6 ${
                  plan.highlight ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {plan.blurb}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlight ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlight ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plan.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="font-bold text-slate-900">
            How bounty economics work
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Say you post a Senior Engineer role with a ₹1,00,000 bounty. The
            full amount is held in Refora escrow when the role goes live. When
            a referred candidate joins, the referrer receives ₹40,000 (50% of
            their 80% share), and the remaining ₹40,000 after the candidate
            completes 90 days. Refora keeps ₹20,000. If the hire leaves within
            90 days, the unreleased half returns to your escrow — usable on
            your next hire.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
