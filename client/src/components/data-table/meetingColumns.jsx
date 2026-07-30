import {
  AiScore,
  AvatarStack,
  PrimaryCell,
  PriorityBadge,
  StatusPill,
  TextCell,
} from "@/components/data-table/cells";

/** Full column set for All Meetings */
export const meetingColumns = [
  {
    id: "title",
    header: "Meeting",
    cell: (row) => <PrimaryCell title={row.title} />,
    className: "min-w-[220px]",
  },
  {
    id: "date",
    header: "Date",
    hideBelow: "lg",
    cell: (row) => <TextCell>{row.date}</TextCell>,
  },
  {
    id: "duration",
    header: "Duration",
    hideBelow: "md",
    cell: (row) => <TextCell>{row.duration}</TextCell>,
  },
  {
    id: "participants",
    header: "Participants",
    hideBelow: "md",
    cell: (row) => <AvatarStack people={row.participants} />,
  },
  {
    id: "priority",
    header: "Priority",
    hideBelow: "sm",
    cell: (row) => <PriorityBadge priority={row.priority} />,
  },
  {
    id: "aiScore",
    header: "AI Score",
    hideBelow: "xl",
    cell: (row) => <AiScore score={row.aiScore} />,
  },
  {
    id: "summaryStatus",
    header: "Status",
    cell: (row) => <StatusPill status={row.summaryStatus} />,
  },
];

/**
 * Dashboard Recent Meetings uses the same cell system,
 * with a focused subset of columns for the denser layout.
 */
export const recentMeetingColumns = [
  {
    id: "title",
    header: "Meeting",
    cell: (row) => (
      <PrimaryCell title={row.title} subtitle={row.date} />
    ),
    className: "min-w-[200px]",
  },
  {
    id: "duration",
    header: "Duration",
    hideBelow: "sm",
    cell: (row) => <TextCell>{row.duration}</TextCell>,
  },
  {
    id: "participants",
    header: "Participants",
    hideBelow: "lg",
    cell: (row) => <AvatarStack people={row.participants} max={2} />,
  },
  {
    id: "summaryStatus",
    header: "Status",
    cell: (row) => <StatusPill status={row.summaryStatus} />,
  },
];
