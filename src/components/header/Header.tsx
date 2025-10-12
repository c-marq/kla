/**
 * Miami Dade College AI Assignment Assistant
 * Created by Professor Marquez
 * 
 * Header component with MDC branding and attribution
 */

import React from 'react';
import './header.scss';

const Header: React.FC = () => {
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
        <div className="mdc-attribution">
          <span className="attribution-text">Created by Professor Marquez</span>
          <span className="attribution-purpose">Supporting Neurodivergent Students</span>
        </div>
      </div>
    </header>
  );
};

export default Header;


