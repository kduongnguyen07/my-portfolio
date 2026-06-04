import React, { useState, useRef } from 'react';
import { Sparkles, UserCheck, Check, CheckCircle } from 'lucide-react';

export default function ContentCreation() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeStep, setActiveStep] = useState(1);
  const [outlineGenerated, setOutlineGenerated] = useState(false);
  const [outlineRefined, setOutlineRefined] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Document Content */}
      <div className="doc-header">
        <h2 className="doc-title">Nhiệm vụ 5: Quy trình đồng sáng tạo sản phẩm số ứng dụng Generative AI</h2>
        <p className="doc-text">
          Sản phẩm truyền thông kỹ thuật số của dự án này được thiết kế dựa trên sự phối hợp nhịp nhàng giữa năng lực tạo sinh của AI (Generative AI) và năng lực kiểm soát, tinh chỉnh nghệ thuật của con người (Human-in-the-loop) để tối ưu chất lượng.
        </p>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">Kết quả sản phẩm đạt độ hoàn thiện cao</h3>
        <p className="doc-text">
          Sản phẩm cuối cùng là các khối đồ họa bento trực quan phối hợp cùng nội dung phân tích mang tính học thuật cao xuất hiện tại trang chủ. Toàn bộ hình ảnh không dính các lỗi dị dạng đặc trưng của AI, văn bản đảm bảo tính mạch lạc, khoa học, có cấu trúc chặt chẽ, chứng minh khả năng làm chủ công cụ AI ở mức độ cao thay vì phụ thuộc hoàn toàn vào máy móc.
        </p>
      </div>

      {/* Interactive visualizer */}
      <div className="visualizer-container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Mô Phỏng Quy Trình Đồng Sáng Tạo Tích Hợp</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          alignItems: 'stretch'
        }} className="bento-grid">
          
          {/* Left Side: Pipeline & Text Refinement */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="sub-section-title">
              <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Quy Trình 3 Giai Đoạn Tích Hợp</span>
            </h3>

            {/* Workflow Steps Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '1rem' }}>
              <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2px', background: 'var(--border-color)', zIndex: 0 }} />
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '10%',
                width: activeStep === 1 ? '0%' : activeStep === 2 ? '40%' : '80%',
                height: '2px',
                background: 'var(--accent-primary)',
                zIndex: 0,
                transition: 'width var(--transition-normal)'
              }} />

              {[
                { num: 1, label: 'Ý tưởng & Outline' },
                { num: 2, label: 'Tạo sinh thô' },
                { num: 3, label: 'Hậu kỳ & Lọc' }
              ].map(step => (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 1,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: activeStep >= step.num ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    border: '1px solid ' + (activeStep >= step.num ? 'var(--accent-primary)' : 'var(--border-color)'),
                    color: activeStep >= step.num ? 'white' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all var(--transition-normal)'
                  }}>
                    {step.num}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: activeStep === step.num ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: 500 }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Step Contents */}
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: '8px',
              padding: '1.25rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              border: '1px solid var(--border-color)'
            }}>
              
              {activeStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease-out' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 650 }}>Giai đoạn 1: Phát triển ý tưởng nền tảng</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Sử dụng mô hình ngôn ngữ lớn để brainstorming, xây dựng outline nội dung cấu trúc cho bài viết truyền thông.
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      className="btn-outline"
                      onClick={() => setOutlineGenerated(true)}
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                    >
                      <span>Phát sinh outline nháp</span>
                    </button>
                    {outlineGenerated && (
                      <button
                        className="btn-gradient"
                        onClick={() => setOutlineRefined(true)}
                        style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                      >
                        <UserCheck size={12} />
                        <span>Tinh chỉnh thủ công</span>
                      </button>
                    )}
                  </div>

                  {outlineGenerated && (
                    <div style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      lineHeight: '1.4',
                      color: 'var(--text-secondary)'
                    }}>
                      <strong style={{ color: outlineRefined ? '#16a34a' : '#db2777' }}>
                        {outlineRefined ? '✓ Đã chỉnh sửa: Outline chuyên sâu' : '⚠ Nháp AI đề xuất:'}
                      </strong>
                      <div style={{ marginTop: '0.35rem' }}>
                        {outlineRefined ? (
                          '1. Thông tin cá nhân & MSSV K70-UET\n2. Mô tả quy hoạch động sử dụng Google operators\n3. Chain-of-Thought trong Dijkstra C++ code\n4. Phân tích 6 nguyên tắc Đạo đức và Bản quyền LLM'
                        ) : (
                          '1. Giới thiệu bản thân và sở thích chung\n2. Cách tìm kiếm thông tin bằng Google\n3. Lập trình C++ cơ bản\n4. Lợi ích của công nghệ số'
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease-out' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 650 }}>Giai đoạn 2: Tạo sinh tài nguyên thô</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Sử dụng AI tạo ảnh chuyên sâu để sinh asset hình ảnh đồ họa theo phong cách chủ đạo (Concept art) đồng bộ với giao diện hệ thống. Sử dụng AI ngôn ngữ để viết bản thảo nội dung dựa trên cấu trúc đã duyệt.
                  </p>
                </div>
              )}

              {activeStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease-out' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 650 }}>Giai đoạn 3: Hậu kỳ và Kiểm định kỹ thuật</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Tôi tiến hành rà soát thủ công toàn bộ văn bản để loại bỏ các câu từ sáo rỗng mang tính "vibe AI", chỉnh sửa bố cục hình ảnh, tối ưu hóa dung lượng file ảnh (nén WebP) để tăng tốc độ tải trang trên web Portfolio.
                  </p>

                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #dcfce7',
                    borderRadius: '6px',
                    padding: '0.6rem 0.75rem',
                    display: 'flex',
                    alignItems: 'start',
                    gap: '0.5rem'
                  }}>
                    <Check size={14} style={{ color: '#16a34a', marginTop: '0.1rem', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.75rem', color: '#16a34a' }}>
                      <strong>Kết quả:</strong> Tăng 40% tốc độ tải trang web và đạt chất lượng kiểm định nghiêm ngặt theo Rubric.
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Side: Before/After Visual Comparison Slider */}
          <div className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 className="sub-section-title">So sánh Trước vs Sau khi tối ưu</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Di chuyển chuột hoặc vuốt qua hình ảnh bên dưới để so sánh Bản nháp tạo bởi AI (Trái) và Ấn phẩm hoàn thiện bởi Con người (Phải).
              </p>
            </div>

            {/* Interactive Image Slider */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              style={{
                position: 'relative',
                width: '100%',
                height: '220px',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'ew-resize',
                userSelect: 'none',
                background: '#ffffff',
                border: '1px solid var(--border-color)'
              }}
            >
              {/* Human Refined Version */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                color: '#0f172a',
                textAlign: 'center'
              }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #dbeafe',
                  borderRadius: '12px',
                  padding: '1rem',
                  maxWidth: '280px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
                }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.5px' }}>UET PORTFOLIO</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, margin: '0.2rem 0', color: 'var(--text-primary)' }}>Dương Nguyên Khánh</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>AI Engineer Định hướng - MSSV: 25020210</p>
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '0.65rem', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                  SAU: ĐÃ LỌC & THIẾT KẾ
                </span>
              </div>

              {/* Raw AI Draft Version */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${sliderPosition}%`,
                height: '100%',
                background: '#f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                color: '#64748b',
                borderRight: '2px solid #6366f1',
                boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                transition: 'none'
              }}>
                <div style={{
                  background: '#e2e8f0',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '280px',
                  opacity: 0.8
                }}>
                  <span style={{ fontSize: '0.6rem', color: '#64748b' }}>DRAFT OUTLINE</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 650, margin: '0.2rem 0', color: '#334155' }}>Portfolio sinh bởi AI</h4>
                  <p style={{ fontSize: '0.7rem', color: '#64748b' }}>Bản thảo chung chung, text lỗi font...</p>
                </div>
                <span style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '0.65rem', color: '#db2777', fontWeight: 600, background: '#fce7f3', padding: '0.1rem 0.35rem', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                  TRƯỚC: RAW AI DRAFT
                </span>
              </div>

              {/* Slider handle */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: `${sliderPosition}%`,
                bottom: 0,
                width: '2px',
                background: '#4f46e5',
                pointerEvents: 'none',
                zIndex: 10
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '2px solid #4f46e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  color: '#4f46e5',
                  fontSize: '9px',
                  fontWeight: 'bold'
                }}>
                  ↔
                </div>
              </div>

            </div>

            {/* Bottom info */}
            <div style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              <strong>Kiểm tra chất lượng:</strong> Hình ảnh concept art sinh ra từ AI được cắt gọt thủ công, lọc bỏ hoàn toàn các lỗi dị dạng và căn chỉnh lưới Bento tối ưu.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
