import React, { useState } from 'react';
import { ShieldCheck, Eye, CheckSquare, BookOpen, UserX, AlertTriangle, CheckCircle } from 'lucide-react';

export default function EthicsAI() {
  const [flippedCard, setFlippedCard] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState('cc');

  const principles = [
    {
      id: 1,
      title: 'Minh bạch nguồn gốc',
      english: 'Transparency',
      icon: Eye,
      color: '#8b5cf6',
      frontDesc: 'Công khai 100% các phần nội dung có sự can thiệp hoặc hỗ trợ từ các mô hình Generative AI.',
      backDesc: 'Không mạo nhận sản phẩm AI là của bản thân. Tuyên bố rõ ràng công cụ sử dụng (Gemini, ChatGPT) và vai trò cụ thể của nó trong dự án.'
    },
    {
      id: 2,
      title: 'Xác thực dữ liệu',
      english: 'Fact-checking',
      icon: CheckSquare,
      color: '#3b82f6',
      frontDesc: 'Không thừa nhận kết quả AI là chân lý. Mọi số liệu hay thuật toán phải kiểm tra chéo với tài liệu chính thống.',
      backDesc: 'LLMs có thể sinh ảo tưởng (hallucination). Kiểm chứng thông tin qua các sách giáo trình chuyên môn hoặc các bài báo khoa học đã được phản biện.'
    },
    {
      id: 3,
      title: 'Bảo hộ quyền sở hữu',
      english: 'Intellectual Property',
      icon: BookOpen,
      color: '#10b981',
      frontDesc: 'Tuyệt đối không tải các tài liệu mật, tác phẩm chưa cấp phép lên các mô hình AI công cộng.',
      backDesc: 'Tôn trọng bản quyền dữ liệu của các học giả khác. Tránh nạp dữ liệu thô nhạy cảm vào các LLM thương mại không có điều khoản bảo mật.'
    },
    {
      id: 4,
      title: 'Triệt tiêu định kiến',
      english: 'Bias Mitigation',
      icon: UserX,
      color: '#f59e0b',
      frontDesc: 'Nhận diện và loại bỏ các định kiến về giới tính, sắc tộc, tôn giáo trong tập dữ liệu huấn luyện.',
      backDesc: 'Thiết kế các câu lệnh (prompts) trung lập. Chủ động rà soát dữ liệu đầu ra để đảm bảo tính công bằng và khách quan tối đa.'
    },
    {
      id: 5,
      title: 'Trách nhiệm giải trình',
      english: 'Accountability',
      icon: ShieldCheck,
      color: '#ef4444',
      frontDesc: 'Con người chịu trách nhiệm cuối cùng. Lỗi hệ thống do AI viết hoàn toàn thuộc về lập trình viên vận hành.',
      backDesc: 'Không đổ lỗi cho máy móc khi xảy ra sai sót. Lập trình viên phải là chốt chặn cuối cùng kiểm thử mức độ an toàn của mã nguồn.'
    },
    {
      id: 6,
      title: 'Bảo mật thông tin',
      english: 'Privacy',
      icon: AlertTriangle,
      color: '#ec4899',
      frontDesc: 'Không tải dữ liệu định danh cá nhân hoặc thông tin nhạy cảm của người khác lên đám mây AI.',
      backDesc: 'Tuân thủ các tiêu chuẩn bảo mật dữ liệu toàn cầu (GDPR). Đảm bảo mọi luồng dữ liệu học tập cá nhân được kiểm soát cục bộ hoặc nặc danh hóa.'
    }
  ];

  const handleCardClick = (id) => {
    if (flippedCard === id) {
      setFlippedCard(null);
    } else {
      setFlippedCard(id);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Document Content */}
      <div className="doc-header">
        <h2 className="doc-title">Nhiệm vụ 6: Tuyên ngôn Đạo đức và Nguyên tắc Sử dụng AI có Trách nhiệm</h2>
        <p className="doc-text">
          Là một sinh viên công nghệ định hướng trở thành AI Engineer, tôi nhận thức sâu sắc rằng công nghệ luôn đi đôi với trách nhiệm đạo đức. Bộ nguyên tắc cá nhân gồm 6 điều cốt lõi được áp dụng xuyên suốt quá trình học tập và xây dựng dự án này.
        </p>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">Bộ nguyên tắc đạo đức cá nhân (6 Điều cốt lõi)</h3>
        <p className="doc-text">
          Click vào các thẻ bài dưới đây để lật mặt sau và xem diễn giải và biện pháp thực tế tương ứng.
        </p>
      </div>

      {/* 3D Flip Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        perspective: '1000px'
      }} className="bento-grid">
        {principles.map(p => {
          const Icon = p.icon;
          const isFlipped = flippedCard === p.id;

          return (
            <div
              key={p.id}
              onClick={() => handleCardClick(p.id)}
              style={{
                width: '100%',
                height: '210px',
                cursor: 'pointer',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'none',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* CARD FRONT */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'var(--bg-secondary)',
                border: '1px solid ' + (isFlipped ? p.color : 'var(--border-color)'),
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--glass-shadow)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    background: p.color + '15',
                    color: p.color,
                    padding: '0.4rem',
                    borderRadius: '8px',
                    display: 'flex'
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, fontFamily: 'monospace' }}>
                    0{p.id}
                  </span>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0.5rem 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {p.frontDesc}
                  </p>
                </div>
                
                <span style={{ fontSize: '0.65rem', color: p.color, fontWeight: 650, alignSelf: 'flex-end', letterSpacing: '0.5px' }}>
                  CHI TIẾT →
                </span>
              </div>

              {/* CARD BACK */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, ' + p.color + '0a 0%, var(--bg-secondary) 100%)',
                border: '1px solid ' + p.color,
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px ' + p.color + '10'
              }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: p.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Biện pháp thực tế ({p.english})
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.4', marginTop: '0.75rem' }}>
                    {p.backDesc}
                  </p>
                </div>
                
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', alignSelf: 'flex-start' }}>
                  ← QUAY LẠI
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Critic debate section */}
      <div className="visualizer-container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Tư Duy Phản Biện & Định Hướng Giải Pháp</span>
        </div>

        <div className="glass-panel" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="bento-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 className="sub-section-title" style={{ fontSize: '1.1rem' }}>
              Thách thức: Thu thập dữ liệu không đồng thuận
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Các hệ hình LLM hiện nay đang đối mặt với cuộc khủng hoảng lớn về mặt đạo đức liên quan đến việc thu thập dữ liệu không có sự đồng thuận (Data scraping without consent). Việc huấn luyện mô hình trên các tác phẩm có bản quyền của nghệ sĩ hay học giả mà không trả chi phí hay ghi nhận công lao là một hành vi xâm phạm nghiêm trọng.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 className="sub-section-title" style={{ fontSize: '1.1rem' }}>
              Giải pháp Đề xuất hướng tới Tương lai
            </h3>
            
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <button
                onClick={() => setSelectedSolution('cc')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: selectedSolution === 'cc' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  borderBottom: selectedSolution === 'cc' ? '2px solid var(--accent-primary)' : '2px solid transparent'
                }}
              >
                Dữ liệu Mở (Creative Commons)
              </button>
              <button
                onClick={() => setSelectedSolution('federated')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: selectedSolution === 'federated' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  borderBottom: selectedSolution === 'federated' ? '2px solid var(--accent-primary)' : '2px solid transparent'
                }}
              >
                Học máy Liên kết (Federated Learning)
              </button>
            </div>

            <div style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5'
            }}>
              {selectedSolution === 'cc' ? (
                <div>
                  <strong>Creative Commons (CC):</strong> Cộng đồng công nghệ cần dịch chuyển mạnh mẽ sang việc xây dựng và sử dụng các tập dữ liệu mã nguồn mở có bản quyền rõ ràng để tạo ra một hệ sinh thái bền vững, tôn trọng bản quyền tác giả.
                </div>
              ) : (
                <div>
                  <strong>Federated Learning:</strong> Ứng dụng kỹ thuật học máy bảo mật quyền riêng tư để huấn luyện các mô hình AI cục bộ ngay trên thiết bị người dùng thay vì upload dữ liệu thô nhạy cảm lên máy chủ tập trung.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
