import React, { useState, useEffect } from 'react';
import { Terminal, Search, Award, MessageSquare, ShieldAlert, KanbanSquare, Sparkles, Volume2, VolumeX, RefreshCw, Cpu, Layers } from 'lucide-react';

// Web Audio API Synthesizer for offline HSR sci-fi sound effects
const playSynthSound = (type, isMuted) => {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (type === 'roll') {
      // Futuristic cyber deck card spin: rapid high-to-low bip sweep
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800 - i * 150, now + i * 0.04);
        gain.gain.setValueAtTime(0.04, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.06);
      }
    } else if (type === 'buy') {
      // Warp pull impact chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.type = 'sine'; osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.setValueAtTime(987.77, now + 0.06); // B5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc1.connect(gain1); gain1.connect(ctx.destination);

      osc2.type = 'triangle'; osc2.frequency.setValueAtTime(329.63, now); // E4
      gain2.gain.setValueAtTime(0.05, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc2.connect(gain2); gain2.connect(ctx.destination);

      osc1.start(now); osc2.start(now);
      osc1.stop(now + 0.3); osc2.stop(now + 0.3);
    } else if (type === 'select') {
      // Slanted hologram selection sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.35);
    }
  } catch (err) {
    console.warn("Audio Context blocked or unsupported:", err);
  }
};

export default function HeroSection({ activeView, setActiveTab }) {
  const [isMuted, setIsMuted] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [selectedAugment, setSelectedAugment] = useState(null);
  
  // Tasks pool for the Warp Banner
  const allTasks = [
    { id: 'task1', title: 'Nhiệm vụ 1: Thư mục Explorer', icon: Terminal, desc: 'Giả lập Terminal & Cây thư mục workspace.', tier: 3, cost: 3 },
    { id: 'task2', title: 'Nhiệm vụ 2: Tìm kiếm nâng cao', icon: Search, desc: 'Bộ lọc toán tử tìm kiếm thông tin tối ưu.', tier: 3, cost: 3 },
    { id: 'task3', title: 'Nhiệm vụ 3: Prompt Playground', icon: MessageSquare, desc: 'So sánh LLM và giả lập Chain-of-Thought.', tier: 4, cost: 4 },
    { id: 'task4', title: 'Nhiệm vụ 4: Kanban Board', icon: KanbanSquare, desc: 'Tự động hoá luồng Git Flow & Quản trị.', tier: 1, cost: 1 },
    { id: 'task5', title: 'Nhiệm vụ 5: Sáng tạo AI', icon: Sparkles, desc: 'Human-in-the-loop thiết kế ảnh & văn bản.', tier: 5, cost: 5 },
    { id: 'task6', title: 'Nhiệm vụ 6: Đạo đức trong AI', icon: ShieldAlert, desc: 'Phân tích các nguyên tắc AI có trách nhiệm.', tier: 2, cost: 2 },
  ];

  const [shopTasks, setShopTasks] = useState([]);

  useEffect(() => {
    rerollShop(true);
  }, []);

  const rerollShop = (silent = false) => {
    if (shuffling) return;
    setShuffling(true);
    if (!silent) {
      playSynthSound('roll', isMuted);
    }

    setTimeout(() => {
      const shuffled = [...allTasks].sort(() => 0.5 - Math.random());
      setShopTasks(shuffled.slice(0, 5));
      setShuffling(false);
    }, 350);
  };

  const handleCardClick = (id) => {
    playSynthSound('buy', isMuted);
    setActiveTab(id);
  };

  const handleAugmentClick = (id) => {
    playSynthSound('select', isMuted);
    setSelectedAugment(selectedAugment === id ? null : id);
  };

  const traits = [
    { name: 'The Erudition (Tri Thức)', count: '3 / 3', tier: 'prismatic', label: 'Tối đa hoá tư duy hệ thống và thuật toán AI nâng cao' },
    { name: 'The Nihility (Hư Vô)', count: '2 / 3', tier: 'gold', label: 'Bẻ khóa logic, giải mã firewall và khai thác dữ liệu' },
    { name: 'The Harmony (Hòa Hợp)', count: '1 / 2', tier: 'silver', label: 'Liên kết mô hình đa đại lý (Multi-agent) và API' }
  ];

  const relics = [
    { name: 'Glasses: Genius Ultra-Logic', logo: '👓', slot: 'Head' },
    { name: 'Boot: Hacker Quantum Sneakers', logo: '👟', slot: 'Feet' },
    { name: 'Link: Flask Backend Circuit', logo: '🪢', slot: 'Link Rope' },
    { name: 'Orb: Git-Core Version Control', logo: '🔮', slot: 'Planar Orb' }
  ];

  const stats = [
    { name: 'HP (Mã nguồn)', value: '2502', desc: 'Độ ổn định mã nguồn hệ thống' },
    { name: 'ATK (Tư duy)', value: '2026', desc: 'Năng lực lập trình & giải thuật' },
    { name: 'DEF (Bảo mật)', value: '888', desc: 'Khả năng ngăn chặn lỗ hổng' },
    { name: 'SPD (Tốc độ)', value: '134', desc: 'Critical HSR Speed Breakpoint!' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          className="hud-btn" 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem' }}
        >
          ← Quay lại Trang chủ [ESC]
        </button>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)' }} className="mobile-hide">
            <Cpu size={14} style={{ color: 'var(--accent-gold)' }} />
            <span>PORTFOLIO_CLIENT // STUDENT.INFO: OK</span>
          </div>
          <button 
            className="hud-btn" 
            onClick={() => setIsMuted(!isMuted)}
            style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isMuted ? 'Mute' : 'Sound ON'}</span>
          </button>
        </div>
      </div>

      {activeView === 'profile' && (
        <>
          {/* Main HSR Character Board Area */}
          <div className="challenger-frame animate-fade-in">
            {/* HSR Badge Crest decoration */}
            <div className="challenger-crest hacker-font" style={{ fontSize: '1.05rem', letterSpacing: '1px' }}>K70 AI ENGINEER // MSSV: 25020210</div>
            
            {/* Glowing corner diamonds */}
            <div className="challenger-gem-top-left" />
            <div className="challenger-gem-top-right" />
            <div className="challenger-gem-bottom-left" />
            <div className="challenger-gem-bottom-right" />
            
            {/* Animated wing plates on sides */}
            <div className="challenger-wing-left" />
            <div className="challenger-wing-right" />

            <div className="bento-grid">
              
              {/* HSR Status Panel (Left column) */}
              <div className="glass-panel" style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  {/* Profile Avatar with Quantum Diamond Ring */}
                  <div style={{ 
                    position: 'relative', 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    border: '2px solid var(--accent-gold)',
                    boxShadow: '0 0 15px var(--accent-gold-glow)',
                    background: '#0c0528',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '2rem' }}>👾</span>
                    <div className="hacker-font" style={{
                      position: 'absolute',
                      bottom: '-5px',
                      right: '-5px',
                      background: 'var(--accent-blue)',
                      color: 'white',
                      fontSize: '1.05rem',
                      fontWeight: 900,
                      padding: '1px 6px',
                      borderRadius: '3px',
                      border: '1px solid var(--accent-gold)',
                      boxShadow: '0 0 8px var(--accent-blue)'
                    }}>Lv.80</div>
                  </div>

                  <div>
                    <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                      Dương Nguyên Khánh
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.15rem', fontFamily: 'var(--font-mono)' }}>
                      PATH: THE ERUDITION (TƯ DUY THUẬT TOÁN) | ELEMENT: QUANTUM (LƯỢNG TỬ)
                    </p>
                  </div>
                </div>

                {/* Character Base Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    Chỉ Số Học Tập & Năng Lực (Learning Stats)
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    {stats.map(s => (
                      <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.75rem', background: 'rgba(24,12,58,0.25)', border: '1px solid rgba(0,240,255,0.1)', borderRadius: '3px' }} title={s.desc}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.name.split(' ')[0]}</span>
                        <span className="hacker-font" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Paths (Traits) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    Định Hướng Chuyên Môn (Active Paths)
                  </h3>
                  
                  <div className="traits-container">
                    {traits.map(t => (
                      <div key={t.name} className="trait-item" title={t.label}>
                        <div className={`trait-hexagon ${t.tier}`}>
                          <span style={{ fontSize: '0.65rem' }}>{t.name.charAt(4)}</span>
                        </div>
                        <span className="trait-name" style={{ fontFamily: 'var(--font-mono)' }}>{t.name}</span>
                        <span className="trait-count" style={{ borderColor: 'var(--accent-gold)' }}>{t.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Relics & Light Cone Panel (Right column) */}
              <div className="glass-panel" style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', justifySelf: 'space-between', gap: '1.2rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    Công Cụ & Di Vật Học Tập (Relics & Tools)
                  </h3>

                  {/* Light Cone Weapon */}
                  <div style={{ 
                    background: 'rgba(24, 12, 58, 0.4)', 
                    border: '1px solid var(--accent-blue)', 
                    borderRadius: '4px',
                    padding: '0.65rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }} title="Hiệu ứng Light Cone: Tăng 40% tốc độ biên dịch và 35% tỉ lệ tìm thấy Bug.">
                    <div style={{ fontSize: '1.5rem', width: '40px', height: '40px', background: 'rgba(0,240,255,0.1)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                      📱
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 'bold' }}>Signature Light Cone</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', fontFamily: 'var(--font-mono)' }}>Before the Tutorial Starts (S5)</span>
                    </div>
                  </div>

                  {/* Relic inventory */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {relics.map(r => (
                      <div 
                        key={r.name} 
                        style={{ 
                          background: 'rgba(4, 2, 16, 0.8)', 
                          border: '1.5px solid var(--accent-gold)', 
                          borderRadius: '3px', 
                          height: '52px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = '#fff';
                          e.currentTarget.style.boxShadow = '0 0 10px var(--accent-gold-glow)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        title={`${r.slot}: ${r.name}`}
                      >
                        {r.logo}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(0, 240, 255, 0.03)', 
                  border: '1px solid rgba(0, 240, 255, 0.15)', 
                  borderRadius: '4px', 
                  padding: '0.75rem', 
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <strong>Build Output:</strong> Client compiled from GitHub repository. Auto deployment on Vercel cloud completed.
                </div>
              </div>

            </div>
          </div>

          {/* Core Traces Section */}
          <div className="animate-fade-in">
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.3rem',
              fontWeight: 800,
              marginBottom: '1rem',
              textAlign: 'center',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Vết Tích Lõi Học Tập (Core Traces Selection)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
              Mở các Vết Tích bên dưới để xem báo cáo chi tiết về lý lịch học viên, mục tiêu học tập và hạ tầng công nghệ.
            </p>

            <div className="augment-selection-wrapper">
              {/* Profile Trace */}
              <div 
                className={`augment-card ${selectedAugment === 'profile' ? 'prismatic' : ''}`}
                onClick={() => handleAugmentClick('profile')}
              >
                <div className="augment-icon-container" style={{ borderColor: 'var(--accent-blue)' }}>
                  <span style={{ fontSize: '1.6rem' }}>👑</span>
                </div>
                <div>
                  <div className="augment-title">Vết Tích 1: Lý Lịch Cá Nhân</div>
                  <div className="augment-desc" style={{ marginTop: '0.5rem' }}>
                    Giải mã hồ sơ cá nhân sơ lược, thông tin liên lạc và trình độ chuyên môn.
                  </div>
                </div>
              </div>

              {/* Goals Trace */}
              <div 
                className={`augment-card ${selectedAugment === 'goals' ? 'prismatic' : ''}`}
                onClick={() => handleAugmentClick('goals')}
              >
                <div className="augment-icon-container" style={{ borderColor: 'var(--accent-gold)' }}>
                  <span style={{ fontSize: '1.6rem' }}>🎯</span>
                </div>
                <div>
                  <div className="augment-title">Vết Tích 2: Mục Tiêu Học Tập</div>
                  <div className="augment-desc" style={{ marginTop: '0.5rem' }}>
                    Kế hoạch học tập, phát triển tư duy giải thuật AI và đạo đức kỹ nghệ.
                  </div>
                </div>
              </div>

              {/* Methods Trace */}
              <div 
                className={`augment-card ${selectedAugment === 'methods' ? 'prismatic' : ''}`}
                onClick={() => handleAugmentClick('methods')}
              >
                <div className="augment-icon-container" style={{ borderColor: 'var(--accent-blue)' }}>
                  <span style={{ fontSize: '1.6rem' }}>🚀</span>
                </div>
                <div>
                  <div className="augment-title">Vết Tích 3: Hạ Tầng Kỹ Thuật</div>
                  <div className="augment-desc" style={{ marginTop: '0.5rem' }}>
                    Kiến trúc mã nguồn sạch, Git Flow, Human-in-the-loop hỗ trợ AI.
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Display for Selected Trace */}
            {selectedAugment && (
              <div 
                className="glass-panel animate-fade-in" 
                style={{ 
                  marginTop: '1.5rem', 
                  borderLeft: '4px solid var(--accent-gold)',
                  background: 'rgba(8, 4, 30, 0.85)',
                  padding: '1.5rem' 
                }}
              >
                {selectedAugment === 'profile' && (
                  <div>
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', textTransform: 'uppercase' }}>
                      Hồ Sơ Dữ Liệu: Lý Lịch Cá Nhân
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <div><strong>Họ và tên:</strong> Dương Nguyên Khánh</div>
                      <div><strong>Mã số sinh viên:</strong> 25020210</div>
                      <div><strong>Đào tạo:</strong> K70 Orientation - AI Engineer - UET - VNU</div>
                      <div><strong>Kỹ năng giải mật:</strong> Lập trình Python, thiết kế ứng dụng React SPA, xây dựng giải thuật, phân tích quy chuẩn đạo đức AI.</div>
                    </div>
                  </div>
                )}
                
                {selectedAugment === 'goals' && (
                  <div>
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', textTransform: 'uppercase' }}>
                      Hồ Sơ Mục Tiêu: Định Hướng Học Tập
                    </h3>
                    <ul className="doc-list" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <li>Rèn luyện tư duy cấu trúc tệp dữ liệu khoa học, gọn gàng, có khả năng mở rộng.</li>
                      <li>Khai thác tối đa năng lực tạo sinh của Mô hình ngôn ngữ lớn (LLM) bằng kỹ thuật Prompt Engineering nâng cao.</li>
                      <li>Nắm vững đạo đức công nghệ, bảo vệ quyền riêng tư người dùng trong nghiên cứu AI.</li>
                    </ul>
                  </div>
                )}
                
                {selectedAugment === 'methods' && (
                  <div>
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', textTransform: 'uppercase' }}>
                      Hồ Sơ Hạ Tầng: Phương Pháp Thực Thi
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      Học phần kết hợp thực hành Human-in-the-loop. Giao diện React Single Page Application (SPA), tích hợp trợ lý lập trình thông minh hỗ trợ viết code, dò tìm Bug hệ thống nhanh chóng đồng thời duy trì cấu trúc mã nguồn tường minh, sạch sẽ.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {activeView === 'warp' && (
        /* Gacha Hacking Warp Banner */
        <div className="tft-shop-container animate-fade-in" style={{ borderColor: 'var(--accent-blue)', marginTop: '1rem' }}>
          <div className="tft-shop-header">
            <div className="tft-shop-title" style={{ fontFamily: 'var(--font-mono)' }}>Báo Cáo Thực Hành (Chọn nhiệm vụ học tập để hiển thị)</div>
            
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                className="hud-btn" 
                onClick={() => rerollShop()}
                disabled={shuffling}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem' }}
              >
                <RefreshCw size={12} className={shuffling ? 'spin' : ''} />
                <span style={{ fontFamily: 'var(--font-mono)' }}>Lọc Lại Tác Vụ (D)</span>
              </button>
              
              <div style={{ 
                background: '#0a0520', 
                border: '1px solid var(--accent-gold)', 
                color: 'var(--accent-gold)',
                fontWeight: 800,
                fontSize: '0.8rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)'
              }}>
                Completion Rate: 100%
              </div>
            </div>
          </div>

          <div className="tft-shop-grid">
            {shopTasks.map(task => {
              const Icon = task.icon;
              return (
                <div 
                  key={task.id}
                  className={`tft-shop-card tier-${task.tier} ${shuffling ? 'shop-shuffle' : ''}`}
                  onClick={() => handleCardClick(task.id)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {/* Task Icon & Badge style */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ 
                        background: 'rgba(0,0,0,0.6)', 
                        color: `var(--tier-${task.tier})`, 
                        padding: '0.25rem',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={16} />
                      </div>
                      <span style={{ fontSize: '0.65rem', color: `var(--tier-${task.tier})`, fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Nhiệm Vụ {task.tier}★
                      </span>
                    </div>

                    <div style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: 'var(--text-primary)',
                      marginTop: '0.4rem',
                      lineHeight: '1.2'
                    }}>
                      {task.title.split(': ')[1] || task.title}
                    </div>
                    
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: 'var(--text-secondary)',
                      marginTop: '0.2rem',
                      lineHeight: '1.3'
                    }}>
                      {task.desc}
                    </div>
                  </div>

                  <div className="shop-card-cost hacker-font" style={{ fontSize: '1.25rem' }}>
                    {task.cost * 160}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Styled css spinner class */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 0.6s linear infinite;
        }
        @media (max-width: 768px) {
          .mobile-hide {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
