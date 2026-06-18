export type JobType = "INTERNSHIP" | "FULL_TIME" | "PART_TIME";

export type ApplicationStatus = "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED";

export interface Application {
  id: string;
  company_name: string;
  job_title: string;
  job_type: JobType;
  status: ApplicationStatus;
  applied_date: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type ApplicationFormData = {
  company_name: string;
  job_title: string;
  job_type: JobType;
  status: ApplicationStatus;
  applied_date: string;
  notes?: string;
};

export type ApplicationQueryParams = {
  status?: ApplicationStatus;
  search?: string;
  page?: number;
  limit?: number;
};