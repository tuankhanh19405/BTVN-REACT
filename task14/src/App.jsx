import { useState } from 'react'
import './App.css'
import StudentRow from './StudentRow'
import OutStandingStudent from './OutStandingStudent'
import StudentList from './StudentList'

function App() {
  const [activeTab, setActiveTab] = useState('studentRow');

  const tabStyle = {
    padding: '12px 24px',
    margin: '0 5px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    fontSize: '14px'
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,123,255,0.3)'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  };

  const tabContainerStyle = {
    display: 'flex',
    marginBottom: '20px',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '0'
  };

  const contentStyle = {
    backgroundColor: 'white',
    borderRadius: '0 8px 8px 8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    minHeight: '400px',
    animation: 'fadeIn 0.3s ease-in'
  };

  const renderActiveComponent = () => {
    switch(activeTab) {
      case 'studentRow':
        return <StudentRow />;
      case 'outStandingStudent':
        return <OutStandingStudent />;
      case 'studentList':
        return <StudentList />;
      default:
        return <StudentRow />;
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#333',
        fontSize: '28px',
        fontWeight: 'bold'
      }}>
        Hệ Thống Quản Lý Sinh Viên
      </h1>
      
      <div style={tabContainerStyle}>
        <div 
          style={activeTab === 'studentRow' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('studentRow')}
        >
          📊 Danh Sách Sinh Viên
        </div>
        <div 
          style={activeTab === 'outStandingStudent' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('outStandingStudent')}
        >
          🏆 Sinh Viên Xuất Sắc
        </div>
        <div 
          style={activeTab === 'studentList' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('studentList')}
        >
          📋 Danh Sách Chi Tiết
        </div>
      </div>
      
      <div style={contentStyle}>
        {renderActiveComponent()}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default App