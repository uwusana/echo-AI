import { motion } from "framer-motion";
import { ListChecks, Sparkles, Upload, Video } from "lucide-react";

function IllustrationCard({ className, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function MeetingsEmptyIllustration() {
  return (
    <div className="relative mx-auto mb-8 flex h-52 w-full max-w-sm items-center justify-center sm:mb-10 sm:h-56">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-70"
      >
        <IllustrationCard
          delay={0.1}
          className="absolute -top-2 -right-2 z-10 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-2 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-[#3B82F6]/15">
              <Sparkles className="size-3.5 text-[#3B82F6]" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-14 rounded-full bg-[#27272A]" />
              <div className="h-1.5 w-10 rounded-full bg-[#27272A]/70" />
            </div>
          </div>
        </IllustrationCard>

        <IllustrationCard
          delay={0.2}
          className="absolute -bottom-1 -left-3 z-10 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-2 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-[#3B82F6]/15">
              <ListChecks className="size-3.5 text-[#3B82F6]" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-12 rounded-full bg-[#27272A]" />
              <div className="h-1.5 w-16 rounded-full bg-[#27272A]/70" />
            </div>
          </div>
        </IllustrationCard>

        <IllustrationCard
          delay={0}
          className="relative rounded-xl border border-dashed border-[#3F3F46] bg-[#09090B] p-6"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-xl border border-[#27272A] bg-[#18181B]">
              <Video className="size-6 text-[#71717A]" strokeWidth={1.5} />
            </div>

            <div className="w-full space-y-2">
              <div className="mx-auto h-2 w-3/5 rounded-full bg-[#27272A]" />
              <div className="mx-auto h-2 w-2/5 rounded-full bg-[#27272A]/60" />
            </div>

            <div className="flex size-10 items-center justify-center rounded-full border border-[#27272A] bg-[#18181B]">
              <Upload className="size-4 text-[#3B82F6]" />
            </div>
          </div>
        </IllustrationCard>
      </motion.div>
    </div>
  );
}
