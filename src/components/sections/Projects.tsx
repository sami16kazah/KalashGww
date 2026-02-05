"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  _id: string;
  title: { nl: string; en: string };
  description: { nl: string; en: string };
  imageUrl: string;
};

const Projects = ({ dict, lang }: { dict: any; lang: "en" | "nl" }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  if (!mounted || projects.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-black text-gradient uppercase tracking-tight mb-6">
          {lang === 'nl' ? 'Onze Projecten' : 'Our Projects'}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {lang === 'nl' 
            ? 'Een selectie van onze recente werken in de GWW-sector, uitgevoerd met precisie en vakmanschap.' 
            : 'A selection of our recent works in the GWW sector, executed with precision and craftsmanship.'}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group cursor-pointer flex flex-col gap-6"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/5 bg-white/5">
                <Image
                    src={project.imageUrl || "/placeholder.jpg"}
                    alt={project.title?.[lang] || "Project"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay for Detail Button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                              <Link href={`/${lang}/projects/${project._id}`} className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase text-xs tracking-wider hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-colors cursor-pointer">
                                 {lang === 'nl' ? 'Bekijk Details' : 'View Details'} <ArrowUpRight size={16} />
                              </Link>
                </div>
            </div>

            {/* Text Content - Neatly Aligned Below */}
            <div className="space-y-3 px-2">
                <div className="flex items-center justify-between">
                     <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#FF6B00] transition-colors leading-tight">
                        {project.title?.[lang] || "Untitled Project"}
                     </h3>
                     <span className="text-xs font-black text-gray-600 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                        0{index + 1}
                     </span>
                </div>
                
                <p className="text-gray-400 text-base leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {project.description?.[lang] || ""}
                </p>
                
                <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] uppercase tracking-wider opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        {lang === 'nl' ? 'Bekijk Details' : 'View Details'} <ArrowUpRight size={14} />
                    </span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
