import { Sidebar, type NavItem } from "@/components/app/sidebar";
import { demoReferrer } from "@/lib/data";

const nav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "overview" },
  { href: "/dashboard/jobs", label: "Browse jobs", icon: "jobs" },
  { href: "/dashboard/referrals", label: "My referrals", icon: "referrals" },
  { href: "/dashboard/refer", label: "New referral", icon: "refer" },
  { href: "/dashboard/earnings", label: "Earnings", icon: "earnings" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar items={nav} user={demoReferrer} badgeLabel="Referrer" />
      <div className="lg:pl-64">{children}</div>
    </div>
  );
}
