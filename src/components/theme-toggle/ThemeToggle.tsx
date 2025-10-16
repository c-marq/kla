/**
 * Theme Toggle Component
 * Allows students to switch between:
 * - Normal mode (default)
 * - High contrast mode
 * - Dark mode
 */

import React, { useEffect, useState } from 'react';
import './theme-toggle.scss';

export type ThemeMode = 'normal' | 'high-contrast' | 'dark';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('normal');
  const [isOpen, setIsOpen] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('mdc-theme') as ThemeMode;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: ThemeMode) => {
    // Remove all theme classes
    document.body.classList.remove('theme-normal', 'theme-high-contrast', 'theme-dark');
    // Add new theme class
    document.body.classList.add(`theme-${newTheme}`);
    // Save preference
    localStorage.setItem('mdc-theme', newTheme);
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const getThemeLabel = (mode: ThemeMode): string => {
    switch (mode) {
      case 'normal':
        return 'Normal';
      case 'high-contrast':
        return 'High Contrast';
      case 'dark':
        return 'Dark Mode';
    }
  };

  const getThemeIcon = (mode: ThemeMode): string => {
    switch (mode) {
      case 'normal':
        return '☀️';
      case 'high-contrast':
        return '🔲';
      case 'dark':
        return '🌙';
    }
  };

  return (
    <div className="theme-toggle">
      <button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        title="Change theme"
      >
        <span className="theme-icon">{getThemeIcon(theme)}</span>
        <span className="theme-label">{getThemeLabel(theme)}</span>
      </button>

      {isOpen && (
        <div className="theme-menu">
          <button
            className={`theme-option ${theme === 'normal' ? 'active' : ''}`}
            onClick={() => handleThemeChange('normal')}
          >
            <span className="theme-icon">☀️</span>
            <span>Normal</span>
          </button>
          <button
            className={`theme-option ${theme === 'high-contrast' ? 'active' : ''}`}
            onClick={() => handleThemeChange('high-contrast')}
          >
            <span className="theme-icon">🔲</span>
            <span>High Contrast</span>
          </button>
          <button
            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <span className="theme-icon">🌙</span>
            <span>Dark Mode</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;

