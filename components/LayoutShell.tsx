"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCadastro = pathname === "/cadastro";

  // Página de links (/bio) é standalone, sem header/footer do site
  if (pathname === "/bio") return <>{children}</>;

  if (isCadastro) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] dark:bg-black">
        <Header />
        {children}
      </div>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}
