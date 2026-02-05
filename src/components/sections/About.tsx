"use client";

import { motion } from "framer-motion";

const About = ({ dict }: { dict: { about: { title: string; p1: string; p2: string; p3: string; badge: string } } }) => {
  return (
    <section id="about" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gradient">
          {dict.about.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-300 leading-relaxed">
          <div className="space-y-6">
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
          </div>
          <div className="space-y-6 border-l border-white/10 pl-8">
            <p>{dict.about.p3}</p>
            <div className="pt-8">
              <div className="inline-block px-4 py-2 rounded-lg glass-morphism text-[#FF6B00] font-semibold">
                {dict.about.badge}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
