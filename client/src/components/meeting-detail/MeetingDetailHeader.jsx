import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Copy,
  Download,
  MoreHorizontal,
  Share2,
  Sparkles,
} from "lucide-react";

import {
  AvatarStack,
  StatusPill,
} from "@/components/data-table/cells";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const actionBtn =
  "h-8 gap-1.5 rounded-lg border-[#27272A] bg-transparent px-3 text-xs font-medium text-[#A1A1AA] transition-all duration-200 hover:border-[#3F3F46] hover:bg-[#1C1C1F] hover:text-[#FAFAFA]";

export default function MeetingDetailHeader({ meeting }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-sm text-[#71717A]"
      >
        <Link
          to="/dashboard"
          className="transition-colors hover:text-[#FAFAFA]"
        >
          Dashboard
        </Link>
        <span className="text-[#3F3F46]">/</span>
        <Link to="/meeting" className="transition-colors hover:text-[#FAFAFA]">
          Meetings
        </Link>
        <span className="text-[#3F3F46]">/</span>
        <span className="truncate text-[#A1A1AA]">{meeting.title}</span>
      </nav>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[#FAFAFA] sm:text-[1.75rem]">
              {meeting.title}
            </h1>
            <StatusPill status={meeting.summaryStatus} />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-sm text-[#A1A1AA]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-[#71717A]" />
              {meeting.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-[#71717A]" />
              {meeting.duration}
            </span>
            <span className="inline-flex items-center gap-2">
              {meeting.participants?.length > 0 ? (
                <>
                  <AvatarStack people={meeting.participants} max={4} />
                  <span className="text-xs text-[#71717A]">
                    {meeting.participantsLabel ||
                      `${meeting.participants.length} participants`}
                  </span>
                </>
              ) : (
                <span className="text-xs text-[#71717A]">Not available</span>
              )}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3B82F6]/10 px-2.5 py-1 text-xs font-medium text-[#60A5FA] ring-1 ring-inset ring-[#3B82F6]/15">
              <Sparkles className="size-3" />
              AI {meeting.summaryStatus === "Complete" ? "Ready" : meeting.summaryStatus}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className={cn(actionBtn)}>
            <Copy className="size-3.5" />
            Copy Summary
          </Button>
          <Button variant="outline" size="sm" className={cn(actionBtn)}>
            <Download className="size-3.5" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" className={cn(actionBtn)}>
            <Share2 className="size-3.5" />
            Share
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className={cn(actionBtn, "size-8 px-0")}
                aria-label="More actions"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-44 border-[#27272A] bg-[#18181B] text-[#FAFAFA]"
            >
              <DropdownMenuItem className="focus:bg-[#27272A] focus:text-[#FAFAFA]">
                Duplicate meeting
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#27272A] focus:text-[#FAFAFA]">
                Add to folder
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#27272A]" />
              <DropdownMenuItem
                variant="destructive"
                className="focus:bg-rose-500/10"
              >
                Delete meeting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
