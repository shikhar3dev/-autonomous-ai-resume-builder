import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ResumeBuilder = ({ onGenerated }) => {
  const [formData, setFormData] = useState({
    jobDescription: '',
    name: '',
    phone: '',
    email: '',
    education: '',
    experience: '',
    projects: '',
    skills: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('ats');
  const [resumeScore, setResumeScore] = useState(null);

  const templates = [
    { id: 'ats', name: 'ATS Optimized', description: 'Best for job applications' },
    { id: 'corporate', name: 'Corporate', description: 'Professional and formal' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple' },
    { id: 'creative', name: 'Creative', description: 'Stand out design' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateScore = (resumeText, jobDescription) => {
    const keywords = jobDescription.toLowerCase().match(/\b\w+\b/g) || [];
    const resumeWords = resumeText.toLowerCase().match(/\b\w+\b/g) || [];
    const matches = keywords.filter(keyword => resumeWords.includes(keyword));
    const score = Math.round((matches.length / keywords.length) * 100);
    return Math.min(score, 100);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        projects: formData.projects
      };

      const response = await fetch('/api/resume/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: formData.jobDescription,
          userDetails,
          template: selectedTemplate
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const data = await response.json();
      
      if (data.resumeText) {
        const score = calculateScore(data.resumeText, formData.jobDescription);
        setResumeScore(score);
        onGenerated(data.resumeText);
      } else {
        throw new Error('No resume content received');
      }
    } catch (err) {
      setError(err.message);
      onGenerated('');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Resume Builder
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create professional, ATS-optimized resumes with our autonomous AI
        </p>
      </div>

      {error && <ErrorMessage error={error} onRetry={handleGenerate} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose Template
            </label>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {template.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {template.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Role & Job Description *
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Paste the job description here. AI will analyze requirements and optimize your resume accordingly..."
              required
            />
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Education *
            </label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Your educational background (degree, institution, year, GPA if applicable)"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Professional Experience *
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Describe your work experience, responsibilities, and achievements"
              required
            />
          </div>

          {/* Projects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Projects
            </label>
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Highlight your key projects, technologies used, and outcomes"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skills *
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="List your technical skills, programming languages, tools, and technologies"
              required
            />
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" text="Generating..." />
              </div>
            ) : (
              'Generate AI Resume'
            )}
          </motion.button>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* ATS Score */}
          {resumeScore !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                ATS Compatibility Score
              </h3>
              <div className="flex items-center space-x-4">
                <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(resumeScore)}`}>
                  {resumeScore}%
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        resumeScore >= 80 ? 'bg-green-500' : resumeScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${resumeScore}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {resumeScore >= 80 ? 'Excellent ATS compatibility!' : 
                     resumeScore >= 60 ? 'Good compatibility, consider adding more keywords' : 
                     'Low compatibility, review job requirements'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Template Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Template Preview
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <div className="text-2xl font-bold mb-2">
                  {templates.find(t => t.id === selectedTemplate)?.name}
                </div>
                <div className="text-sm">
                  {templates.find(t => t.id === selectedTemplate)?.description}
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💡 Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Include specific keywords from the job description</li>
              <li>• Use action verbs and quantifiable achievements</li>
              <li>• Keep descriptions concise and impactful</li>
              <li>• Highlight relevant skills and technologies</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;
