import React, { useState } from 'react';

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(0, 71, 255, 0.06)', style = {}, onClick }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate relative offset from geometric center [-0.5, 0.5]
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relativeX = (x - centerX) / centerX;
    const relativeY = (y - centerY) / centerY;

    // Scale to a maximum 10-degree tilt limit
    const tiltX = -relativeY * 10;
    const tiltY = relativeX * 10;
    setRotate({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`neo-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: isHovered ? 'var(--shadow-offset-hover)' : 'var(--shadow-offset)'
      }}
    >
      {/* Spotlight overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
          transition: 'opacity 0.25s ease',
          zIndex: 0
        }}
      />
      {/* Content wrapper to ensure it renders above the spotlight */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', gap: 'inherit', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
