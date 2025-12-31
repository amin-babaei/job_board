import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { getCurrentUser } from "@lib/supabase/auth";
import { getUserRoleFromDB } from "@services/userService";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const supabase = await createSupabaseServerClient();

  const { data: { user }} = await supabase.auth.getUser();
  const currentUser = await getCurrentUser();

  let role: "candidate" | "employer" | null = null;

  if (!user) {
    if (pathname.startsWith("/profile/candidate")) {
      return NextResponse.redirect(new URL("/auth/register/candidate", req.url));
    }
    if (pathname.startsWith("/profile/employer")) {
      return NextResponse.redirect(new URL("/auth/register/employer", req.url));
    }

    return NextResponse.next();
  }

  if (currentUser) {
    role = await getUserRoleFromDB(user.id);
  }

  if (pathname.startsWith("/auth")) {
    if (role == "employer") {
      return NextResponse.redirect(new URL("/profile/employer", req.url));
    }
    if (role == "candidate") {
      return NextResponse.redirect(new URL("/profile/candidate", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/profile/employer")) {
    if (role != "employer") {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/profile/candidate")) {
    if (role != "candidate") {
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