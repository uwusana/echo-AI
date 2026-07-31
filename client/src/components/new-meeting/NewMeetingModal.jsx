import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AudioWaveform } from "lucide-react";
import { toast } from "sonner";

import LiveMeetingTab from "@/components/new-meeting/LiveMeetingTab";
import RecordingUploadTab from "@/components/new-meeting/RecordingUploadTab";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { createMeeting } from "@/services/meetingService";

/**
 * Reusable New Meeting modal.
 *
 * @param {boolean} [open]
 * @param {(open: boolean) => void} [onOpenChange]
 * @param {"live" | "upload"} [defaultTab]
 * @param {React.ReactNode} [trigger]
 * @param {() => void | Promise<void>} [onSuccess] - Called after a successful create (e.g. refresh list)
 */
export default function NewMeetingModal({
  open,
  onOpenChange,
  defaultTab = "upload",
  trigger,
  onSuccess,
}) {
  const [tab, setTab] = useState(defaultTab);
  const [submitting, setSubmitting] = useState(false);
  const isControlled = open !== undefined;

  useEffect(() => {
    if (open) setTab(defaultTab);
  }, [open, defaultTab]);

  const handleUpload = async (file) => {
    if (submitting || !file) return;

    const title = file.name.replace(/\.[^.]+$/, "") || "New Meeting";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("recording", file);

    try {
      setSubmitting(true);
      await createMeeting(formData);

      onOpenChange?.(false);
      toast.success("Meeting created successfully", {
        description: `"${title}" has been added to your workspace.`,
      });
      window.dispatchEvent(new CustomEvent("echoai:meetings-updated"));
      await onSuccess?.();
    } catch (error) {
      toast.error("Failed to create meeting", {
        description: error.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isControlled ? open : undefined}
      onOpenChange={onOpenChange}
    >
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent
        showCloseButton
        className={cn(
          "max-h-[min(90vh,820px)] w-full gap-0 overflow-hidden rounded-[1.25rem] border border-[#27272A] bg-[#141416] p-0 text-[#FAFAFA]",
          "shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/5",
          "sm:max-w-xl"
        )}
      >
        <DialogHeader className="space-y-3 border-b border-[#27272A]/70 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3 pr-8">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#27272A] bg-[#1A1A1D]">
              <AudioWaveform
                className="size-4 text-[#3B82F6]"
                strokeWidth={1.75}
              />
            </div>
            <div className="min-w-0 space-y-1">
              <DialogTitle className="text-base font-semibold tracking-tight text-[#FAFAFA]">
                New Meeting
              </DialogTitle>
              <DialogDescription className="text-sm text-[#71717A]">
                Upload a recording or preview upcoming live integrations.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="gap-0">
          <div className="border-b border-[#27272A]/70 px-5 pt-4 sm:px-6">
            <TabsList className="!grid !h-11 !w-full grid-cols-2 gap-1 !rounded-xl !bg-[#0F0F11] !p-1 ring-1 ring-[#27272A]/80">
              <TabsTrigger
                value="live"
                className={cn(
                  "!h-full min-h-0 flex-1 !rounded-[10px] border-0 !bg-transparent px-3 text-xs font-medium !text-[#71717A] shadow-none",
                  "hover:!text-[#A1A1AA]",
                  "after:hidden",
                  "data-active:!bg-[#3B82F6] data-active:!text-white data-active:shadow-none",
                  "dark:data-active:!border-transparent dark:data-active:!bg-[#3B82F6] dark:data-active:!text-white"
                )}
              >
                Live Meeting
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className={cn(
                  "!h-full min-h-0 flex-1 !rounded-[10px] border-0 !bg-transparent px-3 text-xs font-medium !text-[#71717A] shadow-none",
                  "hover:!text-[#A1A1AA]",
                  "after:hidden",
                  "data-active:!bg-[#3B82F6] data-active:!text-white data-active:shadow-none",
                  "dark:data-active:!border-transparent dark:data-active:!bg-[#3B82F6] dark:data-active:!text-white"
                )}
              >
                Recording Upload
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="max-h-[min(62vh,560px)] overflow-y-auto px-5 py-5 sm:px-6">
            <AnimatePresence mode="wait">
              {tab === "live" ? <LiveMeetingTab key="live" /> : null}
              {tab === "upload" ? (
                <RecordingUploadTab
                  key="upload"
                  onUpload={handleUpload}
                  submitting={submitting}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </Tabs>

        <div className="flex items-center justify-between gap-3 border-t border-[#27272A]/70 px-5 py-3.5 sm:px-6">
          <p className="text-[11px] text-[#52525B]">
            EchoAI processes files securely in your workspace.
          </p>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-[#27272A] bg-transparent px-3 text-xs text-[#A1A1AA] hover:border-[#3F3F46] hover:bg-[#1C1C1F] hover:text-[#FAFAFA]"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
