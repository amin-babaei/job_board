import Link from "next/link";
import EmployerRegisterForm from "./RegisterForm";
import SummaryEmployer from "../../SummaryEmployer";
import { Metadata } from "next";
import HeaderAuth from "../../Header";

export const metadata: Metadata = {
    title: 'ثبت نام کارفرما',
};

export default function EmployerRegisterPage() {
    return (
        <div className="min-h-dvh flex flex-col justify-center lg:flex-row">
            <div className="w-full lg:relative lg:w-[30%] bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg lg:absolute lg:right-1/2">
                    <HeaderAuth title="ثبت نام کارفرما" />


                    <EmployerRegisterForm />

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        حساب دارید؟{" "}
                        <Link href="/auth/login/employer" className="text-primary hover:underline font-medium">
                            وارد شوید
                        </Link>
                    </p>
                </div>
            </div>

            <SummaryEmployer />
        </div>
    );
}