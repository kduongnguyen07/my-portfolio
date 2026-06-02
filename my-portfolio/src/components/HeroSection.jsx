import React from 'react';
import { Terminal, Search, Award, MessageSquare, ShieldAlert, KanbanSquare, Sparkles, MoveRight, Layers, ArrowUpRight } from 'lucide-react';

export default function HeroSection({ setActiveTab }) {
  const cards = [
    {
      id: 'task1',
      title: 'Quản lý Tệp tin',
      icon: Terminal,
      desc: 'Giả lập Terminal & Cây thư mục workspace thực tế.',
      color: 'var(--accent-primary)',
    },
    {
      id: 'task2',
      title: 'Tìm kiếm Nâng cao',
      icon: Search,
      desc: 'Bộ lọc toán tử Google Search và giảm thiểu thông tin nhiễu.',
      color: '#0284c7', // Sky blue
    },
    {
      id: 'task3',
      title: 'Prompt Engineering',
      icon: MessageSquare,
      desc: 'So sánh hiệu năng và giả lập luồng suy nghĩ Chain-of-Thought.',
      color: '#db2777', // Pink
    },
    {
      id: 'task4',
      title: 'Cộng tác Kanban',
      icon: KanbanSquare,
      desc: 'Tự động hóa luồng làm việc Git Flow & Quản trị dự án.',
      color: '#ca8a04', // Dark Yellow
    },
    {
      id: 'task5',
      title: 'Sáng tạo với AI',
      icon: Sparkles,
      desc: 'Quy trình Human-in-the-loop kết hợp tạo sinh ảnh và chỉnh sửa văn bản.',
      color: '#9333ea', // Purple
    },
    {
      id: 'task6',
      title: 'Đạo đức AI',
      icon: ShieldAlert,
      desc: '6 nguyên tắc cốt lõi về Sử dụng AI có trách nhiệm.',
      color: '#dc2626', // Red
    },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* Intro Hero Header */}
      <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.85rem',
          background: 'rgba(79, 70, 229, 0.08)',
          border: '1px solid rgba(79, 70, 229, 0.2)',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: 'var(--accent-primary)',
          marginBottom: '1.25rem'
        }}>
          <Award size={14} />
          <span>K70 - TRƯỜNG ĐẠI HỌC CÔNG NGHỆ (UET) - VNU</span>
        </div>
        
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
          fontWeight: 750,
          letterSpacing: '-1px',
          lineHeight: '1.15',
          marginBottom: '1.25rem',
          maxWidth: '900px',
          color: 'var(--text-primary)'
        }}>
          Dương Nguyên Khánh <br />
          <span className="text-gradient">AI Engineer & Digital Creator</span>
        </h1>
        
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '700px',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          Portfolio kỹ thuật số tích hợp trải nghiệm tương tác cao cấp. Minh chứng cho sự thấu hiểu công nghệ số, kỹ nghệ prompt và lập trình thuật toán hiện đại.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-gradient" onClick={() => setActiveTab('task1')}>
            <span>Khám phá Portfolio</span>
            <MoveRight size={16} />
          </button>
          <button className="btn-outline" onClick={() => setActiveTab('roadmap')}>
            <span>Xem lộ trình phát triển</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Info Section */}
      <div className="bento-grid" style={{ marginTop: '1rem' }}>
        
        {/* Profile Card (Left Big Card) */}
        <div className="glass-panel" style={{
          gridColumn: 'span 7',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '300px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Thông Tin Cá Nhân</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
              Dương Nguyên Khánh
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                <span style={{ width: '150px', color: 'var(--text-secondary)', fontWeight: 500 }}>MSSV:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'monospace' }}>25020210</span>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                <span style={{ width: '150px', color: 'var(--text-secondary)', fontWeight: 500 }}>Lớp Khóa Học:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>K70 - UET - VNU</span>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                <span style={{ width: '150px', color: 'var(--text-secondary)', fontWeight: 500 }}>Định hướng:</span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Layers size={14} /> AI Engineer
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            {['AI / Machine Learning', 'Prompt Engineering', 'Git Flow & DevOps', 'Algorithm Design'].map(tag => (
              <span key={tag} style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Goal Card (Right Bento Card) */}
        <div className="glass-panel" style={{
          gridColumn: 'span 5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '300px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Mục tiêu học tập</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              Tối ưu hoá tư duy hệ thống
            </h3>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
                <span>Thành thạo cấu trúc tệp khoa học phục vụ Data Preprocessing trong AI.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
                <span>Khai thác hiệu suất LLM thông qua Prompt Engineering nâng cao.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
                <span>Áp dụng quy tắc đạo đức và liêm chính nghiêm ngặt trong nghiên cứu AI.</span>
              </li>
            </ul>
          </div>

          <div style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '0.75rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            marginTop: '1rem'
          }}>
            <strong>Phương pháp:</strong> Cấu trúc React SPA quản trị qua GitHub & deploy tự động trên Vercel.
          </div>
        </div>

      </div>

      {/* Interactive Feature Cards */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'var(--text-primary)'
        }}>
          Bài tập & Nhiệm vụ đã hoàn thành
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {cards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="glass-panel animate-fade-in"
                onClick={() => setActiveTab(card.id)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = card.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    background: 'var(--bg-tertiary)',
                    color: card.color,
                    padding: '0.6rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} />
                  </div>
                  
                  <ArrowUpRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
                
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
