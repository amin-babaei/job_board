"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { JobType } from "@typess/index";

export function useJobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [city, setCity] = useState(searchParams.get("city") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [jobType, setJobType] = useState<JobType | "">(
    (searchParams.get("jobType") as JobType) || ""
  );

  const updateUrl = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (city) params.set("city", city);
      if (category) params.set("category", category);
      if (jobType) params.set("jobType", jobType);
      router.push(`/jobs?${params.toString()}`);
    });
  };

  const removeFilter = (key: "city" | "category" | "jobType") => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(`/jobs?${params.toString()}`);

      if (key === "city") setCity("");
      if (key === "category") setCategory("");
      if (key === "jobType") setJobType("");
    });
  };

  return {
    city,
    setCity,
    category,
    setCategory,
    jobType,
    setJobType,
    isPending,
    updateUrl,
    removeFilter,
  };
}