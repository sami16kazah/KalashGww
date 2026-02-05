"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Save, Upload, User, Layout, Info, Rocket, Shield, Star, MessageSquare, Heart, Phone, Briefcase, Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";

// Importing dictionaries for auto-fill
import nlDict from "@/dictionaries/nl.json";
import enDict from "@/dictionaries/en.json";
import Modal from "@/components/ui/Modal";

type Translation = { nl: string; en: string };
type ListTranslation = { nl: string[]; en: string[] };

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("manager");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: "success" | "error" | "info"; title: string; description: string }>({ isOpen: false, type: "success", title: "", description: "" });
  
  // Project Form State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentProject, setCurrentProject] = useState<any>({ title: { nl: '', en: '' }, description: { nl: '', en: '' }, imageUrl: '' });
  const [isEditingProject, setIsEditingProject] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetch("/api/manager")
        .then(res => res.json())
        .then(data => {
          // Define default values from static dictionaries
          const defaults = {
            name: "Samik Azah", 
            photoUrl: "https://res.cloudinary.com/depeo6txz/image/upload/v1707150000/placeholder_manager.jpg", 
            managerBio: { nl: "Met jarenlange ervaring in de GWW-sector streef ik naar kwaliteit en betrouwbaarheid op elk project.", en: "With years of experience in the GWW sector, I strive for quality and reliability on every project." }, 
            managerEmail: "info@kalashgww.com",
            
            heroTitle: { nl: nlDict.hero.title, en: enDict.hero.title },
            heroSubtitle: { nl: nlDict.hero.subtitle, en: enDict.hero.subtitle },
            
            aboutTitle: { nl: nlDict.about.title, en: enDict.about.title },
            aboutP1: { nl: nlDict.about.p1, en: enDict.about.p1 },
            aboutP2: { nl: nlDict.about.p2, en: enDict.about.p2 },
            aboutP3: { nl: nlDict.about.p3, en: enDict.about.p3 },
            aboutBadge: { nl: nlDict.about.badge, en: enDict.about.badge },
            
            servicesTitle: { nl: nlDict.services.title, en: enDict.services.title },
            servicesList: { nl: nlDict.services.list, en: enDict.services.list },
            servicesFooter: { nl: nlDict.services.footer, en: enDict.services.footer },
            
            staffTitle: { nl: nlDict.staff.title, en: enDict.staff.title },
            staffDescription: { nl: nlDict.staff.description, en: enDict.staff.description },
            staffList: { nl: nlDict.staff.list, en: enDict.staff.list },
            staffFooter: { nl: nlDict.staff.footer, en: enDict.staff.footer },
            
            workMethodTitle: { nl: nlDict.work_method.title, en: enDict.work_method.title },
            workMethodList: { nl: nlDict.work_method.list, en: enDict.work_method.list },
            workMethodFooter: { nl: nlDict.work_method.footer, en: enDict.work_method.footer },
            
            safetyTitle: { nl: nlDict.safety.title, en: enDict.safety.title },
            safetyP1: { nl: nlDict.safety.p1, en: enDict.safety.p1 },
            safetyP2: { nl: nlDict.safety.p2, en: enDict.safety.p2 },
            
            whyUsTitle: { nl: nlDict.why_us.title, en: enDict.why_us.title },
            whyUsList: { nl: nlDict.why_us.list, en: enDict.why_us.list },
            
            contactTitle: { nl: nlDict.contact.title, en: enDict.contact.title },
            contactDescription: { nl: nlDict.contact.description, en: enDict.contact.description },
            contactCta: { nl: nlDict.contact.cta, en: enDict.contact.cta },
            contactSend: { nl: nlDict.contact.send, en: enDict.contact.send },
          };

          if (data) {
             setFormData({
               ...defaults,
               ...data,
               managerBio: { ...defaults.managerBio, ...data.managerBio },
               heroTitle: { ...defaults.heroTitle, ...data.heroTitle },
               heroSubtitle: { ...defaults.heroSubtitle, ...data.heroSubtitle },
             });
          } else {
            setFormData(defaults);
          }
          setLoading(false);
        });
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) { console.error("Error fetching projects", err); }
  };

  const handleSaveProject = async () => {
    // Client-side validation
    if (!currentProject.imageUrl) {
        setModalState({ isOpen: true, type: "error", title: "Missing Image", description: "Please upload an image for the project." });
        return;
    }
    if (!currentProject.title.nl || !currentProject.title.en || !currentProject.description.nl || !currentProject.description.en) {
        setModalState({ isOpen: true, type: "error", title: "Missing Fields", description: "Please fill in all Title and Description fields in both languages." });
        return;
    }

    try {
      const method = isEditingProject ? "PUT" : "POST";
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });

      const data = await res.json();

      if (res.ok) {
        setIsProjectModalOpen(false);
        fetchProjects();
        setModalState({
           isOpen: true,
           type: "success",
           title: isEditingProject ? "Project Updated" : "Project Added",
           description: "The project has been successfully saved."
        });
      } else { 
          throw new Error(data.error || data.message || "Failed to save project"); 
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setModalState({ isOpen: true, type: "error", title: "Error", description: err.message || "Failed to save project." });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure?")) {
       try {
         const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
         if (res.ok) {
            fetchProjects();
            setModalState({ isOpen: true, type: "success", title: "Deleted", description: "Project removed." });
         }
       } catch (err: unknown) { alert("Error deleting " + err); }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditProject = (project: any) => {
    setCurrentProject(project);
    setIsEditingProject(true);
    setIsProjectModalOpen(true);
  };

  const openNewProjectModal = () => {
    setCurrentProject({ title: { nl: '', en: '' }, description: { nl: '', en: '' }, imageUrl: '' });
    setIsEditingProject(false);
    setIsProjectModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setModalState({
          isOpen: true,
          type: "success",
          title: "Changes Saved",
          description: "All your updates have been successfully saved to the database."
        });
      }
    } catch (err) { 
      console.error(err);
      setModalState({
        isOpen: true,
        type: "error",
        title: "Save Failed",
        description: "There was a problem saving your changes. Please try again."
      });
    }
    finally { setSaving(false); }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: string, subfield: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], [subfield]: value }
    }));
  };

  const addListItem = (field: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      [field]: { 
        nl: [...prev[field].nl, ""], 
        en: [...prev[field].en, ""] 
      }
    }));
  };

  const removeListItem = (field: string, index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      [field]: { 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nl: prev[field].nl.filter((_: any, i: number) => i !== index),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        en: prev[field].en.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  if (loading || !formData) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#FF6B00]" />
    </div>
  );

  const tabs = [
    { id: "manager", name: "Manager Info", icon: User },
    { id: "hero", name: "Hero Section", icon: Rocket },
    { id: "about", name: "About Company", icon: Info },
    { id: "services", name: "Our Services", icon: Layout },
    { id: "staff", name: "Personnel", icon: Star },
    { id: "work", name: "Work Method", icon: Shield },
    { id: "safety", name: "Safety & Quality", icon: MessageSquare },
    { id: "whyus", name: "Why Choose Us", icon: Heart },
    { id: "projects", name: "Projects", icon: Briefcase },
    { id: "contact", name: "Contact Info", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 glass-morphism p-6 rounded-[32px] border-[#FF6B00]/10">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Site Dashboard</h1>
            <p className="text-gray-500 text-sm">Every text field is auto-filled for easy modification.</p>
          </div>
          <div className="flex gap-4">
             <button onClick={handleSave} disabled={saving} className="px-8 py-3 rounded-2xl bg-[#FF6B00] text-white font-black hover:bg-[#FF8533] transition-all flex items-center gap-2 shadow-xl shadow-[#FF6B00]/20">
               <Save size={20}/> {saving ? "Saving..." : "Save All Changes"}
             </button>
             <button onClick={() => signOut()} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-red-500 hover:bg-red-500/10 transition-all flex items-center gap-2">
               <LogOut size={20}/> Logout
             </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <aside className="lg:w-72 shrink-0 flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                <tab.icon size={22} className={activeTab === tab.id ? 'text-white' : 'text-[#FF6B00]'} />
                <span className="font-bold text-sm tracking-tight">{tab.name}</span>
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 glass-morphism p-6 md:p-10 rounded-[48px] border-[#FF6B00]/10 min-h-[70vh]">
            <AnimatePresence mode="wait">
              {activeTab === "manager" && (
                <motion.div key="manager" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-3xl font-black mb-10 italic uppercase tracking-tight text-gradient">Manager Profile</h2>
                  <div className="grid gap-10">
                    <div className="flex flex-col md:flex-row gap-10 items-center bg-white/5 p-8 rounded-[32px] border border-white/5">
                       <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#FF6B00]/30 shrink-0 bg-black">
                          {formData.photoUrl && <Image src={formData.photoUrl} alt="Preview" fill className="object-cover" />}
                       </div>
                       <div className="space-y-4">
                          <CldUploadWidget 
                            signatureEndpoint="/api/cloudinary-signature"
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onSuccess={(result: any) => setFormData({ ...formData, photoUrl: result.info.secure_url })}
                          >
                            {({ open }) => (
                              <button onClick={() => open()} className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2 font-bold text-sm">
                                <Upload size={18} className="text-[#FF6B00]" /> Update Profile Photo
                              </button>
                            )}
                          </CldUploadWidget>
                          <p className="text-gray-500 text-xs italic">Upload a professional photo for the &apos;Manager&apos; section.</p>
                       </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <Input label="Manager Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                      <Input label="Public Contact Email" value={formData.managerEmail} onChange={(v) => setFormData({ ...formData, managerEmail: v })} />
                    </div>
                    <TransInput label="Professional Bio" value={formData.managerBio} onChange={(lang, v) => updateField('managerBio', lang, v)} textarea />
                  </div>
                </motion.div>
              )}

              {activeTab === "hero" && (
                <motion.div key="hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">Hero Section</h2>
                  <div className="space-y-10">
                    <TransInput label="Main Catchy Title" value={formData.heroTitle} onChange={(l, v) => updateField('heroTitle', l, v)} />
                    <TransInput label="Hero Description" value={formData.heroSubtitle} onChange={(l, v) => updateField('heroSubtitle', l, v)} textarea />
                  </div>
                </motion.div>
              )}

              {activeTab === "about" && (
                <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">About Company</h2>
                  <div className="space-y-8">
                    <TransInput label="About Title" value={formData.aboutTitle} onChange={(l, v) => updateField('aboutTitle', l, v)} />
                    <TransInput label="Who We Are (P1)" value={formData.aboutP1} onChange={(l, v) => updateField('aboutP1', l, v)} textarea />
                    <TransInput label="Our Vision (P2)" value={formData.aboutP2} onChange={(l, v) => updateField('aboutP2', l, v)} textarea />
                    <TransInput label="Our Values (P3)" value={formData.aboutP3} onChange={(l, v) => updateField('aboutP3', l, v)} textarea />
                    <TransInput label="Badge Text" value={formData.aboutBadge} onChange={(l, v) => updateField('aboutBadge', l, v)} />
                  </div>
                </motion.div>
              )}

              {activeTab === "services" && (
                 <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">Our Services</h2>
                    <div className="space-y-10">
                       <TransInput label="Main Section Title" value={formData.servicesTitle} onChange={(l, v) => updateField('servicesTitle', l, v)} />
                       <ListInput label="List of Service Cards" list={formData.servicesList} onAdd={() => addListItem('servicesList')} onRemove={(i) => removeListItem('servicesList', i)} onChange={(lang, i, v) => {
                          const newList = { ...formData.servicesList, [lang]: [...formData.servicesList[lang]] };
                          newList[lang][i] = v;
                          setFormData({ ...formData, servicesList: newList });
                       }} />
                       <TransInput label="Services Footer Text" value={formData.servicesFooter} onChange={(l, v) => updateField('servicesFooter', l, v)} />
                    </div>
                 </motion.div>
              )}

              {activeTab === "staff" && (
                 <motion.div key="staff" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">Personnel</h2>
                    <div className="space-y-10">
                       <TransInput label="Personnel Section Title" value={formData.staffTitle} onChange={(l, v) => updateField('staffTitle', l, v)} />
                       <TransInput label="Staff Overview" value={formData.staffDescription} onChange={(l, v) => updateField('staffDescription', l, v)} textarea />
                       <ListInput label="Team Expertise List" list={formData.staffList} onAdd={() => addListItem('staffList')} onRemove={(i) => removeListItem('staffList', i)} onChange={(lang, i, v) => {
                          const newList = { ...formData.staffList, [lang]: [...formData.staffList[lang]] };
                          newList[lang][i] = v;
                          setFormData({ ...formData, staffList: newList });
                       }} />
                       <TransInput label="Staff Bottom Quote" value={formData.staffFooter} onChange={(l, v) => updateField('staffFooter', l, v)} />
                    </div>
                 </motion.div>
              )}

              {activeTab === "work" && (
                 <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">Work Method</h2>
                    <div className="space-y-10">
                       <TransInput label="Workflow Title" value={formData.workMethodTitle} onChange={(l, v) => updateField('workMethodTitle', l, v)} />
                       <ListInput label="Step-by-Step Method" list={formData.workMethodList} onAdd={() => addListItem('workMethodList')} onRemove={(i) => removeListItem('workMethodList', i)} onChange={(lang, i, v) => {
                          const newList = { ...formData.workMethodList, [lang]: [...formData.workMethodList[lang]] };
                          newList[lang][i] = v;
                          setFormData({ ...formData, workMethodList: newList });
                       }} />
                       <TransInput label="Method Highlight Note" value={formData.workMethodFooter} onChange={(l, v) => updateField('workMethodFooter', l, v)} />
                    </div>
                 </motion.div>
              )}

              {activeTab === "safety" && (
                 <motion.div key="safety" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">Safety & Quality</h2>
                    <div className="space-y-8">
                       <TransInput label="Safety Title" value={formData.safetyTitle} onChange={(l, v) => updateField('safetyTitle', l, v)} />
                       <TransInput label="Commitment P1" value={formData.safetyP1} onChange={(l, v) => updateField('safetyP1', l, v)} textarea />
                       <TransInput label="Standards P2" value={formData.safetyP2} onChange={(l, v) => updateField('safetyP2', l, v)} textarea />
                    </div>
                 </motion.div>
              )}

              {activeTab === "whyus" && (
                 <motion.div key="whyus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">Why Choose Us</h2>
                    <div className="space-y-10">
                       <TransInput label="Why Us Title" value={formData.whyUsTitle} onChange={(l, v) => updateField('whyUsTitle', l, v)} />
                       <ListInput label="Key Selling Points" list={formData.whyUsList} onAdd={() => addListItem('whyUsList')} onRemove={(i) => removeListItem('whyUsList', i)} onChange={(lang, i, v) => {
                          const newList = { ...formData.whyUsList, [lang]: [...formData.whyUsList[lang]] };
                          newList[lang][i] = v;
                          setFormData({ ...formData, whyUsList: newList });
                       }} />
                    </div>
                 </motion.div>
              )}

              {activeTab === "projects" && (
                  <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-center mb-10">
                       <h2 className="text-3xl font-black italic uppercase text-gradient">Projects Showcase</h2>
                       <button onClick={openNewProjectModal} className="px-6 py-3 bg-[#FF6B00] rounded-xl text-white font-bold flex items-center gap-2 hover:bg-[#FF8533] transition-all shadow-lg shadow-[#FF6B00]/20">
                          <Plus size={20} /> Add New Project
                       </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {projects.map((project) => (
                          <div key={project._id} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden group">
                             <div className="relative h-48 w-full">
                                <Image src={project.imageUrl} alt={project.title.en} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                                   <button onClick={() => handleEditProject(project)} className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/40"><Edit size={20} /></button>
                                   <button onClick={() => handleDeleteProject(project._id)} className="p-2 bg-red-500/20 rounded-lg text-red-500 hover:bg-red-500/40"><Trash2 size={20} /></button>
                                </div>
                             </div>
                             <div className="p-5 space-y-2">
                                <h3 className="font-bold text-white text-lg">{project.title.en}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">{project.description.en}</p>
                             </div>
                          </div>
                       ))}
                       {projects.length === 0 && <p className="text-gray-500 col-span-3 text-center py-10">No projects added yet.</p>}
                    </div>
                  </motion.div>
               )}

              {activeTab === "contact" && (
                 <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-3xl font-black mb-10 italic uppercase text-gradient">Contact Section</h2>
                    <div className="space-y-10">
                       <TransInput label="Contact Heading" value={formData.contactTitle} onChange={(l, v) => updateField('contactTitle', l, v)} />
                       <TransInput label="Contact Sub-description" value={formData.contactDescription} onChange={(l, v) => updateField('contactDescription', l, v)} textarea />
                       <TransInput label="CTA Message" value={formData.contactCta} onChange={(l, v) => updateField('contactCta', l, v)} />
                       <TransInput label="Button Text" value={formData.contactSend} onChange={(l, v) => updateField('contactSend', l, v)} />
                    </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
      
      <Modal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        description={modalState.description}
        type={modalState.type}
      />

      {/* Project Edit/Add Modal - Inline Implementation for speed */}
      {isProjectModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm overflow-y-auto py-10">
            <div className="bg-[#0F0F0F] border border-white/10 p-8 rounded-3xl w-full max-w-4xl shadow-2xl relative my-auto">
               <h2 className="text-3xl font-bold text-white mb-8">{isEditingProject ? "Edit Project" : "Add New Project"}</h2>
               <div className="space-y-8">
                  <div className="flex flex-col gap-4">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Project Image</label>
                     <CldUploadWidget 
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        signatureEndpoint="/api/cloudinary-signature"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onSuccess={(result: any) => setCurrentProject({ ...currentProject, imageUrl: result.info.secure_url })}
                     >
                       {({ open }) => (
                         <div onClick={() => open()} className="w-full h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6B00] transition-colors bg-white/5 relative overflow-hidden group">
                           {currentProject.imageUrl ? (
                             <Image src={currentProject.imageUrl} alt="Project Preview" fill className="object-cover" />
                           ) : (
                             <div className="flex flex-col items-center text-gray-500">
                               <Upload size={48} className="mb-4 group-hover:text-[#FF6B00] transition-colors" />
                               <span>Click to Upload Image</span>
                             </div>
                           )}
                         </div>
                       )}
                     </CldUploadWidget>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                      <TransInput label="Project Title" value={currentProject.title} onChange={(l, v) => setCurrentProject({ ...currentProject, title: { ...currentProject.title, [l]: v } })} />
                      <div className="space-y-4">
                          <Input label="Client Name" value={currentProject.client || ""} onChange={(v) => setCurrentProject({ ...currentProject, client: v })} />
                          <div className="grid grid-cols-2 gap-4">
                             <Input label="Location" value={currentProject.location || ""} onChange={(v) => setCurrentProject({ ...currentProject, location: v })} />
                             <Input label="Year" value={currentProject.year || ""} onChange={(v) => setCurrentProject({ ...currentProject, year: v })} />
                          </div>
                      </div>
                  </div>

                  <TransInput label="Short Description (Card)" value={currentProject.description} onChange={(l, v) => setCurrentProject({ ...currentProject, description: { ...currentProject.description, [l]: v } })} textarea />
                  <TransInput label="Full Case Study (Detail Page)" value={currentProject.details || { nl: "", en: "" }} onChange={(l, v) => setCurrentProject({ ...currentProject, details: { ...currentProject.details, [l]: v } })} textarea />

                  <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                     <button onClick={() => setIsProjectModalOpen(false)} className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10">Cancel</button>
                     <button onClick={handleSaveProject} className="px-8 py-3 rounded-xl bg-[#FF6B00] text-white font-bold hover:bg-[#FF8533] shadow-lg shadow-[#FF6B00]/20">Save Project</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="block text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] ml-1">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 outline-none transition-all" />
  </div>
);

const TransInput = ({ label, value, onChange, textarea }: { label: string, value: Translation, onChange: (lang: 'nl' | 'en', v: string) => void, textarea?: boolean }) => (
  <div className="space-y-4 p-8 bg-white/5 rounded-[32px] border border-white/5 relative group hover:border-[#FF6B00]/20 transition-all">
    <div className="absolute top-0 right-10 p-2 text-[10px] font-black text-white/40 uppercase tracking-[0.3em] bg-white/5 rounded-b-xl group-hover:text-[#FF6B00] transition-colors">{label}</div>
    <div className="grid lg:grid-cols-2 gap-8 pt-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[#FF6B00] text-[10px] font-black uppercase tracking-wider mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" /> Dutch (NL)
        </label>
        {textarea ? (
          <textarea rows={4} value={value.nl} onChange={(e) => onChange('nl', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm font-medium focus:border-[#FF6B00] outline-none transition-all leading-relaxed" />
        ) : (
          <input type="text" value={value.nl} onChange={(e) => onChange('nl', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm font-medium focus:border-[#FF6B00] outline-none transition-all" />
        )}
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-wider mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> English (EN)
        </label>
        {textarea ? (
          <textarea rows={4} value={value.en} onChange={(e) => onChange('en', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm font-medium focus:border-[#FF6B00] outline-none transition-all leading-relaxed" />
        ) : (
          <input type="text" value={value.en} onChange={(e) => onChange('en', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm font-medium focus:border-[#FF6B00] outline-none transition-all" />
        )}
      </div>
    </div>
  </div>
);

const ListInput = ({ label, list, onAdd, onRemove, onChange }: { label: string, list: ListTranslation, onAdd: () => void, onRemove: (i: number) => void, onChange: (lang: 'nl' | 'en', i: number, v: string) => void }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center ml-1">
      <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{label}</label>
      <button onClick={onAdd} className="px-4 py-1.5 rounded-lg bg-[#FF6B00]/10 text-[#FF6B00] text-[10px] font-black hover:bg-[#FF6B00]/20 transition-all border border-[#FF6B00]/20">+ ADD ITEM</button>
    </div>
    <div className="space-y-4">
      {list.nl.map((_, i) => (
        <div key={i} className="flex gap-4 items-center group bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
          <div className="flex-1 grid md:grid-cols-2 gap-4">
             <input type="text" placeholder="Dutch Text" value={list.nl[i]} onChange={(e) => onChange('nl', i, e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-medium focus:border-[#FF6B00] outline-none" />
             <input type="text" placeholder="English Text" value={list.en[i]} onChange={(e) => onChange('en', i, e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-medium focus:border-[#FF6B00] outline-none" />
          </div>
          <button onClick={() => onRemove(i)} className="p-2 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20">×</button>
        </div>
      ))}
    </div>
  </div>
);
