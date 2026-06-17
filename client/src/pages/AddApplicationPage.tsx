import { useNavigate } from "react-router-dom";
import { ApplicationForm } from "@/components/ApplicationForm";
import { type ApplicationFormData } from "@/types/application";

export default function AddApplicationPage() {
  const navigate = useNavigate();

  const handleSubmit = (data: ApplicationFormData) => {
    console.log("New application:", data);
    navigate("/");
  };

 return (
  <div className="min-h-screen flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Add New Application
      </h1>

      <div className="bg-card border rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
        <ApplicationForm
          onSubmit={handleSubmit}
          submitLabel="Create Application"
        />
      </div>
    </div>
  </div>
)
}