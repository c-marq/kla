/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import SidePanel from "./components/side-panel/SidePanel";
import { Altair } from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import Header from "./components/header/Header";
import CameraPreview from "./components/camera-preview/CameraPreview";
import { LiveClientOptions } from "./types";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const apiOptions: LiveClientOptions = {
  apiKey: API_KEY,
};

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  // track the type of video stream
  const [streamType, setStreamType] = useState<'camera' | 'screen' | null>(null);

  // Handler to update video stream and detect type
  const handleVideoStreamChange = (stream: MediaStream | null) => {
    setVideoStream(stream);
    
    if (stream) {
      // Detect if it's screen share or camera based on video track label
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        // Screen share tracks typically have labels containing "screen" or "window"
        const isScreenShare = videoTrack.label.toLowerCase().includes('screen') || 
                             videoTrack.label.toLowerCase().includes('window') ||
                             videoTrack.label.toLowerCase().includes('display');
        setStreamType(isScreenShare ? 'screen' : 'camera');
      }
    } else {
      setStreamType(null);
    }
  };

  // Handler to stop video stream and clean up
  const handleStopVideoStream = () => {
    if (videoStream) {
      // Stop all tracks in the stream
      videoStream.getTracks().forEach(track => track.stop());
    }
    setVideoStream(null);
    setStreamType(null);
  };

  return (
    <div className="App">
      <LiveAPIProvider options={apiOptions}>
        <Header />
        <div className="streaming-console">
          <SidePanel />
          <main>
            <div className="main-app-area">
              {/* APP goes here */}
              <Altair />
              {/* Hidden video element for AI processing - not displayed to user */}
              <video
                style={{ 
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none'
                }}
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />
            </div>

            {/* Video preview appears as floating window when active */}
            <CameraPreview
              stream={videoStream}
              isActive={!!videoStream}
              onClose={handleStopVideoStream}
              type={streamType || 'camera'}
            />

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={handleVideoStreamChange}
              enableEditingSettings={true}
            >
              {/* put your own buttons here */}
            </ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default App;
