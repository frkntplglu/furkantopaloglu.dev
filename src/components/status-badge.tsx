import { cn } from "@/lib/utils";
import type { ReadingStatus } from "@/data/reading";

const styles: Record<ReadingStatus, string> = {
  DONE: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "IN PROGRESS": "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "WANT TO READ": "border-zinc-500/30 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
};

export function StatusBadge({ status }: { status: ReadingStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[11px] font-medium tracking-wide whitespace-nowrap", styles[status])}>
      {status}
    </span>
  );
}
