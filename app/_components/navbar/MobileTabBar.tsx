import { Briefcase, Home, BadgeQuestionMark, SquareUser, LogOut, Loader2 } from "lucide-react";
import { User as UserIcon } from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
interface MobileTabBarProps {
    user: User | null;
    loading: boolean;
    isSigningOut: boolean;
    onSignOut: () => void;
}

const MobileTabBar = ({ user, loading, onSignOut, isSigningOut }: MobileTabBarProps) => {

    if (loading) {
        return (
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-card border-t border-border-main py-3">
                <div className="flex justify-around">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }
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
                {user ? (
                    <>
                        <Link href="/profile" className="sm:hidden">
                            <button className="flex flex-col items-center text-primary">
                                <UserIcon size={26} />
                                <span className="text-xs mt-1">پروفایل</span>
                            </button>
                        </Link>

                        <form action={onSignOut}>
                            <button
                                type="submit"
                                disabled={isSigningOut}
                                className="flex flex-col items-center text-red-600 disabled:opacity-50"
                            >
                                {isSigningOut ? (
                                    <Loader2 size={26} className="animate-spin" />
                                ) : (
                                    <LogOut size={26} />
                                )}
                                <span className="text-xs mt-1">
                                    {isSigningOut ? "در حال خروج..." : "خروج"}
                                </span>
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <Link href="/auth/register/candidate" className="sm:hidden">
                            <button className="flex flex-col items-center text-primary">
                                <UserIcon size={26} />
                                <span className="text-xs mt-1">کارجویان</span>
                            </button>
                        </Link>

                        <button className="sm:hidden flex flex-col items-center text-primary">
                            <SquareUser size={26} />
                            <span className="text-xs mt-1">کارفرمایان</span>
                        </button>
                    </>
                )}

            </div>
        </div>

    );

}

export default MobileTabBar;