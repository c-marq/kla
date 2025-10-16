/**
 * Video Preview Component
 * Shows what the camera/screen share sees in a small preview window
 * Provides clear visual feedback that video is active
 */

import React, { useEffect, useRef } from 'react';
import './camera-preview.scss';

interface CameraPreviewProps {
  stream: MediaStream | null;
  isActive: boolean;
  onClose?: () => void;
  type?: 'camera' | 'screen';
}

const CameraPreview: React.FC<CameraPreviewProps> = ({ stream, isActive, onClose, type = 'camera' }) => {
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (previewVideoRef.current && stream) {
      previewVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!isActive || !stream) {
    return null;
  }

  const isCamera = type === 'camera';
  const icon = isCamera ? 'videocam' : 'present_to_all';
  const title = isCamera ? 'Camera Active' : 'Screen Share Active';

  return (
    <div className="camera-preview">
      <div className="preview-header">
        <span className="preview-title">
          <span className="material-symbols-outlined recording-indicator">{icon}</span>
          {title}
        </span>
        {onClose && (
          <button className="preview-close" onClick={onClose} aria-label="Close preview">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
      <div className="preview-content">
        <video
          ref={previewVideoRef}
          autoPlay
          playsInline
          muted
          className="preview-video"
        />
      </div>
      <div className="preview-footer">
        <span className="preview-status">
          <span className="status-dot"></span>
          {isCamera ? 'Recording' : 'Sharing'}
        </span>
      </div>
    </div>
  );
};

export default CameraPreview;

