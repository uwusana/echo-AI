import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

import {
  DataTable,
  MeetingMobileCard,
  meetingColumns,
} from "@/components/data-table";
import { MEETINGS } from "@/components/dashboard/home/data";
import MeetingsEmptyState from "@/components/dashboard/MeetingsEmptyState";
import { NewMeetingModal } from "@/components/new-meeting";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/usePagination";

const MEETINGS_PER_PAGE = 5;

export default function MeetingsPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setPage,
  } = usePagination({
    items: MEETINGS,
    itemsPerPage: MEETINGS_PER_PAGE,
  });

  if (MEETINGS.length === 0) {
    return <MeetingsEmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-[#FAFAFA]">
            Meetings
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Browse and review all your recorded meetings.
          </p>
        </div>

        <Button
          className="h-9 gap-2 border-0 bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:text-white"
          onClick={() => setModalOpen(true)}
        >
          <Upload className="size-4" />
          Upload Meeting
        </Button>
      </div>

      <DataTable
        title="All Meetings"
        description={`${totalItems} meetings in your workspace`}
        columns={meetingColumns}
        data={paginatedItems}
        getRowId={(row) => row.id}
        onRowClick={(row) => navigate(`/meeting/${row.id}`)}
        renderMobileCard={(row) => (
          <MeetingMobileCard meeting={row} variant="full" />
        )}
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          onPageChange: setPage,
        }}
      />

      <NewMeetingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultTab="upload"
      />
    </motion.div>
  );
}
