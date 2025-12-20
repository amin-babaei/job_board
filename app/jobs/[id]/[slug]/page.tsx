import { Suspense } from "react";
import JobDetailData from "./JobDetailData";
import SkeleteJobDetail from "@components/ui/skeleteLoading/SkeleteJobDetail";
import { getJob } from "app/services/jobs";

export async function generateMetadata({
    params,
}: {
    params: { id: string; slug: string };
}) {
    const { id } = await params;
    const { data: job, error } = await getJob(id);

    if (error || !job) {
        return {
            title: "آگهی یافت نشد",
            description: "این آگهی شغلی وجود ندارد یا حذف شده است.",
        };
    }

    return {
        title: `${job.title}`,
        description: job.description?.slice(0, 160),
    };
}

export default async function JobDetailPage({
    params,
}: {
    params: {
        id: string;
        slug: string;
    };
}) {

    return (
        <Suspense fallback={<SkeleteJobDetail />}>
            <JobDetailData params={params} />
        </Suspense>
    )
}