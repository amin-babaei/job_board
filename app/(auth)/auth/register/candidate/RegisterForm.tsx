"use client";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Mail, User, Phone, Linkedin, Github } from "lucide-react";
import { useActionState } from "react";
import { signUpWithEmail } from "@lib/actions/RegisterActions";
import ErrorMessage from "@components/ui/ErrorMessage";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, { error: null });

  return (
    <form action={formAction} className="space-y-4">
      <Input name="email" type="email" placeholder="ایمیل" required rightIcon={<Mail className="text-muted w-5 h-5" />} />
      <Input name="password" type="password" placeholder="پسورد (حداقل ۶ کاراکتر)" required />
      <Input name="full_name" type="text" placeholder="نام کامل" required rightIcon={<User className="text-muted w-5 h-5" />} />
      <Input name="phone" type="tel" placeholder="تلفن (اختیاری)" rightIcon={<Phone className="text-muted w-5 h-5" />} className="placeholder:text-end" />
      <Input name="linkedin_url" type="url" placeholder="لینک لینکدین (اختیاری)" rightIcon={<Linkedin className="text-muted w-5 h-5" />} />
      <Input name="github_url" type="url" placeholder="لینک گیت‌هاب (اختیاری)" rightIcon={<Github className="text-muted w-5 h-5" />} />

       {state?.error && (
        <ErrorMessage message={state.error}/>
      )}

      <Button type="submit" variant="primary" className="w-full py-2 text-lg" disabled={isPending}>
        {isPending ? "در حال ثبت‌نام..." : "ثبت‌نام"}
      </Button>
    </form>
  );
}