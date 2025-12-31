import OAuthButtons from "../../OAuthButtons";
import RegisterForm from "./RegisterForm";
import SummaryCandidate from "../../SummaryCandidate";
import { Metadata } from "next";
import HeaderAuth from "../../Header";

export const metadata: Metadata = {
    title: 'ثبت نام کارجو',
};

export default function RegisterPage() {

    return (
        <div className="min-h-dvh flex flex-col justify-center lg:flex-row">
            <div className="w-full lg:relative lg:w-[30%] bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg lg:absolute lg:right-1/2">
                    <HeaderAuth title="ثبت نام کارجو" />

                    <OAuthButtons googleLable="ثبت نام با گوگل" linkedinLable="ثبت نام با لینکدین" />

                    <div className="relative flex py-5 items-center">
                        <div className="grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-400 text-sm">یا ایمیل</span>
                        <div className="grow border-t border-gray-300"></div>
                    </div>

                    <RegisterForm />

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        حساب دارید؟{" "}
                        <a href="/auth/login/candidate" className="text-primary hover:underline font-medium">
                            وارد شوید
                        </a>
                    </p>
                </div>
            </div>

            <SummaryCandidate />
        </div>
    );
}