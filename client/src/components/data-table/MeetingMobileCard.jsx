import { useNavigate } from "react-router-dom";

import {
  AiScore,
  AvatarStack,
  PriorityBadge,
  StatusPill,
} from "@/components/data-table/cells";

/**
 * Shared mobile card renderer used by both meeting DataTables.
 * Pass `variant="compact"` for dashboard Recent Meetings.
 */
export default function MeetingMobileCard({ meeting, variant = "full" }) {
  const navigate = useNavigate();
  const isCompact = variant === "compact";

  const openMeeting = () => navigate(`/meeting/${meeting.id}`);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openMeeting}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openMeeting();
        }
      }}
      className="cursor-pointer space-y-3.5 px-5 py-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="truncate text-[13px] font-medium tracking-tight text-[#FAFAFA]">
            {meeting.title}
          </p>
          <p className="text-xs text-[#71717A]">
            {isCompact
              ? meeting.date
              : `${meeting.date} · ${meeting.duration}`}
          </p>
        </div>
        <StatusPill status={meeting.summaryStatus} />
      </div>

      {isCompact && (
        <p className="text-[13px] text-[#A1A1AA]">{meeting.duration}</p>
      )}

      {!isCompact && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={meeting.priority} />
            <AiScore score={meeting.aiScore} />
          </div>
          <AvatarStack people={meeting.participants} />
        </>
      )}
    </div>
  );
}
