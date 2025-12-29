"use client";

import { createBrowserSupabaseClient } from "@lib/supabase/createBrowserClient";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export type UserRole = "candidate" | "employer" | null;

export interface AuthUser {
  user: User | null;
  role: UserRole;
  loading: boolean;
}

export function useSupabaseUser(): AuthUser {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserSupabaseClient();

  const detectRole = async (currentUser: User | null) => {
    if (!currentUser) {
      setRole(null);
      setLoading(false);
      return;
    }

    const { data: seeker, error: seekerError } = await supabase
      .from("job_seekers")
      .select("user_id")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (seekerError && seekerError.code !== "PGRST116") {
      console.error("Seeker check error:", seekerError);
    }

    if (seeker) {
      setRole("candidate");
      setLoading(false);
      return;
    }

    const { data: employer, error: employerError } = await supabase
      .from("employers")
      .select("user_id")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (employerError && employerError.code !== "PGRST116") {
      console.error("Employer check error:", employerError);
    }

    setRole(employer ? "employer" : null);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      detectRole(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      detectRole(currentUser);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return { user, role, loading };
}