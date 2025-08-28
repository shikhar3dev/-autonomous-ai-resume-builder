import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: String,
  experience: String,
  skills: String,
  projects: String,
  aiContent: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Resume', ResumeSchema);
