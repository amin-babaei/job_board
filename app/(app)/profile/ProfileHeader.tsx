import { Mail } from "lucide-react";
import { User as UserIcon } from "lucide-react";
import NotificationBell from "./employer/notifications/NotificationBell";
import { getCurrentUser } from "@lib/supabase/auth";
import { createBrowserSupabaseClient } from "@lib/supabase/createBrowserClient";


export default async function ProfileHeader() {
    const user = await getCurrentUser();
  
    const supabase = createBrowserSupabaseClient();
    const { data: seeker } = await supabase
      .from("job_seekers")
      .select("*")
      .eq("user_id", user?.id)
      .single();

  return (
    <div className="bg-card rounded-2xl shadow-soft p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="bg-muted/30 rounded-full w-32 h-32 flex items-center justify-center">
          <UserIcon size={60} className="text-muted" />
        </div>

        <div className="flex-1 text-center md:text-right">
          <h1 className="text-3xl font-extrabold mb-2">
            {seeker?.full_name || user?.user_metadata?.name || user?.user_metadata?.full_name ||
              `شرکت ${user?.user_metadata?.company_name}`}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
            <Mail size={18} />
            {user?.email}
          </p>
        </div>
        <NotificationBell />
      </div>
    </div>
  );
}