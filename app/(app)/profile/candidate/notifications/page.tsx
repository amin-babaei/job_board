import { Metadata } from "next";
import NotificationsList from "../../notifications/NotificationsList";


export const metadata: Metadata = {
    title: 'نوتیفیکیشن‌های کارجو',
};

export default function CandidateNotificationsPage() {
    return <NotificationsList backLink="/profile/candidate" />;
}