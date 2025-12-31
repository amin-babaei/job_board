"use client"

import { Button } from "@components/ui/Button"
import { useAuth } from "app/context/AuthContext"
import Link from "next/link"

const SendResume = ({ link }: { link: string }) => {
    const { role } = useAuth()

    return (
        <div className="md:sticky md:top-24 md:self-start">
            <div className="bg-card border border-border-main rounded-lg p-6 shadow-soft">
                <h4 className="font-extrabold text-center text-xl mb-6 border-b border-border-main pb-4">
                    از اینجا شروع کنید
                </h4>
                <Link href={role == "candidate" ? link : role === "employer" ? "" : "/auth/register/candidate"}>
                    <Button variant="primary" className="w-full" disabled={role === "employer"}>
                        ارسال رزومه
                    </Button>
                </Link>
                <p className="text-center text-sm text-muted mt-4">
                    با یک کلیک رزومه خود را ارسال کنید
                </p>
                {role === "employer" &&
                    <p className="text-center text-sm text-muted mt-4">
                        فقط کارجو میتونه رزومه بفرسته !
                    </p>
                }
            </div>
        </div>
    )
}

export default SendResume
