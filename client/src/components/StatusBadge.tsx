import { type ApplicationStatus } from "@/types/application";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { BadgeCheck, MessageCircle, Send, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusConfig: Record<ApplicationStatus, { classes: string; icon: ReactNode }> = {
  Applied: {
    classes: "bg-blue-50 text-blue-600 border border-blue-100",
    icon: <Send className="w-3 h-3" />,
  },
  Interviewing: {
    classes: "bg-amber-50 text-amber-600 border border-amber-100",
    icon: <MessageCircle className="w-3 h-3" />,
  },
  Offer: {
    classes: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    icon: <BadgeCheck className="w-3 h-3" />,
  },
  Rejected: {
    classes: "bg-rose-50 text-rose-500 border border-rose-100",
    icon: <XCircle className="w-3 h-3" />,
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { classes, icon } = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full",
        classes
      )}
    >
      {icon}
      {status}
    </span>
  );
}