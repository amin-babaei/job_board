import OAuthButtons from "../../OAuthButtons"
import LoginForm from "./LoginForm"
import SummearyCandidate from "../../SummaryCandidate"
import { Metadata } from "next";
import HeaderAuth from "../../Header";

export const metadata: Metadata = {
    title: 'ورود کارجو',
};

const page = () => {
    return (
        <div className="min-h-dvh flex flex-col justify-center lg:flex-row">
            <div className="w-full lg:relative lg:w-[30%] bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg lg:absolute lg:right-1/2">
                    <HeaderAuth title="ورود کارجو" />

                    <OAuthButtons googleLable="ورود با گوگل" linkedinLable="ورود با لینکدین" />

                    <div className="relative flex py-5 items-center">
                        <div className="grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-400 text-sm">یا ایمیل</span>
                        <div className="grow border-t border-gray-300"></div>
                    </div>

                    <LoginForm />

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        حساب ندارید؟{" "}
                        <a href="/auth/register/candidate" className="text-primary hover:underline font-medium">
                            بسازید!
                        </a>
                    </p>
                </div>
            </div>

            <SummearyCandidate />
        </div>
    )
}

export default page
