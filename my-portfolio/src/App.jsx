import React, { useState } from 'react';
import { Sparkles, Terminal, Search, MessageSquare, KanbanSquare, ShieldAlert, Award, Compass, Layers, Menu, X } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import TerminalVisualizer from './components/TerminalVisualizer';
import SearchSimulator from './components/SearchSimulator';
import PromptPlayground from './components/PromptPlayground';
import KanbanBoard from './components/KanbanBoard';
import ContentCreation from './components/ContentCreation';
import EthicsAI from './components/EthicsAI';
import Roadmap from './components/Roadmap';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Trang chủ', icon: Layers },
    { id: 'task1', label: 'Bài 1: Thư mục', icon: Terminal },
    { id: 'task2', label: 'Bài 2: Tìm kiếm', icon: Search },
    { id: 'task3', label: 'Bài 3: Prompt', icon: MessageSquare },
    { id: 'task4', label: 'Bài 4: Kanban', icon: KanbanSquare },
    { id: 'task5', label: 'Bài 5: Sáng tạo', icon: Sparkles },
    { id: 'task6', label: 'Bài 6: Đạo đức', icon: ShieldAlert },
    { id: 'roadmap', label: 'Bài 8: Tổng kết', icon: Compass }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <HeroSection setActiveTab={setActiveTab} />;
      case 'task1':
        return <TerminalVisualizer />;
      case 'task2':
        return <SearchSimulator />;
      case 'task3':
        return <PromptPlayground />;
      case 'task4':
        return <KanbanBoard />;
      case 'task5':
        return <ContentCreation />;
      case 'task6':
        return <EthicsAI />;
      case 'roadmap':
        return <Roadmap />;
      default:
        return <HeroSection setActiveTab={setActiveTab} />;
    }
  };

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false); // Close on mobile navigation
  };

  return (
    <div className="app-layout">
      {/* 1. Canvas Sakura Glowing Blobs Background */}
      <ParticleBackground />

      {/* 2. Collapsible Sidebar (Width transitions controlled via CSS :hover) */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="nav-logo" onClick={() => selectTab('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <Sparkles size={20} fill="var(--accent-primary)" style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <span className="sidebar-logo-text text-gradient" style={{ fontSize: '1.25rem', fontWeight: 800 }}>Khánh.dev</span>
          </div>
        </div>

        <div className="sidebar-menu">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => selectTab(item.id)}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span className="sidebar-text">{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <div style={{ fontWeight: 600 }}>Dương Nguyên Khánh</div>
            <div style={{ marginTop: '0.2rem', opacity: 0.7 }}>MSSV: 25020210</div>
          </div>
        </div>
      </aside>

      {/* 3. Mobile Header (Only visible on screens <= 768px) */}
      <div style={{
        display: 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 80,
        width: '100%'
      }} className="mobile-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setActiveTab('home')}>
          <Sparkles size={20} fill="var(--accent-primary)" style={{ color: 'var(--accent-primary)' }} />
          <span className="text-gradient" style={{ fontWeight: 800 }}>Khánh.dev</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Inject custom mobile CSS rule dynamically */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-header-bar {
            display: flex !important;
          }
          .sidebar {
            position: fixed;
            height: 100vh;
            left: -280px;
            top: 0;
            transition: left var(--transition-normal);
          }
          .sidebar.active {
            left: 0;
          }
        }
      `}</style>

      {/* 4. Scrollable Main Content Area */}
      <div className="content-area">
        <main className="main-content">
          {renderActiveComponent()}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p style={{ marginBottom: '0.5rem' }}>
            Dương Nguyên Khánh - K70 AI Engineer Orientation - VNU-UET
          </p>
          <p>
            Mã số sinh viên: 25020210. Được xây dựng độc quyền bằng React + Vite & Vanilla CSS.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
