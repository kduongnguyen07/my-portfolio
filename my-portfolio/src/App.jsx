import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import StudentHomesView from './components/StudentHomesView';
import OurWayOfLivingView from './components/OurWayOfLivingView';
import CommunityView from './components/CommunityView';
import ContactView from './components/ContactView';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [pendingTab, setPendingTab] = useState(null);
  
  // Custom Staggered Grid Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'covering' | 'revealing'

  const selectTab = (tabId) => {
    if (tabId === activeTab || isTransitioning) return;
    setPendingTab(tabId);
    setIsTransitioning(true);
    setTransitionState('covering');
  };

  // Grid transition timeline control
  useEffect(() => {
    if (isTransitioning && transitionState === 'covering') {
      // At 450ms, the grid completely covers the screen. Switch active tab underneath.
      const midwayTimer = setTimeout(() => {
        setActiveTab(pendingTab);
        setTransitionState('revealing');
      }, 550);

      return () => clearTimeout(midwayTimer);
    }

    if (isTransitioning && transitionState === 'revealing') {
      // At 1000ms, the grid completes its exit animation. Reset transition state.
      const finishTimer = setTimeout(() => {
        setIsTransitioning(false);
        setTransitionState('idle');
        setPendingTab(null);
      }, 600);

      return () => clearTimeout(finishTimer);
    }
  }, [isTransitioning, transitionState, pendingTab]);

  // Determine transition grid cells color based on pending target tab
  const getTransitionColor = () => {
    switch (pendingTab) {
      case 'rooms':
        return 'var(--color-blue)';
      case 'living':
        return 'var(--color-yellow)';
      case 'community':
        return 'var(--color-orange)';
      case 'contact':
        return 'var(--color-green)';
      default:
        return 'var(--color-dark)';
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={selectTab} />;
      case 'rooms':
        return <StudentHomesView setActiveTab={selectTab} />;
      case 'living':
        return <OurWayOfLivingView setActiveTab={selectTab} />;
      case 'community':
        return <CommunityView setActiveTab={selectTab} />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setActiveTab={selectTab} />;
    }
  };

  // Generate 8x6 = 48 cells for the grid block screen sweep transition
  const gridRows = 6;
  const gridCols = 8;
  const transitionCells = [];
  
  if (isTransitioning) {
    const color = getTransitionColor();
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        // Calculate stagger delays based on diagonal coordinate distances
        const delay = (r + c) * 45; 
        const isActive = transitionState === 'covering';
        
        transitionCells.push(
          <div
            key={`${r}-${c}`}
            className={`grid-cell ${isActive ? 'active' : ''}`}
            style={{
              background: color,
              border: '0.5px solid rgba(0,0,0,0.15)',
              transitionDelay: `${delay}ms`,
              gridColumn: c + 1,
              gridRow: r + 1
            }}
          />
        );
      }
    }
  }

  return (
    <div className="app-layout">
      {/* 1. Units Logo Animation Intro Overlay */}
      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. Custom Grid Block Transition Overlay */}
      {isTransitioning && (
        <div 
          className="grid-transition-overlay"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`
          }}
        >
          {transitionCells}
        </div>
      )}

      {/* 3. Main Site Layout */}
      {!showIntro && (
        <>
          <Sidebar activeTab={activeTab} setActiveTab={selectTab} />
          
          <div className="content-area">
            {renderActiveView()}
          </div>
        </>
      )}
    </div>
  );
}
