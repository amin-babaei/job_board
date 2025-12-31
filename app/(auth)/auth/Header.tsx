import Image from "next/image"
import Link from "next/link"

const HeaderAuth = ({ title }: { title: string }) => {
    return (
        <div className="text-center flex flex-col items-center gap-y-4 mb-10">
            <Link href="/" className="gap-3 hover:opacity-80 transition">
                <Image
                    src="/images/logo.png"
                    alt="لوگو سایت"
                    width={70}
                    height={70}
                    className="object-contain"
                />
            </Link>
            <h2 className="text-3xl font-extrabold text-foreground">
                {title}
            </h2>
        </div>
    )
}

export default HeaderAuth
