import Link from "next/link";
import { Button } from "@components/ui/Button";
import { CheckCircle, Download, Eye, Mail, Phone, User, XCircle } from "lucide-react";
import StatusAction from "./StatusAction";
import { JobApplication } from "@typess/index";
import { getCurrentUser } from "@lib/supabase/auth";
import { getEmployerByUserId } from "@services/employer";
import ApplicationsReceivedData from "./ApplicationsReceivedData";

export default async function ApplicationsReceived() {
  const user = await getCurrentUser();

  const employer = await getEmployerByUserId(user!.id);

  const { applications } = await ApplicationsReceivedData({ employerId: employer!.id });

  if (applications.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg">
        <p className="text-muted-foreground text-lg">هنوز رزومه‌ای دریافت نکرده‌اید</p>
      </div>
    );
  }
  const getStatusBadge = (status: JobApplication["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Eye size={16} />
            در حال بررسی
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle size={16} />
            پذیرفته شده
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle size={16} />
            رد شده
          </span>
        );
      default:
        return null;
    }
  };
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {applications.map((app) => {
        const seeker = app.seeker;

        return (
          <div key={app.id} className="bg-card rounded-lg shadow-soft p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link href={`/jobs/${app.job_posts.serial_id}`} className="text-xl font-bold text-primary hover:underline">
                  {app.job_posts.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  ارسال شده در: {new Date(app.applied_at).toLocaleDateString("fa-IR")}
                </p>
              </div>
              <div>{getStatusBadge(app.status)}</div>
            </div>

            <div className="border-t border-border-main pt-4">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <User size={20} />
                اطلاعات کارجو
              </h4>
              <p className="font-medium">{seeker?.full_name || "نامشخص"}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <Mail size={16} />
                {seeker?.email || "ایمیل موجود نیست"}
              </p>
              {seeker?.phone && (
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Phone size={16} />
                  {seeker.phone}
                </p>
              )}
            </div>

            <p className="p-5 shadow-lg leading-relaxed whitespace-pre-wrap">{app.cover_letter}</p>

            {app.signed_resume_url && (
              <div className="flex items-center justify-between mt-6">
                <a href={app.signed_resume_url} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <Download size={18} />
                    دانلود رزومه
                  </Button>
                </a>
                {app.status === "pending" && <StatusAction id={app.id} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}