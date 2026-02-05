"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";

const ManagerSection = ({ manager }: { manager: { name: string; photoUrl: string; bio: string; email: string } | null }) => {
  if (!manager || !manager.name) return null;

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative w-72 h-72 md:w-96 md:h-96 shrink-0"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6B00] to-transparent animate-pulse" />
          <div className="absolute inset-1 rounded-full overflow-hidden border-4 border-black bg-white/5">
            {manager.photoUrl && (
              <Image 
                src={manager.photoUrl} 
                alt={manager.name}
                fill
                className="object-cover"
              />
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2 italic uppercase">
            {manager.name}
          </h2>
          <div className="w-24 h-2 bg-[#FF6B00] mb-8" />
          
          <p className="text-2xl text-gray-300 leading-relaxed mb-10 font-medium whitespace-pre-wrap">
            {manager.bio}
          </p>
          
          <div className="flex gap-6">
            <a 
              href={`mailto:${manager.email}`}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#FF6B00] hover:bg-white/10 transition-all shadow-xl"
            >
              <Mail size={32} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManagerSection;
