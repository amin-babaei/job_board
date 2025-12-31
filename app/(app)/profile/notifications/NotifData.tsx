import { getCurrentUser } from '@lib/supabase/auth';
import NotificationBell from './NotificationBell'
import { getUserNotifications } from '@services/notificationService';

const NotifData = async () => {
    const user = await getCurrentUser();

    if (!user) return null;

    const { unreadCount } = await getUserNotifications(user.id);

    return (
        <NotificationBell count={unreadCount}/>
    )
}

export default NotifData
