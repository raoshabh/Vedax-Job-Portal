import Link from "next/link";
import { Logo } from "@/components/logo";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Browse jobs", href: "/jobs" },
      { label: "For companies", href: "/pricing" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Payout policy", href: "#" },
      { label: "Trust & safety", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
              The referral marketplace. Companies post roles with cash
              bounties, you refer people you trust, and you get paid when they
              get hired.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-slate-900">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-400">
          © 2026 Refora Technologies Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
