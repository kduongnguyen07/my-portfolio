import React, { useEffect, useState, useRef } from 'react';

export default function TransitionScreen({ isTriggered, onMidway }) {
  const [shouldRender, setShouldRender] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isTriggered) {
      setShouldRender(true);
      
      // Let React mount the video element, then play it
      const timer = setTimeout(() => {
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.load();
          video.play().catch(err => {
            console.warn("Transition video play blocked:", err);
          });
        }
      }, 30);

      // Trigger the tab change (onMidway) in the middle of the video.
      // A standard transition video peak is around 350-450ms.
      const midwayTimer = setTimeout(() => {
        if (onMidway) onMidway();
      }, 400);

      return () => {
        clearTimeout(timer);
        clearTimeout(midwayTimer);
      };
    }
  }, [isTriggered, onMidway]);

  const handleVideoEnded = () => {
    setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: '#02040c', // Dark background to prevent flashing
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'all'
      }}
    >
      <video
        ref={videoRef}
        src="./transition.mp4"
        playsInline
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        onEnded={handleVideoEnded}
      />
    </div>
  );
}
