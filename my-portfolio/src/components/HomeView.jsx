import React, { useState } from 'react';
import { Shield, Smartphone, HeartHandshake, Users, ArrowRight, MapPin, Eye, Compass, Heart } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import TextGenerateEffect from './TextGenerateEffect';


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
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600" 
            alt="Abstract futuristic glowing lines" 
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1 className="hero-title">
              <TextGenerateEffect words="Cổng Thông Tin Học Viên K70 AI Engineer" />
            </h1>
            <div className="hero-subtitle">
              <TextGenerateEffect words="Hệ thống báo cáo học tập, tích hợp 6 nhiệm vụ lập trình thực tế, lộ trình phát triển và tuyên ngôn đạo đức AI của Dương Nguyên Khánh (MSSV: 25020210)." duration={0.4} />
            </div>
            <div 
              className="hover-border-gradient-wrapper hero-btn" 
              onClick={() => setActiveTab('rooms')}
              style={{ padding: '2.5px', background: 'var(--text-main)', display: 'inline-block', borderRadius: '6px' }}
            >
              <div className="hover-border-gradient-glow" />
              <button 
                className="hover-border-gradient-btn"
                style={{ background: 'var(--color-blue)', color: '#ffffff' }}
              >
                Báo Cáo Thực Hành
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Grid contents: Map + Yellow info card */}
      <section className="grid-container">
        <div className="neo-grid-2">
          
          {/* Location info card */}
          <div className="neo-card location-card" style={{ background: 'var(--color-yellow)' }}>
            <h2 className="card-title">Kết Hợp Tư Duy Hệ Thống & Kỹ Nghệ AI</h2>
            <p className="card-text" style={{ color: '#111111' }}>
              Học tập và nghiên cứu tại UET - VNU. Hệ thống bài tập được tổ chức khoa học, kết hợp quy trình làm việc chuyên nghiệp của Git Flow, quản trị Kanban và tối ưu hóa prompt bằng chuỗi suy nghĩ CoT.
            </p>
            
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Thông tin địa điểm:</div>
              <div className="tag-list">
                <span className="tag-item" style={{ background: '#111111', color: '#ffffff' }}>UET Cầu Giấy</span>
                <span className="tag-item">Hanoi, Vietnam</span>
                <span className="tag-item">VNU Campus</span>
              </div>
            </div>
          </div>

          {/* Interactive Map simulation */}
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
                Trường Đại học Công nghệ (UET)
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
              LAT: 21.0382° N | LON: 105.7828° E
            </div>
          </div>

        </div>

        {/* 3. Amenities Deck: One Unit - Your card covers everything */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1.5px' }}>Hạ tầng học tập của học viên</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Bộ khung kỹ năng và hạ tầng công nghệ hỗ trợ đắc lực xuyên suốt quá trình thực hành lập trình và nghiên cứu AI.
            </p>
          </div>

          <div className="neo-grid-4">
            
            {/* Card 1: Tư duy hệ thống */}
            <SpotlightCard spotlightColor="rgba(0, 71, 255, 0.08)">
              <div style={{ background: 'rgba(0, 71, 255, 0.1)', color: 'var(--color-blue)', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <Users size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>Tư Duy Hệ Thống</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                Quản lý cấu trúc cây thư mục và không gian làm việc khoa học, gọn gàng, dễ mở rộng.
              </p>
            </SpotlightCard>

            {/* Card 2: Quy trình chuyên nghiệp */}
            <SpotlightCard spotlightColor="rgba(255, 102, 0, 0.08)">
              <div style={{ background: 'rgba(255, 102, 0, 0.1)', color: 'var(--color-orange)', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <Shield size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>Quy Trình Chuyên Nghiệp</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                Quản trị dự án qua sơ đồ Kanban và phân chia các luồng Git Flow cộng tác tối ưu.
              </p>
            </SpotlightCard>

            {/* Card 3: Kỹ nghệ câu lệnh */}
            <SpotlightCard spotlightColor="rgba(0, 204, 102, 0.08)">
              <div style={{ background: 'rgba(0, 204, 102, 0.1)', color: 'var(--color-green)', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <Smartphone size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>Prompt Engineering</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                Thiết kế câu lệnh cấu trúc logic, áp dụng kỹ thuật CoT giúp tăng hiệu năng làm việc với LLM.
              </p>
            </SpotlightCard>

            {/* Card 4: Đạo đức AI */}
            <SpotlightCard spotlightColor="rgba(255, 204, 0, 0.12)">
              <div style={{ background: 'rgba(255, 204, 0, 0.15)', color: '#b28f00', padding: '0.6rem', borderRadius: '6px', alignSelf: 'flex-start' }}>
                <HeartHandshake size={24} />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.35rem' }}>Đạo Đức & Trách Nhiệm</h3>
              <p className="card-text" style={{ fontSize: '0.9rem' }}>
                Tuân thủ nghiêm ngặt 6 tiêu chuẩn đạo đức AI, chịu trách nhiệm giải trình và bảo mật thông tin.
              </p>
            </SpotlightCard>

          </div>
        </div>

        {/* 4. "What defines us" Section with Interactive Pixel Grid Art */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1.5px' }}>Triết lý hoạt động</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Xây dựng hệ thống lấy con người làm trung tâm, tối ưu hóa giao diện thiết kế và đặt sự tận tụy lên hàng đầu.
            </p>
          </div>

          <div className="neo-grid-3">
            
            {/* Grid 1: For People */}
            <div className="pixel-grid-card">
              <div className="pixel-grid-header" style={{ background: 'var(--color-blue)', color: '#ffffff' }}>
                Dành Cho Con Người
              </div>
              <div className="pixel-grid-canvas-wrapper" style={{ background: 'var(--color-blue)' }}>
                <PixelGridCanvas preset="smile" color="var(--color-green)" />
              </div>
            </div>

            {/* Grid 2: By Design */}
            <div className="pixel-grid-card">
              <div className="pixel-grid-header" style={{ background: 'var(--color-orange)', color: '#ffffff' }}>
                Bởi Thiết Kế
              </div>
              <div className="pixel-grid-canvas-wrapper" style={{ background: 'var(--color-orange)' }}>
                <PixelGridCanvas preset="arrow" color="var(--color-yellow)" />
              </div>
            </div>

            {/* Grid 3: With Care */}
            <div className="pixel-grid-card">
              <div className="pixel-grid-header" style={{ background: 'var(--color-green)', color: '#ffffff' }}>
                Với Sự Tận Tụy
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
            <span>Thu hoạch & Lộ trình</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 5. Corporate Newsletter & Footer */}
      <footer className="news-footer">
        <div className="newsletter-box">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px' }}>Kết nối học thuật.</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', maxWidth: '450px' }}>
            Nhận thông báo cập nhật về các bài nghiên cứu, dự án mã nguồn mở và tài liệu lập trình AI mới nhất.
          </p>
          
          {subscribed ? (
            <div style={{ color: 'var(--color-green)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✓ Cảm ơn bạn đã đăng ký nhận thông tin học thuật!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-input-group">
              <input 
                type="email" 
                placeholder="Địa chỉ email của bạn" 
                className="newsletter-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Đăng Ký
              </button>
            </form>
          )}
        </div>

        <div className="corporate-links">
          <div className="corp-nav">
            <a href="#faqs" className="corp-link" onClick={e => e.preventDefault()}>Câu Hỏi Thường Gặp</a>
            <a href="#privacy" className="corp-link" onClick={e => e.preventDefault()}>Chính Sách Bản Quyền</a>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>© 2026 Dương Nguyên Khánh. Lớp K70 AI Engineer - UET - VNU.</div>
            <div style={{ marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>BUILD_ID: 25020210_HANOI</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
