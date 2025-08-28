import React, { useMemo, useState } from 'react';
import jsPDF from 'jspdf';

const ResumePreview = ({ resumeText }) => {
  const [copied, setCopied] = useState(false);

  const displayText = useMemo(() => resumeText || 'Your AI-tailored resume will appear here after generation.', [resumeText]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const left = 40;
    const top = 50;
    const maxWidth = 515; // A4 width (595pt) - margins
    const lines = doc.splitTextToSize(displayText, maxWidth);
    let y = top;
    const lineHeight = 16;
    lines.forEach(line => {
      if (y > 800) {
        doc.addPage();
        y = top;
      }
      doc.text(line, left, y);
      y += lineHeight;
    });
    doc.save('resume.pdf');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border dark:border-gray-700">
        <pre className="whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-100 text-sm leading-6 min-h-[300px]">{displayText}</pre>
      </div>
      <div className="flex gap-4 mt-4">
        <button onClick={handleDownloadPDF} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Download PDF</button>
        <button onClick={handleCopy} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">{copied ? 'Copied!' : 'Copy'}</button>
      </div>
    </section>
  );
};

export default ResumePreview;
