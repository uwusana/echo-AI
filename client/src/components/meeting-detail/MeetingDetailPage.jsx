import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";

import ActionItemsCard from "@/components/meeting-detail/ActionItemsCard";
import ActivityTimeline from "@/components/meeting-detail/ActivityTimeline";
import AiSummaryCard from "@/components/meeting-detail/AiSummaryCard";
import AttachmentsCard from "@/components/meeting-detail/AttachmentsCard";
import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";
import KeyDecisionsCard from "@/components/meeting-detail/KeyDecisionsCard";
import MeetingDetailHeader from "@/components/meeting-detail/MeetingDetailHeader";
import MeetingInfoCard from "@/components/meeting-detail/MeetingInfoCard";
import MeetingInsightsCard from "@/components/meeting-detail/MeetingInsightsCard";
import MeetingTagsCard from "@/components/meeting-detail/MeetingTagsCard";
import TranscriptPreview from "@/components/meeting-detail/TranscriptPreview";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMeetingById } from "@/services/meetingService";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

function MeetingDetailSkeleton() {
  return (
    <div
      className="mx-auto max-w-7xl space-y-8"
      aria-busy="true"
      aria-label="Loading meeting details"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-20 bg-[#27272A]" />
          <Skeleton className="h-3.5 w-3 bg-[#1F1F23]" />
          <Skeleton className="h-3.5 w-24 bg-[#27272A]" />
          <Skeleton className="h-3.5 w-3 bg-[#1F1F23]" />
          <Skeleton className="h-3.5 w-40 bg-[#27272A]" />
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-8 w-72 max-w-full bg-[#27272A]" />
              <Skeleton className="h-6 w-20 rounded-full bg-[#27272A]" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-4 w-28 bg-[#1F1F23]" />
              <Skeleton className="h-4 w-16 bg-[#1F1F23]" />
              <Skeleton className="h-7 w-28 rounded-full bg-[#27272A]" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-28 rounded-lg bg-[#27272A]" />
            <Skeleton className="h-8 w-24 rounded-lg bg-[#27272A]" />
            <Skeleton className="h-8 w-20 rounded-lg bg-[#27272A]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-10">
        <div className="space-y-6 xl:col-span-7">
          {[180, 140, 120, 160].map((height, index) => (
            <DetailSectionCard key={index} bodyClassName="space-y-3">
              <Skeleton className="h-4 w-32 bg-[#27272A]" />
              <Skeleton
                className="w-full bg-[#1F1F23]"
                style={{ height }}
              />
            </DetailSectionCard>
          ))}
        </div>

        <aside className="space-y-6 xl:col-span-3">
          {[100, 140, 72, 96, 120].map((height, index) => (
            <DetailSectionCard key={index} bodyClassName="space-y-3">
              <Skeleton className="h-4 w-28 bg-[#27272A]" />
              <Skeleton
                className="w-full bg-[#1F1F23]"
                style={{ height }}
              />
            </DetailSectionCard>
          ))}
        </aside>
      </div>
    </div>
  );
}

function MeetingDetailError({ title, message }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl border border-[#27272A] bg-[#141416]">
        <AlertCircle className="size-5 text-rose-400" strokeWidth={1.75} />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-[#FAFAFA]">
          {title}
        </h1>
        <p className="text-sm text-[#A1A1AA]">{message}</p>
      </div>
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

export default function MeetingDetailPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadMeeting() {
      if (!id) {
        setMeeting(null);
        setError("Missing meeting id");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await getMeetingById(id);

        if (cancelled) return;

        if (!data) {
          setMeeting(null);
          setError("NOT_FOUND");
          return;
        }

        setMeeting(data);
      } catch (err) {
        if (!cancelled) {
          setMeeting(null);
          setError(err.message || "Failed to load meeting");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMeeting();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <MeetingDetailSkeleton />;
  }

  if (error === "NOT_FOUND" || (!meeting && !error)) {
    return (
      <MeetingDetailError
        title="Meeting not found"
        message="This meeting doesn't exist or may have been removed."
      />
    );
  }

  if (error || !meeting) {
    return (
      <MeetingDetailError
        title="Couldn't load meeting"
        message={error || "Something went wrong while loading this meeting."}
      />
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
          <MeetingInfoCard key={meeting.id} meeting={meeting} />
          <MeetingInsightsCard insights={meeting.insights} />
          <MeetingTagsCard tags={meeting.tags} />
          <AttachmentsCard attachments={meeting.attachments} />
          <ActivityTimeline activity={meeting.activity} />
        </aside>
      </div>
    </motion.div>
  );
}
