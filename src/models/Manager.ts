import mongoose from 'mongoose';

const TranslationSchema = new mongoose.Schema({
  nl: { type: String, required: true },
  en: { type: String, required: true },
}, { _id: false });

const ListTranslationSchema = new mongoose.Schema({
  nl: { type: [String], required: true },
  en: { type: [String], required: true },
}, { _id: false });

const ManagerSchema = new mongoose.Schema({
  // Manager Info
  name: { type: String, required: true },
  photoUrl: { type: String, required: true },
  managerBio: TranslationSchema,
  managerEmail: { type: String, required: true },

  // Hero Section
  heroTitle: TranslationSchema,
  heroSubtitle: TranslationSchema,

  // About Section
  aboutTitle: TranslationSchema,
  aboutP1: TranslationSchema,
  aboutP2: TranslationSchema,
  aboutP3: TranslationSchema,
  aboutBadge: TranslationSchema,

  // Services
  servicesTitle: TranslationSchema,
  servicesList: ListTranslationSchema,
  servicesFooter: TranslationSchema,

  // Staff
  staffTitle: TranslationSchema,
  staffDescription: TranslationSchema,
  staffList: ListTranslationSchema,
  staffFooter: TranslationSchema,

  // Work Method
  workMethodTitle: TranslationSchema,
  workMethodList: ListTranslationSchema,
  workMethodFooter: TranslationSchema,

  // Safety
  safetyTitle: TranslationSchema,
  safetyP1: TranslationSchema,
  safetyP2: TranslationSchema,

  // Why Us
  whyUsTitle: TranslationSchema,
  whyUsList: ListTranslationSchema,

  // Contact
  contactTitle: TranslationSchema,
  contactDescription: TranslationSchema,
  contactCta: TranslationSchema,
  contactSend: TranslationSchema,

}, { timestamps: true });

export default mongoose.models.Manager || mongoose.model('Manager', ManagerSchema);
