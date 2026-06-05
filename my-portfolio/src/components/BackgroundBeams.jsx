import React from 'react';

export default function BackgroundBeams() {
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.7
      }}
    >
      <svg style={{ width: '100vw', height: '100vh' }}>
        <defs>
          <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-blue)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-orange)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-orange)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-orange)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--color-green)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-green)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-green)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Animated paths */}
        <path 
          d="M -100 150 Q 300 650 800 250 T 1900 950" 
          fill="none" 
          stroke="url(#beam1)" 
          strokeWidth="7" 
          strokeLinecap="round"
          className="beam-path-1"
        />
        <path 
          d="M 2000 150 Q 1300 850 700 350 T -100 850" 
          fill="none" 
          stroke="url(#beam2)" 
          strokeWidth="9" 
          strokeLinecap="round"
          className="beam-path-2"
        />
        <path 
          d="M -100 550 C 450 150, 850 950, 2000 450" 
          fill="none" 
          stroke="url(#beam3)" 
          strokeWidth="6" 
          strokeLinecap="round"
          className="beam-path-3"
        />
      </svg>
      
      <style>{`
        @keyframes strokeAnim {
          0% { stroke-dashoffset: 2500; }
          100% { stroke-dashoffset: -2500; }
        }
        .beam-path-1 {
          stroke-dasharray: 450 900;
          animation: strokeAnim 28s linear infinite;
        }
        .beam-path-2 {
          stroke-dasharray: 350 950;
          animation: strokeAnim 34s linear infinite reverse;
        }
        .beam-path-3 {
          stroke-dasharray: 550 800;
          animation: strokeAnim 24s linear infinite;
        }
      `}</style>
    </div>
  );
}
