"use server";
import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { Employer } from "@typess/index";

export async function getEmployerByUserId(userId: string): Promise<Employer | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getEmployerJobs(employerId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("job_posts")
    .select("id, serial_id, title, city, job_type, created_at")
    .eq("employer_id", employerId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching employer jobs:", error.message, error.code, error.details);
    return { data: [], error: error.message };
  }

  if (!data) {
    console.log("No jobs found for employerId:", employerId);
    return { data: [], error: null };
  }

  return { data, error: null };
}