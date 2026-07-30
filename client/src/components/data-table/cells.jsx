import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const STATUS_STYLES = {
  Complete: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/15",
  Processing: "bg-sky-500/10 text-sky-400 ring-sky-500/15",
  Failed: "bg-amber-500/10 text-amber-400 ring-amber-500/15",
  Pending: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/15",
};

const PRIORITY_STYLES = {
  High: "bg-rose-500/10 text-rose-300 ring-rose-500/15",
  Medium: "bg-amber-500/10 text-amber-300 ring-amber-500/15",
  Low: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/15",
};

const SCORE_TONES = {
  high: {
    dot: "bg-emerald-400",
    chip: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/15",
  },
  good: {
    dot: "bg-[#3B82F6]",
    chip: "bg-[#3B82F6]/10 text-[#60A5FA] ring-[#3B82F6]/15",
  },
  ok: {
    dot: "bg-amber-400",
    chip: "bg-amber-500/10 text-amber-400 ring-amber-500/15",
  },
  low: {
    dot: "bg-rose-400",
    chip: "bg-rose-500/10 text-rose-300 ring-rose-500/15",
  },
};

function getScoreTone(score) {
  if (score >= 90) return SCORE_TONES.high;
  if (score >= 75) return SCORE_TONES.good;
  if (score >= 60) return SCORE_TONES.ok;
  return SCORE_TONES.low;
}

export function StatusPill({ status, className }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium tracking-tight ring-1 ring-inset",
        STATUS_STYLES[status] ?? STATUS_STYLES.Pending,
        className
      )}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority, className }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium tracking-tight ring-1 ring-inset",
        PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Low,
        className
      )}
    >
      {priority}
    </span>
  );
}

export function AvatarStack({ people = [], max = 3, className }) {
  const visible = people.slice(0, max);
  const remaining = people.length - visible.length;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <AvatarGroup className="-space-x-2">
        {visible.map((person) => (
          <Avatar
            key={person}
            size="sm"
            className="size-7 border-2 border-[#18181B] ring-0 after:hidden"
            title={person}
          >
            <AvatarFallback className="bg-[#27272A] text-[10px] font-medium text-[#FAFAFA]">
              {getInitials(person)}
            </AvatarFallback>
          </Avatar>
        ))}
        {remaining > 0 && (
          <AvatarGroupCount className="size-7 border-2 border-[#18181B] bg-[#1F1F23] text-[10px] font-medium text-[#A1A1AA] ring-0">
            +{remaining}
          </AvatarGroupCount>
        )}
      </AvatarGroup>
    </div>
  );
}

export function AiScore({ score, className }) {
  const tone = getScoreTone(score);

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium tabular-nums ring-1 ring-inset",
        tone.chip,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", tone.dot)} />
      {score}
    </span>
  );
}

export function PrimaryCell({ title, subtitle, className }) {
  return (
    <div className={cn("min-w-0 max-w-[280px]", className)}>
      <p className="truncate text-[13px] font-medium tracking-tight text-[#FAFAFA]">
        {title}
      </p>
      {subtitle ? (
        <p className="mt-1 truncate text-xs text-[#71717A]">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function TextCell({ children, muted = true, className }) {
  return (
    <span
      className={cn(
        "text-[13px] tracking-tight",
        muted ? "text-[#A1A1AA]" : "font-medium text-[#FAFAFA]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function TableActionButton({
  children,
  icon: Icon,
  className,
  ...props
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-8 gap-1.5 rounded-lg border-[#27272A] bg-transparent px-3 text-xs font-medium text-[#A1A1AA]",
        "transition-all duration-200",
        "hover:border-[#3F3F46] hover:bg-[#1C1C1F] hover:text-[#FAFAFA]",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="size-3.5" /> : null}
      {children}
    </Button>
  );
}
