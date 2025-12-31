"use client"
import ThemeToggle from "../theme/ThemeToggle";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileTabBar from "./MobileTabBar";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import { Loader2, LogOut, User } from "lucide-react";
import { Suspense, useActionState } from "react";
import { handleSignOut } from "@lib/actions/LoginActions";
import { useAuth } from "app/context/AuthContext";

function SearchInputSuspense() {
  return (
    <Suspense fallback={
      <div className="relative w-full xs:w-auto">
        <div className="h-12 w-full xs:w-80 bg-muted/30 rounded-full animate-pulse" />
      </div>
    }>
      <SearchInput />
    </Suspense>
  );
}
const Navbar = () => {
    const { user, role, loading } = useAuth();
    const [state, signOutAction, isPending] = useActionState(handleSignOut, null);

    return (
        <>
            <nav className="py-4 sticky top-0 backdrop-blur-md shadow-soft z-50">
                <div className="container max-w-full xl:px-10">
                    <div className="flex flex-col xs:flex-row gap-y-5 justify-between items-center">
                        <div className="flex items-center gap-x-10">
                            <Link href="/">
                                <Image src="/images/logo.png" alt="logo" width={100} height={50} />
                            </Link>
                            <ul className="hidden md:flex items-center gap-x-4">
                                <Link href="/jobs" className="text-muted cursor-pointer hover:text-primary transition">فرصت های شغلی</Link>
                                <Link href="/about" className="text-muted cursor-pointer hover:text-primary transition">درباره ما</Link>
                            </ul>
                        </div>

                        <SearchInputSuspense />

                        <div className="flex fixed left-1 top-2.5 xs:relative xs:top-0 xs:left-0 items-center gap-x-2">
                            <div className="hidden sm:flex gap-x-2">
                                {loading ? (
                                    <>
                                        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-10 w-20 ml-3 bg-gray-200 rounded animate-pulse" />
                                    </>
                                ) : user ? (
                                    <>
                                        <Link href={`/profile/${role}`}>
                                            <Button className="gap-2">
                                                <User size={18} />
                                                پروفایل
                                            </Button>
                                        </Link>
                                        <form action={signOutAction}>
                                            <Button
                                                type="submit"
                                                variant="danger"
                                                className="gap-2"
                                                disabled={isPending}
                                            >
                                                {isPending ? (
                                                    <>
                                                        <Loader2 size={22} className="animate-spin" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <LogOut size={18} />
                                                        خروج
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/register/candidate">
                                            <Button variant="primary">کارجویان</Button>
                                        </Link>
                                        <Link href="/auth/register/employer">
                                            <Button variant="primary">کارفرمایان</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            <MobileTabBar user={user} loading={loading} isSigningOut={isPending} onSignOut={signOutAction} />
        </>
    );
};

export default Navbar;
