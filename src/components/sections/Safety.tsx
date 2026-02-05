"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const Safety = ({ dict }: { dict: any }) => {
  return (
    <section className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white/5 border border-white/10 rounded-3xl p-12 relative overflow-hidden"
      >
        <ShieldCheck 
          className="absolute -right-8 -bottom-8 text-[#FF6B00]/10" 
          size={300} 
        />
        
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
          {dict.safety.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <p className="text-xl text-gray-300 leading-relaxed">
            {dict.safety.p1}
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            {dict.safety.p2}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Safety;
