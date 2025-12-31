"use server";
import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { redirect } from "next/navigation";

type State = {
  error: string | null;
};

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    console.error("Google OAuth error:", error);
    throw new Error(error.message || "خطا در ورود با گوگل");
  }

  redirect(data.url);
}

export async function signInWithLinkedin() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      scopes: "openid profile email",
    },
  });

  if (error) {
    console.error("LinkedIn OAuth error:", error);
    throw new Error(error.message || "خطا در ورود با لینکدین");
  }

  redirect(data.url);
}

export async function signUpWithEmail(prevState: State, formData: FormData): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = (formData.get("full_name") as string);
  const phone = (formData.get("phone") as string) || null;
  const linkedin_url = (formData.get("linkedin_url") as string) || null;
  const github_url = (formData.get("github_url") as string) || null;

  if (!email || !password) {
    return { error: "ایمیل و پسورد الزامی هستند" };
  }

  if (password.length < 6) {
    return { error: "پسورد باید حداقل ۶ کاراکتر باشد" };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "ایمیل نامعتبر است" };
  }

  const supabase = await createSupabaseServerClient();

  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, phone, linkedin_url, github_url },
    },
  });

  if (authError) {

    if (authError.message.includes("User already registered")) {
      return { error: "این ایمیل قبلاً ثبت شده است" };
    }
    if (authError.message.includes("Password should be at least")) {
      return { error: "پسورد باید حداقل ۶ کاراکتر باشد" };
    }
    if (authError.message.includes("Unable to validate email")) {
      return { error: "ایمیل نامعتبر است" };
    }

    return { error: authError.message || "خطا در ثبت‌نام. دوباره امتحان کنید." };
  }

  if (data.user) {
    await supabase.from("user_roles").upsert({
      user_id: data.user.id,
      role: "candidate"
    }, { onConflict: "user_id" });
    const { error: profileError } = await supabase.from("job_seekers").insert({
      user_id: data.user.id,
      full_name,
      phone,
      linkedin_url,
      github_url,
      email,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return { error: "ثبت‌نام موفق بود، اما ذخیره پروفایل با خطا مواجه شد." };
    }
  }
  redirect("/profile/candidate");
}
export async function signUpEmployer(prevState: State, formData: FormData): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const company_name = formData.get("company_name") as string;
  const phone = (formData.get("phone") as string);
  const website = (formData.get("website") as string);
  const address = (formData.get("address") as string);

  if (!email || !password || !company_name) {
    return { error: "ایمیل، پسورد و نام شرکت الزامی هستند" };
  }

  const supabase = await createSupabaseServerClient();

  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { company_name },
    },
  });

  if (authError) {
    return {
      error:
        authError.message.includes("User already registered")
          ? "این ایمیل قبلاً ثبت شده است"
          : authError.message || "خطا در ثبت‌نام کارفرما",
    };
  }

  if (data.user) {
    await supabase.from("user_roles").upsert({
      user_id: data.user.id,
      role: "employer"
    }, { onConflict: "user_id" });
    const { error: employerError } = await supabase.from("employers").insert({
      user_id: data.user.id,
      company_name,
      email,
      phone,
      address,
      website,
    });

    if (employerError) {
      console.error("Employer creation error:", employerError);
      return { error: "ثبت‌نام موفق بود، اما اطلاعات شرکت ذخیره نشد." };
    }
  }

  redirect("/profile/employer");
}