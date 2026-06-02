import React, { useState } from 'react';
import { Calendar, Award, Compass, Milestone, CheckCircle } from 'lucide-react';

export default function Roadmap() {
  const [activePlan, setActivePlan] = useState('short');

  const skillsData = [
    { name: 'Quản lý cấu trúc tệp (File System)', before: 40, after: 90 },
    { name: 'Kỹ nghệ câu lệnh (Prompt Engineering)', before: 30, after: 95 },
    { name: 'Cộng tác & Quy trình (Git Flow / Kanban)', before: 20, after: 85 },
    { name: 'Đồng sáng tạo nội dung AI (Generative AI)', before: 50, after: 90 },
    { name: 'Ý thức Đạo đức công nghệ (AI Ethics)', before: 60, after: 95 }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Document Content */}
      <div className="doc-header">
        <h2 className="doc-title">Tổng kết: Bài thu hoạch và Lộ trình phát triển năng lực số tương lai</h2>
        <p className="doc-text">
          Trải qua chuỗi nhiệm vụ học tập toàn diện của môn học Công nghệ số và Ứng dụng AI, tôi đã tích lũy được những kiến thức nền tảng vững chắc và có sự chuyển biến mạnh mẽ về cả tư duy công nghệ lẫn kỹ năng thực chiến kỹ thuật phần mềm.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem'
      }} className="bento-grid">
        
        {/* Growth assessment */}
        <div className="doc-section">
          <h3 className="doc-subtitle">Đánh giá sự trưởng thành của bản thân</h3>
          <ul className="doc-list">
            <li><strong>Từ mơ hồ đến làm chủ hệ thống</strong>: Từ việc tổ chức tệp tin theo thói quen tự phát, tôi đã chuẩn hóa được tư duy quản lý thư mục khoa học phục vụ Data Preprocessing trong AI và tiếp cận các công cụ quản trị dự án Kanban chuẩn công nghiệp phần mềm.</li>
            <li><strong>Nâng cấp tư duy tương tác máy tính</strong>: Chuyển đổi hoàn toàn cách nhìn nhận về Generative AI từ một công cụ "hỏi - đáp" thông thường thành một cộng sự đắc lực. Việc làm chủ Prompt Engineering giúp tối ưu hóa hiệu suất nghiên cứu thuật toán lên gấp nhiều lần.</li>
          </ul>
        </div>

        {/* Challenges & Lessons */}
        <div className="doc-section">
          <h3 className="doc-subtitle">Thách thức & Bài học kinh nghiệm</h3>
          <ul className="doc-list">
            <li><strong>Thách thức lớn nhất</strong>: Việc duy trì sự cân bằng giữa tính thẩm mỹ của giao diện (Bento Grid layout) và tính nghiêm túc, chặt chẽ của nội dung học thuật theo Rubric là một bài toán tối ưu đa mục tiêu không hề đơn giản.</li>
            <li><strong>Bài học rút ra</strong>: Luôn bắt đầu từ tư duy cấu trúc dữ liệu trước khi can thiệp vào tầng hiển thị (UI/UX). Code sạch, tài liệu tường minh là chìa khóa quyết định sự thành công của bất kỳ hệ thống phần mềm nào.</li>
          </ul>
        </div>

      </div>

      {/* Interactive Visualizer */}
      <div className="visualizer-container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Đánh Giá Chỉ Số Kỹ Năng & Kế Hoạch Hành Động</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          alignItems: 'stretch'
        }} className="bento-grid">
          
          {/* Left Side: Skills visualizer comparison */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="sub-section-title">
              <Award size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Chỉ Số Trưởng Thành Kỹ Năng</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Biểu đồ so sánh năng lực số của bản thân trước (Thanh hồng) và sau (Thanh tím) khi hoàn thành dự án học tập.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
              {skillsData.map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {/* Before */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        <div style={{ height: '100%', background: '#f472b6', width: `${skill.before}%` }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', width: '30px' }}>{skill.before}%</span>
                    </div>

                    {/* After */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        <div style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                          width: `${skill.after}%`
                        }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 'bold', fontFamily: 'monospace', width: '30px' }}>{skill.after}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Timeline Action Plan */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 className="sub-section-title" style={{ margin: 0 }}>
                <Compass size={18} style={{ color: 'var(--accent-primary)' }} />
                <span>Kế Hoạch Hành Động (Action Plan)</span>
              </h3>

              <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '2px', borderRadius: '6px' }}>
                <button
                  onClick={() => setActivePlan('short')}
                  style={{
                    background: activePlan === 'short' ? 'var(--accent-primary)' : 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    color: activePlan === 'short' ? 'white' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Ngắn hạn
                </button>
                <button
                  onClick={() => setActivePlan('long')}
                  style={{
                    background: activePlan === 'long' ? 'var(--accent-primary)' : 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    color: activePlan === 'long' ? 'white' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Dài hạn
                </button>
              </div>
            </div>

            {/* Timeline content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
              {activePlan === 'short' ? (
                <>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      background: '#e0e7ff',
                      color: 'var(--accent-primary)',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.2rem',
                      border: '1px solid #c7d2fe'
                    }}>
                      <Milestone size={16} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>Chuẩn hóa quản trị Git học thuật</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        Áp dụng sơ đồ thư mục khoa học và Git Flow trực tiếp vào các môn học lập trình nặng trong học kỳ tới (Cấu trúc dữ liệu, Thuật toán, Toán học tính toán).
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      background: '#e0e7ff',
                      color: 'var(--accent-primary)',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.2rem',
                      border: '1px solid #c7d2fe'
                    }}>
                      <Milestone size={16} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>Xây dựng Thư viện Prompt Cá nhân</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        Thiết lập ngân hàng Prompts chuyên dụng có cấu trúc để phục vụ tự động hóa debug code, tóm tắt paper nghiên cứu và soạn thảo báo cáo học thuật.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      background: '#fce7f3',
                      color: '#db2777',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.2rem',
                      border: '1px solid #fbcfe8'
                    }}>
                      <Milestone size={16} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>Xây dựng Blog Nghiên cứu AI</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        Nâng cấp chính portfolio này thành cổng thông tin, liên tục chia sẻ các nghiên cứu chuyên sâu về Học máy, Học sâu và xử lý ngôn ngữ tự nhiên.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      background: '#fce7f3',
                      color: '#db2777',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.2rem',
                      border: '1px solid #fbcfe8'
                    }}>
                      <Milestone size={16} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>Đóng góp Cộng đồng Thuật toán</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        Chia sẻ mã nguồn tối ưu hóa, lời giải thuật toán chuẩn trên VNOI và Codeforces. Tham gia xây dựng các tập dữ liệu mở Creative Commons.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.65rem 1rem',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Calendar size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Kế hoạch cập nhật tiếp theo: Tháng 09/2026 khi bắt đầu năm học mới.</span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
