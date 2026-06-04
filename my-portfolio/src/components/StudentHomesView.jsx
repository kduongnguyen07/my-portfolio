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
  const stickyRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const tasks = [
    { 
      id: 'task1', 
      number: 'Bài 1',
      name: 'Máy tính & Thiết bị ngoại vi', 
      desc: 'Giả lập Terminal & Cây thư mục workspace.', 
      component: TerminalVisualizer,
      color: 'var(--color-blue)',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600'
    },
    { 
      id: 'task2', 
      number: 'Bài 2',
      name: 'Google Search nâng cao', 
      desc: 'Bộ lọc toán tử tìm kiếm thông tin tối ưu.', 
      component: SearchSimulator,
      color: 'var(--color-yellow)',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600'
    },
    { 
      id: 'task3', 
      number: 'Bài 3',
      name: 'Prompt & Chuỗi suy nghĩ', 
      desc: 'So sánh LLM và giả lập Chain-of-Thought.', 
      component: PromptPlayground,
      color: 'var(--color-orange)',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600'
    },
    { 
      id: 'task4', 
      number: 'Bài 4',
      name: 'Sơ đồ Kanban & Phối hợp', 
      desc: 'Tự động hoá luồng Git Flow & Quản trị nhóm.', 
      component: KanbanBoard,
      color: 'var(--color-green)',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=600'
    },
    { 
      id: 'task5', 
      number: 'Bài 5',
      name: 'Đồng sáng tạo nội dung', 
      desc: 'Human-in-the-loop thiết kế ảnh & văn bản.', 
      component: ContentCreation,
      color: '#a855f7',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600'
    },
    { 
      id: 'task6', 
      number: 'Bài 6',
      name: 'Đạo đức AI có trách nhiệm', 
      desc: '6 nguyên tắc cốt lõi về liêm chính học thuật.', 
      component: EthicsAI,
      color: '#ec4899',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600'
    }
  ];

  useEffect(() => {
    // Find the actual scrolling parent: .content-area
    const scrollParent = containerRef.current?.closest('.content-area') || window;

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current || !stickyRef.current) return;

      // On mobile, disable horizontal-scroll-jack
      if (window.innerWidth <= 768) {
        setTranslateX(0);
        return;
      }

      // Get container position relative to the scroll parent
      const scrollTop = scrollParent === window
        ? window.scrollY
        : scrollParent.scrollTop;

      const containerTop = containerRef.current.offsetTop;
      const viewportHeight = scrollParent === window
        ? window.innerHeight
        : scrollParent.clientHeight;

      // How far we've scrolled INTO the container (after its top edge enters viewport)
      const scrolledInto = scrollTop - containerTop;

      // Total scrollable range = container height - 1 viewport
      const trackScrollWidth = trackRef.current.scrollWidth;
      const viewWidth = stickyRef.current.clientWidth;
      const maxTranslateX = Math.max(0, trackScrollWidth - viewWidth);

      // Container height is set to: maxTranslateX + viewportHeight
      // So totalScrollable matches the horizontal distance
      const totalScrollable = maxTranslateX;

      if (totalScrollable <= 0) return;

      const raw = Math.max(0, Math.min(1, scrolledInto / totalScrollable));
      setScrollProgress(raw);
      setTranslateX(raw * maxTranslateX);
    };

    scrollParent.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollParent.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveTask(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const ActiveComponent = tasks.find(t => t.id === activeTask)?.component;

  // Slight parallax offset per card based on scroll progress
  const getParallaxShift = (index) => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return 0;
    const cardProgress = (scrollProgress * 7) - (index + 1);
    return Math.max(-20, Math.min(20, cardProgress * 10));
  };

  // Dynamic container height: enough vertical scroll to drive the full horizontal track
  // We'll compute it based on track width, but use a fallback in CSS via state
  const CARD_WIDTH = 380;
  const CARD_GAP = 40;
  const INTRO_WIDTH = 500;
  const PADDING = 128; // left + right 4rem each = 64*2
  const trackTotal = INTRO_WIDTH + CARD_GAP + tasks.length * (CARD_WIDTH + CARD_GAP) + PADDING;
  // Viewport width minus sidebar (280px)
  const viewW = typeof window !== 'undefined' ? Math.max(800, window.innerWidth - 280) : 900;
  const maxScroll = Math.max(0, trackTotal - viewW);
  const containerHeight = `calc(100vh + ${maxScroll}px)`;

  return (
    <div className="main-content">
      
      {/* Scroll-hijack outer container — tall enough to drive horizontal track */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: containerHeight,
          background: 'var(--bg-site)'
        }}
      >
        {/* Sticky viewport lock */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: 'var(--bg-site)'
          }}
        >
          {/* Section label — upper left corner */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            left: '4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 10
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              kduongnguyen07 // 02 — Báo Cáo Thực Hành
            </span>
          </div>

          {/* Progress bar at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#e0e0e0',
            zIndex: 10
          }}>
            <div style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'var(--color-blue)',
              transition: 'width 0.05s linear'
            }} />
          </div>

          {/* Card count indicator */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            zIndex: 10
          }}>
            {Math.min(tasks.length, Math.ceil(scrollProgress * (tasks.length + 1)))} / {tasks.length}
          </div>

          {/* Horizontal sliding track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              padding: '0 4rem',
              transform: `translateX(-${translateX}px)`,
              transition: 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              width: 'max-content',
              willChange: 'transform',
              alignItems: 'center'
            }}
          >
            {/* Intro slide */}
            <div
              style={{
                width: `${INTRO_WIDTH - CARD_GAP}px`,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: '3rem',
                borderRight: '2px dashed rgba(0,0,0,0.15)'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: 'var(--color-blue)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                6 nhiệm vụ thực hành
              </span>
              <h1 style={{
                fontSize: '4.5rem',
                fontWeight: 900,
                letterSpacing: '-3px',
                marginTop: '0.5rem',
                lineHeight: 0.95
              }}>
                Báo Cáo<br/>Thực Hành
              </h1>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '1rem',
                marginTop: '1.25rem',
                lineHeight: 1.6,
                maxWidth: '340px'
              }}>
                Tuyển tập 6 nhiệm vụ mô phỏng kỹ năng số & năng lực AI. Cuộn chuột để lướt qua từng bài.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '2rem',
                fontWeight: 800,
                color: 'var(--color-blue)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <span>Cuộn xuống để khám phá</span>
                <ArrowRight size={18} className="pulse-arrow" />
              </div>
            </div>

            {/* Task cards */}
            {tasks.map((task, index) => {
              const textShift = getParallaxShift(index);

              return (
                <div
                  key={task.id}
                  onClick={() => setActiveTask(task.id)}
                  className="neo-card task-card"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: '520px',
                    flexShrink: 0,
                    padding: 0,
                    overflow: 'hidden',
                    background: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image with parallax */}
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
                        transform: `scale(1.12) translateX(${textShift * -0.8}px)`,
                        transition: 'transform 0.06s linear'
                      }}
                    />
                    {/* Number badge */}
                    <span style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      background: task.color,
                      color: task.id === 'task2' ? 'var(--text-main)' : '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      border: '1.5px solid rgba(0,0,0,0.15)'
                    }}>
                      {task.number}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{
                    padding: '1.5rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      lineHeight: 1.2,
                      letterSpacing: '-0.5px',
                      transform: `translateX(${textShift * 0.3}px)`,
                      transition: 'transform 0.06s linear'
                    }}>
                      {task.name}
                    </h3>

                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5
                    }}>
                      {task.desc}
                    </p>

                    <div style={{
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: task.color
                      }}>
                        Chạy mô phỏng ➔
                      </span>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        background: task.color,
                        color: task.id === 'task2' ? 'var(--text-main)' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid var(--text-main)'
                      }}>
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

      {/* Task Modal */}
      {activeTask && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem'
          }}
          onClick={() => setActiveTask(null)}
        >
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
              boxShadow: '10px 10px 0px var(--text-main)',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 2rem',
              borderBottom: '2.5px solid var(--text-main)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: tasks.find(t => t.id === activeTask)?.color,
              color: activeTask === 'task2' ? 'var(--text-main)' : '#ffffff'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', opacity: 0.85 }}>
                  {tasks.find(t => t.id === activeTask)?.number} // Trình giả lập
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
                  {tasks.find(t => t.id === activeTask)?.name}
                </h3>
              </div>
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

            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {ActiveComponent && <ActiveComponent />}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '0.75rem 2rem',
              background: '#f9f9f9',
              borderTop: '1.5px solid var(--text-main)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}>
              Ấn [ESC] hoặc nhấp ra ngoài để đóng trình giả lập.
            </div>
          </div>
        </div>
      )}

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

        .task-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .task-card:hover {
          transform: translate(-4px, -4px) !important;
          box-shadow: 8px 8px 0px var(--text-main) !important;
        }

        @media (max-width: 768px) {
          .horizontal-scroll-container {
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
