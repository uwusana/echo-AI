import { useState } from "react";
import { Check, ListChecks } from "lucide-react";

import { PriorityBadge } from "@/components/data-table/cells";
import DetailSectionCard from "@/components/meeting-detail/DetailSectionCard";
import { cn } from "@/lib/utils";

function ActionItemRow({ item, onToggle }) {
  return (
    <li
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-[#27272A]/50 bg-[#0F0F11] px-4 py-4 transition-colors duration-200",
        "hover:border-[#27272A] hover:bg-[#121214]",
        "sm:flex-row sm:items-center sm:justify-between"
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          aria-pressed={item.completed}
          aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
            item.completed
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
              : "border-[#3F3F46] bg-transparent text-transparent hover:border-[#52525B]"
          )}
        >
          <Check className="size-3" strokeWidth={2.5} />
        </button>

        <div className="min-w-0 space-y-1.5">
          <p
            className={cn(
              "text-[13px] font-medium tracking-tight",
              item.completed
                ? "text-[#71717A] line-through"
                : "text-[#FAFAFA]"
            )}
          >
            {item.task}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#71717A]">
            <span>{item.assignee}</span>
            <span className="text-[#3F3F46]">·</span>
            <span>Due {item.dueDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pl-8 sm:pl-0">
        <PriorityBadge priority={item.priority} />
        <span
          className={cn(
            "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ring-1 ring-inset",
            item.completed
              ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/15"
              : "bg-zinc-500/10 text-zinc-400 ring-zinc-500/15"
          )}
        >
          {item.completed ? "Done" : "Open"}
        </span>
      </div>
    </li>
  );
}

export default function ActionItemsCard({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);

  const toggle = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const openCount = items.filter((item) => !item.completed).length;

  return (
    <DetailSectionCard
      title="Action Items"
      description={`${openCount} open · ${items.length} total`}
      icon={ListChecks}
    >
      <ul className="space-y-2.5">
        {items.map((item) => (
          <ActionItemRow key={item.id} item={item} onToggle={toggle} />
        ))}
      </ul>
    </DetailSectionCard>
  );
}
