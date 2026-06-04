import React, { useState } from 'react';
import TerminalVisualizer from './TerminalVisualizer';
import SearchSimulator from './SearchSimulator';
import PromptPlayground from './PromptPlayground';
import KanbanBoard from './KanbanBoard';
import ContentCreation from './ContentCreation';

export default function StudentHomesView() {
  const tasks = [
    { 
      id: 'task1', 
      name: 'Nhiệm vụ 1: Thư mục', 
      desc: 'Giả lập Terminal & Cây thư mục workspace.', 
      component: TerminalVisualizer,
      difficulty: '3-Gold',
      color: 'var(--color-blue)'
    },
    { 
      id: 'task2', 
      name: 'Nhiệm vụ 2: Tìm kiếm', 
      desc: 'Bộ lọc toán tử Google Search nâng cao.', 
      component: SearchSimulator,
      difficulty: '4-Epic',
      color: 'var(--color-yellow)'
    },
    { 
      id: 'task3', 
      name: 'Nhiệm vụ 3: Prompt', 
      desc: 'So sánh luồng suy nghĩ Chain-of-Thought.', 
      component: PromptPlayground,
      difficulty: '4-Epic',
      color: 'var(--color-orange)'
    },
    { 
      id: 'task4', 
      name: 'Nhiệm vụ 4: Kanban', 
      desc: 'Quản trị dự án và Git Flow cộng tác.', 
      component: KanbanBoard,
      difficulty: '5-Legendary',
      color: 'var(--color-green)'
    },
    { 
      id: 'task5', 
      name: 'Nhiệm vụ 5: Sáng tạo', 
      desc: 'Quy trình sáng tạo kết hợp Generative AI.', 
      component: ContentCreation,
      difficulty: '5-Legendary',
      color: '#a855f7' // Purple epic tier color
    }
  ];

  const [selectedTaskId, setSelectedTaskId] = useState('task1');

  const ActiveComponent = tasks.find(t => t.id === selectedTaskId)?.component;

  return (
    <div className="main-content">
      {/* 1. Page Header */}
      <section style={{ padding: '3.5rem 3rem 1.5rem 3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1 }}>
          Báo Cáo Thực Hành
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '800px' }}>
          Tuyển tập 5 nhiệm vụ thực hành mô phỏng kỹ năng số và năng lực kỹ thuật AI, được lập trình tương tác hoàn chỉnh trên nền tảng React.
        </p>
      </section>

      {/* 2. Main split view */}
      <section style={{ padding: '0 3rem 3rem 3rem' }} className="grid-container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '2rem',
            alignItems: 'stretch'
          }} 
          className="bento-grid"
        >
          
          {/* Task Selector Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
              Danh sách nhiệm vụ:
            </div>
            
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                style={{
                  background: selectedTaskId === task.id ? task.color : 'var(--bg-card)',
                  color: selectedTaskId === task.id 
                    ? (selectedTaskId === 'task2' ? 'var(--text-main)' : '#ffffff') 
                    : 'var(--text-main)',
                  border: '2.5px solid var(--text-main)',
                  borderRadius: '6px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  boxShadow: selectedTaskId === task.id ? '2px 2px 0px var(--text-main)' : 'var(--shadow-offset)',
                  transform: selectedTaskId === task.id ? 'translate(2px, 2px)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>{task.name}</span>
                  <span 
                    style={{ 
                      fontSize: '0.68rem', 
                      fontWeight: 800, 
                      background: selectedTaskId === task.id ? 'rgba(0,0,0,0.15)' : '#f0f0f0',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {task.difficulty}
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.85, lineHeight: 1.3 }}>
                  {task.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Visualizer Container Card */}
          <div 
            className="neo-card" 
            style={{ 
              background: '#ffffff', 
              padding: '2rem', 
              minHeight: '520px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {ActiveComponent && <ActiveComponent />}
          </div>

        </div>
      </section>
    </div>
  );
}
