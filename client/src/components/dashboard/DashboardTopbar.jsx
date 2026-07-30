import { Bell, Menu, PanelLeft, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function DashboardTopbar({
  collapsed,
  onToggleSidebar,
  onOpenMobileMenu,
  className,
}) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-3 border-b border-[#27272A] bg-[#09090B] px-4 sm:gap-4 sm:px-6",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="hidden size-8 text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA] lg:inline-flex"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <PanelLeft className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onOpenMobileMenu}
        className="size-8 text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA] lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="size-4" />
      </Button>

      <div className="relative hidden min-w-0 flex-1 sm:block sm:max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#71717A]" />
        <Input
          type="search"
          placeholder="Search meetings, notes, decisions..."
          className="h-9 border-[#27272A] bg-[#18181B] pl-9 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus-visible:border-[#3F3F46] focus-visible:ring-[#3B82F6]/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA] sm:hidden"
          aria-label="Search"
        >
          <Search className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative size-8 text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#3B82F6]" />
        </Button>

        <Avatar className="size-8 border border-[#27272A]">
          <AvatarFallback className="bg-[#18181B] text-xs font-medium text-[#FAFAFA]">
            UM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
