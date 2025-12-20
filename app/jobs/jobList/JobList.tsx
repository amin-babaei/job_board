import JobCard from "../JobCard";
import ErrorMessage from "@components/ui/ErrorMessage";
import Pagination from "@components/ui/Pagination";
import { getJobs } from "app/services/jobs";

interface JobListProps {
  searchParams?: {
    city?: string;
    category?: string;
    jobType?: string;
    search?: string;
  };
  limit: number;
  offset: number;
}

const JobList = async ({ searchParams = {}, limit, offset }: JobListProps) => {

  const category = (await searchParams)?.category;
  const city = (await searchParams)?.city;
  const jobType = (await searchParams)?.jobType;
  const search = (await searchParams)?.search;

  const { data: jobs, error, count } = await getJobs(
    {
      city: city,
      category: category,
      jobType: jobType,
      search: search,
    },
    limit,
    offset
  );

  if (error) return <ErrorMessage message="حطا در دریافت آگهی ها" />

  if (!jobs || jobs.length === 0) {
    return (
      <ErrorMessage message="آگهی با این مشخصات پیدا نشد" />
    );
  }
  const totalPages = count ? Math.ceil(count / limit) : 1;
  return (
    <>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default JobList