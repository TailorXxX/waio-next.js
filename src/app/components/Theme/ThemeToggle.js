// src/components/ThemeToggle.js
'use client';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
