import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-sm">
        R
      </span>
      <span className="text-lg font-bold tracking-tight text-slate-900">
        Refora
      </span>
    </Link>
  );
}
