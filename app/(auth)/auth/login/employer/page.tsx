import { Metadata } from "next";
import SummaryEmployer from "../../SummaryEmployer"
import LoginFormEmployer from "./LoginForm"
import HeaderAuth from "../../Header";

export const metadata: Metadata = {
    title: 'ورود کارفرما',
};

const page = () => {
    return (
        <div className="min-h-dvh flex flex-col justify-center lg:flex-row">
            <div className="w-full lg:relative lg:w-[30%] bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg lg:absolute lg:right-1/2">
                    <HeaderAuth title="ورود کارفرما" />

                    <LoginFormEmployer />

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        حساب ندارید؟{" "}
                        <a href="/auth/register/employer" className="text-primary hover:underline font-medium">
                            بسازید!
                        </a>
                    </p>
                </div>
            </div>

            <SummaryEmployer />
        </div>
    )
}

export default page
