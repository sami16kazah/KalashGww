import { getDictionary } from "@/lib/dictionaries";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Staff from "@/components/sections/Staff";
import WorkMethod from "@/components/sections/WorkMethod";
import Safety from "@/components/sections/Safety";
import WhyUs from "@/components/sections/WhyUs";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ManagerSection from "@/components/sections/ManagerSection";
import dbConnect from "@/lib/mongodb";
import Manager from "@/models/Manager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({
  params: { lang },
}: {
  params: { lang: 'en' | 'nl' };
}) {
  // Load static fallback
  const dict = await getDictionary(lang);
  
  // Load dynamic content from DB
  await dbConnect();
  const managerData = await Manager.findOne().lean();

  // Merge dynamic data with fallback logic inside components or here
  const content = transformData(managerData || {}, lang, dict);

  return (
    <div className="flex flex-col gap-12 overflow-x-hidden">
      <Hero dict={content} />
      <About dict={content} />
      <Services dict={content} />
      <Projects dict={content} lang={lang} />
      <Staff dict={content} />
      {/* Manager section is already inside or replaced by Staff/About in user's flow */}
      <ManagerSection manager={content.manager} />
      <WorkMethod dict={content} />
      <Safety dict={content} />
      <WhyUs dict={content} />
      <Contact dict={content} />
    </div>
  );
}

// Map the DB structure to what the components expect
function transformData(db: any, lang: 'nl' | 'en', fallback: any) {
  db = db || {};
  return {
    hero: {
      title: db.heroTitle?.[lang] || fallback.hero.title,
      subtitle: db.heroSubtitle?.[lang] || fallback.hero.subtitle,
    },
    about: {
      title: db.aboutTitle?.[lang] || fallback.about.title,
      p1: db.aboutP1?.[lang] || fallback.about.p1,
      p2: db.aboutP2?.[lang] || fallback.about.p2,
      p3: db.aboutP3?.[lang] || fallback.about.p3,
      badge: db.aboutBadge?.[lang] || fallback.about.badge,
    },
    services: {
      title: db.servicesTitle?.[lang] || fallback.services.title,
      list: (db.servicesList?.[lang]?.length > 0) ? db.servicesList[lang] : fallback.services.list,
      footer: db.servicesFooter?.[lang] || fallback.services.footer,
    },
    staff: {
      title: db.staffTitle?.[lang] || fallback.staff.title,
      description: db.staffDescription?.[lang] || fallback.staff.description,
      list: (db.staffList?.[lang]?.length > 0) ? db.staffList[lang] : fallback.staff.list,
      footer: db.staffFooter?.[lang] || fallback.staff.footer,
    },
    work_method: {
      title: db.workMethodTitle?.[lang] || fallback.work_method.title,
      list: (db.workMethodList?.[lang]?.length > 0) ? db.workMethodList[lang] : fallback.work_method.list,
      footer: db.workMethodFooter?.[lang] || fallback.work_method.footer,
    },
    safety: {
      title: db.safetyTitle?.[lang] || fallback.safety.title,
      p1: db.safetyP1?.[lang] || fallback.safety.p1,
      p2: db.safetyP2?.[lang] || fallback.safety.p2,
    },
    why_us: {
      title: db.whyUsTitle?.[lang] || fallback.why_us.title,
      list: (db.whyUsList?.[lang]?.length > 0) ? db.whyUsList[lang] : fallback.why_us.list,
    },
    contact: {
      title: db.contactTitle?.[lang] || fallback.contact.title,
      description: db.contactDescription?.[lang] || fallback.contact.description,
      cta: db.contactCta?.[lang] || fallback.contact.cta,
      email: db.managerEmail || "info@kalashgww.com",
      send: db.contactSend?.[lang] || fallback.contact.send
    },
    // Adding manager profile data directly for easy access
    manager: {
      name: db.name || "Manager",
      photoUrl: db.photoUrl || "",
      bio: (db.managerBio?.[lang]) || (lang === 'nl' ? "Kalash GWW Manager" : "Kalash GWW Manager"),
      email: db.managerEmail || "info@kalashgww.com"
    }
  };
}
