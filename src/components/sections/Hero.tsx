"use client";

import { motion } from "framer-motion";

const Hero = ({ dict }: { dict: any }) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B00]/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-white">KALASH </span>
          <span className="text-[#FF6B00]">GWW</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-medium text-white max-w-3xl mx-auto mb-8 leading-relaxed">
          {dict.hero.title}
        </p>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {dict.hero.subtitle}
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-[#FF6B00] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
