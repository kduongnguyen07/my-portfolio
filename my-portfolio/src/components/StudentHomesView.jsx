import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import TerminalVisualizer from './TerminalVisualizer';
import SearchSimulator from './SearchSimulator';
import PromptPlayground from './PromptPlayground';
import KanbanBoard from './KanbanBoard';
import ContentCreation from './ContentCreation';
import EthicsAI from './EthicsAI';

export default function StudentHomesView() {
  const [activeTask, setActiveTask] = useState(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const tasks = [
    { 
      id: 'task1', 
      number: 'Bài 1',
      name: 'Máy tính & Thiết bị ngoại vi', 
      desc: 'Giả lập Terminal & Cây thư mục workspace.', 
      component: TerminalVisualizer,
      difficulty: 'Gold T3',
      color: 'var(--color-blue)',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600'
    },
    { 
      id: 'task2', 
      number: 'Bài 2',
      name: 'Google Search nâng cao', 
      desc: 'Bộ lọc toán tử tìm kiếm thông tin tối ưu.', 
      component: SearchSimulator,
      difficulty: 'Epic T4',
      color: 'var(--color-yellow)',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600'
    },
    { 
      id: 'task3', 
      number: 'Bài 3',
      name: 'Prompt & Chuỗi suy nghĩ', 
      desc: 'So sánh LLM và giả lập Chain-of-Thought.', 
      component: PromptPlayground,
      difficulty: 'Epic T4',
      color: 'var(--color-orange)',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600'
    },
    { 
      id: 'task4', 
      number: 'Bài 4',
      name: 'Sơ đồ Kanban & Phối hợp', 
      desc: 'Tự động hoá luồng Git Flow & Quản trị nhóm.', 
      component: KanbanBoard,
      difficulty: 'Legendary T5',
      color: 'var(--color-green)',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=600'
    },
    { 
      id: 'task5', 
      number: 'Bài 5',
      name: 'Đồng sáng tạo nội dung', 
      desc: 'Human-in-the-loop thiết kế ảnh & văn bản.', 
      component: ContentCreation,
      difficulty: 'Legendary T5',
      color: '#a855f7',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600'
    },
    { 
      id: 'task6', 
      number: 'Bài 6',
      name: 'Đạo đức AI có trách nhiệm', 
      desc: '6 nguyên tắc cốt lõi về liêm chính học thuật.', 
      component: EthicsAI,
      difficulty: 'Rare T2',
      color: '#ec4899',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setTranslateX(0);
        return;
      }
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const totalScrollable = rect.height - viewHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);
      
      const contentWidth = window.innerWidth - 280; // sidebar offset
      const maxTranslate = trackRef.current.scrollWidth - contentWidth;
      setTranslateX(progress * Math.max(0, maxTranslate));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveTask(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const ActiveComponent = tasks.find(t => t.id === activeTask)?.component;

  // Calculates parallax scroll factor for card elements (-30px to 30px)
  const getParallaxShift = (index) => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return 0;
    // Map progress to card indexes (0 for Intro, 1-6 for Tasks)
    const cardProgress = (scrollProgress * 6.8) - (index + 0.8);
    return Math.max(-25, Math.min(25, cardProgress * 12));
  };

  return (
    <div className="main-content">
      
      {/* Scrollable Track Section */}
      <div 
        ref={containerRef} 
        className="horizontal-scroll-container"
        style={{
          position: 'relative',
          height: '380vh', // scroll length
          background: 'var(--bg-site)'
        }}
      >
        
        {/* Sticky Lock Viewport */}
        <div 
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center', // Vertically center the slider
            width: '100%'
          }}
        >
          {/* Slider Track Wrapper */}
          <div 
            ref={trackRef}
            className="horizontal-scroll-track"
            style={{
              display: 'flex',
              gap: '2.5rem',
              padding: '0 4rem 0 4rem',
              transform: `translateX(-${translateX}px)`,
              transition: 'transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)',
              width: 'max-content',
              willChange: 'transform',
              alignItems: 'center'
            }}
          >
            {/* 1. Integrated Intro Header Slide */}
            <div
              style={{
                width: '460px',
                height: '520px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: '3rem',
                borderRight: '2px dashed var(--text-muted)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-blue)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                kduongnguyen07 // 02
              </span>
              <h1 style={{ fontSize: '3.8rem', fontWeight: 900, letterSpacing: '-2px', marginTop: '0.5rem', lineHeight: 1.05 }}>
                Báo Cáo Thực Hành
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '1rem', lineHeight: 1.5 }}>
                Tuyển tập 6 nhiệm vụ thực hành mô phỏng kỹ năng số và năng lực AI chuyên sâu. Hãy cuộn chuột sang phải để xem.
              </p>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginTop: '2.5rem', 
                  fontWeight: 800, 
                  color: 'var(--color-blue)', 
                  fontSize: '0.95rem',
                  textTransform: 'uppercase'
                }}
              >
                <span>Cuộn sang phải</span>
                <ArrowRight size={20} className="pulse-arrow" />
              </div>
            </div>

            {/* 2. Tasks cards list */}
            {tasks.map((task, index) => {
              const textShift = getParallaxShift(index);
              
              return (
                <div
                  key={task.id}
                  onClick={() => setActiveTask(task.id)}
                  className="neo-card"
                  style={{
                    width: '380px',
                    height: '520px',
                    flexShrink: 0,
                    padding: 0,
                    overflow: 'hidden',
                    background: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translate(-4px, -4px)';
                    e.currentTarget.style.boxShadow = '8px 8px 0px var(--text-main)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow-offset)';
                  }}
                >
                  {/* Image wrapper with cropped parallax overflow */}
                  <div style={{ width: '100%', height: '260px', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={task.image} 
                      alt={task.name}
                      style={{ 
                        width: '120%', 
                        height: '100%', 
                        objectFit: 'cover',
                        position: 'absolute',
                        left: '-10%',
                        filter: 'grayscale(0.1) contrast(1.05)',
                        transform: `scale(1.12) translateX(${textShift * -0.8}px)`, // Opposing slow scroll parallax
                        transition: 'transform 0.1s linear'
                      }}
                    />
                    {/* Badge */}
                    <span 
                      style={{ 
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        background: 'rgba(0,0,0,0.85)',
                        color: '#ffffff',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {task.difficulty}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontWeight: 800, 
                        color: task.color,
                        fontSize: '0.85rem',
                        transform: `translateX(${textShift * 0.3}px)`,
                        transition: 'transform 0.1s linear'
                      }}
                    >
                      {task.number}
                    </div>
                    
                    <h3 
                      style={{ 
                        fontSize: '1.45rem', 
                        fontWeight: 900, 
                        lineHeight: 1.25, 
                        letterSpacing: '-0.5px',
                        transform: `translateX(${textShift}px)`,
                        transition: 'transform 0.1s linear'
                      }}
                    >
                      {task.name}
                    </h3>
                    
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {task.desc}
                    </p>

                    {/* Launch Action triggers */}
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: task.color }}>
                        Chạy mô phỏng ➔
                      </span>
                      <div 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '4px', 
                          background: task.color, 
                          color: task.id === 'task2' ? 'var(--text-main)' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center', 
                          justifyContent: 'center',
                          border: '1.5px solid var(--text-main)'
                        }}
                      >
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Floating full-screen Visualizer Modal Panel Overlay */}
      {activeTask && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem'
          }}
          onClick={() => setActiveTask(null)}
        >
          {/* Visualizer container */}
          <div 
            className="neo-card animate-scale-up"
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: '85vh',
              background: '#ffffff',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-offset)',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Title Header */}
            <div 
              style={{ 
                padding: '1.25rem 2rem', 
                borderBottom: '2.5px solid var(--text-main)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: tasks.find(t => t.id === activeTask)?.color,
                color: activeTask === 'task2' ? 'var(--text-main)' : '#ffffff'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', opacity: 0.85 }}>
                  {tasks.find(t => t.id === activeTask)?.number} // Trình giả lập
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
                  {tasks.find(t => t.id === activeTask)?.name}
                </h3>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setActiveTask(null)}
                style={{ 
                  background: 'var(--bg-card)', 
                  border: '2px solid var(--text-main)', 
                  color: 'var(--text-main)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px var(--text-main)',
                  transition: 'all 0.1s'
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translate(1px, 1px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px var(--text-main)';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px var(--text-main)';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {ActiveComponent && <ActiveComponent />}
            </div>

            {/* Modal Keyboard Esc Footer */}
            <div style={{ padding: '0.75rem 2rem', background: '#f9f9f9', borderTop: '1.5px solid var(--text-main)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Ấn [ESC] hoặc nhấp ra ngoài để đóng trình giả lập.
            </div>
          </div>
        </div>
      )}

      {/* Styled css keyframes */}
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pulse-arrow {
          animation: pulseArrow 1.5s infinite ease-in-out;
        }
        @keyframes pulseArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }

        /* Mobile specific layout overrides */
        @media (max-width: 768px) {
          .horizontal-scroll-container {
            height: auto !important;
          }
          .horizontal-scroll-container > div {
            position: relative !important;
            height: auto !important;
          }
          .horizontal-scroll-track {
            overflow-x: auto !important;
            width: 100% !important;
            transform: none !important;
            padding: 2rem 1.5rem !important;
            scrollbar-width: thin;
          }
        }
      `}</style>
    </div>
  );
}
