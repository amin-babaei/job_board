"use client";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { applyToJob } from "@lib/actions/JobActions";
import Link from "next/link";
import ErrorMessage from "@components/ui/ErrorMessage";

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

export default function ApplyForm({ jobId }: ApplyFormProps) {
  const [state, formAction, isPending] = useActionState(applyToJob, { error: null, success: false });

  if (state.success) {
    return (
      <div className="text-center py-20">
        <CheckCircle size={100} className="text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-green-600 mb-4">رزومه با موفقیت ارسال شد!</h2>
        <p className="text-lg text-muted-foreground mb-8">
          وضعیت درخواست شما در بخش پروفایل قابل مشاهده است
        </p>
        <Link href="/profile">
          <Button variant="primary">
            رفتن به پروفایل
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-soft p-8">
      <form action={formAction} className="space-y-8">
        <input type="hidden" name="job_id" value={jobId} />

        <div>
          <label className="block text-lg font-medium mb-3">رزومه خود را آپلود کنید</label>
          <p className="text-sm text-muted-foreground mb-4">
            فرمت‌های مجاز: PDF، DOC، DOCX (حداکثر ۵ مگابایت)
          </p>
          <Input
            type="file"
            name="resume_file"
            accept=".pdf,.doc,.docx"
            required
            className="file:mr-4 file:py-4 file:px-8 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">توضیحات (اختیاری)</label>
          <p className="text-sm text-muted-foreground mb-4">
            توضیح دهید چرا برای این موقعیت مناسب هستید
          </p>
          <textarea
            name="cover_letter"
            placeholder="مهارت‌ها، تجربیات و انگیزه خود را اینجا بنویسید..."
            rows={8}
            className="resize-none border border-border-main w-full p-3 rounded-lg focus:outline-2 focus:outline-primary/30"
            disabled={isPending}
          />
        </div>

        {state?.error && (
          <ErrorMessage message={state.error}/>
        )}

        <Button
          type="submit"
          variant="success"
          className="w-full py-4 text-xl font-bold gap-3"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={28} />
              در حال ارسال رزومه...
            </>
          ) : (
            <>
              <Upload size={28} />
              ارسال رزومه
            </>
          )}
        </Button>
      </form>
    </div>
  );
}