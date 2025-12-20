import { getCities } from "app/services/city";
import { getCategoryData } from "app/services/category";
import JobsFilter from "./jobList/JobFilter";
import { Suspense } from "react";
import JobList from "./jobList/JobList";
import SkeleteLoadingJobList from "@components/ui/skeleteLoading/SkeleteLoadingJobList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'فرصت های شغلی',
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: {
    city?: string;
    category?: string;
    jobType?: string;
    search?: string;
    page?: string;
  };
}) {
  const page = (await searchParams).page;
  const currentPage = Math.max(1, Number(page) || 1);
  const offset = (currentPage - 1) * 6;
  const [cities, categories] = await Promise.all([
    getCities(),
    getCategoryData(),
  ]);

  return (
    <div className="container mx-auto my-10 min-h-[350px]">
      <JobsFilter cities={cities.data} categories={categories.data} />
      <Suspense fallback={<SkeleteLoadingJobList />}>
        <JobList 
          searchParams={searchParams}   
          limit={6} 
          offset={offset} 
        />
      </Suspense>
    </div>
  );
}
