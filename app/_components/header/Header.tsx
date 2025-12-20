import { Suspense } from "react";
import LineSVG from "./svg/LineSVG";
import HeaderDataProvider from "./HeaderDataProvider";
import SkeleteLoadingHeader from "@components/ui/skeleteLoading/SkeleteLoadingHeader";

const Header = async () => {

    return (
        <div className="container mx-auto">
            <LineSVG />
            <h2 className="text-3xl md:animate-bounce mt-12 font-semibold mb-5 text-center text-primary">
                میخوای به شغل رویاهات برسی؟
            </h2>
            <Suspense fallback={<SkeleteLoadingHeader />}>
                <HeaderDataProvider />
            </Suspense>
        </div>
    );
}
export default Header;