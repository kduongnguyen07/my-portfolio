import React, { useState } from 'react';
import { Sparkles, Terminal, Code, Zap, Play, CheckCircle } from 'lucide-react';

export default function PromptPlayground() {
  const [selectedPrompt, setSelectedPrompt] = useState('advanced');
  const [isPlaying, setIsPlaying] = useState(false);
  const [thinkingOutput, setThinkingOutput] = useState([]);
  const [codeOutput, setCodeOutput] = useState('');
  const [progress, setProgress] = useState(0);

  const naivePromptText = "Viết cho tao thuật toán Dijkstra bằng C++.";
  const advancedPromptText = "Bạn là một Chuyên gia Thuật toán cao cấp. Hãy tối ưu mã nguồn thuật toán Dijkstra tìm đường đi ngắn nhất từ một đỉnh nguồn trên đồ thị có trọng số không âm sử dụng `std::priority_queue` trong C++. Định dạng đầu ra: Chỉ cung cấp khối mã nguồn chuẩn Google Coding Convention, tên biến kết quả đặt là `ans`. Thực hiện giải thích thuật toán từng bước theo cơ chế Chain-of-Thought trước khi xuất code.";

  const runSimulation = () => {
    setIsPlaying(true);
    setThinkingOutput([]);
    setCodeOutput('');
    setProgress(0);

    if (selectedPrompt === 'naive') {
      setTimeout(() => {
        setThinkingOutput(['[System] Gửi yêu cầu đến LLM...', '[LLM] Trả về mã nguồn trực tiếp (không kích hoạt Chain-of-Thought)']);
        setCodeOutput(
`#include <iostream>
using namespace std;

int graph[100][100];
int dist[100];
bool visited[100];

void dijkstra(int n, int start) {
    for(int i=0; i<n; i++) {
        dist[i] = 999999;
        visited[i] = false;
    }
    dist[start] = 0;
    for(int c=0; c<n-1; c++) {
        int u = -1;
        for(int i=0; i<n; i++) {
            if(!visited[i] && (u == -1 || dist[i] < dist[u])) u = i;
        }
        visited[u] = true;
        for(int v=0; v<n; v++) {
            if(graph[u][v] != 0 && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
}`
        );
        setProgress(100);
        setIsPlaying(false);
      }, 1000);
    } else {
      const thoughts = [
        '💡 [Vai trò]: Thiết lập môi trường Chuyên gia Thuật toán cao cấp.',
        '🔍 [Ràng buộc]: Đồ thị có hướng, trọng số không âm, yêu cầu cấu trúc dữ liệu std::priority_queue.',
        '🧠 [Chuỗi Tư Duy - Bước 1]: Khởi tạo mảng khoảng cách dist[] với giá trị vô cùng. dist[nguồn] = 0.',
        '🧠 [Chuỗi Tư Duy - Bước 2]: Đẩy (0, nguồn) vào std::priority_queue sắp xếp tăng dần theo khoảng cách.',
        '🧠 [Chuỗi Tư Duy - Bước 3]: Lặp: rút đỉnh u có khoảng cách nhỏ nhất, tối ưu (relax) các cạnh kề v của u.',
        '🛠️ [Định dạng đầu ra]: Kiểm tra Google Coding Convention, áp dụng tên biến kết quả "ans".'
      ];

      let currentThoughtIdx = 0;
      const interval = setInterval(() => {
        if (currentThoughtIdx < thoughts.length) {
          setThinkingOutput(prev => [...prev, thoughts[currentThoughtIdx]]);
          setProgress(Math.round(((currentThoughtIdx + 1) / thoughts.length) * 50));
          currentThoughtIdx++;
        } else {
          clearInterval(interval);
          setCodeOutput(
`#include <vector>
#include <queue>
#include <utility>

const int INF = 1e9;

// Định nghĩa đồ thị kề: vector của danh sách kề {đỉnh kề, trọng số}
using Graph = std::vector<std::vector<std::pair<int, int>>>;

std::vector<int> Dijkstra(const Graph& graph, int start_node) {
    int num_vertices = graph.size();
    std::vector<int> ans(num_vertices, INF);
    // Min-priority queue: lưu {khoảng cách, đỉnh}
    std::priority_queue<std::pair<int, int>, 
                        std::vector<std::pair<int, int>>, 
                        std::greater<std::pair<int, int>>> min_heap;

    ans[start_node] = 0;
    min_heap.push({0, start_node});

    while (!min_heap.empty()) {
        auto [current_dist, u] = min_heap.top();
        min_heap.pop();

        if (current_dist > ans[u]) continue;

        for (const auto& [v, weight] : graph[u]) {
            if (ans[u] + weight < ans[v]) {
                ans[v] = ans[u] + weight;
                min_heap.push({ans[v], v});
            }
        }
    }
    return ans; // Trả về biến kết quả ans theo đúng ràng buộc
}`
          );
          setProgress(100);
          setIsPlaying(false);
        }
      }, 600);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Document Content */}
      <div className="doc-header">
        <h2 className="doc-title">Nhiệm vụ 3: Kỹ nghệ Prompt (Prompt Engineering) và Cơ chế Hoạt động của AI</h2>
        <p className="doc-text">
          Trong nhiệm vụ này, tôi thực hiện tối ưu hóa câu lệnh tương tác với Mô hình ngôn ngữ lớn (LLM) thông qua việc chuyển đổi từ một Prompt ngây ngô sang một Prompt áp dụng kỹ thuật Prompt Engineering nâng cao để giải bài toán Dijkstra.
        </p>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">So sánh hiệu năng câu lệnh</h3>
        <p className="doc-text">
          Prompt cải tiến không chỉ yêu cầu đoạn code mà còn bắt buộc áp dụng cấu trúc dữ liệu tối ưu, tuân thủ Google Coding Convention, định dạng chính xác tên biến đầu ra và kích hoạt cơ chế Chain-of-Thought.
        </p>

        {/* Table representation styled in Glassmorphism */}
        <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '0.75rem', fontWeight: 650 }}>Tiêu chí</th>
                <th style={{ padding: '0.75rem', fontWeight: 650 }}>Prompt ban đầu (Ngây ngô)</th>
                <th style={{ padding: '0.75rem', fontWeight: 650 }}>Prompt cải tiến (Nâng cao)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Nội dung câu lệnh</td>
                <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>"{naivePromptText}"</td>
                <td style={{ padding: '0.75rem', color: 'var(--accent-primary)', fontWeight: 500 }}>"{advancedPromptText}"</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Kết quả đầu ra</td>
                <td style={{ padding: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Trả về đoạn code chung chung, dùng mảng kề không tối ưu, độ phức tạp O(V^2), giải thích sơ sài hoặc không có.
                </td>
                <td style={{ padding: '0.75rem', color: '#16a34a', lineHeight: '1.4', fontWeight: 500 }}>
                  Trả về cấu trúc danh sách kề tối ưu O((E + V) log V) với min-heap, code sạch chuẩn Google, tên biến ans chính xác, giải thích Chain-of-Thought tường minh.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">Phân tích sâu sắc về cơ chế hoạt động</h3>
        <p className="doc-text">
          Sự khác biệt vượt trội của Prompt cải tiến nằm ở việc áp dụng ba kỹ thuật nền tảng:
        </p>
        <ul className="doc-list">
          <li><strong>Thiết lập vai trò (Role Assignment)</strong>: Ép mô hình thu hẹp vùng không gian vector xác suất (Probability vector space) của các tokens, tập trung vào phân vùng dữ liệu chứa các thuật ngữ chuyên gia và mã nguồn chất lượng cao.</li>
          <li><strong>Cung cấp ràng buộc biên (Boundary Constraints)</strong>: Quy định cụ thể thư viện (`std::priority_queue`), cấu trúc đồ thị (trọng số không âm), định dạng tên biến (`ans`), giúp triệt tiêu hiện tượng sinh từ ngẫu nhiên không kiểm soát.</li>
          <li><strong>Kích hoạt Chain-of-Thought (Chuỗi tư duy)</strong>: Bằng cách bắt AI giải thích từng bước trước khi viết code, ta ép mô hình phân bổ thêm tài nguyên tính toán vào các token trung gian. Điều này giúp giảm thiểu tối đa hiện tượng "ảo tưởng" (hallucination) thường gặp ở các mạng transformer lớn khi phải xử lý các tác vụ logic phức tạp.</li>
        </ul>
      </div>

      {/* Interactive Visualizer */}
      <div className="visualizer-container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Trình Giả Lập Prompt & Code Generator</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '1.5rem',
          alignItems: 'stretch'
        }} className="bento-grid">
          
          {/* Left Side: Prompt selector & specs */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 className="sub-section-title">
              <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Sân Chơi Prompt</span>
            </h3>

            {/* Selector buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                onClick={() => !isPlaying && setSelectedPrompt('naive')}
                style={{
                  border: '1px solid ' + (selectedPrompt === 'naive' ? '#f472b6' : 'var(--border-color)'),
                  background: selectedPrompt === 'naive' ? '#fdf2f8' : 'var(--bg-primary)',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: isPlaying ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ color: selectedPrompt === 'naive' ? '#db2777' : 'var(--text-primary)', fontSize: '0.85rem' }}>Prompt Ngây Ngô (Naive)</strong>
                  <span style={{ fontSize: '0.65rem', background: 'var(--border-color)', color: 'var(--text-muted)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>Cơ Bản</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  "{naivePromptText}"
                </p>
              </div>

              <div
                onClick={() => !isPlaying && setSelectedPrompt('advanced')}
                style={{
                  border: '1px solid ' + (selectedPrompt === 'advanced' ? 'var(--accent-primary)' : 'var(--border-color)'),
                  background: selectedPrompt === 'advanced' ? 'rgba(79, 70, 229, 0.04)' : 'var(--bg-primary)',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: isPlaying ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ color: selectedPrompt === 'advanced' ? 'var(--accent-primary)' : 'var(--text-primary)', fontSize: '0.85rem' }}>Prompt Nâng Cao (CoT)</strong>
                  <span style={{ fontSize: '0.65rem', background: '#e0e7ff', color: 'var(--accent-primary)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>Khuyên dùng</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                  "{advancedPromptText}"
                </p>
              </div>
            </div>

            <button
              className="btn-gradient"
              onClick={runSimulation}
              disabled={isPlaying}
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
            >
              <Play size={16} fill="white" />
              <span>Chạy Giả Lập</span>
            </button>

            {/* Performance Comparison */}
            <div style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Chỉ Số Tối Ưu Kết Quả</h4>
              
              {/* Speed / Complexity metric */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Độ phức tạp thuật toán</span>
                  <span style={{ color: selectedPrompt === 'advanced' ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                    {selectedPrompt === 'advanced' ? 'O((E+V) log V)' : 'O(V^2)'}
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: selectedPrompt === 'advanced' ? '#22c55e' : '#ef4444',
                    width: selectedPrompt === 'advanced' ? '95%' : '40%',
                    transition: 'width 0.5s ease-out'
                  }} />
                </div>
              </div>

              {/* Constraint Matching metric */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tuân thủ C++ Style & biến `ans`</span>
                  <span style={{ color: selectedPrompt === 'advanced' ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                    {selectedPrompt === 'advanced' ? '100%' : '0%'}
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: selectedPrompt === 'advanced' ? '#22c55e' : '#ef4444',
                    width: selectedPrompt === 'advanced' ? '100%' : '10%',
                    transition: 'width 0.5s ease-out'
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive AI Visualizer Screen */}
          <div style={{
            background: 'var(--terminal-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            boxShadow: 'var(--glass-shadow)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              background: 'var(--terminal-header)',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} style={{ color: '#818cf8' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  {selectedPrompt === 'advanced' ? 'Chain-of-Thought & Optimized Output' : 'Standard Response'}
                </span>
              </div>
              {progress > 0 && (
                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#818cf8', fontWeight: 600 }}>
                  {progress}% Complete
                </span>
              )}
            </div>

            {/* Screen Content */}
            <div style={{
              display: 'grid',
              gridTemplateRows: selectedPrompt === 'advanced' ? '150px 1fr' : '1fr',
              flex: 1,
              height: '420px'
            }}>
              {/* Thinking */}
              {selectedPrompt === 'advanced' && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '1rem',
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  lineHeight: '1.6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  color: '#94a3b8'
                }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Hệ thống suy nghĩ Chain-of-Thought (Phát sinh Token):
                  </div>
                  {thinkingOutput.map((thought, idx) => (
                    <div key={idx} style={{ animation: 'fadeIn 0.2s ease-out', color: '#cbd5e1' }}>
                      {thought}
                    </div>
                  ))}
                  {isPlaying && thinkingOutput.length < 6 && (
                    <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', animation: 'bounce 1s infinite 0.1s' }} />
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', animation: 'bounce 1s infinite 0.2s' }} />
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', animation: 'bounce 1s infinite 0.3s' }} />
                    </div>
                  )}
                </div>
              )}

              {/* Code */}
              <div style={{
                padding: '1.25rem',
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                lineHeight: '1.5',
                background: '#090d16',
                color: '#38bdf8'
              }}>
                {codeOutput ? (
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    <code>{codeOutput}</code>
                  </pre>
                ) : isPlaying ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#64748b',
                    gap: '0.5rem'
                  }}>
                    <Zap size={20} className="animate-pulse" style={{ color: '#818cf8' }} />
                    <span>Đang khởi tạo tài nguyên thuật toán...</span>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#64748b',
                    textAlign: 'center',
                    gap: '0.5rem'
                  }}>
                    <Code size={28} />
                    <span>Bấm nút "Chạy Giả Lập" để bắt đầu gửi Prompt của bạn</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
