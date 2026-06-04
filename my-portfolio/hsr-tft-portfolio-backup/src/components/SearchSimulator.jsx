import React, { useState } from 'react';
import { Search, Loader2, ShieldCheck, AlertCircle, FileText, Globe, CheckCircle } from 'lucide-react';

export default function SearchSimulator() {
  const [query, setQuery] = useState('"dynamic programming" site:edu.vn OR site:github.com filetype:pdf intitle:optimization -course');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [searched, setSearched] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState(null);

  const mockResults = [
    {
      id: 1,
      title: 'Tối ưu hóa quy hoạch động trên mạng nơ-ron hồi quy',
      url: 'https://uet.vnu.edu.vn/papers/dp-optimization-rnn.pdf',
      snippet: 'Nghiên cứu các phương pháp tối ưu hóa quy hoạch động (dynamic programming optimization) trong thiết kế kiến trúc mạng nơ-ron hồi quy. Đề xuất thuật toán giảm độ phức tạp thời gian từ O(N^3) xuống O(N^2)...',
      source: 'Trường Đại học Công nghệ (UET) - VNU',
      type: 'PDF / Nghiên cứu khoa học',
      trustScore: 98,
      operatorsMatched: ['"dynamic programming"', 'site:edu.vn', 'filetype:pdf', 'intitle:optimization', '-course'],
      analysis: 'Tài liệu đáp ứng hoàn hảo truy vấn. Nằm trên tên miền học thuật (.edu.vn), có định dạng PDF đặc tả thuật toán chính thống, tiêu đề chứa từ khóa tối ưu hóa (optimization) và không bị loãng bởi nội dung các khóa học thương mại.'
    },
    {
      id: 2,
      title: 'Optimizing Dijkstra and Dynamic Programming in C++ Networks',
      url: 'https://github.com/hanoi-algorithms/dp-graph-optimization',
      snippet: 'Repository chứa mã nguồn mở thực thi thuật toán quy hoạch động tối ưu hóa mạng lưới đường đi. Áp dụng std::priority_queue tối ưu cấu trúc dữ liệu và giảm tối đa chi phí bộ nhớ đệm (cache lines)...',
      source: 'GitHub Repository',
      type: 'Mã nguồn / PDF hướng dẫn',
      trustScore: 95,
      operatorsMatched: ['"dynamic programming"', 'site:github.com', 'filetype:pdf', 'intitle:optimization', '-course'],
      analysis: 'Mã nguồn trực quan được lưu trữ trên GitHub, đính kèm tệp PDF đặc tả thiết kế hệ thống. Toán tử site:github.com giúp tiếp cận trực tiếp mã nguồn chuẩn tối ưu thay vì các bài hướng dẫn lý thuyết chung chung.'
    },
    {
      id: 3,
      title: 'Quy hoạch động nâng cao trong bài toán tối ưu tài nguyên',
      url: 'https://sis.hust.edu.vn/documents/dynamic-programming-optimization.pdf',
      snippet: 'Tài liệu chuyên khảo kỹ thuật về ứng dụng quy hoạch động giải quyết bài toán phân bổ tài nguyên tối ưu. Phân tích các mô hình Knapsack, TSP tối ưu hóa trên không gian nhiều chiều...',
      source: 'Trường Đại học Bách Khoa Hà Nội',
      type: 'PDF Học thuật',
      trustScore: 92,
      operatorsMatched: ['"dynamic programming"', 'site:edu.vn', 'filetype:pdf', 'intitle:optimization', '-course'],
      analysis: 'Tài liệu giáo trình học thuật chuẩn, được viết bởi các giáo sư đầu ngành. Không chứa quảng cáo hay mã giảm giá khóa học nhờ toán tử loại trừ -course.'
    }
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearched(false);
    setActiveAnalysis(null);
    setLoadingStep(0);

    const steps = [
      'Đang kiểm thử cú pháp toán tử tìm kiếm...',
      'Đang áp dụng bộ lọc tên miền (edu.vn & github.com)...',
      'Đang lọc các định dạng tài liệu đặc tả (filetype:pdf)...',
      'Loại bỏ các khóa học thương mại và bài viết quảng cáo (-course)...',
      'Hoàn tất phân tích kết quả!'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(currentStep);
      } else {
        clearInterval(interval);
        setLoading(false);
        setSearched(true);
      }
    }, 800);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Document Academic Content */}
      <div className="doc-header">
        <h2 className="doc-title">Nhiệm vụ 2: Kỹ thuật tìm kiếm thông tin nâng cao và bộ lọc học thuật</h2>
        <p className="doc-text">
          Để thu thập tài liệu chất lượng cao phục vụ các bài toán thuật toán và nghiên cứu AI, việc sử dụng từ khóa thông thường là không đủ hiệu quả vì tỷ lệ nhiễu thông tin lớn (quảng cáo khóa học, blog cá nhân sao chép sơ sài). Tôi áp dụng chiến lược khai thác thông tin chuyên sâu thông qua các toán tử của Google Search.
        </p>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">Thực thi chuỗi toán tử tìm kiếm phức hợp</h3>
        <p className="doc-text">
          Cú pháp lệnh tìm kiếm được thiết kế để lọc bỏ hoàn toàn các nguồn không chính thống, chỉ giữ lại các tài liệu đặc tả thuật toán hoặc mã nguồn từ các tổ chức lớn, trường đại học hay cộng đồng lập trình uy tín:
        </p>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          color: 'var(--accent-primary)',
          textAlign: 'center',
          fontWeight: 600
        }}>
          "dynamic programming" site:edu.vn OR site:github.com filetype:pdf intitle:optimization -course
        </div>
      </div>

      {/* Interactive Simulator */}
      <div className="visualizer-container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Trình Giả Lập Google Search Operators</span>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Mock Search Bar Header */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{
              flex: 1,
              background: 'var(--terminal-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Search size={16} style={{ color: 'var(--accent-primary)' }} />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f472b6',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            
            <button
              className="btn-gradient"
              onClick={handleSearch}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                height: '100%'
              }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Tìm kiếm</span>}
            </button>
          </div>

          {/* Info panel explaining the operators */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '0.8rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>"dynamic programming"</span>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Khớp chính xác cụm từ khóa, tránh tách lẻ các từ đơn.</p>
            </div>
            <div>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>site:edu.vn OR site:github.com</span>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Chỉ lấy kết quả từ tên miền giáo dục VN hoặc mã nguồn GitHub.</p>
            </div>
            <div>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>filetype:pdf intitle:optimization</span>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Bắt buộc là tệp PDF và tiêu đề phải chứa từ khóa tối ưu hóa.</p>
            </div>
            <div>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>-course</span>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Lọc sạch các trang tuyển sinh, giới thiệu khóa học dịch vụ.</p>
            </div>
          </div>

          {/* Loading Animation State */}
          {loading && (
            <div style={{
              padding: '2.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              background: 'var(--terminal-bg)',
              borderRadius: '8px',
              border: '1px dashed var(--border-color)',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {
                  [
                    'Đang kiểm thử cú pháp toán tử tìm kiếm...',
                    'Đang áp dụng bộ lọc tên miền (edu.vn & github.com)...',
                    'Đang lọc các định dạng tài liệu đặc tả (filetype:pdf)...',
                    'Loại bỏ các khóa học thương mại và bài viết quảng cáo (-course)...',
                    'Hoàn tất phân tích kết quả!'
                  ][loadingStep]
                }
              </div>
              <div style={{ width: '200px', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: 'var(--accent-primary)',
                  width: `${(loadingStep + 1) * 20}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}

          {/* Search Results Display */}
          {searched && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Khoảng 3 kết quả học thuật chất lượng cao được tìm thấy (0.24 giây)
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }} className="bento-grid">
                {/* List of results */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {mockResults.map(res => (
                    <div
                      key={res.id}
                      onClick={() => setActiveAnalysis(res)}
                      style={{
                        background: activeAnalysis?.id === res.id ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                        border: '1px solid ' + (activeAnalysis?.id === res.id ? 'var(--accent-primary)' : 'transparent'),
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                      }}
                      onMouseEnter={e => {
                        if (activeAnalysis?.id !== res.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                      }}
                      onMouseLeave={e => {
                        if (activeAnalysis?.id !== res.id) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Globe size={12} />
                        <span>{res.url}</span>
                      </div>
                      
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: 650,
                        color: '#60a5fa', // Bright sky blue link style
                        textDecoration: 'none',
                      }}>
                        {res.title}
                      </h3>
                      
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        {res.snippet}
                      </p>

                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        <span style={{
                          background: 'rgba(96, 165, 250, 0.1)',
                          color: '#60a5fa',
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          border: '1px solid rgba(96, 165, 250, 0.15)'
                        }}>
                          <FileText size={10} /> {res.type}
                        </span>
                        <span style={{
                          background: 'rgba(34, 197, 94, 0.1)',
                          color: '#4ade80',
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          border: '1px solid rgba(34, 197, 94, 0.15)'
                        }}>
                          <ShieldCheck size={10} /> Độ tin cậy: {res.trustScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Analysis Sidebar Widget */}
                <div className="glass-panel" style={{
                  background: 'rgba(10, 15, 30, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  minHeight: '200px',
                  position: 'sticky',
                  top: '100px'
                }}>
                  {activeAnalysis ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease-out' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <ShieldCheck size={14} style={{ color: 'var(--accent-primary)' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 650, color: 'var(--text-primary)' }}>Đánh Giá Học Thuật</span>
                      </div>
                      
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{activeAnalysis.source}</strong>
                      
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        {activeAnalysis.analysis}
                      </p>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>MÃ TOÁN TỬ KHỚP:</span>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                          {activeAnalysis.operatorsMatched.map(op => (
                            <span key={op} style={{
                              background: 'rgba(99, 102, 241, 0.15)',
                              color: 'var(--accent-primary)',
                              fontSize: '0.65rem',
                              fontFamily: 'monospace',
                              padding: '0.1rem 0.3rem',
                              borderRadius: '3px',
                              border: '1px solid var(--border-color)'
                            }}>
                              {op}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '180px',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      gap: '0.5rem'
                    }}>
                      <AlertCircle size={24} />
                      <span style={{ fontSize: '0.8rem' }}>Chọn một kết quả tìm kiếm ở bên trái để xem phân tích bộ lọc học thuật</span>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
