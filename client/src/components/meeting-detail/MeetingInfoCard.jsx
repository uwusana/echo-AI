import { useState } from "react";
import {
  Check,
  ChevronDown,
  Clock,
  Flag,
  HardDrive,
  Languages,
  Timer,
  UserRound,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { AvatarStack } from "@/components/data-table/cells";
import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { updateMeeting } from "@/services/meetingService";

const ROWS = [
  { key: "duration", label: "Duration", icon: Clock },
  { key: "language", label: "Language", icon: Languages },
  { key: "recordingSize", label: "Recording Size", icon: HardDrive },
  { key: "processingTime", label: "Processing Time", icon: Timer },
  { key: "createdBy", label: "Created By", icon: UserRound },
];

const PRIORITY_OPTIONS = [
  { value: "", label: "Not set" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const PRIORITY_TRIGGER_STYLES = {
  "": "bg-zinc-500/10 text-zinc-400 ring-zinc-500/15",
  low: "bg-zinc-500/10 text-zinc-300 ring-zinc-500/20",
  medium: "bg-amber-500/10 text-amber-300 ring-amber-500/15",
  high: "bg-rose-500/10 text-rose-300 ring-rose-500/15",
  critical: "bg-rose-500/15 text-rose-200 ring-rose-500/25",
};

function getPriorityLabel(value) {
  return (
    PRIORITY_OPTIONS.find((option) => option.value === value)?.label ??
    "Not set"
  );
}

export default function MeetingInfoCard({ meeting }) {
  const [priority, setPriority] = useState(meeting.priority ?? "");
  const [saving, setSaving] = useState(false);

  const handlePriorityChange = async (nextValue) => {
    if (saving || nextValue === priority) return;

    const previous = priority;
    setPriority(nextValue);

    try {
      setSaving(true);
      await updateMeeting(meeting.id, {
        priority: nextValue === "" ? null : nextValue,
      });
      window.dispatchEvent(new CustomEvent("echoai:meetings-updated"));
      toast.success("Priority updated", {
        description: `Set to ${getPriorityLabel(nextValue)}.`,
      });
    } catch (error) {
      setPriority(previous);
      toast.error("Failed to update priority", {
        description: error.message || "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DetailSectionCard title="Meeting Information">
      <dl className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <dt className="flex items-center gap-2 text-xs text-[#71717A]">
            <Users className="size-3.5" />
            Participants
          </dt>
          <dd className="text-right">
            <AvatarStack people={meeting.participants} max={3} />
          </dd>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#27272A]/40 pt-4">
          <dt className="flex items-center gap-2 text-xs text-[#71717A]">
            <Flag className="size-3.5" />
            Priority
          </dt>
          <dd>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={saving}
                  aria-label="Meeting priority"
                  className={cn(
                    "h-7 gap-1.5 rounded-full border-0 px-2.5 text-xs font-medium tracking-tight shadow-none",
                    "ring-1 ring-inset transition-all duration-200",
                    "hover:brightness-110 focus-visible:ring-[#3B82F6]/40",
                    PRIORITY_TRIGGER_STYLES[priority] ??
                      PRIORITY_TRIGGER_STYLES[""]
                  )}
                >
                  {getPriorityLabel(priority)}
                  <ChevronDown className="size-3.5 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="min-w-40 rounded-xl border border-[#27272A] bg-[#18181B] p-1 text-[#FAFAFA] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)]"
              >
                {PRIORITY_OPTIONS.map((option) => {
                  const selected = priority === option.value;

                  return (
                    <DropdownMenuItem
                      key={option.value || "not-set"}
                      disabled={saving}
                      onSelect={() => handlePriorityChange(option.value)}
                      className={cn(
                        "cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium text-[#A1A1AA]",
                        "focus:bg-[#27272A] focus:text-[#FAFAFA]",
                        selected && "bg-[#1F1F23] text-[#FAFAFA]"
                      )}
                    >
                      <span className="flex-1">{option.label}</span>
                      {selected ? (
                        <Check className="size-3.5 text-[#3B82F6]" />
                      ) : null}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </dd>
        </div>

        {ROWS.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 border-t border-[#27272A]/40 pt-4"
          >
            <dt className="flex items-center gap-2 text-xs text-[#71717A]">
              <Icon className="size-3.5" />
              {label}
            </dt>
            <dd className="text-[13px] font-medium tracking-tight text-[#FAFAFA]">
              {meeting[key]}
            </dd>
          </div>
        ))}
      </dl>
    </DetailSectionCard>
  );
}
