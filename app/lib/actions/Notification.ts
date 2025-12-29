"use server";

import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(formData: FormData) {
  const notificationId = formData.get("notificationId") as string;

  if (!notificationId) return;

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("application_notifications")
    .update({ is_read: true })
    .eq("id", notificationId);

  if (error) {
    console.error("Mark single read error:", error);
  }

  revalidatePath("/profile/employer/notifications");
  revalidatePath("/profile/employer");
  revalidatePath("/");
}

export async function markAllNotificationsAsRead() {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
        .from("application_notifications")
        .update({ is_read: true })
        .eq("recipient_id", user.id)
        .eq("is_read", false);

    if (error) {
        console.error("Mark all read error:", error);
    }

    revalidatePath("/profile/employer/notifications");
    revalidatePath("/profile/employer");
    revalidatePath("/");
}