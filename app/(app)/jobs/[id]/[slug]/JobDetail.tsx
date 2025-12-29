import { JobPost } from "@typess/index"
import { toPersianDigits } from "@utils/numberFormatter"
import { persianJobType } from "@utils/persianJobType"
import { formatCurrency } from "@utils/priceFormatter"
import { Building2 } from "lucide-react"
import SendResume from "./SendResume"

const JobDetail = async ({ job }: { job: JobPost }) => {
    return (
        <section className="container mx-auto my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 bg-card p-10 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Building2 size={50} />
                        <div>
                            <h2 className="font-extrabold">{job.employers.company_name}</h2>
                            <h2 className="text-xs">{job.employers.email}</h2>
                        </div>
                    </div>
                    <h2 className="font-extrabold text-2xl my-10 text-primary border-b border-border-main">{job.title}</h2>
                    <div className="flex flex-wrap gap-5">
                        <span className="bg-gray-600 w-fit p-2 rounded-lg text-white text-xs">شهر : {job.city}</span>
                        <span className="bg-gray-600 w-fit p-2 rounded-lg text-white text-xs">دسته بندی : {job.categories.name}</span>
                        <span className="bg-gray-600 w-fit p-2 rounded-lg text-white text-xs">نوع همکاری :
                            {persianJobType(job.job_type)}
                        </span>
                        <h4 className="bg-gray-600 w-fit p-2 rounded-lg text-white text-xs">
                            حقوق :
                            {job.salary_min && job.salary_max
                                ? `${toPersianDigits(formatCurrency(job.salary_min))} تا ${toPersianDigits(
                                    formatCurrency(job.salary_max)
                                )} تومان`
                                : "توافقی"}
                        </h4>
                    </div>
                    <h3 className="font-extrabold border-b border-border-main mt-10 text-xl">شرح موقعیت شغلی</h3>
                    <p className="leading-relaxed whitespace-pre-wrap mt-4">{job.description}</p>
                </div>
                <SendResume link={`/jobs/${job.serial_id}/apply`} />
            </div>
        </section>
    )
}

export default JobDetail
