import { Button } from "@components/ui/Button";
import ErrorMessage from "@components/ui/ErrorMessage";
import { getCurrentUser } from "@lib/supabase/auth";
import { getUserApplications } from "@services/applicationService";
import { generateJobSlug } from "@utils/generateJobSlug";
import Link from "next/link";

export default async function ApplicationsList() {
    const user = await getCurrentUser();
    
   const { applications, error } = await getUserApplications(user!.id);

    if (error || !applications) {
        return <ErrorMessage message="خطا در دریافت درخواست‌ها"/>;
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-20 bg-card rounded-lg">
                <p className="text-muted-foreground text-lg">هنوز هیچ درخواستی ارسال نکرده‌اید</p>
                <Link href="/jobs" className="mt-4 inline-block text-primary hover:underline font-medium">
                    مشاهده فرصت‌های شغلی
                </Link>
            </div>
        );
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "pending":
                return { variant: "secondary" as const, text: "در حال بررسی" };
            case "reviewed":
                return { variant: "primary" as const, text: "بررسی شده" };
            case "accepted":
                return { variant: "success" as const, text: "پذیرفته شده" };
            case "rejected":
                return { variant: "danger" as const, text: "رد شده" };
            default:
                return { variant: "secondary" as const, text: status };
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {applications.map((app) => {
                const { variant, text } = getStatusVariant(app.status);
                const jobSlug = generateJobSlug(app.job_posts.title);

                return (
                    <div key={app.id} className="bg-card rounded-lg shadow-soft p-6 hover:shadow-lg transition">
                        <Link href={`/jobs/${app.job_posts.serial_id}/${jobSlug}`}>
                            <h3 className="text-xl font-bold text-primary hover:underline">
                                {app.job_posts.title}
                            </h3>
                        </Link>
                        <p className="text-muted-foreground mt-2">
                            {app.job_posts.employers.company_name} • {app.job_posts.city}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                            <Button variant={variant}>
                                {text}
                            </Button>

                            <p className="text-sm text-muted-foreground">
                                ارسال شده در: {new Date(app.applied_at).toLocaleDateString("fa-IR")}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}