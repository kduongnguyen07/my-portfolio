import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ isHome }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      // Ensure the video plays and handle any autoplay blockages
      video.play().catch(err => {
        console.warn("Autoplay audio/video block prevented background video immediate start:", err);
      });
    }
  }, [isHome]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Responsive sizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Glitchy Binary / Cyber Pixel class
    class CyberParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50; // start below screen
        this.size = Math.random() * 10 + 8; // font size for characters
        this.speedY = Math.random() * 0.8 + 0.3; // speed floating up
        this.char = Math.random() > 0.5 ? '0' : '1';
        
        // Alternate cyan and neon pink
        const isPink = Math.random() > 0.6;
        this.color = isPink ? '255, 0, 240' : '0, 240, 255'; 
        this.opacity = Math.random() * 0.35 + 0.15;
        this.maxLife = Math.random() * 800 + 400;
        this.life = 0;
        this.glitchTimer = 0;
      }

      update() {
        this.y -= this.speedY;
        this.life += 1;
        this.glitchTimer += 1;

        // Occasionally flip character
        if (this.glitchTimer > 40) {
          this.char = Math.random() > 0.5 ? '0' : '1';
          this.glitchTimer = 0;
        }

        // Reset if goes off screen or dies
        if (this.y < 0 || this.life >= this.maxLife) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.font = `${this.size}px 'Share Tech Mono', monospace`;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity * (1 - this.y / canvas.height)})`;
        
        // Glow effect
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        
        ctx.fillText(this.char, this.x, this.y);
        ctx.restore();
      }
    }

    // Initialize particles
    const particleCount = Math.min(45, Math.floor((canvas.width * canvas.height) / 40000));
    const particles = Array.from({ length: particleCount }, () => new CyberParticle());

    // Cyberpunk grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 100;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint cyber grid
      drawGrid();

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background: '#04020d' // fallback background color
    }}>
      <video
        ref={videoRef}
        src={isHome ? "./main-background.mp4" : "./background.mp4"}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Futuristic color grading overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle, rgba(16, 4, 40, 0.3) 0%, rgba(4, 2, 16, 0.9) 100%)',
        mixBlendMode: 'multiply'
      }} />

      {/* Cyber Canvas for binary glitch code */}
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
    </div>
  );
}
