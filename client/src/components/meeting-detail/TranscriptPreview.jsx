import { MessageSquareText } from "lucide-react";

import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";
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

export default function TranscriptPreview({ messages }) {
  return (
    <DetailSectionCard
      title="Transcript Preview"
      description="A sample of the conversation"
      icon={MessageSquareText}
      action={
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 rounded-lg border-[#27272A] bg-transparent px-3 text-xs font-medium text-[#A1A1AA]",
            "transition-all duration-200 hover:border-[#3F3F46] hover:bg-[#1C1C1F] hover:text-[#FAFAFA]"
          )}
        >
          View Full Transcript
        </Button>
      }
    >
      <div className="space-y-3">
        {messages.map((message) => (
          <article
            key={message.id}
            className="rounded-xl border border-[#27272A]/40 bg-[#0F0F11] px-4 py-3.5 transition-colors duration-200 hover:bg-[#121214]"
          >
            <div className="mb-2 flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#27272A] text-[10px] font-medium text-[#FAFAFA]">
                {getInitials(message.speaker)}
              </span>
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
                <p className="text-[13px] font-medium tracking-tight text-[#FAFAFA]">
                  {message.speaker}
                </p>
                <span className="text-xs tabular-nums text-[#71717A]">
                  {message.timestamp}
                </span>
              </div>
            </div>
            <p className="pl-[38px] text-[13px] leading-relaxed text-[#A1A1AA]">
              {message.message}
            </p>
          </article>
        ))}
      </div>
    </DetailSectionCard>
  );
}
