import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WelcomeHeader() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="space-y-1"
    >
      <h1 className="text-2xl font-semibold tracking-tight text-[#FAFAFA] sm:text-3xl">
        Good Morning, Upasana 
      </h1>
      <p className="text-sm text-[#A1A1AA] sm:text-base">
        Here&apos;s what happened across your meetings.
      </p>
    </motion.header>
  );
}
