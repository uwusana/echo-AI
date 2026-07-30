import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import HeroDashboardPreview from "@/components/landing/HeroDashboardPreview";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              <div className="space-y-6 sm:space-y-8">
                <motion.p
                  custom={0}
                  variants={fadeUp}
                  className="inline-flex items-center rounded-full border border-[#27272A] bg-[#18181B]/80 px-3 py-1 text-xs font-medium text-[#A1A1AA] backdrop-blur-sm"
                >
                  AI-powered meeting intelligence
                </motion.p>

                <motion.h1
                  id="hero-heading"
                  custom={0.05}
                  variants={fadeUp}
                  className="text-4xl font-semibold tracking-tight text-[#FAFAFA] sm:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.05]"
                >
                  <span className="block">Meetings end.</span>
                  <span className="mt-1 block">
                    Productivity{" "}
                    <span className="bg-linear-to-r from-[#FAFAFA] via-[#93C5FD] to-[#3B82F6] bg-clip-text text-transparent">
                      begins.
                    </span>
                  </span>
                </motion.h1>

                <motion.p
                  custom={0.1}
                  variants={fadeUp}
                  className="mx-auto max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg lg:mx-0"
                >
                  EchoAI automatically summarizes meetings, extracts action items,
                  captures decisions and helps your team stay aligned.
                </motion.p>
              </div>

              <motion.div
                custom={0.15}
                variants={fadeUp}
                className="mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center lg:mt-14 lg:justify-start"
              >
                <Button className="h-11 w-full gap-2 border-0 bg-[#3B82F6] px-6 text-base text-white shadow-[0_0_32px_-8px_rgba(59,130,246,0.7)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_0_40px_-6px_rgba(59,130,246,0.8)] sm:w-auto">
                  Start Free
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full gap-2 border-[#27272A] bg-[#18181B]/50 px-6 text-base text-[#FAFAFA] backdrop-blur-sm transition-all duration-300 hover:border-[#3F3F46] hover:bg-[#18181B] hover:text-[#FAFAFA] sm:w-auto"
                >
                  <Play className="size-4 fill-current" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <HeroDashboardPreview />
        </div>
      </div>
    </section>
  );
}
