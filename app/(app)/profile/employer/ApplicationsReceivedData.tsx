import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { getEmployerJobs } from "@services/employer";
import { JobApplication, JobPost } from "@typess/index";

export default async function ApplicationsReceivedData({ employerId }: { employerId: string }) {
  const supabase = await createSupabaseServerClient();

  const result = await getEmployerJobs(employerId);

  if (result.error || !result.data || result.data.length === 0) {
    return { applications: [] as JobApplication[] };
  }

  const jobPosts = result.data as JobPost[];
  const jobPostIds = jobPosts.map((jp) => jp.id);
  
  const jobPostsMap = new Map<string, JobPost>(
    jobPosts.map((jp) => [jp.id, jp])
  );

  const { data: applications } = await supabase
    .from("job_applications")
    .select(`
      id,
      applied_at,
      status,
      cover_letter,
      resume_file_url,
      applicant_id,
      job_post_id
    `)
    .in("job_post_id", jobPostIds)
    .order("applied_at", { ascending: false });

  if (!applications || applications.length === 0) {
    return { applications: [] as JobApplication[] };
  }

  const applicantIds = [...new Set(applications.map((app) => app.applicant_id))];

  const { data: seekers } = await supabase
    .from("job_seekers")
    .select("user_id, full_name, email, phone")
    .in("user_id", applicantIds);

  const seekersMap = new Map(seekers?.map((s) => [s.user_id, s]) || []);

  const applicationsWithExtras = await Promise.all(
    applications.map(async (app) => {
      let signedUrl = null;

      if (app.resume_file_url) {
        const filePath = app.resume_file_url.includes("/resumes/") 
            ? app.resume_file_url.split("/resumes/")[1] 
            : app.resume_file_url;

        if (filePath) {
          const { data } = await supabase.storage
            .from("resumes")
            .createSignedUrl(filePath, 60 * 60 * 24 * 7);
          signedUrl = data?.signedUrl || null;
        }
      }
      const jobPostInfo = jobPostsMap.get(app.job_post_id);

      if (!jobPostInfo) return null; 

      return {
        id: app.id,
        applied_at: app.applied_at,
        status: app.status,
        cover_letter: app.cover_letter,
        resume_file_url: app.resume_file_url,
        signed_resume_url: signedUrl,
        applicant_id: app.applicant_id,
        job_posts: jobPostInfo,
        seeker: seekersMap.get(app.applicant_id) || null,
      } as JobApplication;
    })
  );

  const filteredApplications = applicationsWithExtras.filter((app): app is JobApplication => app !== null);

  return { applications: filteredApplications };
}