"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Services = ({ dict }: { dict: { services: { title: string; list: string[]; footer: string } } }) => {
  return (
    <section id="services" className="py-24 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-gradient">
          {dict.services.title}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {dict.services.list.map((service: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl glass-morphism hover:border-[#FF6B00]/50 transition-colors group"
            >
              <CheckCircle2 className="text-[#FF6B00] mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-xl font-medium text-white">{service}</p>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-gray-400 text-lg italic max-w-2xl mx-auto">
          {dict.services.footer}
        </p>
      </motion.div>
    </section>
  );
};

export default Services;
