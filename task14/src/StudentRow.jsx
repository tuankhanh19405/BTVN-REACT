import React, { useState } from 'react'
import { students } from './db';

const StudentRow = () => {
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterMajor, setFilterMajor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const setColor = (score) => {
    if (score < 3) return "#ef4444";
    else if (score < 6) return "#f97316";     
    else if (score <= 8) return "#3b82f6";
    else if (score < 9.5) return "#22c55e";
    else if (score <= 10) return "#8b5cf6";
    return "#1f2937"; 
  };
  
  const setScore = (score) => {
    if (score < 3) return "Yếu";
    else if (score < 6) return "Trung bình";     
    else if (score <= 8) return "Khá";
    else if (score < 9.5) return "Giỏi";
    else if (score <= 10) return "Xuất sắc";
    return "Không xác định"; 
  };

  const getBadgeStyle = (score) => {
    const color = setColor(score);
    return {
      backgroundColor: `${color}15`,
      color: color,
      border: `1px solid ${color}30`,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textAlign: 'center',
      whiteSpace: 'nowrap'
    };
  };

  // Get unique majors for filter
  const uniqueMajors = [...new Set(students.map(student => student.major))];

  // Filter and sort students
  const filteredAndSortedStudents = students
    .filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMajor = filterMajor === '' || student.major === filterMajor;
      return matchesSearch && matchesMajor;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const styles = {
    container: {
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    header: {
      padding: '24px',
      borderBottom: '1px solid #e2e8f0'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '16px'
    },
    filters: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    searchInput: {
      padding: '10px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      minWidth: '250px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
    },
    select: {
      padding: '10px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      outline: 'none',
      cursor: 'pointer'
    },
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    },
    th: {
      backgroundColor: '#f8fafc',
      padding: '16px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e2e8f0',
      cursor: 'pointer',
      userSelect: 'none',
      position: 'relative',
      whiteSpace: 'nowrap'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #f1f5f9',
      verticalAlign: 'middle'
    },
    tr: {
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#f8fafc'
      }
    },
    sortIcon: {
      marginLeft: '8px',
      fontSize: '12px',
      opacity: 0.6
    },
    activeSortIcon: {
      opacity: 1,
      color: '#3b82f6'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      color: '#4b5563',
      marginRight: '12px'
    },
    studentInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    studentDetails: {
      display: 'flex',
      flexDirection: 'column'
    },
    studentName: {
      fontWeight: '600',
      color: '#1e293b'
    },
    studentId: {
      fontSize: '12px',
      color: '#64748b'
    },
    scoreDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    scoreNumber: {
      fontWeight: '700',
      fontSize: '16px'
    },
    genderBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    maleGender: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8'
    },
    femaleGender: {
      backgroundColor: '#fce7f3',
      color: '#be185d'
    },
    majorTag: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500'
    },
    resultCount: {
      color: '#64748b',
      fontSize: '14px',
      marginBottom: '16px'
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return '⇅';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Danh Sách Sinh Viên</h2>
        
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên hoặc mã sinh viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          
          <select
            value={filterMajor}
            onChange={(e) => setFilterMajor(e.target.value)}
            style={styles.select}
          >
            <option value="">📚 Tất cả chuyên ngành</option>
            {uniqueMajors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        <div style={styles.resultCount}>
          Hiển thị {filteredAndSortedStudents.length} / {students.length} sinh viên
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th} onClick={() => handleSort('fullName')}>
                Sinh Viên
                <span style={{
                  ...styles.sortIcon,
                  ...(sortBy === 'fullName' ? styles.activeSortIcon : {})
                }}>
                  {getSortIcon('fullName')}
                </span>
              </th>
              <th style={styles.th} onClick={() => handleSort('gender')}>
                Giới Tính
                <span style={{
                  ...styles.sortIcon,
                  ...(sortBy === 'gender' ? styles.activeSortIcon : {})
                }}>
                  {getSortIcon('gender')}
                </span>
              </th>
              <th style={styles.th} onClick={() => handleSort('age')}>
                Tuổi
                <span style={{
                  ...styles.sortIcon,
                  ...(sortBy === 'age' ? styles.activeSortIcon : {})
                }}>
                  {getSortIcon('age')}
                </span>
              </th>
              <th style={styles.th} onClick={() => handleSort('major')}>
                Chuyên Ngành
                <span style={{
                  ...styles.sortIcon,
                  ...(sortBy === 'major' ? styles.activeSortIcon : {})
                }}>
                  {getSortIcon('major')}
                </span>
              </th>
              <th style={styles.th} onClick={() => handleSort('score')}>
                Điểm TB
                <span style={{
                  ...styles.sortIcon,
                  ...(sortBy === 'score' ? styles.activeSortIcon : {})
                }}>
                  {getSortIcon('score')}
                </span>
              </th>
              <th style={styles.th}>
                Xếp Loại
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents.map((student, index) => (
              <tr 
                key={student.id} 
                style={{
                  ...styles.tr,
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa'
                }}
                onMouseEnter={(e) => e.target.closest('tr').style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.closest('tr').style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#fafafa'}
              >
                <td style={styles.td}>
                  <div style={styles.studentInfo}>
                    <div style={styles.avatar}>
                      {student.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.studentDetails}>
                      <div style={styles.studentName}>{student.fullName}</div>
                      <div style={styles.studentId}>#{student.id}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.genderBadge,
                    ...(student.gender === 'Nam' ? styles.maleGender : styles.femaleGender)
                  }}>
                    {student.gender === 'Nam' ? '👨' : '👩'} {student.gender}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={{ fontWeight: '500' }}>{student.age} tuổi</span>
                </td>
                <td style={styles.td}>
                  <span style={styles.majorTag}>{student.major}</span>
                </td>
                <td style={styles.td}>
                  <div style={styles.scoreDisplay}>
                    <span style={{
                      ...styles.scoreNumber,
                      color: setColor(student.score)
                    }}>
                      {student.score}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '12px' }}>/10</span>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={getBadgeStyle(student.score)}>
                    {setScore(student.score)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedStudents.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>Không tìm thấy sinh viên</div>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRow;