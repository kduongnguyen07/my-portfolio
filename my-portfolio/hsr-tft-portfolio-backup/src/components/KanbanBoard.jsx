import React, { useState } from 'react';
import { KanbanSquare, GitPullRequest, ArrowRight, Server, Play, RefreshCw, GitBranch, CheckCircle } from 'lucide-react';

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Thiết kế cấu trúc cây thư mục workspace', status: 'done', priority: 'High', assignee: 'Khánh' },
    { id: 2, title: 'Lọc tài liệu quy hoạch động qua Google Search', status: 'done', priority: 'Medium', assignee: 'Khánh' },
    { id: 3, title: 'Tối ưu hóa Dijkstra C++ qua Prompt Engineering', status: 'review', priority: 'High', assignee: 'Khánh' },
    { id: 4, title: 'Tích hợp Git Flow & Bảng Kanban GitHub', status: 'in-progress', priority: 'High', assignee: 'Khánh' },
    { id: 5, title: 'Phát triển React UI Premium & hiệu ứng Canvas', status: 'in-progress', priority: 'Medium', assignee: 'Khánh' },
    { id: 6, title: 'Đánh giá Đạo đức AI & Triết lý dữ liệu học tập', status: 'todo', priority: 'Low', assignee: 'Khánh' }
  ]);

  const [deploymentLog, setDeploymentLog] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);

  const moveTask = (taskId, nextStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus } : t));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(t => t.status === status);
  };

  const handleDeployTrigger = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setDeploymentLog([]);

    const logSteps = [
      '🚀 [Vercel Webhook]: Phát hiện sự kiện git merge trên nhánh main...',
      '🛠️ [Build Tool]: Đang phân tích mã nguồn React + Vite...',
      '📦 [Bundler]: Đang tối ưu hóa tài nguyên tĩnh (static assets)...',
      '⚡ [Vercel Edge]: Đang phân phối tệp lên hạ tầng máy chủ đám mây...',
      '🎉 [Deployment]: Dự án đã deploy thành công! Bản build mới nhất đang online!'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logSteps.length) {
        setDeploymentLog(prev => [...prev, logSteps[step]]);
        step++;
      } else {
        clearInterval(interval);
        setIsDeploying(false);
        setTasks(prev => prev.map(t => t.status === 'review' ? { ...t, status: 'done' } : t));
      }
    }, 1000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Document Content */}
      <div className="doc-header">
        <h2 className="doc-title">Nhiệm vụ 4: Tối ưu hóa quy trình cộng tác trực tuyến thông qua công cụ quản trị</h2>
        <p className="doc-text">
          Phối hợp làm việc nhóm trực tuyến đòi hỏi tính minh bạch và khả năng theo dõi tiến độ theo thời gian thực (Real-time tracking) để giảm thiểu tối đa chi phí giao tiếp (Communication overhead). Tôi đã nghiên cứu và tích hợp hệ thống quản trị Kanban thông qua GitHub Projects.
        </p>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">Các tính năng nâng cao được áp dụng</h3>
        <ul className="doc-list">
          <li><strong>Phân rã tác vụ (Task Breakdown)</strong>: Mỗi nhiệm vụ lớn được chia nhỏ thành các Issue cụ thể, gắn nhãn (Labels) phân loại độ ưu tiên (High, Medium, Low) và loại công việc (Bug, Feature, Documentation).</li>
          <li><strong>Ràng buộc trách nhiệm (Accountability)</strong>: Sử dụng tính năng Assignees để định danh chính xác cá nhân chịu trách nhiệm cho từng khối lượng công việc, loại bỏ hoàn toàn sự chồng chéo hoặc bỏ sót nhiệm vụ.</li>
          <li><strong>Tự động hóa luồng công việc (Workflow Automation)</strong>: Thiết lập trigger tự động chuyển trạng thái thẻ: Khi một Pull Request được tạo trên GitHub, thẻ tác vụ tương ứng sẽ tự động chuyển từ trạng thái In Progress sang Review / QA, và tự động chuyển về Done khi mã nguồn được merge thành công vào nhánh main.</li>
        </ul>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">Mô tả quy trình làm việc nhóm tối ưu</h3>
        <p className="doc-text">
          Quy trình phối hợp được chuẩn hóa qua 4 bước khép kín:
        </p>
        <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <li><strong>1. Lập kế hoạch (Sprint Planning)</strong>: Họp trực tuyến ngắn để thống nhất các đầu việc, đưa toàn bộ vào cột Todo.</li>
          <li><strong>2. Thực thi phân nhánh (Branching Strategy)</strong>: Thành viên kéo task về cột In Progress, tạo nhánh Git riêng biệt (ví dụ: feature/dijkstra), tuyệt đối không code trực tiếp trên nhánh main.</li>
          <li><strong>3. Đánh giá chéo (Code Review)</strong>: Khi hoàn thành, đẩy PR lên cột Review. Các thành viên khác tiến hành kiểm thử chéo và nhận xét trực tiếp trên dòng code.</li>
          <li><strong>4. Tích hợp liên tục (CI)</strong>: Sau khi được duyệt, code được tích hợp vào hệ thống, Vercel tự động bắt sự kiện và deploy bản build mới nhất lên môi trường production.</li>
        </ol>
      </div>

      {/* Interactive visualizer */}
      <div className="visualizer-container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Trình Giả Lập GitHub Projects Board & Vercel CI/CD</span>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <KanbanSquare size={18} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>GitHub Board: Sprint #1</span>
            </div>

            <button
              className="btn-outline"
              onClick={handleDeployTrigger}
              disabled={isDeploying}
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {isDeploying ? <RefreshCw size={12} className="animate-spin" /> : <GitPullRequest size={12} />}
              <span>Merge PR & Deploy Vercel</span>
            </button>
          </div>

          {/* Board Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            alignItems: 'start'
          }} className="bento-grid">
            
            {['todo', 'in-progress', 'review', 'done'].map(status => {
              const titleMap = {
                'todo': { label: 'Cần làm (Todo)', color: 'var(--text-muted)' },
                'in-progress': { label: 'Đang thực hiện', color: 'var(--accent-primary)' },
                'review': { label: 'Đánh giá (Review)', color: '#db2777' },
                'done': { label: 'Đã xong (Done)', color: '#16a34a' }
              };
              
              const columnTasks = getTasksByStatus(status);

              return (
                <div
                  key={status}
                  style={{
                    background: 'rgba(10, 15, 30, 0.4)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '0.75rem',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '2px solid ' + titleMap[status].color,
                    paddingBottom: '0.4rem',
                    marginBottom: '0.25rem'
                  }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 650, color: 'var(--text-primary)' }}>
                      {titleMap[status].label}
                    </span>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '999px',
                      padding: '0.1rem 0.4rem',
                      fontSize: '0.7rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 600
                    }}>
                      {columnTasks.length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {columnTasks.map(task => (
                      <div
                        key={task.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '0.75rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease-out',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{
                            background: task.priority === 'High' ? 'rgba(239,68,68,0.15)' : task.priority === 'Medium' ? 'rgba(234,179,8,0.15)' : 'rgba(255,255,255,0.05)',
                            color: task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#eab308' : 'var(--text-muted)',
                            fontSize: '0.6rem',
                            padding: '0.1rem 0.35rem',
                            borderRadius: '4px',
                            fontWeight: 700
                          }}>
                            {task.priority}
                          </span>
                          
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                            {task.assignee}
                          </span>
                        </div>
                        
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 550, lineHeight: '1.4' }}>
                          {task.title}
                        </p>

                        {status !== 'done' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextMap = { 'todo': 'in-progress', 'in-progress': 'review', 'review': 'done' };
                              moveTask(task.id, nextMap[status]);
                            }}
                            style={{
                              alignSelf: 'flex-end',
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--accent-primary)',
                              fontSize: '0.65rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              cursor: 'pointer',
                              marginTop: '0.25rem',
                              fontWeight: 500
                            }}
                          >
                            <span>Tiến cấp</span>
                            <ArrowRight size={10} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Git flow pipeline visualization */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: '1.5rem',
            alignItems: 'start'
          }} className="bento-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <GitBranch size={16} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 650 }}>Sơ đồ Phân Nhánh Git Flow</span>
              </div>
              
              <div style={{
                background: 'rgba(10, 15, 30, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                lineHeight: '1.5'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 'bold' }}>[main]</span>
                  <div style={{ flex: 1, height: '2px', background: '#16a34a', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '10%', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
                    <div style={{ position: 'absolute', right: '10%', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', animation: 'ping 1.5s infinite' }} />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Production</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>[feature/dijkstra]</span>
                  <div style={{ flex: 1, height: '2px', background: 'var(--accent-primary)', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '20%', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                    <div style={{ position: 'absolute', right: '20%', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Development</span>
                </div>
              </div>
            </div>

            {/* Simulated Deployment Server Logs */}
            <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                <Server size={14} style={{ color: '#4ade80' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', fontFamily: 'monospace' }}>Vercel Logs Terminal</span>
              </div>
              
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                lineHeight: '1.5',
                height: '110px',
                overflowY: 'auto',
                color: '#38bdf8',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                {deploymentLog.length > 0 ? (
                  deploymentLog.map((log, index) => (
                    <div key={index} style={{ animation: 'fadeIn 0.2s ease-out' }}>{log}</div>
                  ))
                ) : isDeploying ? (
                  <div>Đang kết nối server...</div>
                ) : (
                  <div style={{ color: '#64748b', textAlign: 'center', marginTop: '1.5rem' }}>
                    Hạ tầng Vercel đang ở chế độ chờ.
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
