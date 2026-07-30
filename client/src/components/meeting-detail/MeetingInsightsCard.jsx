import { Sparkles } from "lucide-react";

import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";
import MetricBar from "@/components/meeting-detail/MetricBar";

export default function MeetingInsightsCard({ insights }) {
  return (
    <DetailSectionCard title="AI Insights" icon={Sparkles} bodyClassName="space-y-5">
      <MetricBar
        label="Productivity Score"
        value={insights.productivityScore}
      />
      <MetricBar label="AI Confidence" value={insights.aiConfidence} />
      <MetricBar
        label="Sentiment"
        value={insights.sentimentScore}
        displayValue={insights.sentiment}
      />
      <MetricBar label="Speaking Balance" value={insights.speakingBalance} />
      <MetricBar label="Engagement" value={insights.engagement} />
    </DetailSectionCard>
  );
}
