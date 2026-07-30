import { Gavel } from "lucide-react";

import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";

export default function KeyDecisionsCard({ decisions }) {
  return (
    <DetailSectionCard
      title="Key Decisions"
      description="Agreements captured during the meeting"
      icon={Gavel}
    >
      <ol className="relative space-y-0">
        {decisions.map((decision, index) => {
          const isLast = index === decisions.length - 1;

          return (
            <li key={decision.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute top-3 left-[7px] h-[calc(100%-4px)] w-px bg-[#27272A]"
                />
              )}
              <span className="relative z-10 mt-1.5 size-3.5 shrink-0 rounded-full border-2 border-[#3B82F6] bg-[#141416]" />

              <div className="min-w-0 flex-1 rounded-xl border border-[#27272A]/50 bg-[#0F0F11] px-4 py-3.5 transition-colors duration-200 hover:bg-[#121214]">
                <p className="text-[13px] font-medium tracking-tight text-[#FAFAFA]">
                  {decision.decision}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#71717A]">
                  <span>{decision.owner}</span>
                  <span className="text-[#3F3F46]">·</span>
                  <span>{decision.timestamp}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </DetailSectionCard>
  );
}
