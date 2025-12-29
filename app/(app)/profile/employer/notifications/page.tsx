import { getCurrentUser } from "@lib/supabase/auth";
import { redirect } from "next/navigation";
import { getUserNotifications } from "@services/notificationService";
import { markAllNotificationsAsRead, markNotificationAsRead } from "@lib/actions/Notification";
import { ArrowRight, MailX } from "lucide-react";
import { MarkAllReadButton, MarkReadButton } from "./MarkButton";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'نوتیفیکیشن',
};

export default async function NotificationsPage() {
    const user = await getCurrentUser();

    if (!user) redirect("/not-found");

    const { notifications, unreadCount } = await getUserNotifications(user.id);

    if (notifications.length === 0) {
        return (
            <div className="container mx-auto flex flex-col gap-3 items-center py-20 text-center min-h-[430px]">
                <Link href="/profile/employer" className="text-primary flex w-fit underline mt-8">
                    <ArrowRight />
                    بازگشت به پروفایل
                </Link>
                <p className="text-2xl text-muted-foreground">هنوز نوتیفیکیشنی ندارید</p>
                <MailX size={40} className="text-muted" />
            </div>
        );
    }

    return (
        <div className="container mx-auto min-h-[430px]">
            <Link href="/profile/employer" className="text-primary flex w-fit underline mt-8">
                <ArrowRight />
                بازگشت به پروفایل
            </Link>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold my-8">
                    نوتیفیکیشن‌ها {unreadCount > 0 && <span className="text-red-500">({unreadCount} جدید)</span>}
                </h1>

                {unreadCount > 0 && (
                    <form action={markAllNotificationsAsRead}>
                        <MarkAllReadButton />
                    </form>
                )}
            </div>

            <div className="space-y-6">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`bg-card rounded-lg p-6 shadow-soft border-l-4 transition-all ${!notif.is_read ? "border-primary bg-primary/5" : "border-transparent opacity-80"
                            }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2">{notif.title}</h3>
                                <p className="text-muted-foreground mb-3">{notif.message}</p>

                                <p className="text-xs text-muted-foreground">
                                    {new Date(notif.created_at).toLocaleDateString("fa-IR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                {!notif.is_read && (
                                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                                        جدید
                                    </span>
                                )}

                                {!notif.is_read && (
                                    <form action={markNotificationAsRead}>
                                        <input type="hidden" name="notificationId" value={notif.id} />
                                        <MarkReadButton />
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}