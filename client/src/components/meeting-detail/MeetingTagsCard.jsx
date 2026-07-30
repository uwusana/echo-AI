import { Tag } from "lucide-react";

import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";

export default function MeetingTagsCard({ tags }) {
  return (
    <DetailSectionCard title="Meeting Tags" icon={Tag}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-7 items-center rounded-full bg-[#1A1A1D] px-3 text-xs font-medium tracking-tight text-[#A1A1AA] ring-1 ring-inset ring-[#27272A] transition-colors duration-200 hover:text-[#FAFAFA] hover:ring-[#3F3F46]"
          >
            {tag}
          </span>
        ))}
      </div>
    </DetailSectionCard>
  );
}
