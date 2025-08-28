import React from 'react';

const ThemeSwitcher = ({ theme, setTheme }) => (
  <div className="flex justify-end p-4">
    <button
      className="px-4 py-2 mr-2 rounded bg-gray-200 hover:bg-gray-300"
      onClick={() => setTheme('light')}
      disabled={theme === 'light'}
    >Light</button>
    <button
      className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
      onClick={() => setTheme('dark')}
      disabled={theme === 'dark'}
    >Dark</button>
  </div>
);

export default ThemeSwitcher;
