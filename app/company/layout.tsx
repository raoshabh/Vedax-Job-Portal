import { Sidebar, type NavItem } from "@/components/app/sidebar";
import { demoCompanyUser } from "@/lib/data";

const nav: NavItem[] = [
  { href: "/company", label: "Overview", icon: "overview" },
  { href: "/company/jobs", label: "Jobs & bounties", icon: "jobs" },
  { href: "/company/candidates", label: "Candidates", icon: "referrals" },
  { href: "/company/analytics", label: "Analytics", icon: "analytics" },
  { href: "/company/billing", label: "Billing & escrow", icon: "billing" },
  { href: "/company/integrations", label: "Integrations", icon: "integrations" },
  { href: "/company/settings", label: "Settings", icon: "settings" },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        items={nav}
        user={{
          name: demoCompanyUser.name,
          title: demoCompanyUser.title,
          initials: demoCompanyUser.initials,
        }}
        badgeLabel="Company"
      />
      <div className="lg:pl-64">{children}</div>
    </div>
  );
}
