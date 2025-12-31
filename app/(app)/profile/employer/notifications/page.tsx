import { Metadata } from "next";
import NotificationsList from "../../notifications/NotificationsList";

export const metadata: Metadata = {
    title: 'نوتیفیکیشن‌های کارفرما',
};

export default async function NotificationsPage() {

    return (
        <NotificationsList backLink="/profile/employer" />
    );
}