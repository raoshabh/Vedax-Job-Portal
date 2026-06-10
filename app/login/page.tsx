import Link from "next/link";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-12 lg:flex">
        <Logo />
        <div>
          <blockquote className="text-2xl font-semibold leading-9 text-white">
            “Refora turned the intros I was already making into a second
            income. ₹1.4L last year for helping friends find better jobs.”
          </blockquote>
          <p className="mt-6 text-sm font-medium text-slate-400">
            Arjun Mehta — Engineering Manager, Swiggy
          </p>
        </div>
        <p className="text-xs text-slate-500">
          © 2026 Refora Technologies Pvt. Ltd.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-slate-900 lg:mt-0">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            New to Refora?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create a free account
            </Link>
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Log in
            </Link>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <hr className="flex-1 border-slate-200" />
            <span className="text-xs text-slate-400">or continue with</span>
            <hr className="flex-1 border-slate-200" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Google
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              LinkedIn
            </button>
          </div>

          <p className="mt-8 rounded-xl bg-indigo-50 p-4 text-xs leading-5 text-indigo-900">
            <strong>Demo shortcuts:</strong> Log in lands on the referrer
            dashboard. Also try{" "}
            <Link href="/company" className="font-semibold underline">
              /company
            </Link>{" "}
            (hiring team),{" "}
            <Link href="/candidate" className="font-semibold underline">
              /candidate
            </Link>{" "}
            (candidate tracker) and{" "}
            <Link href="/admin" className="font-semibold underline">
              /admin
            </Link>{" "}
            (platform ops).
          </p>
        </div>
      </div>
    </div>
  );
}
