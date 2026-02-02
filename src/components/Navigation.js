import React from 'react';
import './Navigation.css';

const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="nav-tabs">
      <button
        className={`nav-tab ${activeTab === 'employees' ? 'active' : ''}`}
        onClick={() => onTabChange('employees')}
      >
        👥 Employees
      </button>
      <button
        className={`nav-tab ${activeTab === 'attendance' ? 'active' : ''}`}
        onClick={() => onTabChange('attendance')}
      >
        📋 Attendance
      </button>
    </div>
  );
};

export default Navigation;
