import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'community', label: 'Thông Tin Học Viên', className: 'tab-orange' },
    { id: 'rooms', label: 'Báo Cáo Thực Hành', className: 'tab-blue' },
    { id: 'living', label: 'Thu Hoạch & Lộ Trình', className: 'tab-yellow' },
    { id: 'contact', label: 'Liên Hệ Hợp Tác', className: 'tab-green' }
  ];

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-container" onClick={() => setActiveTab('home')}>
          <span className="logo-text">un</span>
          {/* Stem of the 'i' */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '10px' }}>
            <div className="logo-house-dot" />
            <div style={{ width: '8px', height: '22px', background: '#111111' }} />
          </div>
          <span className="logo-text">ts.</span>
        </div>
        <span className="logo-subtitle">Unique Student Homes</span>
      </div>

      {/* Stacked Tabs */}
      <nav className="sidebar-menu">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`sidebar-tab ${tab.className} ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </div>
        ))}
      </nav>

      {/* Booking button block (visible on desktop) */}
      <div className="sidebar-booking-section">
        <button 
          className="btn-book-unit"
          onClick={() => setActiveTab('contact')}
        >
          Liên hệ hợp tác
        </button>

        <div className="sidebar-footer">
          <a href="#lang" className="lang-switch" onClick={(e) => { e.preventDefault(); alert("Đã chuyển đổi ngôn ngữ! (Tiếng Việt)"); }}>
            Tiếng Việt
          </a>
          
          <div className="social-links">
            <a href="#fb" className="social-icon" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#ig" className="social-icon" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#ln" className="social-icon" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
