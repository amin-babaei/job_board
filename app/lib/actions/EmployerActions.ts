"use server";

import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type State = { error: string | null };
type ChangeStatusState = { error: string | null; success?: boolean };
type DeleteState = { error: string | null; success?: boolean };

export async function deleteJob(prevState: DeleteState, formData: FormData): Promise<DeleteState> {
  const jobId = formData.get("job_id") as string;

  if (!jobId) {
    return { error: "شناسه آگهی یافت نشد" };
  }

  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const { data: job } = await supabase
    .from("job_posts")
    .select("employer_id")
    .eq("id", jobId)
    .single();

  if (!job) {
    return { error: "آگهی یافت نشد" };
  }

  const { data: employer } = await supabase
    .from("employers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!employer || job.employer_id !== employer.id) {
    return { error: "دسترسی غیرمجاز" };
  }

  const { error } = await supabase
    .from("job_posts")
    .delete()
    .eq("id", jobId);

  if (error) {
    console.error("Delete job error:", error);
    return { error: "خطا در حذف آگهی" };
  }

  revalidatePath("/profile/employer");
  return { success: true, error: null };
}

export async function createJob(prevState: State, formData: FormData): Promise<State> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const city = formData.get("city") as string;
  const job_type = formData.get("job_type") as "full_time" | "part_time" | "remote";
  const category_id = formData.get("category_id") as string | null;
  const salary_min = formData.get("salary_min") ? Number(formData.get("salary_min")) : null;
  const salary_max = formData.get("salary_max") ? Number(formData.get("salary_max")) : null;
  const employer_id = formData.get("employer_id") as string;

  if (!title || !description || !city || !job_type || !employer_id) {
    return { error: "همه فیلدهای اجباری را پر کنید" };
  }

  if (salary_min && salary_max && salary_min > salary_max) {
    return { error: "حداقل حقوق نمی‌تواند بیشتر از حداکثر باشد" };
  }

  const supabase = await createSupabaseServerClient();

  const { data: employer } = await supabase
    .from("employers")
    .select("id")
    .eq("id", employer_id)
    .single();

  if (!employer) {
    return { error: "دسترسی غیرمجاز" };
  }

  const { error: insertError } = await supabase.from("job_posts").insert({
    employer_id,
    title,
    description,
    city,
    job_type,
    salary_min,
    salary_max,
    category_id: category_id || null,
  });

  if (insertError) {
    console.error("Job insert error:", insertError);
    return { error: "خطا در انتشار آگهی. دوباره امتحان کنید." };
  }

  revalidatePath("/profile/employer");
  redirect("/profile/employer");
}

export async function changeApplicationStatus(
  prevState: ChangeStatusState,
  formData: FormData
): Promise<ChangeStatusState> {
  const applicationId = formData.get("application_id") as string;
  const newStatus = formData.get("status") as "pending" | "reviewed" | "accepted" | "rejected";

  console.log("Changing status for application:", applicationId, "to", newStatus);

  if (!applicationId || !newStatus) {
    return { error: "داده‌های ناقص" };
  }

  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "کاربر لاگین نیست" };
  }

  const { data: application, error: appError } = await supabase
    .from("job_applications")
    .select("job_post_id")
    .eq("id", applicationId)
    .single();

  if (appError || !application) {
    console.error("Application fetch error:", appError);
    return { error: "درخواست یافت نشد" };
  }

  const { data: jobPost, error: jobError } = await supabase
    .from("job_posts")
    .select("employer_id")
    .eq("id", application.job_post_id)
    .single();

  if (jobError || !jobPost) {
    console.error("Job post fetch error:", jobError);
    return { error: "آگهی یافت نشد" };
  }

  const { data: employer, error: employerError } = await supabase
    .from("employers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (employerError || !employer || jobPost.employer_id !== employer.id) {
    console.error("Permission error:", { employerError, employer, jobPost });
    return { error: "دسترسی غیرمجاز" };
  }

  const { error: updateError } = await supabase
    .from("job_applications")
    .update({ status: newStatus })
    .eq("id", applicationId);

  if (updateError) {
    return { error: `خطا در تغییر وضعیت: ${updateError.message}` };
  }

  revalidatePath("/profile/employer");
  return { success: true, error: null };
}