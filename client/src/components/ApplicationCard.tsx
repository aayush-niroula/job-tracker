import { Link } from "react-router-dom";
import { type Application } from "@/types/application";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2, Eye, Building2, Briefcase, Calendar } from "lucide-react";

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ApplicationCard({ application, onDelete, isDeleting }: ApplicationCardProps) {
  const { id, company_name, job_title, status, applied_date } = application;

  return (
    <div className="group relative bg-card border border-border/50 rounded-xl p-5 transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
         
          <div className="shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate leading-tight">
              {company_name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
              <Briefcase className="w-3 h-3 shrink-0" />
              <span className="truncate">{job_title}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Link to={`/applications/${id}`}>
            <button
              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              title="View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </Link>
          <Link to={`/applications/${id}/edit`}>
            <button
              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </Link>
          <button
            onClick={() => onDelete(id)}
            disabled={isDeleting}
            className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

     
      <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-border/50">
        <StatusBadge status={status} />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{new Date(applied_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>
    </div>
  );
}