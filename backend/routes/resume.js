import express from 'express';
import Resume from '../models/Resume.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { validateResumeGeneration, handleValidationErrors, sanitizeInput } from '../middleware/validation.js';
dotenv.config();

const router = express.Router();


// POST /api/resume/generate
router.post('/resume/generate', sanitizeInput, validateResumeGeneration, handleValidationErrors, async (req, res) => {
  const { jobDescription, userDetails } = req.body;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;

  const buildFallbackResume = () => {
    const { name, email, phone, education, experience, skills, projects } = userDetails || {};
    return (
`${name || 'Your Name'}\n${email || ''} | ${phone || ''}\n\nSUMMARY\nMotivated candidate targeting roles aligned with: ${jobDescription || 'your target role'}.\n\nEDUCATION\n${education || 'Add your education details.'}\n\nEXPERIENCE\n${experience || 'Add your professional experience or internships.'}\n\nPROJECTS\n${projects || 'Add 1-3 impactful projects with outcomes.'}\n\nSKILLS\n${skills || 'List your key skills (comma separated).'}\n`);
  };

  if (!hasOpenAI) {
    const resumeText = buildFallbackResume();
    return res.json({ resumeText, fallback: true });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Generate a concise, ATS-friendly resume. Use clean sections and bullet points.\nJob Description: ${jobDescription}\nUser Details: ${JSON.stringify(userDetails)}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.6,
    });
    const resumeText = completion.choices?.[0]?.message?.content?.trim();
    if (!resumeText) {
      // Fallback if OpenAI returns empty content
      return res.status(500).json({
        error: 'AI failed to generate a resume. Please try again.',
        resumeText: buildFallbackResume(),
        fallback: true,
      });
    }
    res.json({ resumeText, fallback: false });
  } catch (error) {
    console.error('OpenAI error:', error);
    // Return a 500 error and a fallback resume
    return res.status(500).json({
      error: 'An error occurred while generating the resume.',
      resumeText: buildFallbackResume(),
      fallback: true,
    });
  }
});

// GET /api/resume/:id
router.get('/resume/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resume' });
  }
});

export default router;
