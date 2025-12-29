import { getCurrentUser } from "@lib/supabase/auth";
import CreateJobForm from "./CreateJobForm";
import { getCategoryData } from "app/services/category";
import { getEmployerByUserId } from "@services/employer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ساخت آگهی جدید',
};

export default async function NewJobPage() {
  const user = await getCurrentUser();

  const [ employerData, categoryResult] = await Promise.all([
    getEmployerByUserId(user!.id),
    getCategoryData(),
  ]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <CreateJobForm employerId={employerData?.id} categories={categoryResult.data} />
    </div>
  );
}