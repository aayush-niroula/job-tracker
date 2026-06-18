import { Link, Navigate, useParams } from "react-router-dom";
import { type Application } from "@/types/application";
import { StatusBadge } from "@/components/StatusBadge";
import { useGetApplicationQuery } from "@/app/application";
import { ArrowLeft, Building2, Briefcase, Calendar, Clock, FileText, Pencil } from "lucide-react";

function getJobTypeLabel(jobType: Application["job_type"]): string {
  const labels: Record<Application["job_type"], string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    INTERNSHIP: "Internship",
  };
  return labels[jobType];
}

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
  const { data: application, isLoading, error } = useGetApplicationQuery(id!, { skip: !id });

  if (!id) return <Navigate to="/" replace />;
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading application...</p>
      </div>
    </div>
  );
  if (error || !application) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-destructive/10 text-destructive rounded-lg text-center">
        <p className="font-medium">Application not found</p>
        <Link to="/" className="inline-flex items-center gap-2 mt-3 text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Go back to applications
        </Link>
      </div>
    </div>
  );

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
              {getJobTypeLabel(application.job_type)}
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