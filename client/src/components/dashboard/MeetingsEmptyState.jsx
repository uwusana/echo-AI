import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

import MeetingsEmptyIllustration from "@/components/dashboard/MeetingsEmptyIllustration";
import { NewMeetingModal } from "@/components/new-meeting";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MeetingsEmptyState({ className }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex min-h-[60vh] items-center justify-center", className)}
    >
      <Card className="w-full max-w-lg border-[#27272A] bg-[#18181B] py-0 ring-0">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
          <MeetingsEmptyIllustration />

          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-[#FAFAFA] sm:text-2xl">
              No meetings yet
            </h2>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
              Upload your first meeting to let EchoAI generate summaries and
              action items.
            </p>
          </div>

          <Button
            size="lg"
            className="mt-8 h-12 gap-2 border-0 bg-[#3B82F6] px-8 text-base font-medium text-white hover:bg-[#2563EB]"
            onClick={() => setModalOpen(true)}
          >
            <Upload className="size-4" />
            Upload Meeting
          </Button>
        </CardContent>
      </Card>

      <NewMeetingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultTab="upload"
      />
    </motion.div>
  );
}
