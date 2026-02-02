import React, { useState, useEffect } from 'react';
import { Loading, EmptyState, ErrorMessage } from './LoadingStates';
import './EmployeeAttendance.css';

const EmployeeAttendance = ({ employee, onClose, onFetchAttendance }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await onFetchAttendance(employee.employee_id);
      setRecords(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance records');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee.employee_id]);

  const presentDays = records.filter((r) => r.status === 'Present').length;
  const absentDays = records.filter((r) => r.status === 'Absent').length;

  return (
    <div className="attendance-list">
      <div className="attendance-header">
        <div>
          <h2>📋 Attendance: {employee.full_name}</h2>
          <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>
            {employee.employee_id} • {employee.department}
          </p>
        </div>
        <button className="close-btn" onClick={onClose} title="Close">
          ✕
        </button>
      </div>

      {records.length > 0 && (
        <div className="attendance-summary">
          <div className="summary-item">
            <div className="summary-item-value">{records.length}</div>
            <div className="summary-item-label">Total Records</div>
          </div>
          <div className="summary-item">
            <div className="summary-item-value" style={{ color: '#28a745' }}>
              {presentDays}
            </div>
            <div className="summary-item-label">Days Present</div>
          </div>
          <div className="summary-item">
            <div className="summary-item-value" style={{ color: '#dc3545' }}>
              {absentDays}
            </div>
            <div className="summary-item-label">Days Absent</div>
          </div>
        </div>
      )}

      <div className="attendance-records">
        {loading && <Loading />}

        {error && (
          <ErrorMessage message={error} onClose={() => setError('')} />
        )}

        {!loading && !error && records.length === 0 && (
          <EmptyState
            icon="📋"
            message="No attendance records found for this employee"
          />
        )}

        {!loading &&
          !error &&
          records.map((record, index) => (
            <div key={index} className="attendance-record">
              <div className="record-info">
                <div className="record-date">
                  📅 {new Date(record.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <span
                className={`status-badge status-${record.status.toLowerCase()}`}
              >
                {record.status === 'Present' ? '✓ Present' : '✕ Absent'}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
