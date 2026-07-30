/**
 * Returns a slice of items for the given page (1-indexed).
 */
export function paginateItems(items, currentPage, itemsPerPage) {
  const start = (currentPage - 1) * itemsPerPage;
  return items.slice(start, start + itemsPerPage);
}

/**
 * Calculates total pages from item count and page size.
 */
export function getTotalPages(totalItems, itemsPerPage) {
  if (totalItems <= 0 || itemsPerPage <= 0) return 1;
  return Math.ceil(totalItems / itemsPerPage);
}

/**
 * Builds visible page numbers with ellipsis for large page counts.
 */
export function getVisiblePages(currentPage, totalPages, siblingCount = 1) {
  if (totalPages <= 1) return [1];

  const pages = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - siblingCount,
    currentPage + siblingCount,
  ]);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

/**
 * Returns page entries with ellipsis markers for rendering.
 * Example: [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
 */
export function getPageRange(currentPage, totalPages, siblingCount = 1) {
  const visible = getVisiblePages(currentPage, totalPages, siblingCount);
  const range = [];

  for (let i = 0; i < visible.length; i++) {
    const page = visible[i];
    if (i > 0 && page - visible[i - 1] > 1) {
      range.push("ellipsis");
    }
    range.push(page);
  }

  return range;
}
