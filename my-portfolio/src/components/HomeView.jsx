import React, { useState } from 'react';
import { Shield, Smartphone, HeartHandshake, Users, ArrowRight, MapPin, Eye, Compass, Heart } from 'lucide-react';

// A local helper component for the interactive 12x12 pixel art grids
function PixelGridCanvas({ preset, color }) {
  const size = 12;
  const [hoveredCell, setHoveredCell] = useState(null);

  // Return coordinates matching the preset shapes
  const isHighlighted = (r, c) => {
    if (preset === 'smile') {
      // 12x12 smiley face coordinates
      const eyes = [
        [3, 3], [3, 4], [4, 3], [4, 4],
        [3, 7], [3, 8], [4, 7], [4, 8]
      ];
      const mouth = [
        [7, 2], [8, 3], [9, 4], [9, 5], [9, 6], [9, 7], [8, 8], [7, 9],
        [7, 1], [6, 1], [7, 10], [6, 10]
      ];
      return eyes.some(([y, x]) => y === r && x === c) || mouth.some(([y, x]) => y === r && x === c);
    }
    
    if (preset === 'arrow') {
      // Arrow pointing down-right
      const line = [
        [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9]
      ];
      const head = [
        [9, 9], [9, 8], [9, 7], [9, 6], [9, 5],
        [8, 9], [7, 9], [6, 9], [5, 9]
      ];
      return line.some(([y, x]) => y === r && x === c) || head.some(([y, x]) => y === r && x === c);
    }

    if (preset === 'heart') {
      // Classic pixel heart
      const heartCoords = [
        [2, 3], [2, 4], [2, 7], [2, 8],
        [3, 2], [3, 5], [3, 6], [3, 9],
        [4, 1], [4, 10],
        [5, 1], [5, 10],
        [6, 2], [6, 9],
        [7, 3], [7, 8],
        [8, 4], [8, 7],
        [9, 5], [9, 6]
      ];
      // Fill inside heart slightly
      const fillCoords = [
        [3, 3], [3, 4], [3, 7], [3, 8],
        [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9],
        [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9],
        [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
        [7, 4], [7, 5], [7, 6], [7, 7],
        [8, 5], [8, 6]
      ];
      return heartCoords.some(([y, x]) => y === r && x === c) || fillCoords.some(([y, x]) => y === r && x === c);
    }
    return false;
  };

  const gridCells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const active = isHighlighted(r, c);
      const isHovered = hoveredCell && hoveredCell[0] === r && hoveredCell[1] === c;
      gridCells.push(
        <div
          key={`${r}-${c}`}
          onMouseEnter={() => setHoveredCell([r, c])}
          onMouseLeave={() => setHoveredCell(null)}
          style={{
            width: '100%',
            aspectRatio: 1,
            background: active 
              ? (isHovered ? '#ffffff' : color)
              : (isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(0, 0, 0, 0.15)'),
            borderRight: '1px solid rgba(0, 0, 0, 0.05)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'background 0.1s ease',
            cursor: 'pointer'
          }}
        />
      );
    }
  }

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: '100%',
        height: '100%',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderLeft: '1px solid rgba(0,0,0,0.1)'
      }}
    >
      {gridCells}
    </div>
  );
}

export default function HomeView({ setActiveTab }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="main-content">
      {/* 1. Hero banner matching Units.gr */}
      <section className="hero-banner">
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600" 
            alt="Students hanging out in the common room" 
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1 className="hero-title">Home of the uniquely awesome.</h1>
            <p className="hero-subtitle">
              All-inclusive student accommodation in Athens with everything you need to live, study and connect.
            </p>
            <button 
              className="btn-book-unit hero-btn"
              onClick={() => setActiveTab('contact')}
            >
              Book your Unit
            </button>
          </div>
        </div>
      </section>

      {/* 2. Grid contents: Map + Yellow info card */}
      <section className="grid-container">
        <div className="neo-grid-2">
          
          {/* Location info card */}
          <div className="neo-card location-card">
            <h2 className="card-title">Where your everyday just works</h2>
            <p className="card-text" style={{ color: '#111111' }}>
              Wake up, step out, you're there. Campus, classes, night out - all within easy reach. No time wasted. Because at Units, location isn't random. It's chosen to match your rhythm and make life work better.
            </p>
            
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Explore what's nearby:</div>
              <div className="tag-list">
                <span className="tag-item" style={{ background: '#111111', color: '#ffffff' }}>Athens Parkside</span>
                <span className="tag-item">Athens Exarchia</span>
                <span className="tag-item">Panormou Metro</span>
              </div>
            </div>
          </div>

          {/* Interactive Athens Map simulation */}
          <div className="location-map-wrapper">
            {/* Simple Grid Background simulating Map Coordinate lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(#e5e7eb 1px, transparent 1px) 0 0 / 24px 24px, #fefefe',
              opacity: 0.95
            }} />
            
            {/* Stylized street lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
              <path d="M -50 150 L 500 150 L 500 500" stroke="#d1d5db" strokeWidth="18" fill="none" />
              <path d="M 120 -50 L 120 600" stroke="#d1d5db" strokeWidth="14" fill="none" />
              <path d="M 280 -50 L 280 600" stroke="#e5e7eb" strokeWidth="22" fill="none" />
              <path d="M -50 320 L 500 320" stroke="#e5e7eb" strokeWidth="12" fill="none" />
              {/* Park representation */}
              <rect x="150" y="40" width="100" height="80" fill="#d1fae5" stroke="#a7f3d0" strokeWidth="2" />
            </svg>

            {/* Athens Pin Point */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 10
            }}>
              {/* Pulse Ring */}
              <div style={{
                position: 'absolute',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 102, 0, 0.4)',
                animation: 'pulse-gem 2s infinite ease-in-out',
                zIndex: -1
              }} />
              
              <MapPin size={36} fill="var(--color-orange)" style={{ color: '#ffffff', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }} />
              
              <div style={{
                marginTop: '0.4rem',
                background: 'var(--text-main)',
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                border: '1.5px solid #ffffff',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                Athens Units Parkside
              </div>
            </div>

            {/* Map label overlay */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              background: 'rgba(255,255,255,0.9)',
              border: '1.5px solid var(--text-main)',
              padding: '0.5rem 0.85rem',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              LAT: 37.9838° N | LON: 23.7275° E
            </div>
          </div>

        </div>

        {/* 3. Amenities Deck: One Unit - Your card covers everything */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1.5px' }}>One Unit. Your card covers everything.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Your student lease includes access to all spaces, utility bills, high-speed WiFi, and 24/7 client support.
            </p>
          </div>

          <div className="neo-grid-4">
            
            {/* Card 1: Community spaces */}
            <div className="neo-card">
              <div style={{ background: 'rgba(0, 71, 255, 0.1)', color: 'var(--color-blue)', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <Users size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>Community Living</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                Access shared social lounges, a fully equipped gym, and a self-service laundry room 24/7.
              </p>
            </div>

            {/* Card 2: Security */}
            <div className="neo-card">
              <div style={{ background: 'rgba(255, 102, 0, 0.1)', color: 'var(--color-orange)', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <Shield size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>Full Security</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                24/7 CCTV surveillance, night guard patrols, and secure electronic keycard access.
              </p>
            </div>

            {/* Card 3: Smart Living */}
            <div className="neo-card">
              <div style={{ background: 'rgba(0, 204, 102, 0.1)', color: 'var(--color-green)', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <Smartphone size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>Smart Units</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                Digital room keys, automated maintenance tickets, and smart heating controls.
              </p>
            </div>

            {/* Card 4: Support */}
            <div className="neo-card">
              <div style={{ background: 'rgba(255, 204, 0, 0.15)', color: '#b28f00', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <HeartHandshake size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>24/7 Support</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                Onboarding check-in support, general cleaning assistance, and fast hardware maintenance.
              </p>
            </div>

          </div>
        </div>

        {/* 4. "What defines us" Section with Interactive Pixel Grid Art */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1.5px' }}>What defines us</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              We design accommodations around student needs, combining technology, comfort, and community care.
            </p>
          </div>

          <div className="neo-grid-3">
            
            {/* Grid 1: For People */}
            <div className="pixel-grid-card">
              <div className="pixel-grid-header" style={{ background: 'var(--color-blue)', color: '#ffffff' }}>
                For People
              </div>
              <div className="pixel-grid-canvas-wrapper" style={{ background: 'var(--color-blue)' }}>
                <PixelGridCanvas preset="smile" color="var(--color-green)" />
              </div>
            </div>

            {/* Grid 2: By Design */}
            <div className="pixel-grid-card">
              <div className="pixel-grid-header" style={{ background: 'var(--color-orange)', color: '#ffffff' }}>
                By Design
              </div>
              <div className="pixel-grid-canvas-wrapper" style={{ background: 'var(--color-orange)' }}>
                <PixelGridCanvas preset="arrow" color="var(--color-yellow)" />
              </div>
            </div>

            {/* Grid 3: With Care */}
            <div className="pixel-grid-card">
              <div className="pixel-grid-header" style={{ background: 'var(--color-green)', color: '#ffffff' }}>
                With Care
              </div>
              <div className="pixel-grid-canvas-wrapper" style={{ background: 'var(--color-green)' }}>
                <PixelGridCanvas preset="heart" color="var(--color-yellow)" />
              </div>
            </div>

          </div>

          <button 
            className="flat-btn btn-dark" 
            onClick={() => setActiveTab('living')}
            style={{ alignSelf: 'center', marginTop: '1.5rem', padding: '0.85rem 1.8rem' }}
          >
            <span>Our way of living</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 5. Corporate Newsletter & Footer */}
      <footer className="news-footer">
        <div className="newsletter-box">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px' }}>Staying connected.</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', maxWidth: '450px' }}>
            Get student life updates, upcoming housing availability listings, and promo code announcements directly.
          </p>
          
          {subscribed ? (
            <div style={{ color: 'var(--color-green)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✓ Thank you for subscribing to our newsletter!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-input-group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Join
              </button>
            </form>
          )}
        </div>

        <div className="corporate-links">
          <div className="corp-nav">
            <a href="#faqs" className="corp-link" onClick={e => e.preventDefault()}>FAQs</a>
            <a href="#privacy" className="corp-link" onClick={e => e.preventDefault()}>Privacy Policy</a>
            <a href="#cookies" className="corp-link" onClick={e => e.preventDefault()}>Cookies Policy</a>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>© 2026 KORPO Development. Web design by KORPO. Code by units.</div>
            <div style={{ marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>BUILD_ID: 994.404_ATHENS</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
