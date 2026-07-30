import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  ListChecks,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import { AI_INSIGHTS } from "@/components/dashboard/home/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const INSIGHT_ITEMS = [
  {
    label: "Weekly productivity",
    value: AI_INSIGHTS.weeklyProductivity,
    sub: AI_INSIGHTS.weeklyProductivityLabel,
    icon: BarChart3,
  },
  {
    label: "Most discussed topic",
    value: AI_INSIGHTS.mostDiscussedTopic,
    sub: "Across 18 meetings this week",
    icon: MessageSquare,
  },
  {
    label: "Pending action items",
    value: String(AI_INSIGHTS.pendingActionItems),
    sub: "Assigned to your team",
    icon: ListChecks,
  },
  {
    label: "Average meeting length",
    value: AI_INSIGHTS.averageMeetingLength,
    sub: "Team average this week",
    icon: Clock,
  },
];

function InsightBlock({ label, value, sub, icon: Icon }) {
  return (
    <div className="min-w-0 rounded-lg border border-[#27272A] bg-[#09090B] p-3 sm:p-5">
      <div className="mb-2.5 flex items-center gap-2 sm:mb-4 sm:gap-3">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B] sm:size-9">
          <Icon className="size-3.5 text-[#3B82F6] sm:size-4" strokeWidth={1.75} />
        </div>
        <p className="truncate text-xs text-[#A1A1AA] sm:text-sm">{label}</p>
      </div>
      <p className="line-clamp-2 text-base font-semibold tracking-tight text-[#FAFAFA] sm:text-2xl">
        {value}
      </p>
      <p className="mt-1 truncate text-[11px] text-[#71717A] sm:text-xs">{sub}</p>
    </div>
  );
}

export default function AIInsights() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="ai-insights-heading"
    >
      <Card className="border-[#27272A] bg-[#18181B] py-0 ring-0">
        <CardHeader className="border-b border-[#27272A] px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="size-4 text-[#3B82F6]" />
            <CardTitle
              id="ai-insights-heading"
              className="text-base font-medium text-[#FAFAFA]"
            >
              AI Insights
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {INSIGHT_ITEMS.map((insight) => (
              <InsightBlock key={insight.label} {...insight} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
