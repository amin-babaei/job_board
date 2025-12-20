import { createSupabaseServerClient } from "@lib/supabase/createServerClient";
import { Category } from "@typess/index";
import { ServiceResult } from "@typess/index";

export const dynamic = "force-static";
export async function getCategoryData(): Promise<ServiceResult<Category[]>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    return {
      data: [],
      error: "خطا در دریافت دسته‌بندی‌ها",
    };
  }

  return {
    data: data ?? [],
    error: null,
  };
}
