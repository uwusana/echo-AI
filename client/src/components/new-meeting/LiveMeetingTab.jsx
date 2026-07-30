import { motion } from "framer-motion";
import {
  Bot,
  ListChecks,
  Mic2,
  Radio,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { name: "Google Meet", icon: Video },
  { name: "Zoom", icon: Radio },
  { name: "Microsoft Teams", icon: Users },
];

const PLANNED_FEATURES = [
  {
    title: "Automatic meeting joining",
    description: "EchoAI joins your call the moment it starts.",
    icon: Video,
  },
  {
    title: "Live transcription",
    description: "Real-time speaker-aware transcripts as you talk.",
    icon: Mic2,
  },
  {
    title: "AI summaries",
    description: "Executive overviews generated while the meeting runs.",
    icon: Sparkles,
  },
  {
    title: "Action item extraction",
    description: "Owners, due dates, and next steps captured automatically.",
    icon: ListChecks,
  },
];

function LivePreviewIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-[#27272A]/80 bg-[#0F0F11] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_55%)]" />

      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-rose-400" />
            <span className="text-[11px] font-medium tracking-wide text-[#A1A1AA]">
              LIVE PREVIEW
            </span>
          </div>
          <span className="rounded-md bg-[#18181B] px-2 py-0.5 font-mono text-[10px] text-[#71717A] ring-1 ring-[#27272A]">
            00:24:18
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["SK", "ML", "ER"].map((initials, index) => (
            <div
              key={initials}
              className={cn(
                "flex aspect-video items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]",
                index === 0 && "ring-1 ring-[#3B82F6]/30"
              )}
            >
              <span className="text-xs font-medium text-[#FAFAFA]">{initials}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 rounded-lg border border-[#27272A]/60 bg-[#141416] p-3">
          <div className="flex items-center gap-2 text-[11px] text-[#71717A]">
            <Bot className="size-3 text-[#3B82F6]" />
            Live transcript
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[#27272A]" />
            <div className="h-1.5 w-4/5 rounded-full bg-[#27272A]" />
            <div className="h-1.5 w-3/5 rounded-full bg-[#3B82F6]/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveMeetingTab() {
  return (
    <motion.div
      key="live"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <span className="inline-flex h-6 items-center rounded-full bg-[#3B82F6]/10 px-2.5 text-xs font-medium text-[#60A5FA] ring-1 ring-inset ring-[#3B82F6]/20">
          Coming Soon
        </span>
        <p className="max-w-md text-sm leading-relaxed text-[#A1A1AA]">
          Native integrations with Google Meet, Zoom, and Microsoft Teams are
          under development. EchoAI will join live calls, transcribe in real
          time, and surface insights as the conversation unfolds.
        </p>
      </div>

      <LivePreviewIllustration />

      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map(({ name, icon: Icon }) => (
          <span
            key={name}
            className="inline-flex h-8 items-center gap-2 rounded-full bg-[#1A1A1D] px-3 text-xs font-medium text-[#A1A1AA] ring-1 ring-inset ring-[#27272A]"
          >
            <Icon className="size-3.5 text-[#3B82F6]" />
            {name}
          </span>
        ))}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {PLANNED_FEATURES.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-[#27272A]/60 bg-[#0F0F11] px-3.5 py-3.5"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
                <Icon className="size-3.5 text-[#3B82F6]" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] font-medium tracking-tight text-[#FAFAFA]">
                {title}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-[#71717A]">
              {description}
            </p>
          </div>
        ))}
      </div>

      <Button
        disabled
        className="h-10 w-full cursor-not-allowed rounded-xl border border-[#27272A] bg-[#1A1A1D] text-sm font-medium text-[#71717A] opacity-80"
      >
        Available in a Future Update
      </Button>
    </motion.div>
  );
}
