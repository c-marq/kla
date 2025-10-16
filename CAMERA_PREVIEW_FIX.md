# Camera Preview Fix

**Issue**: Camera video was displaying behind the control tray in the main app area instead of in a separate floating preview window.

## Problem

The original implementation had the video element displayed in the main app area with conditional styling:

```tsx
<video
  className={cn("stream", {
    hidden: !videoRef.current || !videoStream,
  })}
  ref={videoRef}
  autoPlay
  playsInline
/>
```

This caused the camera feed to appear as a large video in the background, behind the control buttons.

## Solution

### 1. Hide the Processing Video Element

Changed the main video element to be hidden (used only for frame capture and processing):

```tsx
{/* Hidden video element for processing - not displayed */}
<video
  style={{ display: 'none' }}
  ref={videoRef}
  autoPlay
  playsInline
  muted
/>
```

### 2. Updated CameraPreview Component

Modified the `CameraPreview` component to:
- Accept the `stream` directly instead of `videoRef`
- Create its own internal `previewVideoRef` for display
- Set the stream on the preview video element

**Before:**
```tsx
interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isActive: boolean;
  onClose?: () => void;
}
```

**After:**
```tsx
interface CameraPreviewProps {
  stream: MediaStream | null;
  isActive: boolean;
  onClose?: () => void;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({ stream, isActive, onClose }) => {
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (previewVideoRef.current && stream) {
      previewVideoRef.current.srcObject = stream;
    }
  }, [stream]);
  
  // ... rest of component
}
```

### 3. Proper Stream Cleanup

Added a handler in `App.tsx` to properly stop the video stream when the preview is closed:

```tsx
const handleStopVideoStream = () => {
  if (videoStream) {
    // Stop all tracks in the stream
    videoStream.getTracks().forEach(track => track.stop());
  }
  setVideoStream(null);
};
```

### 4. Integrated CameraPreview in App

```tsx
{/* Camera preview appears as floating window when active */}
<CameraPreview
  stream={videoStream}
  isActive={!!videoStream}
  onClose={handleStopVideoStream}
/>
```

## Result

Now when the camera is activated:

✅ **Main video is hidden** - The processing video element is not visible  
✅ **Floating preview appears** - Camera preview window shows in bottom-right corner  
✅ **Proper positioning** - Preview is positioned above control tray  
✅ **Clean close** - Clicking close button properly stops camera tracks  
✅ **Recording indicator** - Pulsing red dot shows camera is active  
✅ **Professional look** - Styled preview window with header and footer  

## Files Modified

1. **`src/App.tsx`**
   - Imported `CameraPreview` component
   - Hidden main video element
   - Added `CameraPreview` component with proper props
   - Added `handleStopVideoStream` function

2. **`src/components/camera-preview/CameraPreview.tsx`**
   - Changed props to accept `stream` instead of `videoRef`
   - Added internal `previewVideoRef` for display
   - Added `useEffect` to set stream on video element

## Testing

To verify the fix:

1. ✅ Start the app (`npm start`)
2. ✅ Click the play button to connect
3. ✅ Click the camera button
4. ✅ Verify preview window appears in bottom-right corner
5. ✅ Verify main app area does NOT show large video
6. ✅ Verify preview shows live camera feed
7. ✅ Click close button (×) to stop camera
8. ✅ Verify preview disappears and camera stops

---

**Fixed by**: Professor Marquez  
**Date**: October 16, 2025  
**Issue**: Camera video displaying behind control tray  
**Status**: ✅ Resolved

