"use server";

import { createSupabaseServerClient } from "@lib/supabase/createServerClient";

export async function getNotifications(userId: string, limit = 20) {
    const supabase = await createSupabaseServerClient();

    const { data: notifications, error: notifError } = await supabase
        .from("application_notifications")
        .select(`
      id,
      type,
      title,
      message,
      is_read,
      created_at,
      application_id
    `)
        .eq("recipient_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (notifError || !notifications || notifications.length === 0) {
        return { notifications: [], unreadCount: 0 };
    }

    const applicationIds = notifications.map(n => n.application_id);

    const { data: applications } = await supabase
        .from("job_applications")
        .select(`
      id,
      status,
      applied_at,
      applicant_id,
      job_posts (
        id,
        serial_id,
        title
      )
    `)
        .in("id", applicationIds);

    if (!applications) {
        return { notifications, unreadCount: notifications.filter(n => !n.is_read).length };
    }

    const applicantIds = [...new Set(applications.map(app => app.applicant_id))];

    const { data: seekers } = await supabase
        .from("job_seekers")
        .select("user_id, full_name, email, phone")
        .in("user_id", applicantIds);

    const seekersMap = new Map(seekers?.map(s => [s.user_id, s]) || []);

    const enrichedNotifications = notifications.map(notif => {
        const app = applications.find(a => a.id === notif.application_id);
        const seeker = app ? seekersMap.get(app.applicant_id) : null;

        return {
            ...notif,
            application: app ? {
                status: app.status,
                applied_at: app.applied_at,
                job_post: app.job_posts,
                seeker,
            } : null,
        };
    });

    const unreadCount = enrichedNotifications.filter(n => !n.is_read).length;

    return { notifications: enrichedNotifications, unreadCount };
}

export async function getUserNotifications(userId: string) {
    const supabase = await createSupabaseServerClient();

    const { data: notifications, error } = await supabase
        .from("application_notifications")
        .select(`
      id,
      type,
      title,
      message,
      is_read,
      created_at,
      application_id,
      job_applications (
        status,
        job_posts (
          serial_id,
          title
        )
      )
    `)
        .eq("recipient_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Notifications error:", error);
        return { notifications: [], unreadCount: 0 };
    }

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return { notifications, unreadCount };
}
