import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPageRange } from "@/lib/pagination";
import { cn } from "@/lib/utils";

function PaginationRoot({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-1 sm:gap-1.5",
        className
      )}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }) {
  return <li className={cn("list-none", className)} {...props} />;
}

function PaginationLink({
  isActive = false,
  disabled = false,
  onClick,
  children,
  className,
  ...props
}) {
  return (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="icon-sm"
      disabled={disabled}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "size-8 min-w-8 text-sm font-medium transition-colors duration-200",
        isActive
          ? "border-0 bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:text-white"
          : "text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function PaginationPrevious({
  disabled,
  onClick,
  className,
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled}
      onClick={onClick}
      aria-label="Go to previous page"
      className={cn(
        "h-8 gap-1 border-[#27272A] bg-[#09090B] px-2.5 text-[#FAFAFA] hover:border-[#3F3F46] hover:bg-[#18181B] hover:text-[#FAFAFA] disabled:opacity-40 sm:px-3",
        className
      )}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:inline">Previous</span>
    </Button>
  );
}

function PaginationNext({
  disabled,
  onClick,
  className,
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled}
      onClick={onClick}
      aria-label="Go to next page"
      className={cn(
        "h-8 gap-1 border-[#27272A] bg-[#09090B] px-2.5 text-[#FAFAFA] hover:border-[#3F3F46] hover:bg-[#18181B] hover:text-[#FAFAFA] disabled:opacity-40 sm:px-3",
        className
      )}
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRight className="size-4" />
    </Button>
  );
}

function PaginationEllipsis({ className }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 items-center justify-center text-[#71717A]",
        className
      )}
    >
      <MoreHorizontal className="size-4" />
    </span>
  );
}

/**
 * Generic pagination control for any paginated list.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showSummary = true,
  siblingCount = 1,
  className,
}) {
  if (totalPages <= 1 && !showSummary) return null;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const pageRange = getPageRange(currentPage, totalPages, siblingCount);

  const startIndex =
    totalItems != null && itemsPerPage != null && totalItems > 0
      ? (currentPage - 1) * itemsPerPage + 1
      : null;
  const endIndex =
    totalItems != null && itemsPerPage != null
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 border-t border-[#27272A] px-4 py-4 sm:flex-row sm:px-5",
        className
      )}
    >
      {showSummary && totalItems != null && startIndex != null && endIndex != null ? (
        <p className="text-xs text-[#71717A] sm:text-sm">
          Showing{" "}
          <span className="font-medium text-[#A1A1AA]">
            {startIndex}–{endIndex}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[#A1A1AA]">{totalItems}</span>
        </p>
      ) : (
        <div />
      )}

      {totalPages > 1 && (
        <PaginationRoot>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={!canGoPrevious}
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>

            {pageRange.map((entry, index) =>
              entry === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={entry}>
                  <PaginationLink
                    isActive={entry === currentPage}
                    onClick={() => onPageChange(entry)}
                  >
                    {entry}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                disabled={!canGoNext}
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationRoot>
      )}
    </div>
  );
}

export {
  PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
