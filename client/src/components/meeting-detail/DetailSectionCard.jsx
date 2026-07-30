import { cn } from "@/lib/utils";

/**
 * Shared premium card shell for Meeting Details sections.
 */
export default function DetailSectionCard({
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
  bodyClassName,
  id,
}) {
  return (
    <section
      id={id}
      className={cn(
        "overflow-hidden rounded-[1.25rem] border border-[#27272A]/80 bg-[#141416]",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]",
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 border-b border-[#27272A]/60 px-5 py-4 sm:px-6">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2.5">
              {Icon ? (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#1A1A1D]">
                  <Icon className="size-3.5 text-[#3B82F6]" strokeWidth={1.75} />
                </div>
              ) : null}
              {title ? (
                <h2 className="text-[15px] font-medium tracking-tight text-[#FAFAFA]">
                  {title}
                </h2>
              ) : null}
            </div>
            {description ? (
              <p className="text-sm text-[#71717A]">{description}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}
      <div className={cn("px-5 py-5 sm:px-6", bodyClassName)}>{children}</div>
    </section>
  );
}
