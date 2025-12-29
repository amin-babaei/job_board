import ProfileHeader from "../ProfileHeader";
import EmployerJobsList from "./EmployerJobsList";
import ApplicationsReceived from "./ApplicationsReceived";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/Tabs";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import { Metadata } from "next";
import { Suspense } from "react";
import ApplicationsSkeleton from "@components/ui/skeleteLoading/ApplicationsSkeleton";
import ProfileHeaderSkeleton from "@components/ui/skeleteLoading/ProfileHeaderSkeleton";

export const metadata: Metadata = {
  title: 'پروفایل کارفرما',
};

export default async function EmployerProfilePage() {

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader />
      </Suspense>

      <Tabs defaultValue="jobs" className="mt-10">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="jobs">آگهی‌های منتشرشده
          </TabsTrigger>
          <TabsTrigger value="applications">رزومه‌های دریافتی</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold">آگهی‌های منتشرشده</h2>
            <Link href="/profile/employer/jobs/new">
              <Button variant="primary">
                انتشار آگهی +
              </Button>
            </Link>
          </div>
          <Suspense fallback={<ApplicationsSkeleton />}>
            <EmployerJobsList />
          </Suspense>
        </TabsContent>

        <TabsContent value="applications">
          <h2 className="text-2xl font-extrabold mb-6">رزومه‌های دریافتی</h2>
          <Suspense fallback={<ApplicationsSkeleton />}>
            <ApplicationsReceived />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}