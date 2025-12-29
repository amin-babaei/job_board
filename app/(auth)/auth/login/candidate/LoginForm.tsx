"use client";

import { Button } from "@components/ui/Button";
import ErrorMessage from "@components/ui/ErrorMessage";
import { Input } from "@components/ui/Input";
import { signInWithEmail } from "@lib/actions/LoginActions";
import { Mail } from "lucide-react";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, { error: null });

  return (
    <form action={formAction} className="space-y-4">
      <Input name="email" type="email" placeholder="ایمیل" required rightIcon={<Mail className="text-muted w-5 h-5" />} />
      <Input name="password" type="password" placeholder="پسورد (حداقل ۶ کاراکتر)" required />

      {state?.error && (
        <ErrorMessage message={state.error}/>
      )}

      <Button type="submit" variant="primary" className="w-full py-2 text-lg" disabled={isPending}>
        {isPending ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}