import React, { useEffect, useState, useRef, useCallback } from 'react';

/* ─── Web Audio API Sound Engine (HSR Sci-Fi Synth) ──────────────────────── */
const playHSRSound = (type) => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC(); 
    const t = ctx.currentTime;
    
    if (type === 'scan-found') {
      // Holographic alarm sound: rapid dual pitch sweeps
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine'; osc1.frequency.setValueAtTime(440, t);
      osc1.frequency.exponentialRampToValueAtTime(880, t + 0.5);
      
      osc2.type = 'triangle'; osc2.frequency.setValueAtTime(220, t);
      osc2.frequency.exponentialRampToValueAtTime(440, t + 0.5);
      
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      
      osc1.connect(gain); osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(t); osc2.start(t);
      osc1.stop(t + 0.6); osc2.stop(t + 0.6);
    } else if (type === 'tick') {
      // Sleek digital hover/tick
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = 800;
      g.gain.setValueAtTime(0.03, t); g.gain.exponentialRampToValueAtTime(0.001, t+0.08);
      o.connect(g); g.connect(ctx.destination); 
      o.start(t); o.stop(t+0.08);
    } else if (type === 'accept') {
      // Decrypt success chime
      [587.3, 659.3, 880, 1174.7].forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.06, t + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.4);
        o.connect(g); g.connect(ctx.destination);
        o.start(t + i * 0.06); o.stop(t + i * 0.06 + 0.4);
      });
    }
  } catch(_) {}
};

/* ─── Layout constants ───────────────────────────────────── */
const TOTAL    = 5;
const SZ       = 460;
const CX       = SZ / 2;   // 230
const CY       = SZ / 2;   // 230
const R_TIMER  = 196;      // timer ring radius
const R_STROKE = 16;       // ring thickness
const R_INNER  = R_TIMER - R_STROKE / 2 - 5;  // ≈ 178, inner circle
const CIRC     = 2 * Math.PI * R_TIMER;

export default function IntroScreen({ onComplete }) {
  const [phase,     setPhase]     = useState('match');
  const [countdown, setCountdown] = useState(TOTAL);
  const [visible,   setVisible]   = useState(false);
  const [leaving,   setLeaving]   = useState(false);
  const [hover,     setHover]     = useState('');
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  useEffect(() => {
    if (phase !== 'match') return;
    playHSRSound('scan-found');
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); doAccept(); return 0; }
        playHSRSound('tick');
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'video') return;
    const fn = e => { if (e.key === 'Escape') doFinish(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [phase]);

  const doAccept = useCallback(() => {
    clearInterval(timerRef.current);
    playHSRSound('accept');
    setPhase('video');
    setTimeout(() => {
      const v = videoRef.current;
      if (v) { v.muted = false; v.play().catch(() => { v.muted = true; v.play(); }); }
    }, 80);
  }, []);

  const doFinish = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => onComplete(), 400);
  }, [leaving, onComplete]);

  /*
   * Ring drains from LEFT (9 o'clock) clockwise to the right.
   * progress: 1 = full ring, 0 = empty
   */
  const progress   = countdown / TOTAL;
  const dashOffset = CIRC * (1 - progress);  // 0 = full, CIRC = empty

  /* Leading edge dot — starts at LEFT (9 o'clock) and moves clockwise */
  const leadAngle = (progress * 2 * Math.PI) + Math.PI;   // +π = start from left
  const leadX     = CX + Math.cos(leadAngle) * R_TIMER;
  const leadY     = CY + Math.sin(leadAngle) * R_TIMER;

  /* BYPASS button trapezoid — at bottom of inner circle */
  const bW = 220, bH = 46, bev = 16;
  const bX = CX - bW / 2;
  const bY = CY + R_INNER - bH - 12;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.4s ease',
      opacity: leaving ? 0 : 1,
      background: 'rgba(5, 2, 20, 0.95)',
    }}>
      {/* ── Subtle blurred BG ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(30px) brightness(0.15) saturate(0.8)',
        transform: 'scale(1.06)',
      }} />

      {phase === 'match' ? (
        <div style={{
          position: 'relative', zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.92)',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <svg
            width={SZ} height={SZ}
            viewBox={`0 0 ${SZ} ${SZ}`}
            style={{ display: 'block', overflow: 'visible' }}
          >
            <defs>
              {/* Cyan to Magenta gradient */}
              <linearGradient id="cyanGrad" gradientUnits="userSpaceOnUse"
                x1={CX - R_TIMER} y1={CY} x2={CX + R_TIMER} y2={CY}>
                <stop offset="0%"   stopColor="#00f0ff" />
                <stop offset="50%"  stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ff00ff" />
              </linearGradient>

              {/* Slate-cyan dark border gradient */}
              <linearGradient id="cyberBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#ff00ff" opacity="0.3" />
              </linearGradient>

              {/* Inner circle clip */}
              <clipPath id="innerClip">
                <circle cx={CX} cy={CY} r={R_INNER} />
              </clipPath>

              {/* Glow filters */}
              <filter id="glowCyan" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glowBig" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12"/>
              </filter>
              <filter id="glowText" x="-20%" y="-60%" width="140%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>

              {/* Inner bg radial */}
              <radialGradient id="innerBg" cx="50%" cy="40%" r="60%">
                <stop offset="0%"   stopColor="#120b30" />
                <stop offset="100%" stopColor="#050212" />
              </radialGradient>
            </defs>

            {/* ═══ INNER CIRCLE — dark violet bg ═══ */}
            <circle cx={CX} cy={CY} r={R_INNER} fill="url(#innerBg)" />

            {/* Matrix grid lines inside circle */}
            {[-60,-30,0,30,60].map((offset,i) => (
              <line key={i}
                x1={CX - R_INNER} y1={CY + offset}
                x2={CX + R_INNER} y2={CY + offset}
                stroke="rgba(0,240,255,0.06)" strokeWidth="1.5"
                strokeDasharray="4 4"
                clipPath="url(#innerClip)"
              />
            ))}

            {/* ═══ INNER CYAN BORDER ═══ */}
            <circle cx={CX} cy={CY} r={R_INNER}
              fill="none" stroke="url(#cyberBorder)" strokeWidth="1.5" />

            {/* ═══ TIMER RING TRACK (dark overlay) ═══ */}
            <circle cx={CX} cy={CY} r={R_TIMER}
              fill="none"
              stroke="rgba(10, 5, 30, 0.9)"
              strokeWidth={R_STROKE}
            />

            {/* ═══ RING GLOW HALO ═══ */}
            <circle cx={CX} cy={CY} r={R_TIMER}
              fill="none"
              stroke="rgba(0,240,255,0.2)"
              strokeWidth={R_STROKE + 10}
              strokeDasharray={`${CIRC} ${CIRC}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              /* Start from left 9 o'clock: rotate -180deg */
              transform={`rotate(-180 ${CX} ${CY})`}
              style={{ transition: 'stroke-dashoffset 0.94s linear', filter: 'url(#glowBig)' }}
            />

            {/* ═══ ACTIVE CYAN-PINK RING ═══ */}
            <circle cx={CX} cy={CY} r={R_TIMER}
              fill="none"
              stroke="url(#cyanGrad)"
              strokeWidth={R_STROKE}
              strokeDasharray={`${CIRC} ${CIRC}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              transform={`rotate(-180 ${CX} ${CY})`}
              style={{ transition: 'stroke-dashoffset 0.94s linear', filter: 'url(#glowCyan)' }}
            />

            {/* ═══ LEADING EDGE DOT ═══ */}
            {progress > 0.01 && (
              <>
                <circle cx={leadX} cy={leadY} r={R_STROKE / 2 + 5}
                  fill="rgba(0,240,255,0.4)"
                  style={{ filter: 'url(#glowBig)' }} />
                <circle cx={leadX} cy={leadY} r={R_STROKE / 2}
                  fill="#ffffff"
                  style={{ filter: 'url(#glowCyan)' }} />
              </>
            )}

            {/* Outer cyber ring */}
            <circle cx={CX} cy={CY} r={R_TIMER + R_STROKE/2 + 5}
              fill="none" stroke="rgba(0,240,255,0.25)" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={R_TIMER + R_STROKE/2 + 8}
              fill="none" stroke="rgba(255,0,240,0.15)" strokeWidth="1.5" strokeDasharray="10 15" />

            {/* Cyber tick marks */}
            {Array.from({ length: 36 }, (_, i) => {
              const a = (i / 36) * 2 * Math.PI;
              const r0 = R_TIMER + R_STROKE / 2 + 12;
              const r1 = r0 + 8;
              return (
                <line key={i}
                  x1={CX + Math.cos(a)*r0} y1={CY + Math.sin(a)*r0}
                  x2={CX + Math.cos(a)*r1} y2={CY + Math.sin(a)*r1}
                  stroke={i % 3 === 0 ? 'rgba(0,240,255,0.6)' : 'rgba(255,0,240,0.2)'}
                  strokeWidth={i % 3 === 0 ? 1.5 : 1}
                />
              );
            })}

            {/* Holographic Hacker Icon inside screen */}
            <g transform={`translate(${CX}, ${CY - 72})`}
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.6))' }}>
              {/* Slanted Diamond HUD Box */}
              <polygon points="0,-26 26,0 0,26 -26,0"
                fill="rgba(10,5,30,0.85)"
                stroke="#00f0ff" strokeWidth="2"
              />
              <polygon points="0,-20 20,0 0,20 -20,0"
                fill="none"
                stroke="rgba(255,0,240,0.5)" strokeWidth="1"
              />
              <text x="0" y="5" textAnchor="middle" fill="#00f0ff" fontSize="16" fontFamily="'VT323', monospace" fontWeight="bold">SW</text>
            </g>

            {/* Decryption status header */}
            <text x={CX} y={CY + 18}
              textAnchor="middle"
              fontFamily="'VT323', monospace"
              fontWeight="bold"
              fontSize="28"
              letterSpacing="2"
              fill="#00f0ff"
              style={{ filter: 'url(#glowText)' }}>
              DECRYPTING SYSTEM...
            </text>

            {/* Subtext info */}
            <text x={CX} y={CY + 38}
              textAnchor="middle"
              fontFamily="'VT323', monospace"
              fontWeight="bold"
              fontSize="16"
              letterSpacing="1"
              fill="rgba(203, 213, 225, 0.75)">
              PORTFOLIO.SECURE_KEY • LV.80 HACKTOOL
            </text>

            {/* ═══ BYPASS FIREWALL BUTTON (trapezoid) ═══ */}
            <ellipse cx={CX} cy={bY + bH/2} rx={bW/2 + 20} ry={bH/2 + 10}
              fill="rgba(255,0,240,0.08)"
              style={{ filter: 'url(#glowBig)' }}
            />

            {/* Button path */}
            <path
              d={`M ${bX+bev},${bY}
                  L ${bX+bW-bev},${bY}
                  L ${bX+bW},${bY+bH/2}
                  L ${bX+bW-bev},${bY+bH}
                  L ${bX+bev},${bY+bH}
                  L ${bX},${bY+bH/2} Z`}
              fill={hover==='accept' ? 'rgba(255, 0, 240, 0.25)' : 'rgba(20, 10, 48, 0.8)'}
              stroke={hover==='accept' ? '#ff00ff' : '#00f0ff'}
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={() => setHover('accept')}
              onMouseLeave={() => setHover('')}
              onClick={doAccept}
            />
            {/* BYPASS! text */}
            <text
              x={CX} y={bY + bH/2 + 5}
              textAnchor="middle"
              fontFamily="'VT323', monospace"
              fontWeight="bold"
              fontSize="20"
              letterSpacing="3"
              fill={hover==='accept' ? '#ffffff' : '#00f0ff'}
              style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.15s' }}
            >
              BYPASS FIREWALL
            </text>
          </svg>

          {/* Decline intrusion button */}
          <button
            onMouseEnter={() => setHover('decline')}
            onMouseLeave={() => setHover('')}
            onClick={doFinish}
            style={{
              marginTop: '-24px',
              width: '180px', height: '36px',
              background: hover==='decline' ? 'rgba(50, 10, 40, 0.75)' : 'rgba(8, 4, 26, 0.75)',
              border: `1.5px solid ${hover==='decline' ? '#ff00ff' : 'rgba(0, 240, 255, 0.35)'}`,
              borderRadius: '2px',
              color: hover==='decline' ? '#ffffff' : 'rgba(203, 213, 225, 0.75)',
              fontFamily: "'VT323', monospace",
              fontWeight: 'bold',
              fontSize: '1rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: hover==='decline' ? '0 0 10px rgba(255, 0, 240, 0.3)' : 'none',
            }}
          >
            CANCEL DECRYPT
          </button>
        </div>

      ) : (
        /* ══════════════ VIDEO ══════════════ */
        <>
          <video
            ref={videoRef}
            src="./intro.mp4"
            playsInline autoPlay
            onEnded={doFinish}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={doFinish}
            style={{
              position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10,
              padding: '0.6rem 1.8rem',
              background: 'rgba(5, 2, 20, 0.85)',
              border: '1.5px solid #00f0ff',
              borderRadius: '2px', cursor: 'pointer',
              fontFamily: "'VT323', monospace", fontWeight: 'bold',
              fontSize: '1.15rem', letterSpacing: '2px',
              color: '#00f0ff',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.3)'
            }}
          >
            SKIP DEPLOY [ESC]
          </button>
        </>
      )}
    </div>
  );
}