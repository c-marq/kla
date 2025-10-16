/**
 * Action Confirmation Component
 * Provides visual feedback when actions are completed successfully
 * Examples: File uploaded, Camera activated, Screen sharing started, etc.
 */

import React, { useEffect, useState } from 'react';
import './action-confirmation.scss';

export interface ConfirmationMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  icon?: string;
  duration?: number; // milliseconds, default 3000
}

interface ActionConfirmationProps {
  message: ConfirmationMessage | null;
  onDismiss?: (id: string) => void;
}

const ActionConfirmation: React.FC<ActionConfirmationProps> = ({ message, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      
      const duration = message.duration || 3000;
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          if (onDismiss) {
            onDismiss(message.id);
          }
        }, 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message || !visible) {
    return null;
  }

  const getIcon = () => {
    if (message.icon) {
      return message.icon;
    }
    
    switch (message.type) {
      case 'success':
        return 'check_circle';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'check_circle';
    }
  };

  return (
    <div className={`action-confirmation ${message.type} ${visible ? 'visible' : ''}`}>
      <div className="confirmation-content">
        <span className="material-symbols-outlined confirmation-icon">
          {getIcon()}
        </span>
        <span className="confirmation-message">{message.message}</span>
      </div>
    </div>
  );
};

// Hook for managing confirmation messages
export const useActionConfirmation = () => {
  const [messages, setMessages] = useState<ConfirmationMessage[]>([]);

  const showConfirmation = (
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success',
    icon?: string,
    duration?: number
  ) => {
    const newMessage: ConfirmationMessage = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      type,
      icon,
      duration,
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const dismissMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return {
    messages,
    showConfirmation,
    dismissMessage,
  };
};

export default ActionConfirmation;

