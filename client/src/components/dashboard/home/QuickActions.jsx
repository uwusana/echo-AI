import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Mic,
  Search,
  Upload,
} from "lucide-react";

import { NewMeetingModal } from "@/components/new-meeting";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  {
    id: "upload",
    title: "Upload Meeting",
    description: "Import a recording to generate AI summaries.",
    icon: Upload,
    hint: "Ctrl + U",
    modalTab: "upload",
  },
  {
    id: "live",
    title: "Start Live Recording",
    description: "Capture a meeting in real time with EchoAI.",
    icon: Mic,
    hint: "Coming Soon",
    modalTab: "live",
  },
  {
    id: "analytics",
    title: "View Analytics",
    description: "Track productivity trends across your team.",
    icon: BarChart3,
    hint: "Beta",
  },
  {
    id: "search",
    title: "Search Meetings",
    description: "Find notes, decisions, and action items instantly.",
    icon: Search,
    hint: "Ctrl + K",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function QuickActionCard({ title, description, icon: Icon, hint, onClick }) {
  return (
    <motion.div variants={item} whileHover={{ y: -3 }} className="min-w-0">
      <button
        type="button"
        onClick={onClick}
        className="group h-full w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
      >
        <Card
          className={cn(
            "h-full min-h-36 rounded-xl border border-[#27272A] bg-[#18181B] py-0 ring-0 sm:min-h-42",
            "transition-all duration-200",
            "hover:border-[#3B82F6]/35 hover:bg-[#1C1C1F]",
            "hover:shadow-[0_0_0_1px_rgba(59,130,246,0.12),0_8px_24px_-12px_rgba(59,130,246,0.25)]"
          )}
        >
          <CardContent className="flex h-full min-h-36 flex-col p-0 sm:min-h-42">
            <div className="flex flex-1 flex-col gap-2 px-3.5 pt-3.5 pb-3 sm:gap-3 sm:px-5 sm:pt-5 sm:pb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-2.5">
                  <Icon
                    className="mt-0.5 size-3.5 shrink-0 text-[#3B82F6] sm:mt-0 sm:size-4"
                    strokeWidth={1.75}
                  />
                  <h3 className="text-sm font-semibold leading-snug tracking-tight text-[#FAFAFA] sm:text-[15px]">
                    {title}
                  </h3>
                </div>

                <ArrowUpRight
                  className="size-3.5 shrink-0 text-[#52525B] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#A1A1AA] sm:size-4"
                  strokeWidth={1.75}
                />
              </div>

              <p className="line-clamp-2 text-xs leading-relaxed text-[#A1A1AA] sm:text-sm">
                {description}
              </p>
            </div>

            <div className="mt-auto flex items-center border-t border-[#27272A] px-3.5 py-2.5 sm:px-5 sm:py-3">
              <span className="rounded-md border border-[#27272A] bg-[#09090B] px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-[#71717A] transition-colors duration-200 group-hover:border-[#3F3F46] group-hover:text-[#A1A1AA] sm:px-2 sm:text-[11px]">
                {hint}
              </span>
            </div>
          </CardContent>
        </Card>
      </button>
    </motion.div>
  );
}

export default function QuickActions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("upload");

  const openModal = (tab) => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      aria-labelledby="quick-actions-heading"
    >
      <div className="mb-3 sm:mb-4">
        <h2
          id="quick-actions-heading"
          className="text-base font-semibold tracking-tight text-[#FAFAFA]"
        >
          Quick Actions
        </h2>
        <p className="mt-1 text-xs text-[#71717A] sm:text-sm">
          Jump into your most common workflows.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard
            key={action.id}
            {...action}
            onClick={
              action.modalTab ? () => openModal(action.modalTab) : undefined
            }
          />
        ))}
      </div>

      <NewMeetingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultTab={modalTab}
      />
    </motion.section>
  );
}
