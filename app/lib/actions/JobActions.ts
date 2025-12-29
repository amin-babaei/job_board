"use server";

import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { revalidatePath } from "next/cache";

type State = {
    error: string | null;
    success?: boolean;
};

export async function applyToJob(
    prevState: State,
    formData: FormData
): Promise<State> {
    const jobId = formData.get("job_id") as string;
    const coverLetter = (formData.get("cover_letter") as string) || null;
    const resumeFile = formData.get("resume_file") as File | null;

    if (!jobId) {
        return { error: "شناسه آگهی یافت نشد" };
    }

    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "برای ارسال رزومه باید وارد حساب خود شوید" };
    }

    const { data: existingApply } = await supabase
        .from("job_applications")
        .select("id")
        .eq("job_post_id", jobId)
        .eq("applicant_id", user.id)
        .single();

    if (existingApply) {
        return { error: "شما قبلاً برای این آگهی درخواست ارسال کرده‌اید" };
    }

    let resumeUrl = null;

    if (resumeFile && resumeFile.size > 0) {
        const fileExt = resumeFile.name.split(".").pop();
        const fileName = `${user.id}/${jobId}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("resumes")
            .upload(fileName, resumeFile, {
                upsert: false,
            });

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return { error: "خطا در آپلود رزومه. دوباره امتحان کنید." };
        }

        const { data: publicUrlData } = supabase.storage
            .from("resumes")
            .getPublicUrl(fileName);

        resumeUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("job_applications").insert({
        job_post_id: jobId,
        applicant_id: user.id,
        resume_file_url: resumeUrl,
        cover_letter: coverLetter,
        status: "pending",
    });

    if (insertError) {
        return { error: "خطا در ارسال درخواست. دوباره امتحان کنید." };
    }

    revalidatePath(`/jobs/${jobId}/apply`);

    return { success: true, error: null };
}