/**
 * Miami Dade College AI Assignment Assistant
 * Created by Professor Marquez
 * 
 * Header component with MDC branding and attribution
 */

import React, { useEffect, useState } from 'react';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import './header.scss';

const Header: React.FC = () => {
  const [showDevHint, setShowDevHint] = useState(false);

  // Listen for developer mode toggle to show hint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        setShowDevHint(true);
        setTimeout(() => setShowDevHint(false), 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="mdc-header">
      <div className="mdc-header-content">
        <div className="mdc-logo-section">
          {/* MDC Logo - Using text until actual logo is provided */}
          <div className="mdc-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" fill="#0066CC"/>
              <text x="24" y="30" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial">MDC</text>
            </svg>
          </div>
          <div className="mdc-title">
            <h1>Shark Assistant</h1>
            <p className="mdc-subtitle">Miami Dade College</p>
          </div>
        </div>
        <div className="mdc-header-right">
          <ThemeToggle />
          <div className="mdc-attribution">
            <span className="attribution-text">Created by Professor Marquez</span>
            <span className="attribution-purpose">Supporting Neurodivergent Students</span>
          </div>
        </div>
      </div>
      {showDevHint && (
        <div className="dev-mode-hint">
          Developer Console Toggled! Press Ctrl+Shift+D to toggle again.
        </div>
      )}
    </header>
  );
};

export default Header;


