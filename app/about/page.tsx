import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'درباره ما',
};

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-3xl w-full bg-card shadow-md rounded-2xl p-10 space-y-6">
                <h1 className="text-3xl font-bold text-primary text-center">درباره ما</h1>

                <p className="leading-8 text-lg">
                    ما در پلتفرم <span className="font-semibold underline"> جاب اونجا </span> تلاش می‌کنیم تا ارتباطی سریع، آسان و موثر میان کارفرمایان و
                    جویندگان کار ایجاد کنیم. باور ما این است که هر فرد شایسته فرصتی است که بتواند استعدادهای
                    واقعی خود را نشان دهد و هر سازمان شایسته است بهترین نیروها را در تیم خود داشته باشد.
                </p>

                <p className="leading-8 text-lg">
                    هدف ما بهبود تجربه استخدام است؛ چه برای کسی که به دنبال شغل مناسب می‌گردد و چه برای
                    کسب‌وکاری که نیاز به استعدادهای جدید دارد. ما با ایجاد بستری شفاف، قابل اعتماد و همیشه در
                    دسترس، فرآیند جستجو، ارسال رزومه و استخدام را ساده‌تر از همیشه کرده‌ایم.
                </p>

                <div className="shadow-soft rounded-xl p-6 space-y-3">
                    <h2 className="text-xl font-semibold">ارزش‌های ما</h2>
                    <ul className="list-disc pr-6 space-y-2">
                        <li>صداقت و شفافیت در تمام بخش‌های پلتفرم</li>
                        <li>بهبود کیفیت تجربه کاربری برای کارجو و کارفرما</li>
                        <li>استفاده از تکنولوژی‌های روز برای ارائه بهترین خدمات</li>
                        <li>کمک به رشد حرفه‌ای افراد و کسب‌وکارها</li>
                    </ul>
                </div>

                <p className="text-primary text-lg text-center">
                    ما اینجاییم تا مسیر شغلی شما را هموارتر کنیم.
                </p>
            </div>
        </div>
    )
}

export default page
