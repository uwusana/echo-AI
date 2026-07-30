import { motion } from "framer-motion";
import {
  FileDown,
  ListChecks,
  Scale,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Meeting Summaries",
    description:
      "Get concise, accurate recaps of every conversation within seconds of your call ending.",
  },
  {
    icon: ListChecks,
    title: "Action Item Extraction",
    description:
      "Never miss a follow-up. EchoAI identifies tasks and surfaces clear owners automatically.",
  },
  {
    icon: Scale,
    title: "Decision Tracking",
    description:
      "Capture every decision made and keep your team aligned on what was agreed.",
  },
  {
    icon: Users,
    title: "Speaker Insights",
    description:
      "Understand who contributed what with intelligent speaker attribution and talk-time analysis.",
  },
  {
    icon: Search,
    title: "Search Previous Meetings",
    description:
      "Find anything across your meeting history with natural language search.",
  },
  {
    icon: FileDown,
    title: "Export to PDF",
    description:
      "Share polished reports with stakeholders in one click, ready for your workflow.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-[#27272A]/80",
        "bg-[#18181B]/40 p-6 backdrop-blur-xl sm:p-7",
        "transition-all duration-300 ease-out",
        "hover:border-[#3B82F6]/25 hover:bg-[#18181B]/70",
        "hover:shadow-[0_0_48px_-16px_rgba(59,130,246,0.35)]"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-[#3B82F6]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex flex-col gap-4">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-xl border border-[#27272A]",
            "bg-[#09090B]/60 transition-all duration-300",
            "group-hover:border-[#3B82F6]/30 group-hover:bg-[#3B82F6]/10"
          )}
        >
          <Icon
            className="size-5 text-[#3B82F6] transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.75}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight text-[#FAFAFA] sm:text-[1.05rem]">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-[#A1A1AA]">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative w-full"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-[#27272A] bg-[#18181B]/80 px-3 py-1 text-xs font-medium text-[#A1A1AA] backdrop-blur-sm">
            Features
          </p>
          <h2
            id="features-heading"
            className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            Everything you need after every meeting
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:mt-5 sm:text-lg">
            EchoAI turns conversations into clarity — summaries, tasks, and
            decisions, all in one place.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
