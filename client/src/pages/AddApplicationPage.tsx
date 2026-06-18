import { useNavigate } from "react-router-dom";
import { ApplicationForm } from "@/components/ApplicationForm";
import { useAddApplicationMutation } from "@/app/application";
import type { ApplicationFormData } from "@/types/application";

export default function AddApplicationPage() {
  const navigate = useNavigate();
  const [addApplication, { isLoading, error }] = useAddApplicationMutation();

  const handleSubmit = async (data: ApplicationFormData) => {
    try {
      await addApplication(data).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to create application:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Add New Application
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
            Failed to create application. Please try again.
          </div>
        )}

        <div className="bg-card border rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
          <ApplicationForm
            onSubmit={handleSubmit}
            submitLabel={isLoading ? "Creating..." : "Create Application"}
          />
        </div>
      </div>
    </div>
  );
}