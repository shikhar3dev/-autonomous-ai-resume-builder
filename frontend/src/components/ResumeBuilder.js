import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner.js';
import ErrorMessage from './ErrorMessage.js';

const initialForm = {
  jobDescription: '',
  name: '',
  email: '',
  phone: '',
  education: '',
  experience: '',
  skills: '',
  projects: ''
};

const ResumeBuilder = ({ onGenerated }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.post('/api/resume/generate', {
        jobDescription: form.jobDescription,
        userDetails: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          education: form.education,
          experience: form.experience,
          skills: form.skills,
          projects: form.projects
        }
      });
      
      if (res.data.resumeText) {
        onGenerated && onGenerated(res.data.resumeText);
      } else {
        throw new Error('No resume content received');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.details?.[0]?.message || err.message || 'Failed to generate resume';
      setError(errorMessage);
      onGenerated && onGenerated('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-white dark:bg-gray-800 rounded shadow mt-8 lg:mt-0">
      <ErrorMessage error={error} onRetry={handleGenerate} />
      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Target Role</h3>
          <label className="block font-medium mb-1">Job Description</label>
          <textarea name="jobDescription" value={form.jobDescription} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required rows={4} placeholder="Paste the job description here to tailor your resume" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Education</label>
            <input type="text" name="education" value={form.education} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required placeholder="e.g., B.Tech in CSE, IIT Delhi (2022)" />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Experience</label>
          <textarea name="experience" value={form.experience} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required rows={4} placeholder="List roles with impact (use bullets)" />
        </div>
        <div>
          <label className="block font-medium mb-1">Projects</label>
          <textarea name="projects" value={form.projects} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required rows={3} placeholder="Key projects, stack, outcomes" />
        </div>
        <div>
          <label className="block font-medium mb-1">Skills</label>
          <textarea name="skills" value={form.skills} onChange={handleChange} className="w-full border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700" required rows={3} placeholder="Comma-separated skills" />
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center" disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner size="sm" text="" />
              <span className="ml-2">Generating Resume...</span>
            </>
          ) : (
            'Generate Resume'
          )}
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your data stays on this device except the prompt sent to the AI for generation.</p>
      </form>
    </section>
  );
};

export default ResumeBuilder;
