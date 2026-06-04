import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Calendar, MessageCircle } from 'lucide-react';

export default function CommunityView({ setActiveTab }) {
  const cols = 16;
  const rows = 10;
  
  // Animation frames for the pixel art grid:
  // 0: Eye closed, 1: Eye open, 2: Eye blink, 3: Mouth neutral, 4: Mouth smile, 5: Smiley face complete
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 6);
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  // Return true if coordinate matches pixel shape for the current frame
  const isPixelActive = (r, c) => {
    if (frame === 0) {
      // Closed eye: horizontal line in middle-top
      const closedEye = [
        [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10]
      ];
      return closedEye.some(([y, x]) => y === r && x === c);
    }
    
    if (frame === 1 || frame === 2) {
      // Open eye outline & pupil
      const outline = [
        [2, 6], [2, 7], [2, 8], [2, 9],
        [3, 4], [3, 11],
        [4, 3], [4, 12],
        [5, 4], [5, 11],
        [6, 6], [6, 7], [6, 8], [6, 9]
      ];
      const pupil = (frame === 1) ? [
        [3, 7], [3, 8], [4, 7], [4, 8], [5, 7], [5, 8]
      ] : [
        // Blink state (pupil squished)
        [4, 7], [4, 8]
      ];
      return outline.some(([y, x]) => y === r && x === c) || pupil.some(([y, x]) => y === r && x === c);
    }

    if (frame === 3) {
      // Neutral mouth line in middle-bottom
      const neutralMouth = [
        [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11]
      ];
      return neutralMouth.some(([y, x]) => y === r && x === c);
    }

    if (frame === 4) {
      // Open smiling mouth outline
      const smileOutline = [
        [6, 3], [6, 12],
        [7, 4], [7, 11],
        [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10]
      ];
      return smileOutline.some(([y, x]) => y === r && x === c);
    }

    if (frame === 5) {
      // Complete classic smiley face on grid
      const eyes = [
        [3, 4], [3, 5], [4, 4], [4, 5],
        [3, 10], [3, 11], [4, 10], [4, 11]
      ];
      const smile = [
        [6, 3], [6, 12],
        [7, 4], [7, 11],
        [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10]
      ];
      return eyes.some(([y, x]) => y === r && x === c) || smile.some(([y, x]) => y === r && x === c);
    }

    return false;
  };

  const gridCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const active = isPixelActive(r, c);
      gridCells.push(
        <div
          key={`${r}-${c}`}
          style={{
            aspectRatio: 1,
            background: active ? 'var(--text-main)' : 'rgba(255, 255, 255, 0.25)',
            borderRight: '1px solid rgba(0,0,0,0.06)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            transition: 'background 0.3s ease'
          }}
        />
      );
    }
  }

  const events = [
    { title: 'Welcome Rooftop BBQ Party', date: 'Sept 15, 2026', desc: 'Meet your housemates with free souvlaki & drinks on the rooftop.' },
    { title: 'Yoga & Pilates Session', date: 'Every Saturday', desc: 'Weekly morning stretches guided by professional trainers in the social deck.' },
    { title: 'Athens Cultural Walking Tour', date: 'Sept 20, 2026', desc: 'Explore Acropolis, Plaka, and hidden local cafes with our student guide.' }
  ];

  return (
    <div className="main-content" style={{ background: 'var(--color-orange)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Page Header */}
      <section style={{ padding: '3.5rem 3rem 1rem 3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: 900, letterSpacing: '-3px', color: 'var(--text-main)', lineHeight: 0.9 }}>
          COMMUNITY LIFE
        </h1>
        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', opacity: 0.85, maxWidth: '600px' }}>
          More than accommodation. We build vibrant student networks that share, study, cook, and grow together.
        </p>
      </section>

      {/* Main Grid Content */}
      <section style={{ padding: '0 3rem 3rem 3rem' }} className="grid-container">
        <div className="neo-grid-2">
          
          {/* Pixel Art Animation Frame */}
          <div className="neo-card" style={{ background: '#ffffff', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', textTransform: 'uppercase' }}>
                Grid Animation Frame: #{frame}
              </span>
              <span className="tag-item" style={{ background: 'var(--color-orange)', color: '#ffffff', border: 'none' }}>
                {frame === 0 && 'Eye Closed'}
                {frame === 1 && 'Eye Opened'}
                {frame === 2 && 'Eye Winking'}
                {frame === 3 && 'Mouth Idle'}
                {frame === 4 && 'Smiling'}
                {frame === 5 && 'Happy Face'}
              </span>
            </div>

            {/* Grid Box */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                borderTop: '2px solid var(--text-main)',
                borderLeft: '2px solid var(--text-main)',
                background: 'var(--color-orange)'
              }}
            >
              {gridCells}
            </div>
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              ANIMATION: Cycles every 1.2 seconds drawing dynamic vector graphics on grid canvas.
            </div>
          </div>

          {/* Social Event List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="neo-card" style={{ background: '#ffffff' }}>
              <h3 className="card-title" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={24} style={{ color: 'var(--color-orange)' }} />
                <span>Upcoming House Events</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
                {events.map((e, idx) => (
                  <div key={idx} style={{ borderBottom: idx < events.length - 1 ? '1px dashed #dddddd' : 'none', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>{e.title}</span>
                      <span style={{ fontSize: '0.78rem', background: '#f0f0f0', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {e.date}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                      {e.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="neo-card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255, 102, 0, 0.1)', color: 'var(--color-orange)', padding: '0.8rem', borderRadius: '50%' }}>
                <MessageCircle size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Join the Units Slack Workspace</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: '1.3' }}>
                  Connect with students in your building, organize study groups, or coordinate weekend trips.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Banner */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--text-main)',
        color: 'var(--color-orange)',
        padding: '1.25rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        <span>FRAME_RATE: 0.83_FPS</span>
        <span>STATUS: SOCIAL_COMMUNITY_ACTIVE</span>
      </div>
    </div>
  );
}
