import { inr } from "@/lib/utils";

export function BarChart({
  data,
}: {
  data: { month: string; amount: number }[];
}) {
  const max = Math.max(...data.map((d) => d.amount), 1);

  return (
    <div className="flex h-48 items-end gap-3">
      {data.map((d) => {
        const height = Math.max((d.amount / max) * 100, 2);
        return (
          <div
            key={d.month}
            className="group flex flex-1 flex-col items-center gap-2"
          >
            <span className="text-xs font-medium text-slate-500 opacity-0 transition group-hover:opacity-100">
              {d.amount > 0 ? inr(d.amount) : "—"}
            </span>
            <div
              className={`w-full rounded-t-lg transition ${
                d.amount > 0
                  ? "bg-indigo-500 group-hover:bg-indigo-600"
                  : "bg-slate-100"
              }`}
              style={{ height: `${height}%` }}
            />
            <span className="text-xs font-medium text-slate-500">
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}
