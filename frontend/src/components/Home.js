import React from 'react';
import { motion } from 'framer-motion';

const Home = ({ onNavigate }) => (
  <section className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-4xl mx-auto px-6"
    >
      <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
        AI Resume Builder 🚀
      </h1>
      <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
        Create professional resumes powered by autonomous AI. 
        Generate ATS-optimized resumes, cover letters, and get job matches instantly.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('dashboard')}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg"
        >
          Get Started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('builder')}
          className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold text-lg border border-gray-200 dark:border-gray-600"
        >
          Build Resume
        </motion.button>
      </div>
    </motion.div>

    {/* Features */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6"
    >
      <div className="text-center">
        <div className="text-4xl mb-4">🤖</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Autonomous AI</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Advanced AI that analyzes job descriptions and generates tailored resumes
        </p>
      </div>
      <div className="text-center">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">ATS Optimized</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Resumes designed to pass Applicant Tracking Systems
        </p>
      </div>
      <div className="text-center">
        <div className="text-4xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Job Matching</h3>
        <p className="text-gray-600 dark:text-gray-300">
          AI-powered job suggestions based on your resume
        </p>
      </div>
    </motion.div>
  </section>
);

export default Home;
