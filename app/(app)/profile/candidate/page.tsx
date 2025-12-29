import { Suspense } from "react";
import ProfileHeader from "../ProfileHeader";
import ApplicationsList from "./ApplicationsList";
import { Metadata } from "next";
import ProfileHeaderSkeleton from "@components/ui/skeleteLoading/ProfileHeaderSkeleton";
import ApplicationsSkeleton from "@components/ui/skeleteLoading/ApplicationsSkeleton";

export const metadata: Metadata = {
  title: 'پروفایل کارجو',
};

export default async function ProfilePage() {

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader />
      </Suspense>

      <div className="mt-10">
        <h2 className="text-2xl font-extrabold mb-6">درخواست‌های ارسال‌شده</h2>
        <Suspense fallback={<ApplicationsSkeleton />}>
          <ApplicationsList />
        </Suspense>
      </div>
    </div>
  );
}