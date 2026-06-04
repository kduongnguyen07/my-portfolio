import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

export default function OurWayOfLivingView({ setActiveTab }) {
  // 16x10 Grid state for the drawing maze
  const cols = 16;
  const rows = 10;
  const [grid, setGrid] = useState(Array(rows * cols).fill(false));
  const [activePixel, setActivePixel] = useState(0);
  const [direction, setDirection] = useState('RIGHT');
  const [isAutoMoving, setIsAutoMoving] = useState(true);

  // Hover glitch text state
  const [glitchText, setGlitchText] = useState("OUR WAY OF LIVING");

  // Grid drawing movement interval
  useEffect(() => {
    if (!isAutoMoving) return;

    const interval = setInterval(() => {
      setActivePixel((prev) => {
        // Calculate current r, c
        const r = Math.floor(prev / cols);
        const c = prev % cols;
        
        let nextR = r;
        let nextC = c;

        // Simple bounce-patrol maze path logic
        if (direction === 'RIGHT') {
          if (c < cols - 1) nextC = c + 1;
          else {
            nextR = (r + 1) % rows;
            setDirection('LEFT');
          }
        } else {
          if (c > 0) nextC = c - 1;
          else {
            nextR = (r + 1) % rows;
            setDirection('RIGHT');
          }
        }

        const nextIndex = nextR * cols + nextC;
        
        // Turn on the trail
        setGrid(g => {
          const newG = [...g];
          newG[nextIndex] = true;
          return newG;
        });

        return nextIndex;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [direction, isAutoMoving]);

  const clearGrid = () => {
    setGrid(Array(rows * cols).fill(false));
    setActivePixel(0);
    setDirection('RIGHT');
  };

  const handleCellHover = (index) => {
    // Draw on hover
    setGrid(g => {
      const newG = [...g];
      newG[index] = !newG[index];
      return newG;
    });
  };

  const triggerGlitch = () => {
    const chars = "O U R _ W A Y _ O F _ L I V I N G";
    const glitched = chars.split("").map(char => {
      if (char === " ") return " ";
      return Math.random() > 0.7 ? "█" : char;
    }).join("");
    setGlitchText(glitched);
    setTimeout(() => {
      setGlitchText("OUR WAY OF LIVING");
    }, 150);
  };

  return (
    <div className="main-content" style={{ background: 'var(--color-yellow)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Banner section */}
      <section style={{ padding: '3.5rem 3rem 1rem 3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 
          className="hacker-font"
          onMouseEnter={triggerGlitch}
          onClick={triggerGlitch}
          style={{ 
            fontSize: '5rem', 
            fontWeight: 900, 
            letterSpacing: '-3px', 
            color: 'var(--text-main)', 
            cursor: 'pointer',
            lineHeight: 0.9,
            userSelect: 'none'
          }}
        >
          {glitchText}
        </h1>
        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', opacity: 0.85, maxWidth: '600px' }}>
          We think about student living differently. Flat structures, high agency, zero hassle, and total freedom.
        </p>
      </section>

      {/* Main Split Grid */}
      <section style={{ padding: '0 3rem 3rem 3rem' }} className="grid-container">
        <div className="neo-grid-2">
          
          {/* Drawing Grid Box */}
          <div className="neo-card" style={{ background: '#ffffff', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', textTransform: 'uppercase' }}>Interactive Pixel Grid Canvas</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setIsAutoMoving(!isAutoMoving)} 
                  style={{
                    background: isAutoMoving ? 'var(--color-blue)' : 'var(--bg-site)',
                    color: isAutoMoving ? '#ffffff' : 'var(--text-main)',
                    border: '1.5px solid var(--text-main)',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {isAutoMoving ? 'Pause Agent' : 'Start Agent'}
                </button>
                <button 
                  onClick={clearGrid}
                  style={{
                    background: 'var(--bg-site)',
                    border: '1.5px solid var(--text-main)',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <RefreshCw size={10} />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* The 16x10 Drawing Canvas Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                borderTop: '2px solid var(--text-main)',
                borderLeft: '2px solid var(--text-main)',
                background: '#ffffff',
                boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)'
              }}
            >
              {grid.map((active, idx) => {
                const isHead = activePixel === idx && isAutoMoving;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => handleCellHover(idx)}
                    style={{
                      aspectRatio: 1,
                      background: isHead 
                        ? 'var(--color-orange)' 
                        : (active ? 'var(--text-main)' : 'transparent'),
                      borderRight: '1px solid rgba(0,0,0,0.08)',
                      borderBottom: '1px solid rgba(0,0,0,0.08)',
                      transition: isHead ? 'none' : 'background 0.2s',
                      cursor: 'crosshair'
                    }}
                  />
                );
              })}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              TIP: Hover or drag cursor over grid cells to write customized pixel drawings!
            </div>
          </div>

          {/* Living Principles card */}
          <div className="neo-card" style={{ background: '#ffffff' }}>
            <h2 className="card-title">A new approach to student living</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-muted)' }}>
              <p>• Fully furnished studio apartments ready for move-in from day one.</p>
              <p>• Fast utility connections included under your single unified card billing.</p>
              <p>• Full freedom: enjoy sharing gym, laundry, and dining spaces with zero booking lag.</p>
              <p>• Student-first ecosystem designed in central hubs, keeping university courses within easy reach.</p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="flat-btn btn-dark"
                onClick={() => setActiveTab('rooms')}
              >
                <span>Check out our Units</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Floating design lines decoration */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--text-main)',
        color: 'var(--color-yellow)',
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
        <span>GRID_RESOLUTION: 16x10_DOTS</span>
        <span>STATUS: SYSTEM.ACTIVE_WAY_OF_LIVING</span>
      </div>
    </div>
  );
}
