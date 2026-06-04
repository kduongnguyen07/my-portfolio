import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, Calendar, Award, Compass, Milestone, Sparkles } from 'lucide-react';

export default function OurWayOfLivingView() {
  const [activePlan, setActivePlan] = useState('short');

  // Drawing Canvas (16x10 grid)
  const cols = 16;
  const rows = 10;
  const [grid, setGrid] = useState(Array(rows * cols).fill(false));
  const [activePixel, setActivePixel] = useState(0);
  const [direction, setDirection] = useState('RIGHT');
  const [isAutoMoving, setIsAutoMoving] = useState(true);

  // Auto sweep path logic for grid drawing
  useEffect(() => {
    if (!isAutoMoving) return;

    const interval = setInterval(() => {
      setActivePixel((prev) => {
        const r = Math.floor(prev / cols);
        const c = prev % cols;
        
        let nextR = r;
        let nextC = c;

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
    setGrid(g => {
      const newG = [...g];
      newG[index] = !newG[index];
      return newG;
    });
  };

  const skillsData = [
    { name: 'Quản lý cấu trúc tệp (File System)', before: 40, after: 90 },
    { name: 'Kỹ nghệ câu lệnh (Prompt Engineering)', before: 30, after: 95 },
    { name: 'Cộng tác & Quy trình (Git Flow / Kanban)', before: 20, after: 85 },
    { name: 'Đồng sáng tạo nội dung AI (Generative AI)', before: 50, after: 90 },
    { name: 'Ý thức Đạo đức công nghệ (AI Ethics)', before: 60, after: 95 }
  ];

  return (
    <div className="main-content" style={{ background: 'var(--color-yellow)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Page Header */}
      <section style={{ padding: '3.5rem 3rem 1.5rem 3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px', color: 'var(--text-main)', lineHeight: 1 }}>
          Thu Hoạch & Lộ Trình
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-main)', opacity: 0.85, marginTop: '0.5rem', maxWidth: '800px' }}>
          Tổng kết quá trình phát triển năng lực số cá nhân và hoạch định lộ trình nghiên cứu AI dài hạn.
        </p>
      </section>

      {/* 2. Main Grid Layout */}
      <section style={{ padding: '0 3rem 3rem 3rem' }} className="grid-container">
        <div className="neo-grid-2">
          
          {/* Left Column: Growth & Challenges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Growth assessment card */}
            <div className="neo-card" style={{ background: '#ffffff' }}>
              <h2 className="card-title" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={22} style={{ color: 'var(--color-orange)' }} />
                <span>Sự Trưởng Thành Cá Nhân</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                <p>
                  <strong>• Chuẩn hóa tư duy hệ thống:</strong> Từ tổ chức tệp tin theo thói quen tự phát, tôi đã làm chủ các quy tắc quản trị dự án, thiết lập nhánh Git Flow chuyên nghiệp và sơ đồ Kanban hỗ trợ làm việc nhóm.
                </p>
                <p>
                  <strong>• Cộng tác hiệu quả với AI:</strong> Chuyển đổi phương thức khai thác Generative AI từ hỏi-đáp đơn thuần sang thiết lập hệ thống Prompt kết hợp chuỗi suy nghĩ CoT giúp tăng tốc độ viết code.
                </p>
              </div>
            </div>

            {/* Challenges & Experience card */}
            <div className="neo-card" style={{ background: '#ffffff' }}>
              <h2 className="card-title" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={22} style={{ color: 'var(--color-blue)' }} />
                <span>Thách Thức & Kinh Nghiệm</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                <p>
                  <strong>• Thách thức lớn nhất:</strong> Duy trì tính nhất quán của thiết kế giao diện (Neo-Brutalist Grid) trong khi vẫn đảm bảo cấu trúc nội dung khoa học chuẩn học thuật.
                </p>
                <p>
                  <strong>• Bài học kinh nghiệm:</strong> Luôn bắt đầu giải quyết từ tầng mô hình cấu trúc dữ liệu thô trước khi chuyển sang xây dựng tầng hiển thị giao diện người dùng.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Roadmap Toggle & Growth Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Roadmap toggle deck */}
            <div className="neo-card" style={{ background: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Milestone size={22} style={{ color: 'var(--color-green)' }} />
                  <span>Lộ Trình Phát Triển</span>
                </h2>
                
                <div style={{ display: 'flex', gap: '0.4rem', border: '1.5px solid var(--text-main)', borderRadius: '4px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setActivePlan('short')}
                    style={{
                      background: activePlan === 'short' ? 'var(--color-yellow)' : 'transparent',
                      border: 'none',
                      padding: '0.25rem 0.6rem',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ngắn hạn
                  </button>
                  <button 
                    onClick={() => setActivePlan('long')}
                    style={{
                      background: activePlan === 'long' ? 'var(--color-yellow)' : 'transparent',
                      borderLeft: '1.5px solid var(--text-main)',
                      borderTop: 'none',
                      borderRight: 'none',
                      borderBottom: 'none',
                      padding: '0.25rem 0.6rem',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Dài hạn
                  </button>
                </div>
              </div>

              {activePlan === 'short' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-orange)' }}>
                    Kế hoạch ngắn hạn (1 - 2 năm tới):
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <li>• Làm chủ giải thuật học sâu (Deep Learning) và học máy nâng cao.</li>
                    <li>• Nâng cao trình độ Full-stack Javascript (React, Node.js, Express).</li>
                    <li>• Hoàn thành thực tập vị trí AI Engineer tại các phòng nghiên cứu.</li>
                  </ul>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-blue)' }}>
                    Tầm nhìn dài hạn (3 - 5 năm tới):
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <li>• Dẫn dắt kỹ thuật cho các dự án phát triển mô hình AI lớn.</li>
                    <li>• Thiết kế hệ thống đa tác nhân (Multi-Agent System) quy mô lớn.</li>
                    <li>• Nghiên cứu triển khai các giải pháp AI Edge tối ưu tài nguyên.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Growth progress charts */}
            <div className="neo-card" style={{ background: '#ffffff' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Chỉ Số Tăng Trưởng Kỹ Năng</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                {skillsData.map((skill, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span>{skill.name}</span>
                      <span style={{ color: 'var(--color-orange)' }}>
                        {skill.before}% ➔ {skill.after}%
                      </span>
                    </div>
                    {/* Double progress bar */}
                    <div style={{ width: '100%', height: '14px', background: '#eaeaea', border: '1.5px solid var(--text-main)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                      <div 
                        style={{
                          width: `${skill.after}%`,
                          height: '100%',
                          background: 'var(--color-yellow)',
                          transition: 'width 1s ease'
                        }}
                      />
                      <div 
                        style={{
                          width: `${skill.before}%`,
                          height: '100%',
                          background: 'var(--color-blue)',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          transition: 'width 1s ease'
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--color-blue)', border: '1px solid #000' }} />
                    <span>Trước khóa học</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--color-yellow)', border: '1px solid #000' }} />
                    <span>Hiện tại</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Interactive Pixel Grid (retained for design fidelity) */}
        <div className="neo-card" style={{ background: '#ffffff', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} style={{ color: 'var(--color-orange)' }} />
              <span>Interactive Pixel Grid Canvas</span>
            </div>
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

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              borderTop: '2px solid var(--text-main)',
              borderLeft: '2px solid var(--text-main)',
              background: '#ffffff'
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
        </div>

      </section>

      {/* Footer Banner */}
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
        <span>GRID_PATROL: ACTIVE</span>
        <span>STUDENT_MSSV: 25020210</span>
      </div>
    </div>
  );
}
