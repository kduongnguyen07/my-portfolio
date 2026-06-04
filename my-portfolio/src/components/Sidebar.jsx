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
        <div className="logo-container" onClick={() => setActiveTab('home')} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.15rem' }}>
          <span className="logo-text" style={{ fontSize: '1.75rem', letterSpacing: '-1.5px', textTransform: 'lowercase' }}>kduongnguyen07</span>
          <div className="logo-house-dot" style={{ width: '8px', height: '8px', marginBottom: '3px' }} />
        </div>
        <span className="logo-subtitle">peace and love</span>
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
            <a href="https://fb.com/kduongnguyen07" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/lov_necrosid3/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="mailto:kduongnguyen07@gmail.com" className="social-icon" aria-label="Email">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
