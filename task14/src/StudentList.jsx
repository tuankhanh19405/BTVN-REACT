import React, { useState } from 'react'
import { students } from './db';

const StudentList = () => {
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('fullName');
  const [filterGrade, setFilterGrade] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const setScore = (score) => {
    if (score < 3) return "Yếu";
    else if (score < 6) return "Trung bình";     
    else if (score <= 8) return "Khá";
    else if (score < 9.5) return "Giỏi";
    else if (score <= 10) return "Xuất sắc";
    return "Không xác định"; 
  };

  const getScoreColor = (score) => {
    if (score < 3) return "#ef4444";
    else if (score < 6) return "#f97316";     
    else if (score <= 8) return "#3b82f6";
    else if (score < 9.5) return "#22c55e";
    else if (score <= 10) return "#8b5cf6";
    return "#64748b"; 
  };

  const getGradeStyle = (score) => {
    const color = getScoreColor(score);
    return {
      backgroundColor: `${color}15`,
      color: color,
      border: `1px solid ${color}30`,
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textAlign: 'center',
      whiteSpace: 'nowrap'
    };
  };

  const getAvatarColor = (name) => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Filter and sort students
  const processedStudents = students
    .filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.major.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = filterGrade === '' || setScore(student.score) === filterGrade;
      return matchesSearch && matchesGrade;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'age') return a.age - b.age;
      return a[sortBy]?.toString().localeCompare(b[sortBy]?.toString());
    });

  const grades = ["Yếu", "Trung bình", "Khá", "Giỏi", "Xuất sắc"];

  const styles = {
    container: {
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden'
    },
    header: {
      padding: '24px',
      borderBottom: '1px solid #e2e8f0',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '16px',
      opacity: 0.9,
      textAlign: 'center',
      marginBottom: '24px'
    },
    controls: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    controlGroup: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    input: {
      padding: '10px 16px',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
      outline: 'none',
      minWidth: '200px',
      backdropFilter: 'blur(10px)'
    },
    select: {
      padding: '10px 16px',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
      outline: 'none',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)'
    },
    viewToggle: {
      display: 'flex',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    viewButton: {
      padding: '8px 16px',
      border: 'none',
      background: 'transparent',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    activeViewButton: {
      backgroundColor: 'rgba(255,255,255,0.3)',
      backdropFilter: 'blur(10px)'
    },
    content: {
      padding: '24px'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px'
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    card: {
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
      borderColor: '#667eea'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px'
    },
    avatar: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: '24px',
      color: 'white',
      marginRight: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    studentInfo: {
      flex: 1
    },
    studentName: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '4px'
    },
    studentId: {
      fontSize: '14px',
      color: '#64748b',
      fontFamily: 'monospace'
    },
    cardBody: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '20px'
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column'
    },
    infoLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '4px'
    },
    infoValue: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1e293b'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      borderTop: '1px solid #f1f5f9'
    },
    scoreSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    scoreNumber: {
      fontSize: '24px',
      fontWeight: '700'
    },
    scoreOutOf: {
      fontSize: '14px',
      color: '#64748b'
    },
    listCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      backgroundColor: 'white',
      transition: 'all 0.3s ease'
    },
    listAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: '18px',
      color: 'white',
      flexShrink: 0
    },
    listContent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      flex: 1,
      alignItems: 'center'
    },
    statsBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px'
    },
    statItem: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#667eea'
    },
    statLabel: {
      fontSize: '12px',
      color: '#64748b',
      marginTop: '4px'
    }
  };

  // Calculate stats
  const totalStudents = processedStudents.length;
  const avgScore = totalStudents > 0 ? (processedStudents.reduce((sum, s) => sum + s.score, 0) / totalStudents).toFixed(1) : 0;
  const excellentCount = processedStudents.filter(s => s.score >= 9.5).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Quản Lý Chi Tiết Sinh Viên</h2>
        <p style={styles.subtitle}>Danh sách và thông tin chi tiết các sinh viên</p>
        
        <div style={styles.controls}>
          <div style={styles.controlGroup}>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sinh viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.input}
            />
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.select}
            >
              <option value="fullName">📝 Sắp xếp theo tên</option>
              <option value="score">🎯 Sắp xếp theo điểm</option>
              <option value="age">👤 Sắp xếp theo tuổi</option>
              <option value="major">📚 Sắp xếp theo ngành</option>
            </select>

            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              style={styles.select}
            >
              <option value="">🏆 Tất cả xếp loại</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewButton,
                ...(viewMode === 'grid' ? styles.activeViewButton : {})
              }}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Lưới
            </button>
            <button
              style={{
                ...styles.viewButton,
                ...(viewMode === 'list' ? styles.activeViewButton : {})
              }}
              onClick={() => setViewMode('list')}
            >
              ☰ Danh sách
            </button>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        {/* Stats Bar */}
        <div style={styles.statsBar}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{totalStudents}</div>
            <div style={styles.statLabel}>Tổng SV</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{avgScore}</div>
            <div style={styles.statLabel}>Điểm TB</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{excellentCount}</div>
            <div style={styles.statLabel}>Xuất sắc</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{processedStudents.filter(s => s.gender === 'Nam').length}</div>
            <div style={styles.statLabel}>Nam</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{processedStudents.filter(s => s.gender === 'Nữ').length}</div>
            <div style={styles.statLabel}>Nữ</div>
          </div>
        </div>

        {/* Content based on view mode */}
        <div style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {processedStudents.map((student) => {
            const avatarColor = getAvatarColor(student.fullName);
            
            if (viewMode === 'grid') {
              return (
                <div
                  key={student.id}
                  style={styles.card}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.cardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.avatar,
                      backgroundColor: avatarColor
                    }}>
                      {student.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.studentInfo}>
                      <div style={styles.studentName}>{student.fullName}</div>
                      <div style={styles.studentId}>#{student.id}</div>
                    </div>
                  </div>

                  <div style={styles.cardBody}>
                    <div style={styles.infoItem}>
                      <div style={styles.infoLabel}>Giới tính</div>
                      <div style={styles.infoValue}>
                        {student.gender === 'Nam' ? '👨' : '👩'} {student.gender}
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <div style={styles.infoLabel}>Tuổi</div>
                      <div style={styles.infoValue}>{student.age} tuổi</div>
                    </div>
                    <div style={{...styles.infoItem, gridColumn: 'span 2'}}>
                      <div style={styles.infoLabel}>Chuyên ngành</div>
                      <div style={styles.infoValue}>{student.major}</div>
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <div style={styles.scoreSection}>
                      <span style={{
                        ...styles.scoreNumber,
                        color: getScoreColor(student.score)
                      }}>
                        {student.score}
                      </span>
                      <span style={styles.scoreOutOf}>/10</span>
                    </div>
                    <span style={getGradeStyle(student.score)}>
                      {setScore(student.score)}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={student.id}
                  style={styles.listCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{
                    ...styles.listAvatar,
                    backgroundColor: avatarColor
                  }}>
                    {student.fullName.charAt(0).toUpperCase()}
                  </div>
                  
                  <div style={styles.listContent}>
                    <div>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>{student.fullName}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>#{student.id}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>
                        {student.gender === 'Nam' ? '👨' : '👩'} {student.gender}, {student.age} tuổi
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#4b5563' }}>{student.major}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: getScoreColor(student.score)
                      }}>
                        {student.score}/10
                      </span>
                    </div>
                    <div>
                      <span style={getGradeStyle(student.score)}>
                        {setScore(student.score)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {processedStudents.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#64748b'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              Không tìm thấy sinh viên
            </div>
            <div style={{ fontSize: '16px' }}>
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;