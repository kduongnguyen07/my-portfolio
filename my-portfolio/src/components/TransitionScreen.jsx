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
      // This gives the browser 400ms to pre-render the new tab in the background.
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
    
    // Wait for the slide transition to complete (800ms) before unmounting
    slideTimerRef.current = setTimeout(() => {
      setShouldRender(false);
    }, 800);
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
        transform: isSlidingOut ? 'translate3d(-100vw, 0, 0)' : 'translate3d(0, 0, 0)',
        // GPU accelerated transform combined with a neon trailing glow border
        borderRight: isSlidingOut ? '5px solid #00f0ff' : '0px solid transparent',
        boxShadow: isSlidingOut 
          ? '-10px 0 35px rgba(0, 240, 255, 0.6), -25px 0 70px rgba(255, 0, 240, 0.4)' 
          : 'none',
        // Ease-out-expo transition: starts rapidly to feel responsive, ends with an elegant decay
        transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), border 0.3s ease, box-shadow 0.3s ease'
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
