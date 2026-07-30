import { motion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Circle,
  Clock,
  ListChecks,
  Scale,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MEETING_DATA = {
  title: "Q1 Product Strategy Sync",
  duration: "47 min",
  aiStatus: "Analysis complete",
  summary:
    "The team aligned on Q1 roadmap priorities. Engineering committed to shipping the integrations beta by March 15. Marketing will prepare launch assets by February 28.",
  actionItems: [
    {
      id: 1,
      text: "Finalize API spec for third-party integrations",
      assignee: "Sarah K.",
      done: true,
    },
    {
      id: 2,
      text: "Schedule design review for onboarding flow",
      assignee: "Marcus L.",
      done: false,
    },
    {
      id: 3,
      text: "Share competitive analysis deck with leadership",
      assignee: "Elena R.",
      done: false,
    },
  ],
  decisions: [
    "Prioritize mobile app over web redesign for Q1",
    "Adopt async standups starting next sprint",
    "Expand beta cohort to 500 accounts",
  ],
};

const cardHeaderClass =
  "border-b border-[#27272A]/80 px-4 pb-3.5 pt-4 sm:px-5 sm:pt-5";
const cardContentClass = "px-4 py-4 sm:px-5 sm:py-5";
const cardTitleClass =
  "flex items-center gap-2.5 text-sm text-[#FAFAFA]";

function DashboardWindow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#27272A] bg-[#18181B] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_-24px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between border-b border-[#27272A] bg-[#09090B]/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#3F3F46]" />
            <span className="size-2.5 rounded-full bg-[#3F3F46]" />
            <span className="size-2.5 rounded-full bg-[#3F3F46]" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-[#FAFAFA]">
              {MEETING_DATA.title}
            </p>
            <p className="text-[11px] text-[#A1A1AA]">EchoAI Meeting Report</p>
          </div>
        </div>

        <Badge className="border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:bg-[#09090B]">
          <Sparkles className="size-3 text-[#3B82F6]" />
          Live
        </Badge>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="border-[#27272A] bg-[#09090B]/50 py-0 ring-0">
            <CardContent className="flex items-center gap-3.5 px-4 py-4 sm:px-5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
                <Clock className="size-4 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-[11px] text-[#A1A1AA]">Duration</p>
                <p className="text-sm font-semibold text-[#FAFAFA]">
                  {MEETING_DATA.duration}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#27272A] bg-[#09090B]/50 py-0 ring-0">
            <CardContent className="flex items-center gap-3.5 px-4 py-4 sm:px-5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
                <Bot className="size-4 text-[#3B82F6]" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#A1A1AA]">AI Status</p>
                <p className="truncate text-sm font-semibold text-[#FAFAFA]">
                  {MEETING_DATA.aiStatus}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#27272A] bg-[#09090B]/50 py-0 ring-0">
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={cardTitleClass}>
              <Sparkles className="size-4 text-[#3B82F6]" />
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <p className="text-xs leading-relaxed text-[#A1A1AA] sm:text-sm">
              {MEETING_DATA.summary}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <Card className="border-[#27272A] bg-[#09090B]/50 py-0 ring-0">
            <CardHeader className={cardHeaderClass}>
              <CardTitle className={cardTitleClass}>
                <ListChecks className="size-4 text-[#3B82F6]" />
                Action Items
              </CardTitle>
            </CardHeader>
            <CardContent className={cn(cardContentClass, "space-y-3")}>
              {MEETING_DATA.actionItems.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  {item.done ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#3B82F6]" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-[#52525B]" />
                  )}
                  <div className="min-w-0 space-y-0.5">
                    <p
                      className={cn(
                        "text-xs leading-snug",
                        item.done
                          ? "text-[#71717A] line-through"
                          : "text-[#FAFAFA]"
                      )}
                    >
                      {item.text}
                    </p>
                    <p className="text-[11px] text-[#71717A]">
                      {item.assignee}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#27272A] bg-[#09090B]/50 py-0 ring-0">
            <CardHeader className={cardHeaderClass}>
              <CardTitle className={cardTitleClass}>
                <Scale className="size-4 text-[#3B82F6]" />
                Decisions
              </CardTitle>
            </CardHeader>
            <CardContent className={cn(cardContentClass, "space-y-3")}>
              {MEETING_DATA.decisions.map((decision, index) => (
                <div key={decision} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/15 text-[10px] font-medium text-[#3B82F6]">
                    {index + 1}
                  </span>
                  <p className="text-xs leading-snug text-[#A1A1AA]">
                    {decision}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function HeroDashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-full bg-[#3B82F6]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 -bottom-6 h-24 bg-linear-to-t from-[#3B82F6]/10 to-transparent blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <DashboardWindow />
        </motion.div>
      </motion.div>
    </div>
  );
}
