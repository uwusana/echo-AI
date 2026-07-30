import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  DataTable,
  MeetingMobileCard,
  recentMeetingColumns,
} from "@/components/data-table";
import { RECENT_MEETINGS } from "@/components/dashboard/home/data";
import { usePagination } from "@/hooks/usePagination";

const MEETINGS_PER_PAGE = 5;

export default function RecentMeetings() {
  const navigate = useNavigate();
  const {
    paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setPage,
  } = usePagination({
    items: RECENT_MEETINGS,
    itemsPerPage: MEETINGS_PER_PAGE,
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="recent-meetings-heading"
    >
      <DataTable
        title="Recent Meetings"
        columns={recentMeetingColumns}
        data={paginatedItems}
        getRowId={(row) => row.id}
        onRowClick={(row) => navigate(`/meeting/${row.id}`)}
        renderMobileCard={(row) => (
          <MeetingMobileCard meeting={row} variant="compact" />
        )}
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          onPageChange: setPage,
        }}
      />
    </motion.section>
  );
}
