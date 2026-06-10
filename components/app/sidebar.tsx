"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Settings,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { Logo } from "@/components/logo";

// Icons are resolved here (client side) because React components can't be
// passed across the server→client boundary from the layouts.
const icons = {
  overview: LayoutDashboard,
  jobs: Briefcase,
  referrals: Users,
  refer: UserPlus,
  earnings: HandCoins,
  settings: Settings,
  billing: Wallet,
} as const;

export interface NavItem {
  href: string;
  label: string;
  icon: keyof typeof icons;
}

interface SidebarProps {
  items: NavItem[];
  user: { name: string; title: string; initials: string };
  badgeLabel: string; // e.g. "Referrer" | "Company" | "Candidate"
}

export function Sidebar({ items, user, badgeLabel }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
        <Logo />
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
          {badgeLabel}
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const active =
            pathname === item.href ||
            (item.href !== items[0].href && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            {user.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500">{user.title}</p>
          </div>
          <Link href="/" aria-label="Log out">
            <LogOut className="h-4 w-4 text-slate-400 transition hover:text-slate-700" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
