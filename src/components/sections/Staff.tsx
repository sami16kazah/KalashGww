"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

const Staff = ({ dict }: { dict: any }) => {
  return (
    <section id="personnel" className="py-24 bg-white/5 skew-y-1">
      <div className="-skew-y-1 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Users className="text-[#FF6B00]" size={32} />
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {dict.staff.title}
            </h2>
          </div>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl">
            {dict.staff.description}
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {dict.staff.list.map((item: string, index: number) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5"
              >
                <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                <span className="text-lg text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="p-6 rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 text-[#FF6B00] font-medium text-center">
            {dict.staff.footer}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Staff;
