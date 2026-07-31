import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

import { cn } from "@/lib/utils"

function Toaster({ className, ...props }) {
  return (
    <Sonner
      theme="dark"
      className={cn("toaster group", className)}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast border-[#27272A] bg-[#18181B] text-[#FAFAFA] shadow-lg",
          description: "text-[#A1A1AA]",
          actionButton: "bg-[#3B82F6] text-white",
          cancelButton: "bg-[#27272A] text-[#A1A1AA]",
        },
      }}
      {...props}
    />
  );
}

export { Toaster }
