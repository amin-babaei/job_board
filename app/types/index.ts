export type City = {
  name: string;
  latitude: string;
  longitude: string;
};

export interface Category {
  id: string;
  name: string;
  slug?: string | null;
  created_at?: string;
}

export type JobType = "full_time" | "part_time" | "remote";

export interface Employer {
  id: string;
  user_id: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  created_at?: string;
}

export interface JobPost {
  id: string;
  employer_id: string;
  category_id: string | null;
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

export interface JobSeeker {
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  created_at?: string;
}

export interface JobApplication {
  id: string;
  applied_at: string;
  status: "pending" | "accepted" | "rejected";
  cover_letter: string | null;
  resume_file_url: string | null;
  signed_resume_url: string | null;
  applicant_id: string;

  job_posts: JobPost;

  seeker?: {
    user_id: string;
    full_name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
}
export type ServiceResult<T> = {
  data: T;
  error: string | null;
};