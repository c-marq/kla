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

import cn from "classnames";

import { memo, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { UseMediaStreamResult } from "../../hooks/use-media-stream-mux";
import { useScreenCapture } from "../../hooks/use-screen-capture";
import { useWebcam } from "../../hooks/use-webcam";
import { AudioRecorder } from "../../lib/audio-recorder";
import AudioPulse from "../audio-pulse/AudioPulse";
import "./control-tray.scss";
import SettingsDialog from "../settings-dialog/SettingsDialog";

export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
  enableEditingSettings?: boolean;
};

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: string;
  offIcon: string;
  start: () => Promise<any>;
  stop: () => any;
  label: string;
  activeLabel?: string;
};

/**
 * button used for triggering webcam or screen-capture
 */
const MediaStreamButton = memo(
  ({ isStreaming, onIcon, offIcon, start, stop, label, activeLabel }: MediaStreamButtonProps) =>
    <div className="button-with-label">
      {isStreaming ? (
        <button className="action-button active" onClick={stop} aria-label={activeLabel || label}>
          <span className="material-symbols-outlined">{onIcon}</span>
        </button>
      ) : (
        <button className="action-button" onClick={start} aria-label={label}>
          <span className="material-symbols-outlined">{offIcon}</span>
        </button>
      )}
      <span className="button-label">{isStreaming && activeLabel ? activeLabel : label}</span>
    </div>
);

function ControlTray({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
  enableEditingSettings,
}: ControlTrayProps) {
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [activeVideoStream, setActiveVideoStream] =
    useState<MediaStream | null>(null);
  const [webcam, screenCapture] = videoStreams;
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { client, connected, connect, disconnect, volume } =
    useLiveAPIContext();

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--volume",
      `${Math.max(5, Math.min(inVolume * 200, 8))}px`
    );
  }, [inVolume]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: "audio/pcm;rate=16000",
          data: base64,
        },
      ]);
    };
    if (connected && !muted && audioRecorder) {
      audioRecorder.on("data", onData).on("volume", setInVolume).start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      audioRecorder.off("data", onData).off("volume", setInVolume);
    };
  }, [connected, client, muted, audioRecorder]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = activeVideoStream;
    }

    let timeoutId = -1;

    function sendVideoFrame() {
      const video = videoRef.current;
      const canvas = renderCanvasRef.current;

      if (!video || !canvas) {
        return;
      }

      // Wait for video to have dimensions before capturing
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        // Video not ready yet, try again soon
        if (connected) {
          timeoutId = window.setTimeout(sendVideoFrame, 100);
        }
        return;
      }

      const ctx = canvas.getContext("2d")!;
      canvas.width = video.videoWidth * 0.25;
      canvas.height = video.videoHeight * 0.25;
      
      if (canvas.width + canvas.height > 0) {
        // Clear canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", 1.0);
        const data = base64.slice(base64.indexOf(",") + 1, Infinity);
        client.sendRealtimeInput([{ mimeType: "image/jpeg", data }]);
      }
      
      if (connected) {
        timeoutId = window.setTimeout(sendVideoFrame, 1000 / 0.5);
      }
    }
    
    if (connected && activeVideoStream !== null) {
      // Wait for video element to load metadata before capturing
      const video = videoRef.current;
      if (video) {
        const startCapture = () => {
          requestAnimationFrame(sendVideoFrame);
        };
        
        if (video.readyState >= 2) {
          // Video has enough data, start immediately
          startCapture();
        } else {
          // Wait for loadedmetadata event
          video.addEventListener('loadedmetadata', startCapture, { once: true });
        }
      }
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [connected, activeVideoStream, client, videoRef]);

  //handler for swapping from one video-stream to the next
  const changeStreams = (next?: UseMediaStreamResult) => async () => {
    if (next) {
      const mediaStream = await next.start();
      setActiveVideoStream(mediaStream);
      onVideoStreamChange(mediaStream);
    } else {
      setActiveVideoStream(null);
      onVideoStreamChange(null);
    }

    videoStreams.filter((msr) => msr !== next).forEach((msr) => msr.stop());
  };

  // Friendly status messages
  const getStatusMessage = () => {
    if (connected) {
      return "Connected - I'm listening!";
    }
    return "Ready to Listen";
  };

  const getHelpMessage = () => {
    if (!connected) {
      return "Press the play button and ask me anything!";
    }
    if (muted) {
      return "Microphone is muted - click to unmute";
    }
    return "Speak clearly, I'm here to help";
  };

  return (
    <section className="control-tray">
      <canvas style={{ display: "none" }} ref={renderCanvasRef} />
      
      {/* Friendly helper text */}
      {!connected && (
        <div className="helper-text">
          <span className="helper-message">{getHelpMessage()}</span>
        </div>
      )}

      <nav className={cn("actions-nav", { disabled: !connected })}>
        <div className="button-with-label">
          <button
            className={cn("action-button mic-button", { muted, listening: connected && !muted })}
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "Unmute microphone" : "Mute microphone"}
          >
            {!muted ? (
              <span className="material-symbols-outlined filled">mic</span>
            ) : (
              <span className="material-symbols-outlined filled">mic_off</span>
            )}
          </button>
          <span className="button-label">{muted ? "Muted" : "Microphone"}</span>
        </div>

        <div className="button-with-label">
          <div className="action-button no-action outlined">
            <AudioPulse volume={volume} active={connected} hover={false} />
          </div>
          <span className="button-label">Volume</span>
        </div>

        {supportsVideo && (
          <>
            <MediaStreamButton
              isStreaming={screenCapture.isStreaming}
              start={changeStreams(screenCapture)}
              stop={changeStreams()}
              onIcon="cancel_presentation"
              offIcon="present_to_all"
              label="Screen Share"
              activeLabel="Stop Sharing"
            />
            <MediaStreamButton
              isStreaming={webcam.isStreaming}
              start={changeStreams(webcam)}
              stop={changeStreams()}
              onIcon="videocam_off"
              offIcon="videocam"
              label="Camera"
              activeLabel="Stop Camera"
            />
          </>
        )}
        {children}
      </nav>

      <div className={cn("connection-container", { connected })}>
        <div className="connection-button-container primary-action">
          <button
            ref={connectButtonRef}
            className={cn("action-button connect-toggle primary-button", { connected })}
            onClick={connected ? disconnect : connect}
            aria-label={connected ? "Pause conversation" : "Start conversation"}
          >
            <span className="material-symbols-outlined filled">
              {connected ? "pause" : "play_arrow"}
            </span>
          </button>
        </div>
        <span className="status-message">{getStatusMessage()}</span>
        {connected && (
          <span className="help-message">{getHelpMessage()}</span>
        )}
      </div>
      {enableEditingSettings ? <SettingsDialog /> : ""}
    </section>
  );
}

export default memo(ControlTray);
