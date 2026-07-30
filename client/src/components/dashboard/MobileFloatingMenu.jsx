import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AudioWaveform,
  BarChart3,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Video,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Meetings", href: "/meeting", icon: Video },
  { label: "Search", href: "#", icon: Search },
  { label: "Analytics", href: "#", icon: BarChart3 },
  { label: "Settings", href: "#", icon: Settings },
];

export default function MobileFloatingMenu({ open, onOpenChange }) {
  const location = useLocation();

  const close = () => onOpenChange(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed top-3 left-3 z-50 flex w-[68%] max-w-72 max-h-[min(88dvh,640px)] flex-col overflow-hidden rounded-2xl lg:hidden",
              "border border-white/10 bg-[#18181B]/75 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)]",
              "backdrop-blur-xl backdrop-saturate-150"
            )}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <Link
                to="/dashboard"
                onClick={close}
                className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <AudioWaveform
                    className="size-4 text-[#3B82F6]"
                    strokeWidth={2}
                  />
                </div>
                <span className="text-sm font-semibold tracking-tight text-[#FAFAFA]">
                  Echo<span className="text-[#3B82F6]">AI</span>
                </span>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={close}
                className="size-8 text-[#A1A1AA] hover:bg-white/5 hover:text-[#FAFAFA]"
                aria-label="Close navigation menu"
              >
                <X className="size-4" />
              </Button>
            </div>

            <nav
              className="flex-1 overflow-y-auto px-3 py-3"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href !== "#" &&
                    (location.pathname === item.href ||
                      (item.href === "/meeting" &&
                        location.pathname.startsWith("/meeting/")));

                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        onClick={close}
                        className={cn(
                          "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-200",
                          isActive
                            ? "bg-white/10 text-[#FAFAFA]"
                            : "text-[#A1A1AA] hover:bg-white/5 hover:text-[#FAFAFA]"
                        )}
                      >
                        <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-white/10 px-3 py-3">
              <div className="mb-2 flex items-center gap-3 rounded-xl px-2 py-2">
                <Avatar size="sm" className="size-8 border border-white/10">
                  <AvatarFallback className="bg-white/5 text-xs font-medium text-[#FAFAFA]">
                    UM
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#FAFAFA]">
                    Upasana M.
                  </p>
                  <p className="truncate text-xs text-[#71717A]">
                    upasana@echo.ai
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                className="h-10 w-full justify-start gap-3 px-3 text-[#A1A1AA] hover:bg-white/5 hover:text-[#FAFAFA]"
              >
                <LogOut className="size-4 shrink-0" strokeWidth={1.75} />
                <span className="text-sm font-medium">Logout</span>
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
