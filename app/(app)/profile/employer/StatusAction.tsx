"use client"
import { Button } from "@components/ui/Button"
import ErrorMessage from "@components/ui/ErrorMessage";
import { changeApplicationStatus } from "@lib/actions/EmployerActions";
import { CheckCircle, XCircle } from "lucide-react"
import { useActionState } from "react";

const StatusAction = ({ id }: { id: string }) => {
    const [state, formAction, isPending] = useActionState(changeApplicationStatus, { error: null });
    return (
        <div className="flex flex-wrap gap-3">

            <form action={formAction}>
                <input type="hidden" name="application_id" value={id} />
                <input type="hidden" name="status" value="accepted" />
                <Button type="submit" variant="success" className="gap-2" disabled={isPending}>
                    <CheckCircle size={16} />
                </Button>
            </form>

            <form action={formAction}>
                <input type="hidden" name="application_id" value={id} />
                <input type="hidden" name="status" value="rejected" />
                <Button type="submit" variant="danger" className="gap-2" disabled={isPending}>
                    <XCircle size={16} />
                </Button>
            </form>
            {state?.error && (
                <ErrorMessage message={state.error} />
            )}
            {state?.success && (
                <p className="text-green-600 text-sm mt-4 text-center">وضعیت با موفقیت تغییر کرد</p>
            )}
        </div>
    )
}

export default StatusAction
