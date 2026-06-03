import React, { useEffect, useState, useRef } from 'react';

export default function TransitionScreen({ isTriggered, onMidway }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const videoRef = useRef(null);
  const slideTimerRef = useRef(null);

  useEffect(() => {
    if (isTriggered) {
      // Clear any active timers if triggered again
      clearTimeout(slideTimerRef.current);
      
      setShouldRender(true);
      setIsSlidingOut(false);
      
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

  useEffect(() => {
    return () => {
      clearTimeout(slideTimerRef.current);
    };
  }, []);

  const handleVideoEnded = () => {
    // Start sliding out to the left
    setIsSlidingOut(true);
    
    // Wait for the slide transition to complete (600ms) before unmounting
    slideTimerRef.current = setTimeout(() => {
      setShouldRender(false);
    }, 600);
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
        pointerEvents: 'all',
        transform: isSlidingOut ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)' // PowerPoint-style smooth push/slide ease
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
