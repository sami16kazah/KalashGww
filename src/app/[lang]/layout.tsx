import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kalash GWW | Road Construction & Building Support",
  description: "Betrouwbare ondersteuning in grond-, weg- en waterbouw. Kalash GWW is een flexibel en professioneel inzetbaar bedrijf binnen de GWW-sector.",
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <div className={inter.className}>
      <Navbar lang={lang} />
      <main className="min-h-screen pt-24 pb-12 px-6">
        {children}
      </main>
      <footer className="py-12 px-6 border-t border-white/10 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Kalash GWW. All rights reserved.</p>
      </footer>
    </div>
  );
}
