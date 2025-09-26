import React, { useState } from 'react'
import { students } from './db'

const OutStandingStudent = () => {
  const [activeTab, setActiveTab] = useState('top3');
  
  // Sort students by score (descending)
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);
  
  // Get top students
  const topStudent = sortedStudents[0];
  const top3Students = sortedStudents.slice(0, 3);
  const excellentStudents = sortedStudents.filter(student => student.score >= 9.5);
  const goodStudents = sortedStudents.filter(student => student.score >= 8.5 && student.score < 9.5);

  const getAvatarColor = (name) => {
    const colors = ['#ffd700', '#c0c0c0', '#cd7f32', '#3b82f6', '#10b981', '#f59e0b'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏆';
    }
  };

  const getRankColor = (index) => {
    switch(index) {
      case 0: return '#ffd700';
      case 1: return '#c0c0c0';
      case 2: return '#cd7f32';
      default: return '#667eea';
    }
  };

  const styles = {
    container: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
      opacity: 0.1
    },
    heroTitle: {
      fontSize: '36px',
      fontWeight: '800',
      marginBottom: '12px',
      position: 'relative',
      zIndex: 1
    },
    heroSubtitle: {
      fontSize: '18px',
      opacity: 0.9,
      marginBottom: '32px',
      position: 'relative',
      zIndex: 1
    },
    championCard: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '32px',
      border: '2px solid rgba(255, 215, 0, 0.3)',
      position: 'relative',
      zIndex: 1,
      maxWidth: '400px',
      margin: '0 auto'
    },
    championAvatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: '700',
      color: '#1a202c',
      margin: '0 auto 20px',
      boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
      border: '4px solid rgba(255, 255, 255, 0.3)'
    },
    championName: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    championScore: {
      fontSize: '48px',
      fontWeight: '800',
      color: '#ffd700',
      marginBottom: '8px'
    },
    championDetails: {
      fontSize: '16px',
      opacity: 0.9,
      lineHeight: '1.5'
    },
    crownIcon: {
      position: 'absolute',
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '32px',
      animation: 'float 3s ease-in-out infinite'
    },
    tabNavigation: {
      display: 'flex',
      background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0'
    },
    tab: {
      flex: 1,
      padding: '16px 24px',
      textAlign: 'center',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      color: '#64748b',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    activeTab: {
      color: '#667eea',
      backgroundColor: 'white',
      borderRadius: '12px 12px 0 0',
      transform: 'translateY(1px)',
      boxShadow: '0 -2px 10px rgba(102, 126, 234, 0.1)'
    },
    tabIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      borderRadius: '3px 3px 0 0'
    },
    content: {
      padding: '32px'
    },
    podiumContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
      gap: '20px',
      marginBottom: '40px',
      minHeight: '300px'
    },
    podiumPlace: {
      textAlign: 'center',
      position: 'relative'
    },
    podiumBase: {
      borderRadius: '12px 12px 0 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      minWidth: '140px'
    },
    firstPlace: {
      height: '200px',
      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
      order: 2
    },
    secondPlace: {
      height: '160px',
      background: 'linear-gradient(135deg, #c0c0c0, #e8e8e8)',
      order: 1
    },
    thirdPlace: {
      height: '120px',
      background: 'linear-gradient(135deg, #cd7f32, #daa520)',
      order: 3
    },
    podiumAvatar: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    },
    podiumName: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '8px'
    },
    podiumScore: {
      fontSize: '20px',
      fontWeight: '800',
      color: '#1a202c'
    },
    rankIcon: {
      position: 'absolute',
      top: '-15px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '28px',
      zIndex: 10
    },
    studentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    },
    studentCard: {
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    },
    studentCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
      borderColor: '#667eea'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    cardAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '700',
      color: 'white',
      marginRight: '16px'
    },
    cardInfo: {
      flex: 1
    },
    cardName: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '4px'
    },
    cardId: {
      fontSize: '12px',
      color: '#64748b',
      fontFamily: 'monospace'
    },
    cardBody: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '16px'
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column'
    },
    infoLabel: {
      fontSize: '11px',
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
    cardScore: {
      textAlign: 'center',
      padding: '16px',
      background: 'linear-gradient(135deg, #667eea15, #764ba215)',
      borderRadius: '12px',
      border: '1px solid #667eea20'
    },
    scoreNumber: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#667eea',
      marginBottom: '4px'
    },
    scoreBadge: {
      backgroundColor: '#667eea15',
      color: '#667eea',
      border: '1px solid #667eea30',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    },
    statCard: {
      background: 'linear-gradient(135deg, #667eea15, #764ba215)',
      border: '1px solid #667eea20',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#667eea',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500'
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'top3':
        return (
          <div>
            {/* Podium */}
            <div style={styles.podiumContainer}>
              {top3Students.map((student, index) => (
                <div key={student.id} style={styles.podiumPlace}>
                  <div style={styles.rankIcon}>{getRankIcon(index)}</div>
                  <div style={{
                    ...styles.podiumBase,
                    ...(index === 0 ? styles.firstPlace : 
                        index === 1 ? styles.secondPlace : styles.thirdPlace)
                  }}>
                    <div style={{
                      ...styles.podiumAvatar,
                      backgroundColor: getAvatarColor(student.fullName)
                    }}>
                      {student.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.podiumName}>{student.fullName}</div>
                    <div style={styles.podiumScore}>{student.score}/10</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'excellent':
        return (
          <div>
            <div style={styles.stats}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{excellentStudents.length}</div>
                <div style={styles.statLabel}>Sinh viên xuất sắc</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>
                  {excellentStudents.length > 0 ? 
                    (excellentStudents.reduce((sum, s) => sum + s.score, 0) / excellentStudents.length).toFixed(1) : 0}
                </div>
                <div style={styles.statLabel}>Điểm TB nhóm</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>
                  {excellentStudents.filter(s => s.score === 10).length}
                </div>
                <div style={styles.statLabel}>Điểm 10 tuyệt đối</div>
              </div>
            </div>

            <div style={styles.studentGrid}>
              {excellentStudents.map((student, index) => (
                <div
                  key={student.id}
                  style={styles.studentCard}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.studentCardHover)}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.cardAvatar,
                      backgroundColor: getAvatarColor(student.fullName)
                    }}>
                      {student.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.cardInfo}>
                      <div style={styles.cardName}>{student.fullName}</div>
                      <div style={styles.cardId}>#{student.id}</div>
                    </div>
                    <div style={{ fontSize: '24px' }}>{getRankIcon(index)}</div>
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

                  <div style={styles.cardScore}>
                    <div style={styles.scoreNumber}>{student.score}</div>
                    <span style={styles.scoreBadge}>XUẤT SẮC</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'good':
        return (
          <div>
            <div style={styles.stats}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{goodStudents.length}</div>
                <div style={styles.statLabel}>Sinh viên giỏi</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>
                  {goodStudents.length > 0 ? 
                    (goodStudents.reduce((sum, s) => sum + s.score, 0) / goodStudents.length).toFixed(1) : 0}
                </div>
                <div style={styles.statLabel}>Điểm TB nhóm</div>
              </div>
            </div>

            <div style={styles.studentGrid}>
              {goodStudents.map((student) => (
                <div
                  key={student.id}
                  style={styles.studentCard}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.studentCardHover)}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.cardAvatar,
                      backgroundColor: getAvatarColor(student.fullName)
                    }}>
                      {student.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.cardInfo}>
                      <div style={styles.cardName}>{student.fullName}</div>
                      <div style={styles.cardId}>#{student.id}</div>
                    </div>
                    <div style={{ fontSize: '20px' }}>🏆</div>
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

                  <div style={styles.cardScore}>
                    <div style={styles.scoreNumber}>{student.score}</div>
                    <span style={styles.scoreBadge}>GIỎI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroBackground}></div>
        <h1 style={styles.heroTitle}>🏆 SINH VIÊN XUẤT SẮC</h1>
        <p style={styles.heroSubtitle}>Vinh danh những tài năng xuất chúng</p>
        
        <div style={styles.championCard}>
          <div style={styles.crownIcon}>👑</div>
          <div style={styles.championAvatar}>
            {topStudent.fullName.charAt(0).toUpperCase()}
          </div>
          <div style={styles.championName}>{topStudent.fullName}</div>
          <div style={styles.championScore}>{topStudent.score}/10</div>
          <div style={styles.championDetails}>
            #{topStudent.id} • {topStudent.gender} • {topStudent.age} tuổi<br/>
            {topStudent.major}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <nav style={styles.tabNavigation}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'top3' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('top3')}
        >
          🥇 Top 3 Xuất Sắc
          {activeTab === 'top3' && <div style={styles.tabIndicator} />}
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'excellent' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('excellent')}
        >
          ⭐ Sinh Viên Xuất Sắc ({excellentStudents.length})
          {activeTab === 'excellent' && <div style={styles.tabIndicator} />}
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'good' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('good')}
        >
          🏆 Sinh Viên Giỏi ({goodStudents.length})
          {activeTab === 'good' && <div style={styles.tabIndicator} />}
        </button>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        {renderTabContent()}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default OutStandingStudent;