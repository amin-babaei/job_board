"use client"
import { Button } from "@components/ui/Button";
import ErrorMessage from "@components/ui/ErrorMessage";
import { deleteJob } from "@lib/actions/EmployerActions";
import { Trash2 } from "lucide-react";
import { useActionState } from "react";

const DeleteJobEmployer = ({ id }: { id: string }) => {
    const [state, formAction, isPending] = useActionState(deleteJob, { error: null });
    return (
        <form action={formAction}>
            <input type="hidden" name="job_id" value={id} />
            <Button
                type="submit"
                variant="danger"
                className="gap-2"
            >
                <Trash2 size={16} />
                {isPending ? "در حال حذف..." : "حذف آگهی"}
            </Button>
            {state?.error && (
                <ErrorMessage message={state.error} />
            )}

            {state?.success && (
                <p className="text-green-600 text-xs mt-2">آگهی با موفقیت حذف شد</p>
            )}
        </form>
    )
}

export default DeleteJobEmployer
