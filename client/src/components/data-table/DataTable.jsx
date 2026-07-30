import { Fragment } from "react";

import Pagination from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const HIDE_BELOW = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
  xl: "hidden xl:table-cell",
};

function resolveCellValue(row, column) {
  if (typeof column.cell === "function") {
    return column.cell(row);
  }
  if (column.accessorKey) {
    return row[column.accessorKey];
  }
  return null;
}

function getColumnVisibilityClass(column) {
  if (!column.hideBelow) return "";
  return HIDE_BELOW[column.hideBelow] ?? "";
}

function getAlignClass(align) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

/**
 * Premium reusable DataTable.
 *
 * @param {Array} columns - Column definitions with id, header, cell, hideBelow, align
 * @param {Array} data - Row data
 * @param {Function} getRowId - Unique row key resolver
 * @param {Object} pagination - { currentPage, totalPages, totalItems, itemsPerPage, onPageChange }
 */
export default function DataTable({
  columns = [],
  data = [],
  getRowId = (row, index) => row.id ?? index,
  title,
  description,
  headerAction,
  emptyState,
  pagination,
  renderMobileCard,
  onRowClick,
  className,
  stickyHeader = true,
}) {
  const hasPagination =
    pagination &&
    typeof pagination.currentPage === "number" &&
    typeof pagination.totalPages === "number" &&
    typeof pagination.onPageChange === "function";

  if (!data.length && emptyState) {
    return emptyState;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.25rem] border border-[#27272A]/80 bg-[#141416]",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]",
        className
      )}
    >
      {(title || description || headerAction) && (
        <div className="flex flex-col gap-3 border-b border-[#27272A]/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0 space-y-1">
            {title ? (
              <h2 className="text-[15px] font-medium tracking-tight text-[#FAFAFA]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-sm text-[#71717A]">{description}</p>
            ) : null}
          </div>
          {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
        </div>
      )}

      <div className="hidden md:block">
        <div className="relative max-h-[min(72vh,760px)] overflow-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <thead
              className={cn(
                stickyHeader && "sticky top-0 z-10",
                "bg-[#141416]/90 backdrop-blur-md"
              )}
            >
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    style={column.width ? { width: column.width } : undefined}
                    className={cn(
                      "border-b border-[#27272A]/60 px-5 py-3.5 text-[11px] font-medium tracking-[0.04em] text-[#71717A] uppercase sm:px-6",
                      getAlignClass(column.align),
                      getColumnVisibilityClass(column),
                      column.headerClassName
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => {
                const rowId = getRowId(row, index);

                return (
                  <tr
                    key={rowId}
                    onClick={
                      onRowClick ? () => onRowClick(row) : undefined
                    }
                    onKeyDown={
                      onRowClick
                        ? (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onRowClick(row);
                            }
                          }
                        : undefined
                    }
                    tabIndex={onRowClick ? 0 : undefined}
                    role={onRowClick ? "link" : undefined}
                    className={cn(
                      "group transition-colors duration-200",
                      "hover:bg-[#1A1A1D]",
                      "last:[&>td]:border-b-0",
                      onRowClick && "cursor-pointer"
                    )}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${rowId}-${column.id}`}
                        className={cn(
                          "border-b border-[#27272A]/40 px-5 py-5 align-middle sm:px-6",
                          "transition-colors duration-200",
                          getAlignClass(column.align),
                          getColumnVisibilityClass(column),
                          column.className
                        )}
                      >
                        {resolveCellValue(row, column)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {typeof renderMobileCard === "function" && (
        <div className="divide-y divide-[#27272A]/50 md:hidden">
          {data.map((row, index) => (
            <Fragment key={getRowId(row, index)}>
              <div className="transition-colors duration-200 hover:bg-[#1A1A1D]">
                {renderMobileCard(row)}
              </div>
            </Fragment>
          ))}
        </div>
      )}

      {hasPagination ? (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={pagination.onPageChange}
          showSummary={pagination.showSummary}
          siblingCount={pagination.siblingCount}
          className="border-[#27272A]/60 px-5 py-4 sm:px-6"
        />
      ) : null}
    </div>
  );
}
