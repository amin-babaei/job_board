import { getCurrentUser } from "@lib/supabase/auth";
import { getUserNotifications } from "@services/notificationService";
import Link from "next/link";
import { Bell } from "lucide-react";

export default async function NotificationBell() {
  const user = await getCurrentUser();

  if (!user) return null;

  const { unreadCount } = await getUserNotifications(user.id);

  return (
    <Link href="/profile/employer/notifications" className="border border-border-main rounded-full p-4 relative">
      <Bell size={24} className="text-muted hover:text-foreground transition" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
          {unreadCount > 10 ? "10+" : unreadCount}
        </span>
      )}
    </Link>
  );
}