import RecentJobSlider from "./RecentJobSlider";
import ErrorMessage from "@components/ui/ErrorMessage";
import { getJobs } from "app/services/jobs";

export async function RecentJobData() {

    const { data: jobs, error } = await getJobs({}, 4, 0);

    if (error) {
        return (
            <ErrorMessage message={"خطا در دریافت آخرین آگهی‌ها"} />
        );
    }

    return (
        <RecentJobSlider jobs={jobs ?? []} />
    )
}