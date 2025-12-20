import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { JobPost, ServiceResult } from "@typess/index";

export const getJob = async (id: string): Promise<ServiceResult<JobPost | null>> => {
  const supabase = await createSupabaseServerClient();

  const { data: job, error } = await supabase
    .from("job_posts")
    .select(`
      *,
      employers(company_name, email),
      categories(name, slug)
    `)
    .eq("serial_id", id)
    .single();

  if (error || !job) {
    return {
      data: null,
      error: error?.message || "آگهی یافت نشد",
    };
  }

  return {
    data: job,
    error: null,
  };
};

export const getJobs = async (
  filters: {
    city?: string;
    category?: string;
    jobType?: string;
    search?: string;
  },
  limit: number = 12,
  offset: number = 0
): Promise<ServiceResult<JobPost[]> & { count: number | null }> => {
  const supabase = await createSupabaseServerClient();

  const { city, category, jobType, search } = filters;

  let query = supabase
    .from("job_posts")
    .select(
      `
      *,
      employers(company_name),
      categories!inner(name, slug)
    `,
      { count: "exact" }
    )
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });

  if (city) query = query.eq("city", city);
  if (jobType) query = query.eq("job_type", jobType);
  if (category) query = query.eq("categories.slug", category);
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data: jobs, error, count } = await query;

  if (error) {
    return {
      data: [],
      count: null,
      error: error.message || "خطا در دریافت آگهی‌ها",
    };
  }

  return {
    data: jobs ?? [],
    count: count ?? 0,
    error: null,
  };
};