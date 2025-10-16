/**
 * Speech Recognition Visual Indicator
 * Shows animated sound waves when speech is being recognized
 */

import React from 'react';
import './speech-indicator.scss';

interface SpeechIndicatorProps {
  isListening: boolean;
  isProcessing?: boolean;
}

const SpeechIndicator: React.FC<SpeechIndicatorProps> = ({ isListening, isProcessing = false }) => {
  if (!isListening && !isProcessing) {
    return null;
  }

  return (
    <div className="speech-indicator">
      <div className="speech-indicator-content">
        {isProcessing ? (
          <>
            <div className="processing-spinner"></div>
            <span className="speech-text">Processing...</span>
          </>
        ) : (
          <>
            <div className="sound-waves">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
            <span className="speech-text">Listening...</span>
          </>
        )}
      </div>
    </div>
  );
};

export default SpeechIndicator;

