import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import TerminalVisualizer from './TerminalVisualizer';
import SearchSimulator from './SearchSimulator';
import PromptPlayground from './PromptPlayground';
import KanbanBoard from './KanbanBoard';
import ContentCreation from './ContentCreation';
import EthicsAI from './EthicsAI';
import SpotlightCard from './SpotlightCard';

const getSpotlightColor = (color) => {
  if (color === 'var(--color-blue)') return 'rgba(0, 71, 255, 0.08)';
  if (color === 'var(--color-yellow)') return 'rgba(255, 204, 0, 0.12)';
  if (color === 'var(--color-orange)') return 'rgba(255, 102, 0, 0.08)';
  if (color === 'var(--color-green)') return 'rgba(0, 204, 102, 0.08)';
  if (color === '#a855f7') return 'rgba(168, 85, 247, 0.08)';
  if (color === '#ec4899') return 'rgba(236, 72, 153, 0.08)';
  return 'rgba(0, 71, 255, 0.06)';
};

const TASK_REPORTS = {
  task1: {
    title: "Báo cáo Bài 1: Quản lý Workspace với File & Thư mục",
    objective: "Xây dựng cấu trúc thư mục workspace chuyên nghiệp, sử dụng Terminal và các lệnh CLI (Command Line Interface) để quản lý tệp tin hiệu quả theo tiêu chuẩn công nghiệp.",
    steps: [
      "Thiết kế cây thư mục: Thiết lập các phân nhánh chuẩn hóa (src/, docs/, assets/, config/, tests/) với quy tắc đặt tên snake_case.",
      "Thao tác CLI: Luyện tập thành thạo các lệnh di chuyển và quản lý tệp (mkdir, cd, ls, mv, cp, rm, find, grep).",
      "Tối ưu hóa: Tạo các alias phím tắt và viết shell script đơn giản để tự động hóa quy trình nén, sao lưu dữ liệu học tập."
    ],
    evidence: [
      { url: "/evidence/phong/bai1_1.jpg", caption: "Cây thư mục Workspace hiển thị trên Terminal" },
      { url: "/evidence/hoangnam/lesson1/image1.png", caption: "Giao diện cấu trúc thư mục chi tiết trên VS Code" },
      { url: "/evidence/hoangnam/lesson1/image2.png", caption: "Kiểm tra kích thước các thư mục bằng lệnh CLI" },
      { url: "/evidence/hoangnam/lesson1/image3.png", caption: "Script tự động hóa sao lưu thư mục workspace" }
    ],
    result: "Cấu trúc thư mục học tập được quy chuẩn hóa, dễ dàng tích hợp vào hệ thống kiểm soát phiên bản Git và chia sẻ đồng bộ."
  },
  task2: {
    title: "Báo cáo Bài 2: Google Search Nâng cao & Đánh giá học thuật",
    objective: "Sử dụng các toán tử tìm kiếm nâng cao (Search Operators) để lọc thông tin chính xác, đồng thời áp dụng tiêu chuẩn CRAAP để đánh giá tính xác thực của nguồn tài liệu giáo khoa.",
    steps: [
      "Khai thác toán tử: Sử dụng site:edu, filetype:pdf, intitle:\"...\" để quét trực tiếp các nghiên cứu khoa học chính thống.",
      "Đánh giá CRAAP Test: Kiểm chứng 5 khía cạnh cốt lõi (Cập nhật, Liên quan, Thẩm quyền, Chính xác, Mục đích).",
      "Harvard Referencing: Định dạng và sắp xếp danh mục tài liệu tham khảo theo quy chuẩn học thuật quốc tế."
    ],
    evidence: [
      { url: "/evidence/phong/bai2_1.jpg", caption: "Tìm kiếm tài liệu học thuật với toán tử nâng cao" },
      { url: "/evidence/phong/bai2_2.jpg", caption: "Định dạng danh mục tài liệu tham khảo chuẩn Harvard" }
    ],
    tableData: [
      { name: "AI and the Future of Learning (UNESCO, 2024)", type: "Báo cáo tổ chức", score: "5/5", analysis: "Ưu: Tính cập nhật cao, được thẩm định bởi hội đồng chuyên gia thế giới. Nhược: Mang tính định hướng vĩ mô, thiếu các hướng dẫn kỹ thuật chi tiết." },
      { name: "Personalized Learning Paths via AI (Tạp chí IEEE)", type: "Bài báo khoa học", score: "5/5", analysis: "Ưu: Sử dụng phương pháp nghiên cứu thực nghiệm với cỡ mẫu lớn (5000 sinh viên). Nhược: Từ ngữ chuyên ngành phức tạp." },
      { name: "Artificial Intelligence in Education (Springer XB)", type: "Sách chuyên khảo", score: "5/5", analysis: "Ưu: Hệ thống hóa lý thuyết bài bản, nền tảng tốt. Nhược: Quy trình xuất bản dài nên thiếu cập nhật một số AI mới nhất." },
      { name: "Thực trạng dùng ChatGPT của sinh viên VN", type: "Báo chí điện tử", score: "3/5", analysis: "Ưu: Số liệu gần gũi với thực tế địa phương. Nhược: Sai số khảo sát online cao, thiếu phản biện đồng cấp." }
    ],
    result: "Tổng hợp thành công danh mục 10 nguồn tài liệu tham khảo chất lượng cao kèm theo bảng điểm đánh giá độ tin cậy khoa học."
  },
  task3: {
    title: "Báo cáo Bài 3: Kỹ nghệ Prompt & Chuỗi suy nghĩ Chain-of-Thought",
    objective: "Thiết kế, thử nghiệm và tối ưu hóa các prompt câu lệnh với kỹ thuật CoT giúp tăng chất lượng câu trả lời của mô hình ngôn ngữ lớn (LLM).",
    steps: [
      "So sánh Zero-shot vs Few-shot: Cung cấp ví dụ mẫu để mô hình định hình cấu trúc đầu ra chuẩn xác.",
      "Áp dụng Chain-of-Thought: Thêm khẩu lệnh logic 'Hãy suy nghĩ từng bước một' để AI giải thích quy trình giải quyết vấn đề.",
      "Thiết lập Ràng buộc (Constraints): Giới hạn vai trò chuyên gia, định dạng Markdown và các rubric kiểm thử chất lượng."
    ],
    evidence: [
      { url: "/evidence/phong/bai3_1.jpg", caption: "So sánh kết quả Prompt cơ bản và Prompt nâng cao" },
      { url: "/evidence/phong/bai3_2.jpg", caption: "Giả lập chuỗi suy nghĩ CoT giải bài toán logic" },
      { url: "/evidence/hoangnam/lesson3/image1.png", caption: "Rubric chấm điểm phản hồi của LLM" }
    ],
    result: "Bộ nguyên tắc C.A.R.E (Context - Action - Result - Example) được đúc kết giúp nâng cao 80% độ hữu dụng của văn bản phản hồi."
  },
  task4: {
    title: "Báo cáo Bài 4: Hợp tác dự án với Kanban & Git Flow",
    objective: "Tổ chức quy trình làm việc nhóm trực tuyến hiệu quả thông qua sơ đồ Kanban và chuẩn hóa phân nhánh Git Flow hỗ trợ AI-assisted workflows.",
    steps: [
      "Quản lý Kanban: Phân bổ 5 cột trạng thái (Backlog -> Todo -> In Progress -> Review -> Done) và đặt giới hạn WIP.",
      "Phân nhánh Git Flow: Thiết lập nhánh develop, main và các nhánh feature/*, hotfix/* để tránh xung đột mã nguồn.",
      "Đồng bộ lưu trữ: Kết nối Google Drive lưu trữ tài liệu với các thẻ nhiệm vụ trên Trello."
    ],
    evidence: [
      { url: "/evidence/phong/bai4_1.jpg", caption: "Sơ đồ quản trị Kanban dự án nhóm trên Trello" },
      { url: "/evidence/hoangnam/lesson4/image1.jpeg", caption: "Nhật ký họp thảo luận chuyên môn trực tuyến" },
      { url: "/evidence/hoangnam/lesson4/image2.png", caption: "Lịch sử chỉnh sửa tài liệu chung trên Google Docs" },
      { url: "/evidence/hoangnam/lesson4/image3.png", caption: "Cấu trúc lưu trữ thư mục dùng chung trên Google Drive" }
    ],
    result: "Quy trình làm việc nhóm đạt hiệu suất cao, triệt tiêu tình trạng trôi tin nhắn hoặc xung đột phiên bản tệp tin."
  },
  task5: {
    title: "Báo cáo Bài 5: Đồng sáng tạo nội dung AI (Human-in-the-Loop)",
    objective: "Thiết kế sản phẩm đồ họa truyền thông (Infographic) thông qua quy trình kết hợp trí tuệ con người dẫn dắt và AI hỗ trợ tạo sinh hình ảnh/văn bản.",
    steps: [
      "Biên tập kịch bản: Sử dụng Gemini tạo văn bản thô, chỉnh sửa số liệu và bối cảnh phù hợp thực tế.",
      "Tạo ảnh Isometric: Sử dụng prompt Midjourney/Leonardo tạo các icon 3D claymorphism nghệ thuật.",
      "Hòa hợp thiết kế: Sử dụng Canva AI tách nền, hiệu chỉnh bảng màu khớp với template thiết kế gốc."
    ],
    evidence: [
      { url: "/evidence/phong/bai5_1.jpg", caption: "Dự thảo Infographic thô tạo sinh từ AI" },
      { url: "/evidence/hoangnam/lesson5/image3.png", caption: "Sản phẩm Infographic 3D Isometric hoàn thiện" }
    ],
    result: "Sản phẩm truyền thông đạt tính thẩm mỹ cao, kết hợp hài hòa giữa chất lượng đồ họa AI và chiều sâu nội dung con người biên tập."
  },
  task6: {
    title: "Báo cáo Bài 6: Đạo đức AI & Liêm chính học thuật có trách nhiệm",
    objective: "Xây dựng tuyên ngôn đạo đức sử dụng trí tuệ nhân tạo cá nhân, tuân thủ 6 nguyên tắc liêm chính học thuật trong nghiên cứu công nghệ.",
    steps: [
      "Phân tích Đạo đức: Nhận diện định kiến, bảo mật thông tin và quyền riêng tư dữ liệu cá nhân.",
      "Nghiên cứu Chính sách: Khảo sát quy định sử dụng AI tại UET, ĐHQGHN và các trường đại học toàn cầu.",
      "Checklist liêm chính: Thiết lập 20 tiêu chí kiểm soát việc tham khảo ý tưởng AI một cách minh bạch."
    ],
    evidence: [
      { url: "/evidence/phong/bai6_1.jpg", caption: "Tuyên ngôn Đạo đức AI cá nhân đính kèm chữ ký" },
      { url: "/evidence/hoangnam/lesson6/image1.png", caption: "Sơ đồ 6 nguyên tắc Đạo đức AI có trách nhiệm" },
      { url: "/evidence/hoangnam/lesson6/image2.png", caption: "Quy trình đối chiếu nguồn tham khảo chống đạo văn" }
    ],
    result: "Xác lập ranh giới rõ ràng giữa 'hỗ trợ học tập' và 'lệ thuộc máy móc', cam kết chịu trách nhiệm giải trình cuối cùng đối với mọi sản phẩm."
  }
};


export default function StudentHomesView() {
  const [activeTask, setActiveTask] = useState(null);
  const [modalTab, setModalTab] = useState('simulator');
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setModalTab('simulator');
  }, [activeTask]);

  const tasks = [
    { 
      id: 'task1', 
      number: 'Bài 1',
      name: 'Máy tính & Thiết bị ngoại vi', 
      desc: 'Giả lập Terminal & Cây thư mục workspace.', 
      component: TerminalVisualizer,
      color: 'var(--color-blue)',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600'
    },
    { 
      id: 'task2', 
      number: 'Bài 2',
      name: 'Google Search nâng cao', 
      desc: 'Bộ lọc toán tử tìm kiếm thông tin tối ưu.', 
      component: SearchSimulator,
      color: 'var(--color-yellow)',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600'
    },
    { 
      id: 'task3', 
      number: 'Bài 3',
      name: 'Prompt & Chuỗi suy nghĩ', 
      desc: 'So sánh LLM và giả lập Chain-of-Thought.', 
      component: PromptPlayground,
      color: 'var(--color-orange)',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600'
    },
    { 
      id: 'task4', 
      number: 'Bài 4',
      name: 'Sơ đồ Kanban & Phối hợp', 
      desc: 'Tự động hoá luồng Git Flow & Quản trị nhóm.', 
      component: KanbanBoard,
      color: 'var(--color-green)',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=600'
    },
    { 
      id: 'task5', 
      number: 'Bài 5',
      name: 'Đồng sáng tạo nội dung', 
      desc: 'Human-in-the-loop thiết kế ảnh & văn bản.', 
      component: ContentCreation,
      color: '#a855f7',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600'
    },
    { 
      id: 'task6', 
      number: 'Bài 6',
      name: 'Đạo đức AI có trách nhiệm', 
      desc: '6 nguyên tắc cốt lõi về liêm chính học thuật.', 
      component: EthicsAI,
      color: '#ec4899',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600'
    }
  ];

  useEffect(() => {
    // Find the actual scrolling parent: .content-area
    const scrollParent = containerRef.current?.closest('.content-area') || window;

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current || !stickyRef.current) return;

      // On mobile, disable horizontal-scroll-jack
      if (window.innerWidth <= 768) {
        setTranslateX(0);
        return;
      }

      // Get container position relative to the scroll parent
      const scrollTop = scrollParent === window
        ? window.scrollY
        : scrollParent.scrollTop;

      const containerTop = containerRef.current.offsetTop;
      const viewportHeight = scrollParent === window
        ? window.innerHeight
        : scrollParent.clientHeight;

      // How far we've scrolled INTO the container (after its top edge enters viewport)
      const scrolledInto = scrollTop - containerTop;

      // Total scrollable range = container height - 1 viewport
      const trackScrollWidth = trackRef.current.scrollWidth;
      const viewWidth = stickyRef.current.clientWidth;
      const maxTranslateX = Math.max(0, trackScrollWidth - viewWidth);

      // Container height is set to: maxTranslateX + viewportHeight
      // So totalScrollable matches the horizontal distance
      const totalScrollable = maxTranslateX;

      if (totalScrollable <= 0) return;

      const raw = Math.max(0, Math.min(1, scrolledInto / totalScrollable));
      setScrollProgress(raw);
      setTranslateX(raw * maxTranslateX);
    };

    scrollParent.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollParent.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveTask(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const ActiveComponent = tasks.find(t => t.id === activeTask)?.component;

  // Slight parallax offset per card based on scroll progress
  const getParallaxShift = (index) => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return 0;
    const cardProgress = (scrollProgress * 7) - (index + 1);
    return Math.max(-20, Math.min(20, cardProgress * 10));
  };

  // Dynamic container height: enough vertical scroll to drive the full horizontal track
  // We'll compute it based on track width, but use a fallback in CSS via state
  const CARD_WIDTH = 380;
  const CARD_GAP = 40;
  const INTRO_WIDTH = 500;
  const PADDING = 128; // left + right 4rem each = 64*2
  const trackTotal = INTRO_WIDTH + CARD_GAP + tasks.length * (CARD_WIDTH + CARD_GAP) + PADDING;
  // Viewport width minus sidebar (280px)
  const viewW = typeof window !== 'undefined' ? Math.max(800, window.innerWidth - 280) : 900;
  const maxScroll = Math.max(0, trackTotal - viewW);
  const containerHeight = `calc(100vh + ${maxScroll}px)`;

  return (
    <div className="main-content">
      
      {/* Scroll-hijack outer container — tall enough to drive horizontal track */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: containerHeight,
          background: 'transparent'
        }}
      >
        {/* Sticky viewport lock */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: 'transparent'
          }}
        >
          {/* Animated 3D Perspective Grid Background */}
          <div className="cyber-grid-container">
            <div 
              className="cyber-grid-3d" 
              style={{
                backgroundPosition: `${-translateX * 0.4}px 0px`,
              }}
            />
            <div className="cyber-grid-horizon" />
          </div>
          {/* Section label — upper left corner */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            left: '4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 10
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              kduongnguyen07 // 02 — Báo Cáo Thực Hành
            </span>
          </div>

          {/* Progress bar at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#e0e0e0',
            zIndex: 10
          }}>
            <div style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'var(--color-blue)',
              transition: 'width 0.05s linear'
            }} />
          </div>

          {/* Card count indicator */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            zIndex: 10
          }}>
            {Math.min(tasks.length, Math.ceil(scrollProgress * (tasks.length + 1)))} / {tasks.length}
          </div>

          {/* Horizontal sliding track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              padding: '0 4rem',
              transform: `translateX(-${translateX}px)`,
              transition: 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              width: 'max-content',
              willChange: 'transform',
              alignItems: 'center'
            }}
          >
            {/* Intro slide */}
            <div
              style={{
                width: `${INTRO_WIDTH - CARD_GAP}px`,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: '3rem',
                borderRight: '2px dashed rgba(0,0,0,0.15)'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: 'var(--color-blue)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                6 nhiệm vụ thực hành
              </span>
              <h1 style={{
                fontSize: '4.5rem',
                fontWeight: 900,
                letterSpacing: '-3px',
                marginTop: '0.5rem',
                lineHeight: 0.95
              }}>
                Báo Cáo<br/>Thực Hành
              </h1>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '1rem',
                marginTop: '1.25rem',
                lineHeight: 1.6,
                maxWidth: '340px'
              }}>
                Tuyển tập 6 nhiệm vụ mô phỏng kỹ năng số & năng lực AI. Cuộn chuột để lướt qua từng bài.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '2rem',
                fontWeight: 800,
                color: 'var(--color-blue)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <span>Cuộn xuống để khám phá</span>
                <ArrowRight size={18} className="pulse-arrow" />
              </div>
            </div>

            {/* Task cards */}
            {tasks.map((task, index) => {
              const textShift = getParallaxShift(index);

              return (
                <SpotlightCard
                  key={task.id}
                  onClick={() => setActiveTask(task.id)}
                  className="task-card"
                  spotlightColor={getSpotlightColor(task.color)}
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: '520px',
                    flexShrink: 0,
                    padding: 0,
                    overflow: 'hidden',
                    background: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image with parallax */}
                  <div style={{ width: '100%', height: '260px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={task.image}
                      alt={task.name}
                      style={{
                        width: '120%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        left: '-10%',
                        filter: 'grayscale(0.1) contrast(1.05)',
                        transform: `scale(1.12) translateX(${textShift * -0.8}px)`,
                        transition: 'transform 0.06s linear'
                      }}
                    />
                    {/* Number badge */}
                    <span style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      background: task.color,
                      color: task.id === 'task2' ? 'var(--text-main)' : '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      border: '1.5px solid rgba(0,0,0,0.15)'
                    }}>
                      {task.number}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{
                    padding: '1.5rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      lineHeight: 1.2,
                      letterSpacing: '-0.5px',
                      transform: `translateX(${textShift * 0.3}px)`,
                      transition: 'transform 0.06s linear'
                    }}>
                      {task.name}
                    </h3>

                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5
                    }}>
                      {task.desc}
                    </p>

                    <div style={{
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: task.color
                      }}>
                        Chạy mô phỏng ➔
                      </span>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        background: task.color,
                        color: task.id === 'task2' ? 'var(--text-main)' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid var(--text-main)'
                      }}>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {activeTask && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem'
          }}
          onClick={() => setActiveTask(null)}
        >
          <div
            className="neo-card animate-scale-up"
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: '85vh',
              background: '#ffffff',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '10px 10px 0px var(--text-main)',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 2rem',
              borderBottom: '2.5px solid var(--text-main)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: tasks.find(t => t.id === activeTask)?.color,
              color: activeTask === 'task2' ? 'var(--text-main)' : '#ffffff'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', opacity: 0.85 }}>
                  {tasks.find(t => t.id === activeTask)?.number} // Trình giả lập
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
                  {tasks.find(t => t.id === activeTask)?.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveTask(null)}
                style={{
                  background: 'var(--bg-card)',
                  border: '2px solid var(--text-main)',
                  color: 'var(--text-main)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px var(--text-main)',
                  transition: 'all 0.1s'
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translate(1px, 1px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px var(--text-main)';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px var(--text-main)';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Tab Bar */}
            <div style={{
              display: 'flex',
              borderBottom: '2.5px solid var(--text-main)',
              background: '#f5f5f5',
            }}>
              <button
                onClick={() => setModalTab('simulator')}
                style={{
                  background: modalTab === 'simulator' ? '#ffffff' : 'transparent',
                  border: 'none',
                  borderRight: '2px solid var(--text-main)',
                  borderBottom: modalTab === 'simulator' ? 'none' : '2.5px solid var(--text-main)',
                  padding: '0.85rem 1.5rem',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  transition: 'all 0.15s'
                }}
              >
                Trình Giả Lập Tương Tác
              </button>
              <button
                onClick={() => setModalTab('report')}
                style={{
                  background: modalTab === 'report' ? '#ffffff' : 'transparent',
                  border: 'none',
                  borderRight: '2px solid var(--text-main)',
                  borderBottom: modalTab === 'report' ? 'none' : '2.5px solid var(--text-main)',
                  padding: '0.85rem 1.5rem',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  transition: 'all 0.15s'
                }}
              >
                Báo Cáo & Minh Chứng Thực Tế
              </button>
              <div style={{ flex: 1, borderBottom: '2.5px solid var(--text-main)' }} />
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {modalTab === 'simulator' ? (
                ActiveComponent && <ActiveComponent />
              ) : (
                (() => {
                  const report = TASK_REPORTS[activeTask];
                  if (!report) return <div style={{ fontWeight: 700 }}>Chưa có báo cáo cho bài này.</div>;
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-main)' }}>
                      {/* I. MỤC TIÊU */}
                      <div className="neo-card" style={{ background: '#fcfcfc', border: '2.5px solid var(--text-main)', padding: '1.5rem', boxShadow: '4px 4px 0px var(--text-main)' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                          I. Mục tiêu nhiệm vụ
                        </h4>
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-muted)' }}>
                          {report.objective}
                        </p>
                      </div>

                      {/* II. CÁC BƯỚC THỰC HIỆN */}
                      <div className="neo-card" style={{ background: '#fcfcfc', border: '2.5px solid var(--text-main)', padding: '1.5rem', boxShadow: '4px 4px 0px var(--text-main)' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-orange)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                          II. Các bước thực hiện chi tiết
                        </h4>
                        <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {report.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* SPECIAL TABLES OR DATA IF ANY */}
                      {report.tableData && (
                        <div className="neo-card" style={{ background: '#fcfcfc', border: '2.5px solid var(--text-main)', padding: '1.5rem', boxShadow: '4px 4px 0px var(--text-main)', overflowX: 'auto' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-yellow)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                            Bảng đánh giá độ tin cậy của các nguồn thông tin (CRAAP Test)
                          </h4>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', minWidth: '600px' }}>
                            <thead>
                              <tr style={{ background: '#eaeaea', borderBottom: '2.5px solid var(--text-main)' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800, borderRight: '1.5px solid var(--text-main)' }}>Nguồn tài liệu</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800, borderRight: '1.5px solid var(--text-main)', width: '150px' }}>Loại</th>
                                <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 800, borderRight: '1.5px solid var(--text-main)', width: '80px' }}>Điểm</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 800 }}>Phân tích khoa học</th>
                              </tr>
                            </thead>
                            <tbody>
                              {report.tableData.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1.5px solid var(--text-main)' }}>
                                  <td style={{ padding: '0.75rem', borderRight: '1.5px solid var(--text-main)', fontWeight: 700 }}>{row.name}</td>
                                  <td style={{ padding: '0.75rem', borderRight: '1.5px solid var(--text-main)' }}>{row.type}</td>
                                  <td style={{ padding: '0.75rem', borderRight: '1.5px solid var(--text-main)', textAlign: 'center', fontWeight: 800, color: 'var(--color-orange)' }}>{row.score}</td>
                                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{row.analysis}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* III. HÌNH ẢNH MINH CHỨNG THỰC TẾ */}
                      <div className="neo-card" style={{ background: '#fcfcfc', border: '2.5px solid var(--text-main)', padding: '1.5rem', boxShadow: '4px 4px 0px var(--text-main)' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
                          III. Hình ảnh minh chứng thực tế
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                          {report.evidence.map((img, idx) => (
                            <div 
                              key={idx} 
                              className="evidence-item"
                              style={{ 
                                border: '1.5px solid var(--text-main)', 
                                borderRadius: '6px', 
                                overflow: 'hidden', 
                                background: '#eaeaea',
                                boxShadow: '2px 2px 0px var(--text-main)',
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <div style={{ overflow: 'hidden', height: '180px', borderBottom: '1.5px solid var(--text-main)' }}>
                                <img 
                                  src={img.url} 
                                  alt={img.caption} 
                                  style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                  }} 
                                  onClick={() => window.open(img.url, '_blank')}
                                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                              </div>
                              <div style={{ padding: '0.6rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, background: '#ffffff', color: 'var(--text-muted)' }}>
                                {img.caption}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* IV. KẾT QUẢ ĐẠT ĐƯỢC */}
                      <div style={{ borderLeft: '4px solid var(--color-green)', paddingLeft: '1rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>
                          ✓ Kết quả đạt được
                        </h4>
                        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                          {report.result}
                        </p>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '0.75rem 2rem',
              background: '#f9f9f9',
              borderTop: '1.5px solid var(--text-main)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}>
              Ấn [ESC] hoặc nhấp ra ngoài để đóng trình giả lập.
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pulse-arrow {
          animation: pulseArrow 1.5s infinite ease-in-out;
        }
        @keyframes pulseArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }

        .task-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .task-card:hover {
          transform: translate(-4px, -4px) !important;
          box-shadow: 8px 8px 0px var(--text-main) !important;
        }

        @media (max-width: 768px) {
          .horizontal-scroll-container {
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
