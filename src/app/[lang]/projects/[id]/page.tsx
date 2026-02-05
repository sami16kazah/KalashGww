"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, User } from "lucide-react";

// Reuse navbar/footer via layout, but ensure we have a back button

export default function ProjectDetailPage({ params }: { params: { id: string, lang: 'en' | 'nl' } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, use Server Components for SEO, but sticking to client fetch pattern for consistency with this codebase
    fetch(`/api/projects`) // Ideally fetch single, but filtering local is fine for small list
      .then(res => res.json())
      .then(data => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const found = data.find((p: any) => p._id === params.id);
         if (found) setProject(found);
         else setProject(null);
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">Loading...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">Project not found</div>;

  // Safe access to translated fields
  const title = project?.title?.[params.lang] || "Untitled Project";
  const content = project?.details?.[params.lang] || project?.description?.[params.lang] || "No detailed description available.";

  return (
    <main className="bg-[#050505] min-h-screen text-white pb-24">
       {/* Hero Image */}
       <div className="relative w-full h-[60vh] md:h-[80vh]">
          <Image 
             src={project.imageUrl || "/placeholder.jpg"} 
             alt={title} 
             fill 
             className="object-cover"
             priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
             <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-[#FF6B00] transition-colors mb-8 font-bold uppercase tracking-widest text-sm backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10">
                   <ArrowLeft size={16} /> {params.lang === 'nl' ? 'Terug naar Home' : 'Back to Home'}
                </Link>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter max-w-4xl">{title}</h1>
             </div>
          </div>
       </div>

       {/* Content */}
       <div className="max-w-7xl mx-auto px-6 md:px-20 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
             <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#FF6B00] mb-6 border-b border-white/10 pb-4">
                    {params.lang === 'nl' ? 'Project Details' : 'Project Info'}
                </h3>
                
                <div className="flex items-start gap-4">
                   <User className="text-gray-400 mt-1" size={20} />
                   <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Client</p>
                      <p className="font-medium text-lg">{project.client || "Private Client"}</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <MapPin className="text-gray-400 mt-1" size={20} />
                   <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Location</p>
                      <p className="font-medium text-lg">{project.location || "Netherlands"}</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <Calendar className="text-gray-400 mt-1" size={20} />
                   <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Year</p>
                      <p className="font-medium text-lg">{project.year || new Date(project.createdAt || Date.now()).getFullYear()}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Main Description */}
          <div className="lg:col-span-8">
             <h2 className="text-2xl font-bold mb-6 text-white/50">
                 {params.lang === 'nl' ? 'Over dit project' : 'About this project'}
             </h2>
             <div className="prose prose-xl prose-invert prose-p:text-gray-300 prose-headings:text-white leading-relaxed whitespace-pre-line">
                {content}
             </div>
          </div>
       </div>
    </main>
  );
}
