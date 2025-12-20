import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/Footer";
import "./globals.css";
import { ThemeProvider } from "./_components/theme/ThemeProvider";
import localFont from 'next/font/local'
import { Metadata } from "next";

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
    <html lang="fa">
      <body className={`${myFont.className}`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
