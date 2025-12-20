"use client";
import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, SearchIcon } from "lucide-react";
import { Input } from "../ui/Input";
import { useTransition } from "react";

export default function SearchInput() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchValue = (formData.get("search") ?? "").toString().trim();

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", "1");
      
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      router.push(`/jobs?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <form onSubmit={onSubmit} className="relative w-full xs:w-auto">
      <Input
        key={searchParams?.get("search")}
        type="text"
        name="search"
        placeholder="شغل مورد نظرت؟"
        autoComplete="off"
        defaultValue={searchParams?.get("search") || ""}
        className="border border-border-main pl-12 pr-4 py-3 md:w-80 rounded-full"
        disabled={isPending}
      />
      <button
        type="submit"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center"
        disabled={isPending}
      >
        {isPending ? <Loader size={22} className="text-muted cursor-pointer" />
          : <SearchIcon size={22} className="text-muted cursor-pointer" />}
      </button>
    </form>
  );
}