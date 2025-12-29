"use client";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { useActionState } from "react";
import { createJob } from "@lib/actions/EmployerActions";
import ErrorMessage from "@components/ui/ErrorMessage";
import { Category } from "@typess/index";

interface CreateJobFormProps {
  employerId: string | undefined;
  categories: Category[];
}

export default function CreateJobForm({ employerId, categories }: CreateJobFormProps) {
  const [state, formAction, isPending] = useActionState(createJob, { error: null });

  return (
    <div className="bg-card rounded-2xl shadow-soft p-8">
      <form action={formAction} className="space-y-8">
        <input type="hidden" name="employer_id" value={employerId} />

        <div>
          <label className="block text-lg font-medium mb-3">عنوان آگهی</label>
          <Input
            name="title"
            type="text"
            placeholder="مثال: استخدام توسعه‌دهنده React"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">توضیحات کامل</label>
          <textarea
            name="description"
            className="resize-none border border-border-main w-full p-3 rounded-lg focus:outline-2 focus:outline-primary/30"
            placeholder="وظایف، شرایط، مزایا، مهارت‌های مورد نیاز و ..."
            rows={10}
            required
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium mb-3">شهر</label>
            <Input
              name="city"
              type="text"
              placeholder="مثال: تهران"
              required
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">دسته‌بندی</label>
            <select
              name="category_id"
              required
              disabled={isPending}
              className="w-full px-4 py-3 rounded-lg border border-border-main focus:border-primary focus:outline-none bg-background"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">نوع همکاری</label>
          <select
            name="job_type"
            required
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-main focus:border-primary focus:outline-none bg-background"
          >
            <option value="full_time">تمام وقت</option>
            <option value="part_time">پاره وقت</option>
            <option value="remote">دورکاری</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium mb-3">حداقل حقوق (تومان)</label>
            <Input
              name="salary_min"
              type="number"
              placeholder="مثال: 15000000"
              min="0"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">حداکثر حقوق (تومان)</label>
            <Input
              name="salary_max"
              type="number"
              placeholder="مثال: 25000000"
              min="0"
              disabled={isPending}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            اگر حقوق توافقی است، هر دو فیلد را خالی بگذارید
          </p>
        </div>

        {state?.error && (
          <ErrorMessage message={state.error} />
        )}

        <Button type="submit" variant="success" className="w-full text-xl font-bold" disabled={isPending}>
          {isPending ? "در حال انتشار..." : "انتشار آگهی"}
        </Button>
      </form>
    </div>
  );
}