import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Folder, File, ArrowRight, Play, CheckCircle } from 'lucide-react';

const mockFileSystem = {
  name: 'workspace',
  type: 'dir',
  children: {
    '01_courses': {
      type: 'dir',
      children: {
        'discrete_math': {
          type: 'dir',
          children: {
            'syllabus.txt': { type: 'file', content: 'Đề cương môn Toán rời rạc. Các nội dung chính:\n- Lý thuyết đồ thị & Dijkstra\n- Đại số Boole & Tối ưu mạch logic\n- Bài toán đếm và hệ thức truy hồi' },
            'notes.txt': { type: 'file', content: 'Ghi chú học tập:\nQuy hoạch động và tìm đường đi ngắn nhất có mối liên hệ mật thiết qua cấu trúc con tối ưu (Optimal Substructure).' }
          }
        },
        'calculus_2': {
          type: 'dir',
          children: {
            'info.txt': { type: 'file', content: 'Giải tích 2 (Calculus 2):\n- Tích phân nhiều biến (tích phân kép, tích phân đường)\n- Lý thuyết chuỗi số và chuỗi hàm\n- Phương trình vi phân cơ bản áp dụng trong vật lý' }
          }
        },
        'general_physics': {
          type: 'dir',
          children: {
            'lab1_report.txt': { type: 'file', content: 'Báo cáo thực hành Vật lý đại cương:\nĐo gia tốc trọng trường g bằng con lắc đơn.\nKết quả thực nghiệm: g = 9.781 m/s^2.\nSai số hệ thống: 0.015 m/s^2.' }
          }
        },
        'digital_tech': {
          type: 'dir',
          children: {
            '01_docs': {
              type: 'dir',
              children: {
                'readme.txt': { type: 'file', content: 'Học liệu môn Công nghệ số và Ứng dụng AI.\nGiảng viên hướng dẫn: Bộ môn Khoa học Máy tính - UET.' }
              }
            },
            '02_assignments': {
              type: 'dir',
              children: {
                'lab1.py': { type: 'file', content: '# Lab 1: Python basics\nimport sys\nprint("Hello digital world from Python " + sys.version)' }
              }
            },
            '03_portfolio': {
              type: 'dir',
              children: {
                'index.html': { type: 'file', content: '<!-- Trang cá nhân chính của Khánh -->\n<div id="root"></div>' },
                'config.json': { type: 'file', content: '{\n  "theme": "dark",\n  "framework": "React",\n  "mssv": "25020210"\n}' }
              }
            }
          }
        }
      }
    },
    '02_competitive_programming': {
      type: 'dir',
      children: {
        'vnoi': {
          type: 'dir',
          children: {
            'problems.txt': { type: 'file', content: 'Danh sách bài tập VNOI đang luyện tập:\n- QBMAX: Quy hoạch động bảng số\n- LIS: Dãy con tăng dài nhất\n- NKLINEUP: Segment Tree truy vấn min-max' }
          }
        },
        'codeforces': {
          type: 'dir',
          children: {
            'rating_goals.txt': { type: 'file', content: 'Mục tiêu rating Codeforces năm nay:\n- Đạt mức Expert (Rating 1600+)\n- Giải quyết tối thiểu 5 bài tập Div.2 A-C mỗi tuần.' }
          }
        },
        'templates': {
          type: 'dir',
          children: {
            'dijkstra.cpp': { type: 'file', content: '// Dijkstra Template C++\n#include <bits/stdc++.h>\nusing namespace std;\nconst int INF = 1e9;\n...' }
          }
        }
      }
    },
    '03_ai_research': {
      type: 'dir',
      children: {
        'raw_data': {
          type: 'dir',
          children: {
            'dataset_info.txt': { type: 'file', content: 'Mô tả bộ dữ liệu:\n- Kích thước: 10,000 dòng đối thoại tiếng Việt chất lượng cao\n- Định dạng: JSONLines\n- Bản quyền: Creative Commons (CC-BY-4.0)\n- Nguồn: Thu thập có kiểm định (Human-in-the-loop)' }
          }
        },
        'src': {
          type: 'dir',
          children: {
            'train.py': { type: 'file', content: '# Training script for LLM\nimport torch\nimport transformers\nprint("Khởi chạy huấn luyện mô hình ngôn ngữ...")' }
          }
        },
        'models': {
          type: 'dir',
          children: {
            'config.json': { type: 'file', content: '{\n  "model_type": "transformer",\n  "num_layers": 12,\n  "hidden_size": 768,\n  "num_heads": 12,\n  "vocab_size": 50257\n}' }
          }
        }
      }
    }
  }
};

export default function TerminalVisualizer() {
  const [currentPath, setCurrentPath] = useState(['workspace']);
  const [inputVal, setInputVal] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'Chào mừng bạn đến với Terminal Giả Lập Hệ Thống Tệp.', type: 'info' },
    { text: 'Gõ "help" để xem danh sách các lệnh được hỗ trợ, hoặc click vào Cây Thư Mục bên trái để tương tác nhanh.', type: 'info' },
    { text: 'Lưu ý: Bộ CD đường dẫn thông minh đã được cấu hình (hỗ trợ cả các ký tự ~/ và đường dẫn tuyệt đối).', type: 'info' },
    { text: '', type: 'empty' }
  ]);
  const [expandedNodes, setExpandedNodes] = useState({ 'workspace': true, 'workspace/01_courses': true, 'workspace/01_courses/digital_tech': true });

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const getNodeByPath = (pathArray) => {
    let current = mockFileSystem;
    for (let i = 1; i < pathArray.length; i++) {
      if (current.children && current.children[pathArray[i]]) {
        current = current.children[pathArray[i]];
      } else {
        return null;
      }
    }
    return current;
  };

  const getFullPathString = (pathArr) => {
    return pathArr.join('/');
  };

  const toggleExpand = (nodePath) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodePath]: !prev[nodePath]
    }));
  };

  const resolveTargetDirectory = (argString) => {
    let pathSegments = argString.trim().split('/');
    let tempPath = [...currentPath];

    if (pathSegments[0] === '~' || pathSegments[0] === '') {
      tempPath = ['workspace'];
      pathSegments.shift();
    } else if (pathSegments[0] === 'workspace') {
      tempPath = ['workspace'];
      pathSegments.shift();
    }

    let valid = true;
    for (const seg of pathSegments) {
      if (!seg || seg === '.') continue;
      if (seg === '..') {
        if (tempPath.length > 1) tempPath.pop();
      } else {
        const currNode = getNodeByPath(tempPath);
        if (currNode && currNode.children && currNode.children[seg] && currNode.children[seg].type === 'dir') {
          tempPath.push(seg);
        } else {
          valid = false;
          break;
        }
      }
    }

    return { valid, resolvedPath: tempPath };
  };

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    const newHistory = [...terminalHistory, { text: `khanh@uet-portfolio:${getFullPathString(currentPath)}$ ${trimmed}`, type: 'command' }];

    switch (command) {
      case 'help':
        newHistory.push({
          text: 'Lệnh hỗ trợ:\n' +
            '  ls           Liệt kê nội dung thư mục hiện tại\n' +
            '  cd <dir>     Chuyển thư mục (hỗ trợ cd ~/01_courses/discrete_math hoặc cd ..)\n' +
            '  cat <file>   Hiển thị nội dung tệp tin\n' +
            '  tree         Vẽ cây thư mục đầy đủ dạng ASCII\n' +
            '  clear        Xóa sạch màn hình terminal\n' +
            '  help         Hiển thị bảng trợ giúp này',
          type: 'output'
        });
        break;

      case 'clear':
        setTerminalHistory([]);
        setInputVal('');
        return;

      case 'ls':
        const currentNode = getNodeByPath(currentPath);
        if (currentNode && currentNode.type === 'dir' && currentNode.children) {
          const items = Object.entries(currentNode.children).map(([name, val]) => {
            return val.type === 'dir' ? `\u001b[34m${name}/\u001b[0m` : name;
          });
          newHistory.push({
            text: items.length > 0 ? items.join('    ') : '(Thư mục trống)',
            type: 'output',
            isRich: true
          });
        }
        break;

      case 'cd':
        if (!arg) {
          setCurrentPath(['workspace']);
          newHistory.push({ text: 'Đã về thư mục gốc workspace.', type: 'output' });
        } else {
          const { valid, resolvedPath } = resolveTargetDirectory(arg);
          if (valid) {
            setCurrentPath(resolvedPath);
          } else {
            newHistory.push({ text: `cd: không tìm thấy thư mục: ${arg}`, type: 'error' });
          }
        }
        break;

      case 'cat':
        if (!arg) {
          newHistory.push({ text: 'Sử dụng: cat <tên_tệp_tin>', type: 'error' });
        } else {
          const pathSegments = arg.trim().split('/');
          const fileName = pathSegments[pathSegments.length - 1];
          const dirPart = pathSegments.slice(0, -1).join('/');
          
          let targetDir = [...currentPath];
          let dirValid = true;

          if (dirPart) {
            const { valid, resolvedPath } = resolveTargetDirectory(dirPart);
            dirValid = valid;
            targetDir = resolvedPath;
          }

          if (dirValid) {
            const finalNode = getNodeByPath(targetDir);
            if (finalNode && finalNode.children && finalNode.children[fileName] && finalNode.children[fileName].type === 'file') {
              newHistory.push({ text: finalNode.children[fileName].content, type: 'output' });
            } else {
              newHistory.push({ text: `cat: ${arg}: Không tìm thấy tệp tin hoặc đây là thư mục`, type: 'error' });
            }
          } else {
            newHistory.push({ text: `cat: ${arg}: Không tìm thấy đường dẫn dẫn đến tệp`, type: 'error' });
          }
        }
        break;

      case 'tree':
        const buildTreeString = (node, prefix = '') => {
          let result = '';
          if (!node.children) return result;
          const entries = Object.entries(node.children);
          entries.forEach(([name, val], index) => {
            const isLast = index === entries.length - 1;
            const branch = isLast ? '└── ' : '├── ';
            const displayName = val.type === 'dir' ? `${name}/` : name;
            result += `${prefix}${branch}${displayName}\n`;
            
            if (val.type === 'dir') {
              const childPrefix = prefix + (isLast ? '    ' : '│   ');
              result += buildTreeString(val, childPrefix);
            }
          });
          return result;
        };
        newHistory.push({
          text: 'workspace/\n' + buildTreeString(mockFileSystem),
          type: 'output'
        });
        break;

      default:
        newHistory.push({ text: `bash: không tìm thấy lệnh: ${command}. Gõ "help" để xem hướng dẫn.`, type: 'error' });
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const renderTreeNodes = (nodeName, nodeObj, depth = 0, currentParentPath = 'workspace') => {
    const nodePath = depth === 0 ? nodeName : `${currentParentPath}/${nodeName}`;
    const isDir = nodeObj.type === 'dir';
    const isExpanded = expandedNodes[nodePath];
    const hasChildren = isDir && Object.keys(nodeObj.children || {}).length > 0;

    return (
      <div key={nodePath} style={{ marginLeft: depth > 0 ? '16px' : '0' }}>
        <div
          onClick={() => {
            if (isDir) {
              toggleExpand(nodePath);
              const relativePath = nodePath.replace('workspace/', '');
              if (nodePath === 'workspace') {
                executeCommand('cd ~');
              } else {
                executeCommand(`cd ~/${relativePath}`);
              }
            } else {
              const relativePath = nodePath.replace('workspace/', '');
              executeCommand(`cat ~/${relativePath}`);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            background: getFullPathString(currentPath) === nodePath ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
            color: getFullPathString(currentPath) === nodePath ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontSize: '0.9rem',
            transition: 'background var(--transition-fast)',
            border: getFullPathString(currentPath) === nodePath ? '1px solid rgba(79, 70, 229, 0.15)' : '1px solid transparent',
            fontWeight: getFullPathString(currentPath) === nodePath ? 600 : 400
          }}
          onMouseEnter={e => {
            if (getFullPathString(currentPath) !== nodePath) e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
          }}
          onMouseLeave={e => {
            if (getFullPathString(currentPath) !== nodePath) e.currentTarget.style.background = 'transparent';
          }}
        >
          {isDir ? (
            <Folder
              size={16}
              style={{
                color: isExpanded ? 'var(--accent-primary)' : 'var(--text-muted)',
                fill: isExpanded ? 'rgba(79, 70, 229, 0.1)' : 'none'
              }}
            />
          ) : (
            <File size={16} style={{ color: 'var(--text-muted)' }} />
          )}
          <span style={{
            fontFamily: isDir ? 'var(--font-sans)' : 'monospace',
            fontWeight: isDir ? 500 : 400
          }}>
            {nodeName}
          </span>
        </div>

        {isDir && isExpanded && hasChildren && (
          <div style={{
            borderLeft: '1px dashed var(--border-color)',
            marginLeft: '8px',
            paddingLeft: '4px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {Object.entries(nodeObj.children).map(([name, val]) =>
              renderTreeNodes(name, val, depth + 1, nodePath)
            )}
          </div>
        )}
      </div>
    );
  };

  const handleCommandShortcut = (cmd) => {
    executeCommand(cmd);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Document Academic Text Content integrated */}
      <div className="doc-header">
        <h2 className="doc-title">Nhiệm vụ 1: Quản lý hệ thống tệp và cấu trúc dữ liệu khoa học</h2>
        <p className="doc-text">
          Để cấu trúc hóa toàn bộ học liệu, bài tập và mã nguồn trong học kỳ này, tôi thiết lập một mô hình cây thư mục cục bộ mang tính nhất quán và logic cao, tối ưu cho cả làm việc cá nhân lẫn đồng bộ hóa qua Git.
        </p>
      </div>

      <div className="doc-section">
        <h3 className="doc-subtitle">Sơ đồ cây thư mục (ASCII Tree) và Quy tắc thiết kế</h3>
        <p className="doc-text">
          Hệ thống được tổ chức thành 3 phân vùng lớn:
        </p>
        <ul className="doc-list">
          <li><strong>01_courses/</strong>: Nơi lưu trữ tài liệu, đề cương bài học lý thuyết và bài tập thực hành trên lớp (giải tích, toán rời rạc, công nghệ số).</li>
          <li><strong>02_competitive_programming/</strong>: Lưu trữ lời giải và mã nguồn thuật toán luyện tập trên các nền tảng lập trình thi đấu (VNOI, Codeforces).</li>
          <li><strong>03_ai_research/</strong>: Các dự án nghiên cứu về Trí tuệ Nhân tạo, bao gồm tệp dữ liệu thô, mã nguồn huấn luyện mô hình và cấu hình trọng số.</li>
        </ul>
      </div>

      {/* Interactive Visualizer Container */}
      <div className="visualizer-container">
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Trình Giả Lập Hệ Thống Tệp Tương Tác</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '1.5rem',
          alignItems: 'stretch'
        }} className="bento-grid">
          
          {/* File Explorer */}
          <div className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxHeight: '450px',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '0.75rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              <span>Cây Thư Mục workspace/</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {renderTreeNodes('workspace', mockFileSystem)}
            </div>
          </div>

          {/* Terminal */}
          <div style={{
            background: 'var(--terminal-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            boxShadow: 'var(--glass-shadow)',
            display: 'flex',
            flexDirection: 'column',
            height: '450px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'var(--terminal-header)',
              padding: '0.6rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} style={{ color: '#818cf8' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  khanh@uet-portfolio: {getFullPathString(currentPath)}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
            </div>

            {/* Quick Suggestions */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.08)',
              padding: '0.4rem 1rem',
              display: 'flex',
              gap: '0.4rem',
              flexWrap: 'wrap',
              borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Thử gõ hoặc click nhanh:</span>
              {['ls', 'tree', 'clear'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => handleCommandShortcut(cmd)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '4px',
                    color: '#e2e8f0',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.4rem',
                    cursor: 'pointer'
                  }}
                >
                  {cmd}
                </button>
              ))}
              <button
                onClick={() => handleCommandShortcut('cd ~/01_courses/discrete_math')}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '4px',
                  color: '#e2e8f0',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.4rem',
                  cursor: 'pointer'
                }}
              >
                cd ~/01_courses/discrete_math
              </button>
            </div>

            {/* Screen */}
            <div style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              color: '#e2e8f0'
            }}>
              {terminalHistory.map((item, idx) => {
                if (item.type === 'empty') return <div key={idx} style={{ height: '0.5rem' }} />;
                
                let color = '#e2e8f0';
                if (item.type === 'command') color = '#4ade80';
                if (item.type === 'error') color = '#f87171';
                if (item.type === 'info') color = '#94a3b8';
                
                if (item.isRich) {
                  return (
                    <div key={idx} style={{ whiteSpace: 'pre-wrap' }}>
                      {item.text.split('    ').map((word, wIdx) => {
                        const isFolder = word.startsWith('\u001b[34m');
                        const cleanWord = word.replace(/\u001b\[\d+m/g, '');
                        return (
                          <span
                            key={wIdx}
                            style={{
                              marginRight: '1.5rem',
                              color: isFolder ? '#818cf8' : 'white',
                              fontWeight: isFolder ? 'bold' : 'normal'
                            }}
                          >
                            {cleanWord}
                          </span>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <div key={idx} style={{ color, whiteSpace: 'pre-wrap' }}>
                    {item.text}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Input */}
            <div style={{
              background: 'rgba(0,0,0,0.15)',
              borderTop: '1px solid rgba(255, 255, 255, 0.03)',
              padding: '0.6rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ArrowRight size={12} style={{ color: '#818cf8' }} />
              <span style={{ fontFamily: 'monospace', color: '#4ade80', fontSize: '0.85rem' }}>
                $
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập lệnh bash (ls, tree, cd, cat)..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  width: '100%'
                }}
              />
              <button
                onClick={() => executeCommand(inputVal)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#818cf8',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <Play size={14} fill="#818cf8" style={{ color: '#818cf8' }} />
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
