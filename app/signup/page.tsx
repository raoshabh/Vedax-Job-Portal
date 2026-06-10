import Link from "next/link";
import { ArrowRight, Building2, HandCoins, UserSearch } from "lucide-react";
import { Logo } from "@/components/logo";

const roles = [
  {
    icon: HandCoins,
    title: "I want to refer & earn",
    body: "Browse bounty-backed roles, refer people from your network, and get paid when they're hired.",
    href: "/dashboard",
    cta: "Join as a referrer",
    highlight: true,
  },
  {
    icon: Building2,
    title: "I'm hiring for my company",
    body: "Post roles with bounties, receive pre-vouched candidates, and pay only when someone joins.",
    href: "/company",
    cta: "Join as a company",
    highlight: false,
  },
  {
    icon: UserSearch,
    title: "I was referred to a job",
    body: "Someone vouched for you. Track your application, interviews and offer in one place.",
    href: "/candidate",
    cta: "Track my referral",
    highlight: false,
  },
];

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-10 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          How will you use Refora?
        </h1>
        <p className="mt-3 text-center text-slate-600">
          Pick a side of the marketplace — you can add more later.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className={`group flex flex-col rounded-3xl border p-7 transition ${
                role.highlight
                  ? "border-indigo-600 bg-white shadow-lg ring-2 ring-indigo-600/20 hover:shadow-xl"
                  : "border-slate-200 bg-white shadow-sm hover:border-indigo-300 hover:shadow-md"
              }`}
            >
              <span
                className={`inline-flex w-fit rounded-2xl p-3 ${
                  role.highlight
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <role.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-lg font-bold text-slate-900">
                {role.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                {role.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:gap-2.5 transition-all">
                {role.cta} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
