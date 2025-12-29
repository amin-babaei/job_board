import { getCurrentUser } from "@lib/supabase/auth";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import ApplyForm from "./ApplyForm";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@components/ui/Button";
import { getJob } from "@services/jobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ارسال رزومه',
};

export default async function ApplyPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/not-found");
  }

  const supabase = await createSupabaseServerClient();

  const { data: job } = await getJob(id)

  if (!job) {
    return <div className="container mx-auto py-20 text-center">آگهی یافت نشد</div>;
  }

  const { data: existingApply } = await supabase
    .from("job_applications")
    .select("id, applied_at")
    .eq("job_post_id", job.id)
    .eq("applicant_id", user.id)
    .single();

  if (existingApply) {
    return (
      <div className="container mx-auto py-20 text-center max-w-4xl">
        <CheckCircle size={100} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-6">درخواست شما ارسال شده است!</h1>
        <p className="text-lg text-muted-foreground mb-4">
          رزومه شما با موفقیت برای آگهی {job.title} در شرکت {job.employers.company_name} ارسال شد.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          ارسال شده در: {new Date(existingApply.applied_at).toLocaleDateString("fa-IR")}
        </p>

        <div className="flex gap-4 justify-center">
          <Link href={`/jobs`}>
            <Button>بازگشت به آگهی ها</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-center mb-4">
        ارسال رزومه برای: {job.title}
      </h1>
      <p className="text-center text-muted-foreground mb-12">
        شرکت: <span className="font-medium">{job.employers.company_name}</span>
      </p>

      <ApplyForm jobId={job.id} jobTitle={job.title} companyName={job.employers.company_name} />
    </div>
  );
}