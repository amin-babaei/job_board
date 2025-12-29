"use server";
import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type State = {
  error: string | null;
};

export async function signInWithEmail(prevState: State, formData: FormData): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message.includes("Invalid login credentials")
        ? "ایمیل یا پسورد اشتباه است"
        : error.message.includes("Email not confirmed")
        ? "ایمیل شما تأیید نشده است. لطفاً ایمیل تأیید را چک کنید."
        : error.message || "خطا در ورود",
    };
  }

  redirect("/");
}
export async function signInEmployer(prevState: State, formData: FormData): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "ایمیل و پسورد الزامی هستند" };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error:
        error.message.includes("Invalid login credentials")
          ? "ایمیل یا پسورد اشتباه است"
          : error.message.includes("Email not confirmed")
          ? "ایمیل شما تأیید نشده است"
          : error.message || "خطا در ورود کارفرما",
    };
  }

  const { data: employer } = await supabase
    .from("employers")
    .select("id")
    .eq("email", email)
    .single();

  if (!employer) {
    await supabase.auth.signOut();
    return { error: "این ایمیل متعلق به حساب کارفرما نیست" };
  }

  redirect("/");
}

export async function handleSignOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  
  revalidatePath("/", "layout");
  redirect("/");
}