import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = ({ setResumeData, setAiContent }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', education: '', experience: '', skills: '', projects: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setResumeData(form);
    const res = await axios.post('/api/generate-resume', form);
    setAiContent(res.data.aiContent);
  };

  return (
    <form id="resume-form" className="max-w-xl mx-auto p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
      {Object.keys(form).map(field => (
        <div key={field} className="mb-4">
          <label className="block mb-1 font-medium capitalize">{field}</label>
          <input type="text" name={field} value={form[field]} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
      ))}
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
