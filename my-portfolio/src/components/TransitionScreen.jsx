import React, { useEffect, useState, useRef } from 'react';

export default function TransitionScreen({ isTriggered, onMidway }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [enableTransition, setEnableTransition] = useState(false);
  const videoRef = useRef(null);
  const slideTimerRef = useRef(null);

  useEffect(() => {
    if (isTriggered) {
      // Clear any active slide-out timers
      clearTimeout(slideTimerRef.current);
      
      // Snap transition overlay back to center instantly without animation
      setEnableTransition(false);
      setIsSlidingOut(false);
      setIsVisible(true);
      
      // Play the preloaded video immediately
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(err => {
          console.warn("Transition video playback failed or interrupted:", err);
        });
      }

      // Trigger the tab change in the background at 400ms peak
      const midwayTimer = setTimeout(() => {
        if (onMidway) onMidway();
      }, 400);

      // Re-enable transition animations after the snap frame has completed
      const enableTimer = setTimeout(() => {
        setEnableTransition(true);
      }, 80);

      return () => {
        clearTimeout(midwayTimer);
        clearTimeout(enableTimer);
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
    
    // Wait for the slide transition to complete (800ms) before hiding
    slideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };

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
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'all' : 'none',
        transform: isSlidingOut ? 'translate3d(-100vw, 0, 0)' : 'translate3d(0, 0, 0)',
        borderRight: isSlidingOut ? '5px solid #00f0ff' : '0px solid transparent',
        boxShadow: isSlidingOut 
          ? '-10px 0 35px rgba(0, 240, 255, 0.6), -25px 0 70px rgba(255, 0, 240, 0.4)' 
          : 'none',
        transition: enableTransition ? 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), border 0.3s ease, box-shadow 0.3s ease' : 'none',
        willChange: 'transform'
      }}
    >
      <video
        ref={videoRef}
        src="./transition.mp4"
        playsInline
        muted
        preload="auto" // Preload immediately on page load
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform'
        }}
        onEnded={handleVideoEnded}
      />
    </div>
  );
}
