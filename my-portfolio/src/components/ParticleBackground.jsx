import React from 'react';

export default function ParticleBackground() {
  const imageUrl = "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-glow-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 0,
      backgroundColor: '#fff5f7',
      pointerEvents: 'none'
    }}>
      {/* 1. Base Sakura Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* 2. Soft Dreamy Glassmorphic Overlay Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 245, 247, 0.65)', // Very soft translucent sakura pink
        backdropFilter: 'blur(20px) saturate(140%)', // Bokeh blur effect
        WebkitBackdropFilter: 'blur(20px) saturate(140%)'
      }} />

      {/* 3. Subtle Grid overlay on top of the glass */}
      <div className="bg-glow-grid" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(219, 39, 119, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(219, 39, 119, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)',
        opacity: 0.8
      }} />
    </div>
  );
}
