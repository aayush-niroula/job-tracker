import { useParams, useNavigate } from "react-router-dom";
import { ApplicationForm } from "@/components/ApplicationForm";
import { type ApplicationFormData } from "@/types/application";

const mockApplications: Record<string, ApplicationFormData> = {
  "1": {
    company_name: "Tech Corp",
    job_title: "Frontend Developer",
    job_type: "Full-time",
    status: "Applied",
    applied_date: "2026-06-15",
    notes: "Great opportunity",
  },
  "2": {
    company_name: "Startup Inc",
    job_title: "Intern",
    job_type: "Internship",
    status: "Interviewing",
    applied_date: "2026-06-10",
    notes: "",
  },
};

export default function EditApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const initialData = id ? mockApplications[id] : undefined;

  const handleSubmit = (data: ApplicationFormData) => {
    console.log("Updated application:", { id, ...data });
    navigate("/");
  };

  if (!initialData) {
    return (
      <div className="container mx-auto p-4">
        <p>Application not found</p>
      </div>
    );
  }

 return (
  <div className="min-h-screen flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Edit Application
      </h1>

      <div className="bg-card border rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
        <ApplicationForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Update Application"
        />
      </div>
    </div>
  </div>
);
}