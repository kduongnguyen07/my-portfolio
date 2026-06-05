import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?';

const generateRandomString = (length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function EvervaultCard({ children, className = '' }) {
  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    // Generate new characters every 50ms for a rapid hacking glitch look
    const interval = setInterval(() => {
      setRandomString(generateRandomString(600));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className={`evervault-card-container ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Glitching character matrix background */}
      <div className="evervault-card-grid">
        {randomString}
      </div>

      {/* Mouse radial gradient masks */}
      <div className="evervault-card-overlay" />
      <div className="evervault-card-glow" />

      {/* Clean content panel overlay */}
      <div className="evervault-card-content">
        {children}
      </div>
    </div>
  );
}
