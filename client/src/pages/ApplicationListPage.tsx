import { useState } from "react";
import { Link } from "react-router-dom";
import { type ApplicationStatus } from "@/types/application";
import { ApplicationCard } from "@/components/ApplicationCard";
import { StatusFilter } from "@/components/StatusFilter";
import { useListApplicationsQuery, useDeleteApplicationMutation } from "@/app/application";
import { Plus, BriefcaseBusiness, ChevronLeft, ChevronRight, Search, RefreshCw } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function ApplicationListPage() {
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "All">("All");
  const [search, setSearch] = useState("");
  const { data, isLoading, error, refetch } = useListApplicationsQuery({
    status: selectedStatus !== "All" ? selectedStatus : undefined,
    search: search || undefined,
    page,
    limit: ITEMS_PER_PAGE,
  });
  const [deleteApplication] = useDeleteApplicationMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteApplication(id).unwrap();
      } catch (err) {
        console.error("Failed to delete application:", err);
      }
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading applications...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-destructive/10 text-destructive rounded-lg text-center">
        <p className="font-medium">Failed to load applications</p>
        <p className="text-xs mt-1 mb-3">Please check your connection and try again.</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 text-sm hover:underline"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    </div>
  );

  const applications = data?.applications ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.total ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

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

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by company or job title..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border/60 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all duration-150"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: total },
            {
              label: "Active",
              value: applications.filter((a) =>
                ["APPLIED", "INTERVIEWING"].includes(a.status)
              ).length,
            },
            {
              label: "Offers",
              value: applications.filter((a) => a.status === "OFFER").length,
            },
            {
              label: "Rejected",
              value: applications.filter((a) => a.status === "REJECTED").length,
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
            onStatusChange={(status) => {
              setSelectedStatus(status);
              setPage(1);
              setSearch("");
            }}
          />
        </div>

        {/* List */}
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
              <BriefcaseBusiness className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No applications found</p>
            <p className="text-xs text-muted-foreground mt-1">
              {search
                ? `No results for "${search}".`
                : selectedStatus === "All"
                ? "Add your first application to get started."
                : `No applications with status "${selectedStatus}".`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/50 text-sm hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/50 text-sm hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}