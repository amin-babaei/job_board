import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>

  );
}
