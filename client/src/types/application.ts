export type JobType = "Internship" | "Full-time" | "Part-time";

export type ApplicationStatus = "Applied" | "Interviewing" | "Offer" | "Rejected";

export interface Application {
  id: string;
  company_name: string;
  job_title: string;
  job_type: JobType;
  status: ApplicationStatus;
  applied_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type ApplicationFormData = {
  company_name: string;
  job_title: string;
  job_type: JobType;
  status: ApplicationStatus;
  applied_date: string;
  notes: string;
};