import React, { useEffect, useRef } from 'react';

export default function SparklesCore() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Sparkle {
      constructor() {
        this.reset();
        // Scatter initial particles across the screen height
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 2 + 1; // 1px to 3px stardust
        this.speedY = Math.random() * 0.4 + 0.15; // float upward slowly
        this.speedX = (Math.random() - 0.5) * 0.15; // minor horizontal drift
        
        // Dynamic colors: Gold or Orange
        this.color = Math.random() > 0.5 ? '#ffaa00' : '#ff6600';
        this.alpha = Math.random() * 0.6 + 0.2;
        this.flickerSpeed = Math.random() * 0.02 + 0.005;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        // Flicker opacity
        this.angle += this.flickerSpeed;
        this.currentAlpha = this.alpha + Math.sin(this.angle) * 0.15;
        this.currentAlpha = Math.max(0.1, Math.min(0.8, this.currentAlpha));

        // Interactive: push particles slightly away from cursor
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== -1000 && my !== -1000) {
          const dx = this.x - mx;
          const dy = this.y - my;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const force = (120 - distance) / 120;
            const angle = Math.atan2(dy, dx);
            // Push away
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Reset if off-screen top or sides
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.currentAlpha;
        
        // Subtle soft glow
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;

        ctx.fill();
        ctx.restore();
      }
    }

    // Standard density
    const sparkleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 30000));
    const sparkles = Array.from({ length: sparkleCount }, () => new Sparkle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((s) => {
        s.update();
        s.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
}
