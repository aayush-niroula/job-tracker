import { type ApplicationStatus } from "@/types/application";
import { Send, MessageCircle, BadgeCheck, XCircle, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusFilterProps {
  selectedStatus: ApplicationStatus | "All";
  onStatusChange: (status: ApplicationStatus | "All") => void;
}

const statusLabels: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  INTERVIEWING: "Interviewing",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

const filterConfig: Record<
  ApplicationStatus | "All",
  { icon: React.ReactNode; activeClasses: string }
> = {
  All: {
    icon: <LayoutGrid className="w-3 h-3" />,
    activeClasses: "bg-foreground text-background border-foreground",
  },
  APPLIED: {
    icon: <Send className="w-3 h-3" />,
    activeClasses: "bg-blue-50 text-blue-600 border-blue-200",
  },
  INTERVIEWING: {
    icon: <MessageCircle className="w-3 h-3" />,
    activeClasses: "bg-amber-50 text-amber-600 border-amber-200",
  },
  OFFER: {
    icon: <BadgeCheck className="w-3 h-3" />,
    activeClasses: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  REJECTED: {
    icon: <XCircle className="w-3 h-3" />,
    activeClasses: "bg-rose-50 text-rose-500 border-rose-200",
  },
};

const statuses: (ApplicationStatus | "All")[] = [
  "All",
  "APPLIED",
  "INTERVIEWING",
  "OFFER",
  "REJECTED",
];

export function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const { icon, activeClasses } = filterConfig[status];
        const isActive = selectedStatus === status;
        const label = status === "All" ? "All" : statusLabels[status as ApplicationStatus];

        return (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150",
              isActive
                ? activeClasses
                : "bg-background text-muted-foreground border-border/50 hover:border-border hover:text-foreground"
            )}
          >
            {icon}
            {label}
          </button>
        );
      })}
    </div>
  );
}