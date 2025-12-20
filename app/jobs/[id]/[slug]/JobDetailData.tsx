import { generateJobSlug } from "@utils/generateJobSlug";
import JobDetail from "./JobDetail"
import { getJob } from "app/services/jobs";
import { notFound, redirect, RedirectType } from "next/navigation";

const JobDetailData = async ({
    params,
}: {
    params: { id: string; slug: string };
}) => {
    const { id, slug } = await params;
    const { data: job, error } = await getJob(id);

    if (error || !job) return notFound()
    const correctSlug = generateJobSlug(job.title);
    const decodedSlug = decodeURIComponent(slug);

    if (decodedSlug !== correctSlug) {
        redirect(`/jobs/${job.serial_id}/${correctSlug}`, RedirectType.replace);
    }

    return (
        <JobDetail job={job} />
    )
}

export default JobDetailData
