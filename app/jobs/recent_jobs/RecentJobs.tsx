import { Button } from '@components/ui/Button';
import { Suspense } from 'react';
import { RecentJobData } from './RecentJobData';
import SkeleteLoadingRecentJob from '@components/ui/skeleteLoading/SkeleteLoadingRecentJob';
import Link from 'next/link';

export default function RecentJobs() {
    return (
        <section className="container mx-auto max-w-full my-10">
            <div className="rounded-lg bg-card py-9">
                <div className="lg:flex">
                    <div className='flex flex-col items-center justify-center gap-y-5 lg:w-1/4 ml-4 mb-5 lg:border-l-4 lg:border-border-main'>
                        <h2 className='text-3xl font-extrabold'>آخرین آگهی‌ها</h2>
                        <Link href="/jobs">
                            <Button >مشاهده همه آگهی‌ها</Button>
                        </Link>
                    </div>
                    <Suspense fallback={<SkeleteLoadingRecentJob />}>
                        <RecentJobData />
                    </Suspense>
                </div>
            </div>
        </section>
    )
}
