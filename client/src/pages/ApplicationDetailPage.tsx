import { Link, Navigate, useParams } from "react-router-dom";
import { type Application } from "@/types/application";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Building2, Briefcase, Calendar, Clock, FileText, Pencil } from "lucide-react";

const mockApplications: Application[] = [
  {
    id: "1",
    company_name: "Tech Corp",
    job_title: "Frontend Developer",
    job_type: "Full-time",
    status: "Applied",
    applied_date: "2026-06-15",
    notes: "Great opportunity",
    created_at: "2026-06-15T10:00:00Z",
    updated_at: "2026-06-15T10:00:00Z",
  },
  {
    id: "2",
    company_name: "Startup Inc",
    job_title: "Intern",
    job_type: "Internship",
    status: "Interviewing",
    applied_date: "2026-06-10",
    notes: "",
    created_at: "2026-06-10T10:00:00Z",
    updated_at: "2026-06-12T10:00:00Z",
  },
];

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-border/40 last:border-0">
      <div className="mt-0.5 shrink-0 text-muted-foreground">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
          {label}
        </p>
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const application = id ? mockApplications.find((app) => app.id === id) : undefined;

  if (!application) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">

        {/* Nav */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link to="/">
            <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </Link>
          <Link to={`/applications/${application.id}/edit`}>
            <button className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 active:opacity-80 transition-opacity duration-150">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          </Link>
        </div>

        <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-start gap-4 p-6 border-b border-border/40">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold text-foreground tracking-tight truncate">
                {application.company_name}
              </h1>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{application.job_title}</span>
              </div>
            </div>
            <StatusBadge status={application.status} />
          </div>

          {/* Detail rows */}
          <div className="px-6 py-1">
            <DetailRow icon={<Clock className="w-4 h-4" />} label="Job Type">
              {application.job_type}
            </DetailRow>

            <DetailRow icon={<Calendar className="w-4 h-4" />} label="Applied Date">
              {new Date(application.applied_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </DetailRow>

            {application.notes ? (
              <DetailRow icon={<FileText className="w-4 h-4" />} label="Notes">
                <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                  {application.notes}
                </p>
              </DetailRow>
            ) : null}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-muted/30 border-t border-border/40">
            <p className="text-xs text-muted-foreground">
              Last updated{" "}
              {new Date(application.updated_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}