import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import ActionItemsCard from "@/components/meeting-detail/ActionItemsCard";
import ActivityTimeline from "@/components/meeting-detail/ActivityTimeline";
import AiSummaryCard from "@/components/meeting-detail/AiSummaryCard";
import AttachmentsCard from "@/components/meeting-detail/AttachmentsCard";
import { getMeetingDetail } from "@/components/meeting-detail/data";
import KeyDecisionsCard from "@/components/meeting-detail/KeyDecisionsCard";
import MeetingDetailHeader from "@/components/meeting-detail/MeetingDetailHeader";
import MeetingInfoCard from "@/components/meeting-detail/MeetingInfoCard";
import MeetingInsightsCard from "@/components/meeting-detail/MeetingInsightsCard";
import MeetingTagsCard from "@/components/meeting-detail/MeetingTagsCard";
import TranscriptPreview from "@/components/meeting-detail/TranscriptPreview";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

export default function MeetingDetailPage() {
  const { id } = useParams();
  const meeting = getMeetingDetail(id);

  if (!meeting) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-[#FAFAFA]">
          Meeting not found
        </h1>
        <p className="text-sm text-[#A1A1AA]">
          This meeting doesn&apos;t exist or may have been removed.
        </p>
        <Button
          asChild
          className="h-9 gap-2 border-0 bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:text-white"
        >
          <Link to="/meeting">
            <ArrowLeft className="size-4" />
            Back to Meetings
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUp.transition}
      className="mx-auto max-w-7xl space-y-8"
    >
      <MeetingDetailHeader meeting={meeting} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-10">
        <div className="space-y-6 xl:col-span-7">
          <AiSummaryCard summary={meeting.summary} />
          <ActionItemsCard key={meeting.id} items={meeting.actionItems} />
          <KeyDecisionsCard decisions={meeting.decisions} />
          <TranscriptPreview messages={meeting.transcript} />
        </div>

        <aside className="space-y-6 xl:col-span-3">
          <MeetingInfoCard meeting={meeting} />
          <MeetingInsightsCard insights={meeting.insights} />
          <MeetingTagsCard tags={meeting.tags} />
          <AttachmentsCard attachments={meeting.attachments} />
          <ActivityTimeline activity={meeting.activity} />
        </aside>
      </div>
    </motion.div>
  );
}
