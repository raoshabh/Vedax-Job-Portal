import type { ReferralStatus } from "@/lib/data";
import { statusStyles } from "@/lib/utils";

export function StatusBadge({ status }: { status: ReferralStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
