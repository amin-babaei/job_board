"use server";

import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { JobApplication } from "@typess/index";

export async function getUserApplications(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data: applications, error } = await supabase
    .from("job_applications")
    .select(`
      id,
      applied_at,
      status,
      job_posts (
        serial_id,
        title,
        city,
        employers (company_name)
      )
    `)
    .eq("applicant_id", userId)
    .order("applied_at", { ascending: false })
    .returns<JobApplication[]>();

  if (error) {
    console.error("Error fetching user applications:", error);
    return { applications: [], error: error.message };
  }

  if (!applications || applications.length === 0) {
    return { applications: [], error: null };
  }

  return { applications, error: null };
}