"use client"
import Link from "next/link";
import { Bell } from "lucide-react";
import { useAuth } from "app/context/AuthContext";

export default function NotificationBell({ count }: { count: number }) {

  const { role } = useAuth()

  return (
    <Link href={role === "employer" ? `/profile/employer/notifications` : `/profile/candidate/notifications`} className="border border-border-main rounded-full p-4 relative">
      <Bell size={24} className="text-muted hover:text-foreground transition" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
          {count > 10 ? "10+" : count}
        </span>
      )}
    </Link>
  );
}