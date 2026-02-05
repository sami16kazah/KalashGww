"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const WhyUs = ({ dict }: { dict: { why_us: { title: string; list: string[] } } }) => {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-gradient">
          {dict.why_us.title}
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.why_us.list.map((item: string, index: number) => (
            <div 
              key={index}
              className="p-6 rounded-2xl glass-morphism border-white/5 flex items-start gap-4"
            >
              <div className="mt-1 p-2 rounded-lg bg-[#FF6B00]/10 text-[#FF6B00]">
                <Star size={20} fill="currentColor" />
              </div>
              <p className="text-lg text-white font-medium">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyUs;
