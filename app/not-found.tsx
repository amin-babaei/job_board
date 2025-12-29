import { Button } from "@components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-8xl font-extrabold text-primary/40">
            ۴۰۴
          </h1>
          <h2 className="text-3xl font-extrabold text-foreground">
            اوپس! بنظر آدرس اشتباهی اومدی !
          </h2>
          <Link href="/" className="block w-fit mx-auto">
            <Button>بازگشت به صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}