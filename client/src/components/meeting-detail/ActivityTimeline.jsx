import { Activity } from "lucide-react";

import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";

export default function ActivityTimeline({ activity }) {
  return (
    <DetailSectionCard title="Activity Timeline" icon={Activity}>
      <ol className="space-y-0">
        {activity.map((item, index) => {
          const isLast = index === activity.length - 1;

          return (
            <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute top-3 left-[5px] h-[calc(100%-2px)] w-px bg-[#27272A]"
                />
              )}
              <span className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full bg-[#3B82F6]" />
              <div className="min-w-0 space-y-1">
                <p className="text-[13px] font-medium tracking-tight text-[#FAFAFA]">
                  {item.label}
                </p>
                <p className="text-xs text-[#71717A]">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </DetailSectionCard>
  );
}
