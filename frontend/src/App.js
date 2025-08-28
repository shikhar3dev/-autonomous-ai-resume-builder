import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import ResumePreview from './components/ResumePreview';
import ThemeSwitcher from './components/ThemeSwitcher';
import ResumeBuilder from './components/ResumeBuilder';
import Dashboard from './components/Dashboard';
import CoverLetterGenerator from './components/CoverLetterGenerator';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'builder':
        return (
          <main id="builder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <ResumeBuilder onGenerated={setResumeText} />
              </div>
              <div className="lg:sticky lg:top-6 h-fit">
                <ResumePreview resumeText={resumeText} />
              </div>
            </div>
          </main>
        );
      case 'cover-letter':
        return <CoverLetterGenerator />;
      case 'jobs':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Job Matches 🎯
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                AI-powered job matching coming soon...
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('dashboard')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </motion.button>
            </div>
          </div>
        );
      case 'analyze':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Resume Analysis 📊
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Advanced resume scoring and analysis coming soon...
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('dashboard')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </motion.button>
            </div>
          </div>
        );
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white min-h-screen'}>
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <div className="text-2xl">🚀</div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AI Resume Builder
              </span>
            </motion.div>

            <div className="flex items-center space-x-4">
              {currentPage !== 'home' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo('dashboard')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </motion.button>
              )}
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
