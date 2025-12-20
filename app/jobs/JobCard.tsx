import { JobPost } from '@typess/index'
import { toPersianDigits } from '../utils/numberFormatter';
import { Banknote, Building2, ClipboardClock, MapPin } from 'lucide-react';
import { formatCurrency } from "@utils/priceFormatter"
import Link from 'next/link';
import { generateJobSlug } from '@utils/generateJobSlug';
const JobCard = ({ job }: { job: JobPost}) => {

    const persianType = job.job_type === "full_time" ? "تمام وقت" : job.job_type === "part_time" ? "پاره وقت" : "دورکاری";
    const jobSlug = generateJobSlug(job.title);

    return (
        <Link href={`/jobs/${job.serial_id}/${jobSlug}`}> 
            <div className="flex gap-4 items-start shadow-soft rounded-lg p-4 h-56">

                <Building2 size={40} className="text-muted shrink-0 mt-1" />

                <div className="flex flex-col flex-1 h-full justify-around">
                    <h4 className="text-primary text-lg font-semibold line-clamp-2">
                        {job.title}
                    </h4>

                    <p className="font-extrabold truncate">
                        {job.employers?.company_name}
                    </p>

                    <p className="text-sm flex items-center gap-x-2 truncate">
                        <MapPin size={18} /> {job.city}
                    </p>

                    <p className="text-sm flex items-center gap-x-2">
                        <ClipboardClock size={18} /> {persianType}
                    </p>

                    <p className="text-sm flex items-center gap-x-2">
                        <Banknote size={18} />
                        {job.salary_min && job.salary_max
                            ? `${toPersianDigits(formatCurrency(job.salary_min))} تا ${toPersianDigits(
                                formatCurrency(job.salary_max)
                            )} تومان`
                            : "حقوق توافقی"}
                    </p>
                </div>
            </div>
        </Link>
    )
}
export default JobCard