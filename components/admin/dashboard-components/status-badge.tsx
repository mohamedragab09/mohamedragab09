
import { cn } from "@/lib/utils";

export const STATUS_CONFIG = {
  progress: {
    label: "Progress",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  done: {
    label: "Done ✓",
    className: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
  waited: {
    label: "Waited",
    className: "bg-zinc-100 text-zinc-500 border-zinc-200",
    dot: "bg-zinc-400",
  },
} as const;

export type Status = keyof typeof STATUS_CONFIG;

type StatusBadgeProps = {
  status: Status;
  className?: string;
};

export function StatusBadge({
  status,
  className,
}: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        cfg.className,
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          cfg.dot
        )}
      />
      {cfg.label}
    </span>
  );
}
