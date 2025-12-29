"use client";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Mail, Building2, Phone, Globe, MapPin } from "lucide-react";
import { useActionState } from "react";
import { signUpEmployer } from "@lib/actions/RegisterActions";
import ErrorMessage from "@components/ui/ErrorMessage";

export default function EmployerRegisterForm() {
  const [state, formAction, isPending] = useActionState(signUpEmployer, { error: null });

  return (
    <form action={formAction} className="space-y-5">
      <Input
        name="email"
        type="email"
        placeholder="ایمیل شرکت"
        required
        rightIcon={<Mail className="text-muted w-5 h-5" />}
        disabled={isPending}
      />

      <Input
        name="password"
        type="password"
        placeholder="پسورد (حداقل ۶ کاراکتر)"
        required
        minLength={6}
        disabled={isPending}
      />

      <Input
        name="company_name"
        type="text"
        placeholder="نام شرکت"
        required
        rightIcon={<Building2 className="text-muted w-5 h-5" />}
        disabled={isPending}
      />

      <Input
        name="phone"
        type="tel"
        placeholder="تلفن شرکت"
        rightIcon={<Phone className="text-muted w-5 h-5" />}
        disabled={isPending}
        className="placeholder:text-end"
      />

      <Input
        name="website"
        type="url"
        placeholder="وب‌سایت شرکت"
        rightIcon={<Globe className="text-muted w-5 h-5" />}
        disabled={isPending}
      />

      <Input
        name="address"
        type="text"
        placeholder="آدرس شرکت"
        rightIcon={<MapPin className="text-muted w-5 h-5"/>}
        disabled={isPending}
      />

       {state?.error && (
        <ErrorMessage message={state.error}/>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full py-2 text-lg"
        disabled={isPending}
      >
        {isPending ? "در حال ثبت‌نام..." : "ثبت‌نام کارفرما"}
      </Button>
    </form>
  );
}