import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

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

export default function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#27272A]/80 bg-[#18181B]/40 px-6 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-20 lg:px-16 lg:py-24"
        >
          <motion.div
            aria-hidden
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -top-24 left-1/4 size-72 rounded-full bg-[#3B82F6]/25 blur-3xl sm:size-96"
          />
          <motion.div
            aria-hidden
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="pointer-events-none absolute -right-16 -bottom-24 size-80 rounded-full bg-[#3B82F6]/15 blur-3xl sm:size-112"
          />
          <motion.div
            aria-hidden
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6366F1]/10 blur-3xl"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto flex max-w-2xl flex-col items-center"
          >
            <motion.h2
              id="cta-heading"
              custom={0}
              variants={fadeUp}
              className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
            >
              Ready to stop taking meeting notes?
            </motion.h2>

            <motion.p
              custom={0.08}
              variants={fadeUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-[#A1A1AA] sm:mt-6 sm:text-lg"
            >
              Let EchoAI do the work while you focus on the conversation.
            </motion.p>

            <motion.div
              custom={0.16}
              variants={fadeUp}
              className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4"
            >
              <Button className="h-11 w-full gap-2 border-0 bg-[#3B82F6] px-6 text-base text-white shadow-[0_0_32px_-8px_rgba(59,130,246,0.7)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_0_40px_-6px_rgba(59,130,246,0.8)] sm:w-auto">
                Start Free
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-11 w-full gap-2 border-[#27272A] bg-[#09090B]/40 px-6 text-base text-[#FAFAFA] backdrop-blur-sm transition-all duration-300 hover:border-[#3F3F46] hover:bg-[#18181B]/80 hover:text-[#FAFAFA] sm:w-auto"
              >
                <Calendar className="size-4" />
                Book Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
