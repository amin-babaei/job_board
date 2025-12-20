export type City = { name: string; latitude: string; longitude: string };

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export type JobType =
  | "full_time"
  | "part_time"
  | "remote";

export interface JobPost {
  id: string;
  employer_id: string;
  category_id: string;
  title: string;
  description: string;
  city: string;
  salary_min: number | null;
  salary_max: number | null;
  job_type: JobType;
  serial_id: string;
  created_at: string;
  employers: {
    company_name: string;
    email: string;
  };
  categories: {
    name: string;
  };
}

export type ServiceResult<T> = {
  data: T;
  error: string | null;
};