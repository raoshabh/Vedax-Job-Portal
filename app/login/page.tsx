"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setBusy(false);
    if (res?.error) {
      setError("Wrong email or password. Try the demo accounts below.");
    } else {
      const dest = email.startsWith("divya")
        ? "/company"
        : email.startsWith("admin")
          ? "/admin"
          : "/dashboard";
      router.push(dest);
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen">
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

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            {error && (
              <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className="mt-8 rounded-xl bg-indigo-50 p-4 text-xs leading-5 text-indigo-900">
            <strong>Demo accounts</strong> (password <code>refora123</code>):{" "}
            <code>arjun@refora.dev</code> → referrer dashboard,{" "}
            <code>divya@zentrolabs.com</code> → company portal,{" "}
            <code>admin@refora.dev</code> → platform admin.
          </p>
        </div>
      </div>
    </div>
  );
}
