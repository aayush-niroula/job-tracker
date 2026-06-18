import { useState } from "react";
import { type ApplicationFormData } from "@/types/application";
import { Building2, Briefcase, CalendarDays, FileText, Tag, Clock } from "lucide-react";

interface ApplicationFormProps {
  initialData?: ApplicationFormData;
  onSubmit: (data: ApplicationFormData) => void;
  submitLabel: string;
}

interface FormErrors {
  company_name?: string;
  job_title?: string;
  applied_date?: string;
}

const inputBase =
  "w-full px-3 py-2 text-sm bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all duration-150";

const inputClass = `${inputBase} border-border/60 focus:border-border`;
const inputErrorClass = `${inputBase} border-destructive/60 focus:border-destructive focus:ring-destructive/10`;

const labelClass =
  "flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
}

export function ApplicationForm({ initialData, onSubmit, submitLabel }: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>(
    initialData || {
      company_name: "",
      job_title: "",
      job_type: "FULL_TIME",
      status: "APPLIED",
      applied_date: "",
      notes: undefined,
    }
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (data: ApplicationFormData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.company_name.trim()) {
      errs.company_name = "Company name is required.";
    } else if (data.company_name.trim().length < 2) {
      errs.company_name = "Company name must be at least 2 characters.";
    }
    if (!data.job_title.trim()) {
      errs.job_title = "Job title is required.";
    }
    if (!data.applied_date) {
      errs.applied_date = "Applied date is required.";
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { company_name: true, job_title: true, applied_date: true };
    setTouched(allTouched);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 w-full max-w-lg">

      {/* Company Name */}
      <div>
        <label className={labelClass}>
          <Building2 className="w-3 h-3" />
          Company Name
          <span className="text-foreground/30 normal-case tracking-normal font-normal ml-0.5">*</span>
        </label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Acme Corp"
          className={errors.company_name ? inputErrorClass : inputClass}
        />
        <FieldError message={errors.company_name} />
      </div>

      {/* Job Title */}
      <div>
        <label className={labelClass}>
          <Briefcase className="w-3 h-3" />
          Job Title
          <span className="text-foreground/30 normal-case tracking-normal font-normal ml-0.5">*</span>
        </label>
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Frontend Developer"
          className={errors.job_title ? inputErrorClass : inputClass}
        />
        <FieldError message={errors.job_title} />
      </div>

      {/* Job Type + Status */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>
            <Clock className="w-3 h-3" /> Job Type
          </label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>
            <Tag className="w-3 h-3" /> Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applied Date */}
      <div>
        <label className={labelClass}>
          <CalendarDays className="w-3 h-3" />
          Applied Date
          <span className="text-foreground/30 normal-case tracking-normal font-normal ml-0.5">*</span>
        </label>
        <input
          type="date"
          name="applied_date"
          value={formData.applied_date}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.applied_date ? inputErrorClass : inputClass}
        />
        <FieldError message={errors.applied_date} />
      </div>

      {/* Notes — optional */}
      <div>
        <label className={labelClass}>
          <FileText className="w-3 h-3" />
          Notes
          <span className="text-muted-foreground/40 normal-case tracking-normal font-normal ml-1 text-[10px]">optional</span>
        </label>
<textarea
              name="notes"
              value={formData.notes ?? ""}
              onChange={handleChange}
              rows={4}
              placeholder="Anything worth remembering about this role…"
              className={`${inputClass} resize-none`}
            />
      </div>

      {/* Submit */}
      <div className="pt-1 border-t border-border/50">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center bg-foreground text-background text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 active:opacity-80 transition-opacity duration-150 mt-3"
        >
          {submitLabel}
        </button>
      </div>

    </form>
  );
}