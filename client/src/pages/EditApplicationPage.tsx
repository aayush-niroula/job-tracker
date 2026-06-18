import { useNavigate, useParams } from "react-router-dom";
import { ApplicationForm } from "@/components/ApplicationForm";
import { useGetApplicationQuery, useUpdateApplicationMutation } from "@/app/application";
import type { ApplicationFormData } from "@/types/application";

export default function EditApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateApplication, { isLoading, error: updateError }] = useUpdateApplicationMutation();
  const { data: application, isLoading: isLoadingApp, error: fetchError } = useGetApplicationQuery(id!, { skip: !id });

  const handleSubmit = async (data: ApplicationFormData) => {
    if (!id) return;
    try {
      await updateApplication({ id, data }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to update application:", err);
    }
  };

  if (isLoadingApp) return <div className="p-8 text-center">Loading application...</div>;
  if (fetchError || !application) return <div className="p-8 text-center text-destructive">Application not found</div>;

  const initialData: ApplicationFormData = {
    company_name: application.company_name,
    job_title: application.job_title,
    job_type: application.job_type,
    status: application.status,
    applied_date: application.applied_date,
    notes: application.notes ?? "",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Edit Application
        </h1>

        {updateError && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
            Failed to update application. Please try again.
          </div>
        )}

        <div className="bg-card border rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
          <ApplicationForm
            initialData={initialData}
            onSubmit={handleSubmit}
            submitLabel={isLoading ? "Updating..." : "Update Application"}
          />
        </div>
      </div>
    </div>
  );
}