import { Briefcase, User, Home, BadgeQuestionMark, SquareUser } from "lucide-react";
import Link from "next/link";

const MobileTabBar = () => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-card border-t border-border-main shadow-soft z-50">
            <div className="flex justify-around py-3 text-center">
                <Link href="/" className="flex flex-col items-center text-muted">
                    <Home size={22} />
                    <span className="text-xs mt-1">خانه</span>
                </Link>

                <Link href="/jobs" className="flex flex-col items-center text-muted">
                    <Briefcase size={22} />
                    <span className="text-xs mt-1">فرصت‌ها</span>
                </Link>

                <Link href="/about" className="flex flex-col items-center text-muted">
                    <BadgeQuestionMark size={22} />
                    <span className="text-xs mt-1">درباره ما</span>
                </Link>

                <button className="sm:hidden flex flex-col items-center text-primary">
                    <User size={26} />
                    <span className="text-xs mt-1">کارجویان</span>
                </button>

                <button className="sm:hidden flex flex-col items-center text-primary">
                    <SquareUser size={26} />
                    <span className="text-xs mt-1">کارفرمایان</span>
                </button>
            </div>
        </div>

    );

}

export default MobileTabBar;