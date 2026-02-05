"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const Navbar = ({ lang }: { lang: string }) => {
  const pathname = usePathname();
  const otherLang = lang === "nl" ? "en" : "nl";
  
  const switchLangPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-morphism m-4 rounded-2xl">
      <Link href={`/${lang}`} className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tighter text-white">
          KALASH <span className="text-[#FF6B00]">GWW</span>
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link 
          href={switchLangPath} 
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10"
        >
          <Globe size={18} />
          <span className="text-sm font-medium uppercase">{otherLang}</span>
        </Link>
        <Link 
          href="/admin/login" 
          className="text-sm font-medium hover:text-[#FF6B00] transition-colors"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
