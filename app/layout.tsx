import { ThemeProvider } from "@components/theme/ThemeProvider";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: 'جاب اونجا',
    template: '%s - جاب اونجا',
  },
};

const myFont = localFont({
  src: '../public/Tanha-WOL.woff2',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa-IR">
      <body className={myFont.className}>
        <ThemeProvider>
          <NextTopLoader
            color="#3b82f6"           
            initialPosition={0.08}
            crawl={true}
            height={4}
            crawlSpeed={200}
            showSpinner={false}       
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
