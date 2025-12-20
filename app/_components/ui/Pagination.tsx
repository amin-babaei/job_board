"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className="flex justify-center items-center gap-5 mt-16" aria-label="Pagination">

      {prevPage >= 1 && (
        <Link
          href={createPageURL(prevPage)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-shadow shadow-md"
        >
          <ChevronRight size={20} />
          <span className="hidden sm:inline">قبلی</span>
        </Link>
      )}

      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          const pageNum = i + Math.max(1, currentPage - 3);
          if (pageNum > totalPages) return null;

          return (
            <Link
              key={pageNum}
              href={createPageURL(pageNum)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
                pageNum === currentPage
                  ? "bg-primary text-white font-bold shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
        {totalPages > 7 && currentPage < totalPages - 3 && (
          <span className="px-3 text-gray-500">...</span>
        )}
      </div>

      {nextPage <= totalPages && (
        <Link
          href={createPageURL(nextPage)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-shadow shadow-md"
        >
          <span className="hidden sm:inline">بعدی</span>
          <ChevronLeft size={20} />
        </Link>
      )}
    </nav>
  );
}