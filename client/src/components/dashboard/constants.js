export const dashboard = {
  bg: "bg-[#09090B]",
  sidebar: "bg-[#09090B]",
  border: "border-[#27272A]",
  text: "text-[#FAFAFA]",
  textSecondary: "text-[#A1A1AA]",
  textMuted: "text-[#71717A]",
  accent: "text-[#3B82F6]",
  accentBg: "bg-[#3B82F6]",
  surface: "bg-[#18181B]",
  navActive: "bg-[#18181B] text-[#FAFAFA]",
  navIdle:
    "text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]",
};

export const SIDEBAR_WIDTH = {
  expanded: 240,
  collapsed: 72,
};

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Meetings", href: "/meeting", icon: "Video" },
  { label: "Search", href: "#", icon: "Search" },
  { label: "Analytics", href: "#", icon: "BarChart3" },
  { label: "Settings", href: "#", icon: "Settings" },
];
