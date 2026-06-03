import React, { useEffect, useState, useRef } from 'react';

export default function TransitionScreen({ isTriggered, onMidway }) {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const videoRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const midwayTimerRef = useRef(null);
  const frameTimerRef = useRef(null);

  useEffect(() => {
    if (isTriggered) {
      // Clear any active timers to prevent race conditions
      clearTimeout(fadeTimerRef.current);
      clearTimeout(midwayTimerRef.current);
      clearTimeout(frameTimerRef.current);
      
      // Reset transition states instantly
      setIsFadingOut(false);
      setScale(1);
      setOpacity(0);
      setIsVisible(true);
      
      // Play the preloaded video from the beginning
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(err => {
          console.warn("Transition video playback failed or interrupted:", err);
        });
      }

      // Smoothly fade in the transition overlay in the next frame
      frameTimerRef.current = setTimeout(() => {
        setOpacity(1);
      }, 20);

      // Trigger the tab change in the background at 400ms peak (video is opaque)
      midwayTimerRef.current = setTimeout(() => {
        if (onMidway) onMidway();
      }, 400);
    }
  }, [isTriggered, onMidway]);

  useEffect(() => {
    return () => {
      clearTimeout(fadeTimerRef.current);
      clearTimeout(midwayTimerRef.current);
      clearTimeout(frameTimerRef.current);
    };
  }, []);

  const handleVideoEnded = () => {
    // Start holographic fade-out & scale-up disperse
    setIsFadingOut(true);
    setOpacity(0);
    setScale(1.08);
    
    // Wait for the fade transition to complete (400ms) before hiding the overlay
    fadeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
      }
    }, 400);
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
        background: '#02040c', // Solid dark indigo background to prevent flashing
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'all' : 'none',
        opacity: opacity,
        transform: `scale(${scale})`,
        // Dynamic transition rules: fast fade-in, slow holographic disperse on exit
        transition: isFadingOut 
          ? 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)'
          : 'opacity 0.2s ease-in-out',
        willChange: 'opacity, transform'
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
          objectFit: 'cover'
        }}
        onEnded={handleVideoEnded}
      />
    </div>
  );
}
