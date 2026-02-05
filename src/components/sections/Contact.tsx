"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const Contact = ({ dict }: { dict: any }) => {
  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism rounded-[40px] p-12 border-[#FF6B00]/20"
      >
        <div className="inline-flex p-4 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] mb-8">
          <Mail size={40} />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          {dict.contact.title}
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {dict.contact.description}
        </p>

        <div className="space-y-6">
          <p className="text-2xl font-bold text-[#FF6B00]">
            {dict.contact.cta}
          </p>
          
          <a 
            href={`mailto:${dict.manager.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FF6B00] text-white font-bold text-xl hover:bg-[#FF8533] transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] group"
          >
            <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            {dict.manager.email}
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
