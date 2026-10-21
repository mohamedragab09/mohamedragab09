
import { Status, STATUS_CONFIG } from "@/lib/types/projects";
import { cn } from "@/lib/utils";


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
