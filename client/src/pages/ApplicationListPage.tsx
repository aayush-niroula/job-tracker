import { useState } from "react";
import { Link } from "react-router-dom";
import { type Application, type ApplicationStatus } from "@/types/application";
import { ApplicationCard } from "@/components/ApplicationCard";
import { StatusFilter } from "@/components/StatusFilter";
import { Plus, BriefcaseBusiness } from "lucide-react";

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
    created_at: "2026-06-10T10:00:00Z",
    updated_at: "2026-06-12T10:00:00Z",
  },
];

export default function ApplicationListPage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "All">("All");

  const filteredApplications = applications.filter(
    (app) => selectedStatus === "All" || app.status === selectedStatus
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((app) => app.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
              Dashboard
            </p>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Applications
            </h1>
          </div>
          <Link to="/applications/new">
            <button className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 active:opacity-80 transition-opacity duration-150">
              <Plus className="w-4 h-4" />
              <span>Add new</span>
            </button>
          </Link>
        </div>

    
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: applications.length },
            {
              label: "Active",
              value: applications.filter((a) =>
                ["Applied", "Interviewing"].includes(a.status)
              ).length,
            },
            {
              label: "Offers",
              value: applications.filter((a) => a.status === "Offer").length,
            },
            {
              label: "Rejected",
              value: applications.filter((a) => a.status === "Rejected").length,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-muted/50 rounded-xl px-4 py-3 text-center border border-border/40"
            >
              <p className="text-xl font-semibold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>

        {/* List */}
        {filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
              <BriefcaseBusiness className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No applications yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedStatus === "All"
                ? "Add your first application to get started."
                : `No applications with status "${selectedStatus}".`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}