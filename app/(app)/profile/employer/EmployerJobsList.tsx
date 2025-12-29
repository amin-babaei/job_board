import Link from "next/link";
import { generateJobSlug } from "@utils/generateJobSlug";
import { persianJobType } from "@utils/persianJobType";
import { getEmployerByUserId, getEmployerJobs } from "@services/employer";
import DeleteJobEmployer from "./jobs/DeleteJobEmployer";
import { getCurrentUser } from "@lib/supabase/auth";

export default async function EmployerJobsList() {
const user = await getCurrentUser();

  const employer = await getEmployerByUserId(user!.id);
  
  const result = await getEmployerJobs(employer!.id);
  
  if (result.error) {
    return <p className="text-center text-red-500">خطا در دریافت آگهی‌ها</p>;
  }

  if (result.data.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg">
        <p className="text-muted-foreground text-lg">هنوز هیچ آگهی منتشر نکرده‌اید</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {result.data.map((job) => (
        <div key={job.id} className="bg-card rounded-lg shadow-soft p-6 hover:shadow-lg transition">
          <Link href={`/jobs/${job.serial_id}/${generateJobSlug(job.title)}`}>
            <h3 className="text-xl font-bold text-primary hover:underline mb-3">
              {job.title}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm mb-4">
            {job.city} • {persianJobType(job.job_type)}
          </p>

          <p className="text-xs text-muted-foreground mb-6">
            منتشر شده در: {new Date(job.created_at).toLocaleDateString("fa-IR")}
          </p>

          <div className="flex justify-between items-center">
           
            <DeleteJobEmployer id={job.id} />
          </div>
        </div>
      ))}
    </div>
  );
}