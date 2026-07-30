import { cn } from "@/lib/utils";

function getTone(value) {
  if (value >= 90) return "bg-emerald-400";
  if (value >= 75) return "bg-[#3B82F6]";
  if (value >= 60) return "bg-amber-400";
  return "bg-rose-400";
}

export default function MetricBar({
  label,
  value,
  suffix = "",
  displayValue,
  className,
}) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[#A1A1AA]">{label}</p>
        <p className="text-xs font-medium tabular-nums tracking-tight text-[#FAFAFA]">
          {displayValue ?? `${clamped}${suffix}`}
        </p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#27272A]">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            getTone(clamped)
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
