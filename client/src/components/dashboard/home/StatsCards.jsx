import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  ListChecks,
  Sparkles,
  Video,
} from "lucide-react";

import { STATS } from "@/components/dashboard/home/data";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ICONS = {
  Video,
  Sparkles,
  ListChecks,
  Clock,
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
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

function StatCard({ label, value, trend, trendLabel, positive, icon }) {
  const Icon = ICONS[icon];
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.div variants={item} className="min-w-0">
      <Card className="h-full border-[#27272A] bg-[#18181B] py-0 ring-0 transition-colors hover:border-[#3F3F46]">
        <CardContent className="space-y-3 p-3.5 sm:space-y-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#09090B] sm:size-10">
              <Icon className="size-3.5 text-[#3B82F6] sm:size-4.5" strokeWidth={1.75} />
            </div>
            <div
              className={cn(
                "flex shrink-0 items-center gap-0.5 text-[11px] font-medium sm:gap-1 sm:text-xs",
                positive ? "text-emerald-400" : "text-amber-400"
              )}
            >
              <TrendIcon className="size-3 sm:size-3.5" />
              {trend}
            </div>
          </div>

          <div className="min-w-0 space-y-0.5 sm:space-y-1">
            <p className="text-xl font-semibold tracking-tight text-[#FAFAFA] sm:text-2xl">
              {value}
            </p>
            <p className="truncate text-xs text-[#A1A1AA] sm:text-sm">{label}</p>
            <p className="truncate text-[11px] text-[#71717A] sm:text-xs">
              {trendLabel}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function StatsCards() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label="Dashboard statistics"
      className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
    >
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </motion.section>
  );
}
