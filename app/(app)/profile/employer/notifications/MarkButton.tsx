"use client"
import { Button } from "@components/ui/Button";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const MarkAllReadButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="success" disabled={pending}>
     {pending ? (
        <>
          <Loader2 size={22} className="animate-spin mr-2" />
        </>
      ) : (
        "همه را خوانده‌شده کن"
      )}
    </Button>
  )
}

export const MarkReadButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="success" disabled={pending}>
     {pending ? (
        <>
          <Loader2 size={22} className="animate-spin mr-2" />
        </>
      ) : (
         <Check size={16} />
      )}
    </Button>
  )
}

