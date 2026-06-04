import React, { useEffect, useState } from 'react';

export default function IntroScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Stage 1: Blue house scales and spins
    const timer1 = setTimeout(() => setStep(1), 1200); // 1.2s
    
    // Stage 2: Turn yellow
    const timer2 = setTimeout(() => setStep(2), 2200); // 2.2s
    
    // Stage 3: Shrink and slide to final position
    const timer3 = setTimeout(() => setStep(3), 3000); // 3.0s
    
    // Stage 4: Fade in other letters & subtitle
    const timer4 = setTimeout(() => setStep(4), 4500); // 4.5s
    
    // Stage 5: Fade out whole screen
    const timer5 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5100); // 5.1s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  // CSS transform styles based on step
  let houseStyle = {
    transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
    transform: 'translate(0, 0) scale(1) rotate(0deg)',
    fill: '#0047ff',
    width: '40px',
    height: '40px'
  };

  if (step === 0) {
    // Initial: small blue house centered by translation offset
    houseStyle.transform = 'translate(-190px, 0px) scale(1) rotate(0deg)';
  } else if (step === 1) {
    // Spin & scale up in center
    houseStyle.transform = 'translate(-190px, -20px) scale(3.5) rotate(180deg)';
    houseStyle.fill = '#0047ff';
  } else if (step === 2) {
    // Color shift to yellow in center
    houseStyle.transform = 'translate(-190px, -20px) scale(3.5) rotate(180deg)';
    houseStyle.fill = '#ffcc00';
    houseStyle.transition = 'fill 0.6s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
  } else {
    // Step 3 & 4: Shrink and slide next to kduongnguyen07 (as the period dot)
    houseStyle.transform = 'translate(-6px, -6px) scale(0.35) rotate(360deg)';
    houseStyle.fill = '#111111';
    houseStyle.transition = 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#f3f3f3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: step === 4 ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* The Wordmark Logo Container */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            height: '90px', 
            position: 'relative',
            fontSize: '3.6rem', // adjusted size for kduongnguyen07
            fontWeight: 800,
            color: '#111111',
            letterSpacing: '-2.5px',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1
          }}
        >
          {/* Letters "kduongnguyen07" - Fades in at step 3 */}
          <span 
            style={{ 
              opacity: step >= 3 ? 1 : 0, 
              transform: step >= 3 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s' 
            }}
          >
            kduongnguyen07
          </span>
          
          {/* The period dot (our animated house!) */}
          <div style={{ position: 'relative', width: '22px', height: '100%', display: 'flex', justifyContent: 'center' }}>
            
            {/* The House Dot */}
            <div 
              style={{ 
                position: 'absolute', 
                top: step >= 3 ? '32px' : '45%', 
                left: '50%',
                marginLeft: '-20px',
                marginTop: '-20px',
                zIndex: 10
              }}
            >
              <svg 
                viewBox="0 0 50 50" 
                style={houseStyle}
              >
                <path d="M 25 5 L 45 22 L 45 45 L 5 45 L 5 22 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subtitle - Fades in at step 3 */}
        <div 
          style={{ 
            marginTop: '1rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#666666',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateY(0)' : 'translateY(5px)',
            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
            fontFamily: 'var(--font-sans)',
            textAlign: 'center'
          }}
        >
          peace and love
        </div>
      </div>
    </div>
  );
}