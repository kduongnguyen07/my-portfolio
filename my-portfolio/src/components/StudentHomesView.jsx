import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Eye } from 'lucide-react';

export default function StudentHomesView({ setActiveTab }) {
  const roomTypes = [
    {
      id: 'studio-standard',
      name: 'Standard Studio',
      price: '€620',
      period: 'month',
      img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600',
      size: '22 sqm',
      bed: 'Queen Bed',
      features: ['Fully Furnished', 'Private Kitchen', 'Private Bathroom', 'High-speed Wifi', 'AC & Heating', 'Smart TV']
    },
    {
      id: 'studio-premium',
      name: 'Premium Studio with Balcony',
      price: '€710',
      period: 'month',
      img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600',
      size: '26 sqm',
      bed: 'King Bed',
      features: ['Fully Furnished', 'Private Kitchen', 'Private Bathroom', 'High-speed Wifi', 'AC & Heating', 'Smart TV', 'Private Balcony', 'City View']
    },
    {
      id: 'twin-share',
      name: 'Twin Share Apartment',
      price: '€450',
      period: 'month',
      img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600',
      size: '35 sqm',
      bed: '2 Single Beds',
      features: ['Fully Furnished', 'Shared Kitchen', 'Private Bathroom', 'High-speed Wifi', 'AC & Heating', 'Smart TV', 'Spacious Desk']
    }
  ];

  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);

  return (
    <div className="main-content">
      {/* Hero section for Student Homes */}
      <section style={{ padding: '3rem 3rem 1.5rem 3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-2px' }}>Student accommodation at Units Parkside</h1>
      </section>

      {/* Main split grid */}
      <section style={{ padding: '0 3rem 3rem 3rem' }} className="grid-container">
        <div className="neo-grid-2">
          
          {/* Room Selector and details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Fully equipped and move-in ready, our Units provide everything you need to hit "student mode" from day one. Designed around your daily flow, Units Parkside features a 24/7 gym, a laundry room, and social spaces. Whether you're preparing for finals or catching up with friends, you'll find the perfect balance to live, study, and unwind.
            </p>

            {/* List of room tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {roomTypes.map(room => (
                <div 
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  style={{
                    background: selectedRoom.id === room.id ? 'var(--color-blue)' : 'var(--bg-card)',
                    color: selectedRoom.id === room.id ? '#ffffff' : 'var(--text-main)',
                    border: '2.5px solid var(--text-main)',
                    borderRadius: '6px',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: selectedRoom.id === room.id ? '2px 2px 0px var(--text-main)' : 'var(--shadow-offset)',
                    transform: selectedRoom.id === room.id ? 'translate(2px, 2px)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{room.name}</span>
                    <span style={{ fontSize: '0.85rem', opacity: 0.8, fontFamily: 'var(--font-mono)' }}>
                      {room.size} | {room.bed}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{room.price}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>/{room.period}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected room features */}
            <div className="neo-card" style={{ marginTop: '0.5rem' }}>
              <h3 className="card-title" style={{ fontSize: '1.5rem' }}>What's included in this Unit:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginTop: '0.5rem' }}>
                {selectedRoom.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
                    <div style={{ background: 'var(--color-green)', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} style={{ color: '#ffffff' }} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Room Image and Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="neo-card" style={{ padding: 0, overflow: 'hidden' }}>
              <img 
                src={selectedRoom.img} 
                alt={selectedRoom.name} 
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1.5rem', borderTop: '2.5px solid var(--text-main)', background: '#ffffff' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Fully Furnished, Smart Access</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  Features fully integrated private kitchen appliances, dedicated double desk study station, wardrobe space, and high-performance room ventilation.
                </p>
              </div>
            </div>

            <div 
              className="neo-card" 
              style={{ 
                background: 'var(--color-yellow)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '70%' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Ready to move in?</h4>
                <p style={{ fontSize: '0.85rem', color: '#111111', opacity: 0.85 }}>
                  Bookings for the upcoming Fall Semester are now open. Secure your room online in under 10 minutes.
                </p>
              </div>
              <button 
                className="flat-btn btn-dark"
                onClick={() => setActiveTab('contact')}
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <span>Book Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer list of specs */}
      <section style={{ background: '#ffffff', borderTop: '2.5px solid var(--text-main)', padding: '4rem 3rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '2.5rem' }}>Standard Apartment Specifications</h2>
        
        <div className="neo-grid-3">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, borderBottom: '1.5px solid var(--text-main)', paddingBottom: '0.5rem' }}>Furniture</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>• Double storage bed with orthopedic mattress</li>
              <li>• Full double study desk with drawer and task chair</li>
              <li>• Spacious built-in wardrobe with sliding doors</li>
              <li>• Dining table with two geometric chairs</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, borderBottom: '1.5px solid var(--text-main)', paddingBottom: '0.5rem' }}>Kitchen & Bath</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>• Double electric ceramic cooktop and range hood</li>
              <li>• Compact silent refrigerator & microwave oven</li>
              <li>• Rain shower glass enclosure and modern vanity</li>
              <li>• Automated smart under-floor ventilation</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, borderBottom: '1.5px solid var(--text-main)', paddingBottom: '0.5rem' }}>Connectivity</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>• Dedicated symmetric fiber WiFi (up to 200 Mbps)</li>
              <li>• Smart electronic card lock with digital key bypass</li>
              <li>• Direct wall connection Ethernet ports</li>
              <li>• Pre-installed smart TV with Netflix/Prime casting</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
