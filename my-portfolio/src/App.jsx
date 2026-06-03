import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Search, MessageSquare, KanbanSquare, ShieldAlert, Award, Compass, Layers, Menu, X, Home } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import TerminalVisualizer from './components/TerminalVisualizer';
import SearchSimulator from './components/SearchSimulator';
import PromptPlayground from './components/PromptPlayground';
import KanbanBoard from './components/KanbanBoard';
import ContentCreation from './components/ContentCreation';
import EthicsAI from './components/EthicsAI';
import Roadmap from './components/Roadmap';
import TransitionScreen from './components/TransitionScreen';
import IntroScreen from './components/IntroScreen';

const playTick = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 650;
    g.gain.setValueAtTime(0.015, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + 0.05);
  } catch(_) {}
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  // Transition state
  const [transitionTrigger, setTransitionTrigger] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);


  const navigationItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home },
    { id: 'profile', label: '01. Thông Tin Học Viên', icon: Award },
    { id: 'warp', label: '02. Báo Cáo Thực Hành', icon: Terminal },
    { id: 'task1', label: 'Nhiệm vụ 1: Thư mục', icon: Terminal },
    { id: 'task2', label: 'Nhiệm vụ 2: Tìm kiếm', icon: Search },
    { id: 'task3', label: 'Nhiệm vụ 3: Prompt', icon: MessageSquare },
    { id: 'task4', label: 'Nhiệm vụ 4: Kanban', icon: KanbanSquare },
    { id: 'task5', label: 'Nhiệm vụ 5: Sáng tạo', icon: Sparkles },
    { id: 'task6', label: 'Nhiệm vụ 6: Đạo đức', icon: ShieldAlert },
    { id: 'roadmap', label: 'Nhiệm vụ 8: Tổng kết', icon: Compass }
  ];

  const landingMenuItems = [
    { id: 'profile', label: '01. Thông Tin Học Viên', icon: Award },
    { id: 'warp', label: '02. Báo Cáo Thực Hành', icon: Terminal },
    { id: 'roadmap', label: '03. Thu Hoạch & Lộ Trình', icon: Compass }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return null; // Landing Page - loops video background with menu overlay
      case 'profile':
        return <HeroSection activeView="profile" setActiveTab={selectTab} />;
      case 'warp':
        return <HeroSection activeView="warp" setActiveTab={selectTab} />;
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
        return null;
    }
  };

  const selectTab = (tabId) => {
    setIsMobileMenuOpen(false);
    if (tabId === activeTab) return;
    setPendingTab(tabId);
    setTransitionTrigger(true);
  };

  const [focusedIndex, setFocusedIndex] = useState(0);
  
  // Sync keyboard menu highlight with tab adjustments
  useEffect(() => {
    if (activeTab !== 'home') {
      let targetTab = activeTab;
      if (activeTab.startsWith('task')) {
        targetTab = 'warp';
      }
      const idx = landingMenuItems.findIndex(item => item.id === targetTab);
      if (idx !== -1) {
        setFocusedIndex(idx);
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (showIntro) return;

    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        if (e.key === 'Escape') {
          activeEl.blur();
          if (activeTab !== 'home') {
            playTick();
            selectTab('home');
          }
        }
        return;
      }

      if (activeTab === 'home') {
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
          e.preventDefault();
          playTick();
          setFocusedIndex(prev => (prev + 1) % landingMenuItems.length);
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          playTick();
          setFocusedIndex(prev => (prev - 1 + landingMenuItems.length) % landingMenuItems.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          playTick();
          selectTab(landingMenuItems[focusedIndex].id);
        }
      } else {
        if (e.key === 'Escape') {
          e.preventDefault();
          playTick();
          selectTab('home');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, focusedIndex, activeTab]);

  return (
    <div className="app-layout">
      {/* Cinematic Video Intro Screen on mount */}
      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* 3D Portal Transition Screen */}
      <TransitionScreen 
        isTriggered={transitionTrigger} 
        onMidway={() => {
          setActiveTab(pendingTab);
          setTransitionTrigger(false);
        }} 
      />

      {/* 1. Fullscreen Video Background */}
      <ParticleBackground isHome={activeTab === 'home'} />

      {/* 2. Cyber Navigation Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="nav-logo" onClick={() => selectTab('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <Award size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <span className="sidebar-logo-text text-gradient" style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>HSR.CLIENT</span>
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
          <div className="sidebar-footer-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Dương Nguyên Khánh</div>
            <div style={{ opacity: 0.7, fontSize: '0.7rem' }}>MSSV: 25020210</div>
          </div>
        </div>
      </aside>

      {/* 3. Mobile Header (Only visible on screens <= 768px) */}
      <div style={{
        display: 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        background: 'rgba(5, 2, 20, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(0, 240, 255, 0.45)',
        position: 'sticky',
        top: 0,
        zIndex: 80,
        width: '100%'
      }} className="mobile-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => selectTab('home')}>
          <Award size={20} style={{ color: 'var(--accent-gold)' }} />
          <span className="text-gradient" style={{ fontWeight: 800, fontFamily: 'var(--font-mono)' }}>HSR.CLIENT</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer' }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Inject custom mobile and desktop CSS rules dynamically */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-header-bar {
            display: flex !important;
          }
          .sidebar {
            position: fixed;
            height: 100vh;
            left: -260px;
            top: 0;
            transition: left var(--transition-normal);
            border-right: 2px solid var(--accent-gold);
            background: rgba(10, 4, 28, 0.98);
          }
          .sidebar.active {
            left: 0;
          }
        }
        @media (min-width: 769px) {
          .sidebar {
            display: none !important;
          }
        }
      `}</style>

      {/* 2. Floating Curved Keyboard Navigation Menu */}
      {!showIntro && activeTab === 'home' && (
        <nav className="hsr-curved-menu">
          {landingMenuItems.map((item, idx) => {
            const isFocused = focusedIndex === idx;
            return (
              <div
                key={item.id}
                className={`hsr-menu-item offset-${idx} ${isFocused ? 'focused' : ''}`}
                onClick={() => {
                  playTick();
                  setFocusedIndex(idx);
                  selectTab(item.id);
                }}
                onMouseEnter={() => {
                  setFocusedIndex(idx);
                }}
              >
                <span className="hsr-menu-item-text">{item.label}</span>
              </div>
            );
          })}
        </nav>
      )}

      {/* 3. Keyboard Guide HUD */}
      {!showIntro && (
        <div className="kbd-guide-hud">
          <div className="kbd-item">
            <span className="kbd-key">W</span>
            <span className="kbd-key">S</span>
            <span>CHỌN MỤC</span>
          </div>
          <div className="kbd-item">
            <span className="kbd-key">ENTER</span>
            <span>MỞ TRANG</span>
          </div>
          <div className="kbd-item">
            <span className="kbd-key">ESC</span>
            <span>QUAY LẠI</span>
          </div>
        </div>
      )}

      {/* 4. Scrollable Main Content Area */}
      <div className="content-area">
        <main className="main-content">
          {activeTab !== 'home' && (
            <div style={{ 
              marginBottom: '2rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              borderBottom: '1px solid rgba(0, 240, 255, 0.25)', 
              paddingBottom: '0.85rem' 
            }}>
              <button 
                className="hud-btn" 
                onClick={() => selectTab('home')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                ← Quay lại Trang chủ [ESC]
              </button>
              
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--accent-gold)', 
                fontSize: '1.05rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                textShadow: '0 0 8px var(--accent-gold-glow)'
              }}>
                {navigationItems.find(item => item.id === activeTab)?.label}
              </div>
            </div>
          )}
          
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;
