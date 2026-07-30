import { useState } from "react";
import { motion } from "framer-motion";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import MobileFloatingMenu from "@/components/dashboard/MobileFloatingMenu";
import { SIDEBAR_WIDTH } from "@/components/dashboard/constants";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed
    ? SIDEBAR_WIDTH.collapsed
    : SIDEBAR_WIDTH.expanded;

  return (
    <div className="flex min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 left-0 z-30 hidden overflow-hidden lg:block"
      >
        <DashboardSidebar collapsed={collapsed} className="w-full" />
      </motion.aside>

      <MobileFloatingMenu open={mobileOpen} onOpenChange={setMobileOpen} />

      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-[margin] duration-300 ease-out lg:ml-[var(--sidebar-width)]"
        )}
        style={{ "--sidebar-width": `${sidebarWidth}px` }}
      >
        <DashboardTopbar
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
