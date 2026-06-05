import React, { useState, useEffect } from 'react';
import { Eye, ShieldCheck, CheckSquare, BookOpen, UserX, AlertTriangle, Cpu, Award } from 'lucide-react';
import { DraggableCardBody, DraggableCardContainer } from './DraggableCard';
import EvervaultCard from './EvervaultCard';

export default function CommunityView() {
  const cols = 16;
  const rows = 10;
  
  // Animation frames for the winking pixel art eye
  const [frame, setFrame] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 6);
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const isPixelActive = (r, c) => {
    if (frame === 0) {
      const closedEye = [[3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10]];
      return closedEye.some(([y, x]) => y === r && x === c);
    }
    
    if (frame === 1 || frame === 2) {
      const outline = [
        [2, 6], [2, 7], [2, 8], [2, 9],
        [3, 4], [3, 11], [4, 3], [4, 12],
        [5, 4], [5, 11], [6, 6], [6, 7], [6, 8], [6, 9]
      ];
      const pupil = (frame === 1) ? [
        [3, 7], [3, 8], [4, 7], [4, 8], [5, 7], [5, 8]
      ] : [
        [4, 7], [4, 8]
      ];
      return outline.some(([y, x]) => y === r && x === c) || pupil.some(([y, x]) => y === r && x === c);
    }

    if (frame === 3) {
      const neutralMouth = [[7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11]];
      return neutralMouth.some(([y, x]) => y === r && x === c);
    }

    if (frame === 4) {
      const smileOutline = [
        [6, 3], [6, 12], [7, 4], [7, 11],
        [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10]
      ];
      return smileOutline.some(([y, x]) => y === r && x === c);
    }

    if (frame === 5) {
      const eyes = [[3, 4], [3, 5], [4, 4], [4, 5], [3, 10], [3, 11], [4, 10], [4, 11]];
      const smile = [
        [6, 3], [6, 12], [7, 4], [7, 11],
        [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10]
      ];
      return eyes.some(([y, x]) => y === r && x === c) || smile.some(([y, x]) => y === r && x === c);
    }

    return false;
  };

  const gridCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const active = isPixelActive(r, c);
      gridCells.push(
        <div
          key={`${r}-${c}`}
          style={{
            aspectRatio: 1,
            background: active ? 'var(--text-main)' : 'rgba(255, 255, 255, 0.25)',
            borderRight: '1px solid rgba(0,0,0,0.06)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            transition: 'background 0.3s ease'
          }}
        />
      );
    }
  }



  const principles = [
    {
      id: 1,
      title: 'Minh bạch nguồn gốc',
      english: 'Transparency',
      icon: Eye,
      color: '#8b5cf6',
      frontDesc: 'Công khai 100% các phần nội dung có sự can thiệp hoặc hỗ trợ từ các mô hình Generative AI.',
      backDesc: 'Không mạo nhận sản phẩm AI là của bản thân. Tuyên bố rõ ràng công cụ sử dụng (Gemini, ChatGPT) và vai trò cụ thể.'
    },
    {
      id: 2,
      title: 'Xác thực dữ liệu',
      english: 'Fact-checking',
      icon: CheckSquare,
      color: '#3b82f6',
      frontDesc: 'Không thừa nhận kết quả AI là chân lý. Mọi số liệu hay thuật toán phải kiểm tra chéo.',
      backDesc: 'LLMs có thể sinh ảo tưởng. Kiểm chứng thông tin qua các sách giáo trình chuyên môn hoặc các bài báo khoa học.'
    },
    {
      id: 3,
      title: 'Bảo hộ quyền sở hữu',
      english: 'Intellectual Property',
      icon: BookOpen,
      color: '#10b981',
      frontDesc: 'Tuyệt đối không tải các tài liệu mật, tác phẩm chưa cấp phép lên các mô hình AI công cộng.',
      backDesc: 'Tôn trọng bản quyền dữ liệu của các học giả khác. Tránh nạp dữ liệu thô nhạy cảm vào các LLM thương mại.'
    },
    {
      id: 4,
      title: 'Triệt tiêu định kiến',
      english: 'Bias Mitigation',
      icon: UserX,
      color: '#f59e0b',
      frontDesc: 'Nhận diện và loại bỏ các định kiến về giới tính, sắc tộc trong tập dữ liệu huấn luyện.',
      backDesc: 'Thiết kế các câu lệnh trung lập. Chủ động rà soát dữ liệu đầu ra để đảm bảo tính công bằng và khách quan.'
    },
    {
      id: 5,
      title: 'Trách nhiệm giải trình',
      english: 'Accountability',
      icon: ShieldCheck,
      color: '#ef4444',
      frontDesc: 'Con người chịu trách nhiệm cuối cùng. Lỗi hệ thống do AI viết thuộc về lập trình viên vận hành.',
      backDesc: 'Không đổ lỗi cho máy móc khi xảy ra sai sót. Lập trình viên phải là chốt chặn cuối cùng kiểm thử mức độ an toàn.'
    },
    {
      id: 6,
      title: 'Bảo mật thông tin',
      english: 'Privacy',
      icon: AlertTriangle,
      color: '#ec4899',
      frontDesc: 'Không tải dữ liệu định danh cá nhân hoặc thông tin nhạy cảm của người khác lên đám mây AI.',
      backDesc: 'Tuân thủ các tiêu chuẩn bảo mật dữ liệu toàn cầu. Đảm bảo mọi luồng dữ liệu học tập cá nhân được nặc danh hóa.'
    }
  ];

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <div className="main-content" style={{ background: 'var(--color-orange)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Page Header */}
      <section style={{ padding: '3.5rem 3rem 1.5rem 3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px', color: 'var(--text-main)', lineHeight: 1 }}>
          Thông Tin Học Viên
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-main)', opacity: 0.85, marginTop: '0.5rem', maxWidth: '800px' }}>
          Hồ sơ năng lực cá nhân, hệ chỉ số học tập HSR và tuyên ngôn sử dụng công nghệ số có trách nhiệm.
        </p>
      </section>

      {/* Main Split Grid */}
      <section style={{ padding: '0 3rem 3rem 3rem' }} className="grid-container">
        
        {/* Student Profile Block */}
        <div className="neo-grid-2">
          
          {/* Profile Details Card */}
          <div className="neo-card" style={{ background: '#ffffff' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              
              {/* Profile Avatar */}
              <div style={{ 
                position: 'relative', 
                width: '72px', 
                height: '72px', 
                borderRadius: '50%', 
                border: '2.5px solid var(--text-main)',
                background: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '2.2rem' }}>👨‍💻</span>
              </div>

              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                  Dương Nguyên Khánh
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  Học viên K70 AI Engineer | MSSV: 25020210
                </p>
              </div>
            </div>

            {/* Academic Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Giới thiệu bản thân:</div>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.5, color: 'var(--text-muted)' }}>
                Tôi là học viên chuyên ngành Kỹ nghệ Trí tuệ Nhân tạo tại Trường Đại học Công nghệ (UET) - Đại học Quốc gia Hà Nội. Đam mê thiết kế giao diện web sáng tạo, lập trình ứng dụng tối ưu và ứng dụng các mô hình học máy vào thực tiễn.
              </p>
            </div>

            {/* Skills / Key Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Công nghệ & Năng lực chính:</div>
              <div className="tag-list">
                <span className="tag-item" style={{ background: 'var(--color-blue)', color: '#ffffff', border: 'none' }}>Python & PyTorch</span>
                <span className="tag-item" style={{ background: 'var(--color-yellow)', color: 'var(--text-main)', border: 'none' }}>React & Web Dev</span>
                <span className="tag-item" style={{ background: 'var(--color-green)', color: '#ffffff', border: 'none' }}>Prompt Engineering</span>
                <span className="tag-item" style={{ background: 'var(--color-orange)', color: '#ffffff', border: 'none' }}>Git Flow & Kanban</span>
                <span className="tag-item" style={{ background: '#111111', color: '#ffffff', border: 'none' }}>Responsible AI</span>
              </div>
            </div>

          </div>

          {/* Evervault Hacker Glitch Dashboard (Digital System Active State replacement) */}
          <div style={{ height: '315px' }}>
            <EvervaultCard>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  // SYSTEM DECRYPTION ACTIVE
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, color: 'var(--text-main)' }}>
                  Hệ chỉ số kỹ thuật của học viên
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>STUDENT_ID:</span>
                    <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>25020210</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>CLASS_CODE:</span>
                    <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>K70_AI_ENGINEER</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GIT_COMMITS:</span>
                    <span style={{ fontWeight: 800, color: 'var(--color-green)' }}>148_VERIFIED</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>PROMPT_CHAIN_ACCURACY:</span>
                    <span style={{ fontWeight: 800, color: 'var(--color-blue)' }}>99.2%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>AI_ETHICS_ALIGNMENT:</span>
                    <span style={{ fontWeight: 800, color: '#ec4899' }}>COMPLIANT</span>
                  </div>
                </div>
              </div>
            </EvervaultCard>
          </div>

        </div>

        {/* Ethics Principle Section (Task 6 integrated) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text-main)' }}>
              Tuyên Ngôn Đạo Đức AI
            </h2>
            <p style={{ color: 'var(--text-main)', opacity: 0.85, fontSize: '1.1rem', marginTop: '0.25rem' }}>
              6 nguyên tắc cốt lõi được áp dụng nghiêm túc xuyên suốt quá trình thực hành, lập trình và khai thác AI.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
              perspective: '1000px'
            }} 
            className="bento-grid"
          >
            {principles.map(p => {
              const Icon = p.icon;
              const isFlipped = flippedCard === p.id;
              
              return (
                <div 
                  key={p.id}
                  onClick={() => handleCardClick(p.id)}
                  style={{
                    height: '220px',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'none',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                >
                  
                  {/* Front Side */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      background: '#ffffff',
                      border: '2.5px solid var(--text-main)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      boxShadow: 'var(--shadow-offset)',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ background: `${p.color}15`, color: p.color, padding: '0.5rem', borderRadius: '6px' }}>
                        <Icon size={22} />
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        Điều 0{p.id}
                      </span>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{p.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                        {p.frontDesc}
                      </p>
                    </div>

                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-orange)', alignSelf: 'flex-start' }}>
                      Click to flip ➔
                    </span>
                  </div>

                  {/* Back Side */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      background: p.color,
                      color: '#ffffff',
                      border: '2.5px solid var(--text-main)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{p.english}</h4>
                      <p style={{ fontSize: '0.82rem', color: '#ffffff', opacity: 0.9, marginTop: '0.5rem', lineHeight: '1.4' }}>
                        {p.backDesc}
                      </p>
                    </div>

                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-yellow)' }}>
                      ➔ Click to flip back
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* Draggable Cards Pile Gallery */}
      <section style={{ padding: '0 3rem 3rem 3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text-main)', textTransform: 'uppercase' }}>
              Kho Ảnh Kỷ Niệm & Dự Án
            </h2>
            <p style={{ color: 'var(--text-main)', opacity: 0.85, fontSize: '1.1rem', marginTop: '0.25rem' }}>
              Nhấp và kéo để di chuyển, ném các thẻ ảnh minh chứng thực hành và hoạt động nghiên cứu AI K70 UET.
            </p>
          </div>

          <div style={{
            border: '2.5px solid var(--text-main)',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            boxShadow: 'var(--shadow-offset)',
            overflow: 'hidden',
            position: 'relative',
            height: '620px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            <DraggableCardContainer className="relative w-full h-full">
              {[
                {
                  title: "Bài 1: Cấu trúc Workspace",
                  image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=600",
                  style: { position: "absolute", top: "100px", left: "8%", transform: "rotate(-6deg)" },
                },
                {
                  title: "Bài 2: Google Search Nâng cao",
                  image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600",
                  style: { position: "absolute", top: "130px", left: "20%", transform: "rotate(4deg)" },
                },
                {
                  title: "Bài 3: Prompt & Chuỗi suy nghĩ CoT",
                  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
                  style: { position: "absolute", top: "90px", left: "32%", transform: "rotate(-8deg)" },
                },
                {
                  title: "Bài 4: Quản lý Kanban & Git Flow",
                  image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600",
                  style: { position: "absolute", top: "140px", left: "45%", transform: "rotate(7deg)" },
                },
                {
                  title: "Bài 5: Đồng sáng tạo nội dung AI",
                  image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600",
                  style: { position: "absolute", top: "80px", left: "58%", transform: "rotate(-3deg)" },
                },
                {
                  title: "Bài 6: Đạo đức AI có trách nhiệm",
                  image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600",
                  style: { position: "absolute", top: "120px", left: "70%", transform: "rotate(5deg)" },
                },
                {
                  title: "Tập thể K70 AI Engineers",
                  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
                  style: { position: "absolute", top: "110px", left: "38%", transform: "rotate(2deg)" },
                  className: "z-20",
                }
              ].map((item) => (
                <DraggableCardBody key={item.title} className={item.className} style={item.style}>
                  <img src={item.image} alt={item.title} className="draggable-card-img" />
                  <h3 className="draggable-card-title">{item.title}</h3>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--text-main)',
        color: 'var(--color-orange)',
        padding: '1.25rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        <span>SYSTEM_ENCRYPTION: QUANTUM_OK</span>
        <span>STUDENT_CLASS: K70_AI_ENGINEER</span>
      </div>
    </div>
  );
}
