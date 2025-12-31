"use server";

import { createSupabaseServerClient } from "@lib/supabase/createServerClient";

export async function getUserRoleFromDB(userId: string): Promise<"candidate" | "employer" | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return data.role;
}