import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    roomType: 'studio-standard',
    startDate: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="main-content">
      <section style={{ padding: '3rem 3rem 1.5rem 3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-2px' }}>Đề Xuất Hợp Tác</h1>
      </section>

      <section style={{ padding: '0 3rem 3rem 3rem' }} className="grid-container">
        <div className="neo-grid-2">
          
          {/* Booking Form Card */}
          <div className="neo-card">
            <h2 className="card-title" style={{ fontSize: '1.6rem' }}>Thông tin đăng ký đề xuất</h2>
            
            {submitted ? (
              <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--color-green)', color: '#ffffff', borderRadius: '50%', padding: '0.75rem', display: 'inline-flex' }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Gửi Đề Xuất Thành Công!</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.4', maxWidth: '320px' }}>
                  Cảm ơn bạn, <strong>{formData.name}</strong>. Tôi sẽ xem xét thông tin đề xuất và phản hồi lại bạn qua địa chỉ email <strong>{formData.email}</strong> sớm nhất có thể.
                </p>
                <button 
                  className="flat-btn" 
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '1rem' }}
                >
                  Gửi đề xuất khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Họ và tên *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      style={{ border: '2.5px solid var(--text-main)', borderRadius: '4px', padding: '0.65rem 0.85rem', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Địa chỉ email *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={{ border: '2.5px solid var(--text-main)', borderRadius: '4px', padding: '0.65rem 0.85rem', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Trường học / Đơn vị</label>
                    <input 
                      type="text" 
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      style={{ border: '2.5px solid var(--text-main)', borderRadius: '4px', padding: '0.65rem 0.85rem', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Ngày bắt đầu hợp tác dự kiến *</label>
                    <input 
                      type="date" 
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleChange}
                      style={{ border: '2.5px solid var(--text-main)', borderRadius: '4px', padding: '0.65rem 0.85rem', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Hình thức hợp tác mong muốn *</label>
                  <select 
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    style={{ border: '2.5px solid var(--text-main)', borderRadius: '4px', padding: '0.65rem 0.85rem', fontSize: '0.95rem', outline: 'none', background: '#ffffff', cursor: 'pointer' }}
                  >
                    <option value="research">Nghiên cứu dự án AI (AI Project Research)</option>
                    <option value="development">Phát triển Web/App (Web & Mobile Development)</option>
                    <option value="academic">Trao đổi học thuật (Academic Exchange)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Nội dung đề xuất / Yêu cầu chi tiết</label>
                  <textarea 
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ví dụ: Mô tả dự án, yêu cầu kỹ năng, công nghệ đề xuất..."
                    style={{ border: '2.5px solid var(--text-main)', borderRadius: '4px', padding: '0.65rem 0.85rem', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-sans)', resize: 'vertical' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="flat-btn btn-dark"
                  style={{ alignSelf: 'flex-start', marginTop: '0.5rem', padding: '0.8rem 1.6rem' }}
                >
                  <span>Gửi Yêu Cầu Hợp Tác</span>
                  <Send size={14} />
                </button>

              </form>
            )}
          </div>

          {/* Contact Details & FAQs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Info contacts */}
            <div className="neo-card" style={{ background: 'var(--color-yellow)' }}>
              <h2 className="card-title" style={{ fontSize: '1.6rem' }}>UET Student HQ</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin size={20} />
                  <span>144 Xuân Thủy, Cầu Giấy, Hà Nội, Việt Nam</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={20} />
                  <span>+84 24 3754 7461</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={20} />
                  <span>khanh.duong@uet.vnu.edu.vn</span>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="neo-card">
              <h3 className="card-title" style={{ fontSize: '1.4rem' }}>Câu Hỏi Thường Gặp</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Dự án có mã nguồn mở không?</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: '1.3' }}>
                    Có, toàn bộ mã nguồn của 6 nhiệm vụ thực hành và giao diện website này đều được công khai 100% trên GitHub.
                  </p>
                </div>
                
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Làm thế nào để liên hệ trực tiếp?</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: '1.3' }}>
                    Bạn có thể điền thông tin vào mẫu đăng ký đề xuất bên cạnh hoặc gửi thư điện tử trực tiếp đến địa chỉ khanh.duong@uet.vnu.edu.vn.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
