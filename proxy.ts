import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@lib/supabase/createServerClient";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if(pathname.startsWith("/profile/candidate")) {
      return NextResponse.redirect(new URL("/auth/register/candidate", req.url));
    }
    if (pathname.startsWith("/profile/employer")) {
      return NextResponse.redirect(new URL("/auth/register/employer", req.url));
    }

    return NextResponse.next();
  }

  const [seekerRes, employerRes] = await Promise.all([
    supabase.from("job_seekers").select("user_id").eq("user_id", user?.id).maybeSingle(),
    supabase.from("employers").select("id").eq("user_id", user?.id).maybeSingle(),
  ]);

  const isCandidate = seekerRes.data !== null;
  const isEmployer = employerRes.data !== null;

  if (pathname.startsWith("/auth")) {
    if (isEmployer) {
      return NextResponse.redirect(new URL("/profile/employer", req.url));
    }
    if (isCandidate) {
      return NextResponse.redirect(new URL("/profile/candidate", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/profile/employer")) {
    if (!isEmployer) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/profile/candidate")) {
    if (!isCandidate) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/profile/candidate/:path*",
    "/profile/employer/:path*",
  ],
};