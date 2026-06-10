import { Bell, Search } from "lucide-react";

export function Topbar({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="truncate text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search…"
              className="h-9 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            className="relative rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          {action}
        </div>
      </div>
    </div>
  );
}
