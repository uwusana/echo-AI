import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  DataTable,
  MeetingMobileCard,
  recentMeetingColumns,
} from "@/components/data-table";
import MeetingsEmptyState from "@/components/dashboard/MeetingsEmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { usePagination } from "@/hooks/usePagination";
import { getAllMeetings } from "@/services/meetingService";

const MEETINGS_PER_PAGE = 5;

function RecentMeetingsSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[1.25rem] border border-[#27272A]/80 bg-[#141416] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]"
      aria-busy="true"
      aria-label="Loading recent meetings"
    >
      <div className="border-b border-[#27272A]/60 px-5 py-5 sm:px-6">
        <Skeleton className="h-4 w-36 bg-[#27272A]" />
      </div>

      <div className="hidden divide-y divide-[#27272A]/40 md:block">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-5 py-5 sm:px-6"
          >
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3.5 w-3/5 max-w-[220px] bg-[#27272A]" />
              <Skeleton className="h-3 w-24 bg-[#1F1F23]" />
            </div>
            <Skeleton className="hidden h-3 w-14 bg-[#27272A] sm:block" />
            <Skeleton className="hidden h-7 w-16 rounded-full bg-[#27272A] lg:block" />
            <Skeleton className="h-6 w-20 rounded-full bg-[#27272A]" />
          </div>
        ))}
      </div>

      <div className="divide-y divide-[#27272A]/50 md:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3 px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-3.5 w-4/5 bg-[#27272A]" />
                <Skeleton className="h-3 w-24 bg-[#1F1F23]" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full bg-[#27272A]" />
            </div>
            <Skeleton className="h-3 w-16 bg-[#27272A]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecentMeetings() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMeetings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllMeetings();
      setMeetings(data);
    } catch (error) {
      console.error(error);
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeetings();
  }, [loadMeetings]);

  useEffect(() => {
    const refresh = () => loadMeetings();
    window.addEventListener("echoai:meetings-updated", refresh);
    return () => window.removeEventListener("echoai:meetings-updated", refresh);
  }, [loadMeetings]);

  const {
    paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setPage,
  } = usePagination({
    items: meetings,
    itemsPerPage: MEETINGS_PER_PAGE,
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="recent-meetings-heading"
    >
      {loading ? (
        <RecentMeetingsSkeleton />
      ) : (
        <DataTable
          title="Recent Meetings"
          columns={recentMeetingColumns}
          data={paginatedItems}
          getRowId={(row) => row.id}
          onRowClick={(row) => navigate(`/meeting/${row.id}`)}
          renderMobileCard={(row) => (
            <MeetingMobileCard meeting={row} variant="compact" />
          )}
          emptyState={
            <MeetingsEmptyState
              className="min-h-[320px]"
              onCreated={loadMeetings}
            />
          }
          pagination={{
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            onPageChange: setPage,
          }}
        />
      )}
    </motion.section>
  );
}
