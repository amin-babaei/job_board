"use client";
import { Github, Linkedin } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import Link from "next/link";

export default function Footer() {
  const year = new Date().toLocaleDateString("fa-IR", { year: "numeric" });

  return (
    <footer className="bg-card border-border-main mb-16 md:mb-0">
      <div className="container mx-auto px-6 pt-10">
        <div className="grid place-items-center sm:place-items-baseline grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl text-center sm:text-start font-semibold text-primary">جاب اونجا</h3>
            <p className="text-sm text-center sm:text-start text-muted max-w-60">
              پلتفرمی برای وصل‌کردن سریع و مناسب کارفرماها و جویندگان کار. آگهی ثبت کن،
              موقعیت‌های مناسب رو پیدا کن و راحت درخواست بزن.
            </p>

            <div className="flex justify-center sm:justify-start items-center gap-3 mt-3">
              <a
                href="https://github.com/amin-babaei"
                aria-label="Github"
                className="p-2 rounded-md hover:bg-primary/10 transition"
              >
                <Github />
              </a>

              <a
                href="linkedin.com/in/amin-babaei"
                aria-label="LinkedIn"
                className="p-2 rounded-md hover:bg-primary/10 transition"
              >
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="sm:ml-auto">
            <h4 className="text-sm font-semibold mb-3">لینک‌های سریع</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/jobs" className="hover:text-primary transition">فرصت‌های شغلی</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">درباره ما</Link></li>
              <li><a href="#" className="hover:text-primary transition">تماس با ما</a></li>
              <li><a href="#" className="hover:text-primary transition">راهنما</a></li>
            </ul>
          </div>

          <div className="sm:ml-auto">
            <h4 className="text-sm font-semibold mb-3">برای کارفرما / جوینده</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-primary transition">ثبت آگهی</a></li>
              <li><a href="#" className="hover:text-primary transition">ایجاد حساب کاربری</a></li>
              <li><a href="#" className="hover:text-primary transition">پنل کارجو</a></li>
              <li><a href="#" className="hover:text-primary transition">پنل کارفرما</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">خبرنامه</h4>

            <p className="text-sm text-muted mb-3">خبرهای شغلی و نکات استخدامی را در ایمیلت دریافت کن.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("متاسفانه فرم نمونه است — اینجا می‌توانی Server Action قرار بدی.");
              }}
              className="flex gap-2"
            >
              <label htmlFor="newsletter" className="sr-only">ایمیل</label>
              <Input id="newsletter" type="email" placeholder="ایمیل شما" className="flex-1" required />

              <Button variant="primary">ارسال</Button>
            </form>
          </div>
        </div>

        <p className="text-sm text-center mt-10 border-t border-border-main py-5 text-muted">
          © {year} جاب اونجا. همه حقوق محفوظ است. 
        </p>

      </div>
    </footer>
  );
}
