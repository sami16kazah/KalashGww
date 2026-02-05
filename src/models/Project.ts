import mongoose from 'mongoose';

const TranslationSchema = new mongoose.Schema({
  nl: { type: String, required: true },
  en: { type: String, required: true },
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  title: TranslationSchema,
  description: TranslationSchema,
  details: { 
      nl: { type: String, required: false }, // Long description
      en: { type: String, required: false }
  }, 
  client: { type: String, required: false },
  location: { type: String, required: false },
  year: { type: String, required: false },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
