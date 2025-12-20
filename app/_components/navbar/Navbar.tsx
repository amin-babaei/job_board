import ThemeToggle from "../theme/ThemeToggle";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileTabBar from "./MobileTabBar";
import Link from "next/link";
import { Button } from "@components/ui/Button";

const Navbar = () => {

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

                        <SearchInput />

                        <div className="flex fixed left-1 top-2.5 xs:relative xs:top-0 xs:left-0 items-center gap-x-2">
                            <div className="hidden sm:flex gap-x-2">
                                <Button variant="primary">کارجویان</Button>
                                <Button variant="primary">کارفرمایان</Button>
                            </div>

                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            <MobileTabBar />
        </>
    );
};

export default Navbar;
