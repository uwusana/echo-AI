import { Copy, RefreshCw } from "lucide-react";

import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ghostBtn =
  "h-8 gap-1.5 rounded-lg border-[#27272A] bg-transparent px-3 text-xs font-medium text-[#A1A1AA] transition-all duration-200 hover:border-[#3F3F46] hover:bg-[#1C1C1F] hover:text-[#FAFAFA]";

function SummaryBlock({ label, children }) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-xs font-medium tracking-[0.04em] text-[#71717A] uppercase">
        {label}
      </h3>
      {children}
    </div>
  );
}

export default function AiSummaryCard({ summary }) {
  return (
    <DetailSectionCard
      title="AI Summary"
      description="Generated overview of this meeting"
      action={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className={cn(ghostBtn)}>
            <Copy className="size-3.5" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className={cn(ghostBtn)}>
            <RefreshCw className="size-3.5" />
            Regenerate
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <SummaryBlock label="Executive Summary">
          <p className="text-[15px] leading-relaxed tracking-tight text-[#D4D4D8]">
            {summary.executive}
          </p>
        </SummaryBlock>

        <SummaryBlock label="Key Discussion Points">
          <ul className="space-y-2.5">
            {summary.discussionPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-[14px] leading-relaxed text-[#D4D4D8]"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#3B82F6]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </SummaryBlock>

        <SummaryBlock label="Next Steps">
          <ul className="space-y-2.5">
            {summary.nextSteps.map((step) => (
              <li
                key={step}
                className="flex gap-3 text-[14px] leading-relaxed text-[#D4D4D8]"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </SummaryBlock>
      </div>
    </DetailSectionCard>
  );
}
