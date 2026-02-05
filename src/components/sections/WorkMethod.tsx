"use client";

import { motion } from "framer-motion";

const WorkMethod = ({ dict }: { dict: any }) => {
  return (
    <section className="py-24 max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            {dict.work_method.title}
          </h2>
          <div className="space-y-4">
            {dict.work_method.list.map((item: string, index: number) => (
              <div key={index} className="flex gap-4">
                <span className="text-[#FF6B00] font-bold">{index + 1}.</span>
                <span className="text-lg text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative p-1 rounded-3xl bg-gradient-to-br from-[#FF6B00] to-transparent"
        >
          <div className="bg-black p-8 rounded-[22px] h-full flex flex-col justify-center">
            <p className="text-2xl font-semibold text-white leading-relaxed italic">
              "{dict.work_method.footer}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkMethod;
