import { Link, useLocation } from "react-router-dom";
import {
  AudioWaveform,
  BarChart3,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Video,
} from "lucide-react";

import { dashboard } from "@/components/dashboard/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function SidebarBrand({ collapsed }) {
  return (
    <Link
      to="/dashboard"
      className={cn(
        "flex h-10 items-center gap-2.5 rounded-lg px-2 transition-colors hover:bg-[#18181B]",
        collapsed && "justify-center px-0"
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
        <AudioWaveform className="size-4 text-[#3B82F6]" strokeWidth={2} />
      </div>
      {!collapsed && (
        <span className="truncate text-sm font-semibold tracking-tight text-[#FAFAFA]">
          Echo<span className="text-[#3B82F6]">AI</span>
        </span>
      )}
    </Link>
  );
}

function SidebarNav({ collapsed, onNavigate }) {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-2" aria-label="Dashboard">
      {[
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Meetings", href: "/meeting", icon: Video },
        { label: "Search", href: "#", icon: Search },
        { label: "Analytics", href: "#", icon: BarChart3 },
        { label: "Settings", href: "#", icon: Settings },
      ].map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href !== "#" &&
          (pathname === item.href ||
            (item.href === "/meeting" && pathname.startsWith("/meeting/")));

        return (
          <Link
            key={item.label}
            to={item.href}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            className={cn(
              "flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm font-medium transition-colors duration-200",
              collapsed && "justify-center px-0",
              isActive ? dashboard.navActive : dashboard.navIdle
            )}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.75} />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ collapsed }) {
  return (
    <div className="space-y-2 px-2">
      <Separator className="bg-[#27272A]" />

      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-2 py-2",
          collapsed && "justify-center px-0"
        )}
      >
        <Avatar size="sm" className="size-8 border border-[#27272A]">
          <AvatarFallback className="bg-[#18181B] text-xs font-medium text-[#FAFAFA]">
            UM
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#FAFAFA]">
              Upasana M.
            </p>
            <p className="truncate text-xs text-[#71717A]">upasana@echo.ai</p>
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        className={cn(
          "h-9 w-full justify-start gap-3 px-2.5 text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]",
          collapsed && "w-9 justify-center px-0"
        )}
        title={collapsed ? "Logout" : undefined}
      >
        <LogOut className="size-4 shrink-0" strokeWidth={1.75} />
        {!collapsed && <span className="text-sm font-medium">Logout</span>}
      </Button>
    </div>
  );
}

export default function DashboardSidebar({
  collapsed = false,
  onNavigate,
  className,
}) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-[#27272A] bg-[#09090B]",
        className
      )}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-[#27272A] px-3">
        <SidebarBrand collapsed={collapsed} />
      </div>

      <div className="flex flex-1 flex-col py-4">
        <SidebarNav collapsed={collapsed} onNavigate={onNavigate} />
      </div>

      <div className="shrink-0 pb-4">
        <SidebarFooter collapsed={collapsed} />
      </div>
    </aside>
  );
}
