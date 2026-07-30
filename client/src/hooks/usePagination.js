import { useCallback, useMemo, useState } from "react";

import {
  getTotalPages,
  paginateItems,
} from "@/lib/pagination";

export function usePagination({
  items,
  itemsPerPage = 5,
  initialPage = 1,
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = items.length;
  const totalPages = getTotalPages(totalItems, itemsPerPage);

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedItems = useMemo(
    () => paginateItems(items, safePage, itemsPerPage),
    [items, safePage, itemsPerPage]
  );

  const setPage = useCallback(
    (page) => {
      const next = Math.min(Math.max(page, 1), totalPages);
      setCurrentPage(next);
    },
    [totalPages]
  );

  const goToNext = useCallback(() => {
    setPage(safePage + 1);
  }, [safePage, setPage]);

  const goToPrevious = useCallback(() => {
    setPage(safePage - 1);
  }, [safePage, setPage]);

  const canGoNext = safePage < totalPages;
  const canGoPrevious = safePage > 1;

  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(safePage * itemsPerPage, totalItems);

  return {
    currentPage: safePage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedItems,
    setPage,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
    startIndex,
    endIndex,
  };
}
