import {
  Clock,
  HardDrive,
  Languages,
  Timer,
  UserRound,
  Users,
} from "lucide-react";

import { AvatarStack } from "@/components/data-table/cells";
import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";

const ROWS = [
  { key: "duration", label: "Duration", icon: Clock },
  { key: "language", label: "Language", icon: Languages },
  { key: "recordingSize", label: "Recording Size", icon: HardDrive },
  { key: "processingTime", label: "Processing Time", icon: Timer },
  { key: "createdBy", label: "Created By", icon: UserRound },
];

export default function MeetingInfoCard({ meeting }) {
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
