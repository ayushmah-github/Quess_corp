import React, { useState, useEffect } from 'react';
import { Loading, EmptyState, ErrorMessage } from './LoadingStates';
import './EmployeeList.css';

const AttendanceRecords = ({ loading, error, records, onErrorClose }) => {
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    if (records && selectedDate) {
      const filtered = records.filter((record) => record.date === selectedDate);
      setFilteredRecords(filtered);
    }
  }, [records, selectedDate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onClose={onErrorClose} />;
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState icon="📋" message="No attendance records found yet" />
    );
  }

  const presentCount = filteredRecords.filter(
    (r) => r.status === 'Present'
  ).length;
  const absentCount = filteredRecords.filter(
    (r) => r.status === 'Absent'
  ).length;

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>📊 Attendance Overview</h2>
        <p>
          Showing records for{' '}
          {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0' }}>
        <label
          htmlFor="attendance-date"
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
          }}
        >
          Filter by Date:
        </label>
        <input
          id="attendance-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            width: '200px',
          }}
        />
      </div>

      {filteredRecords.length === 0 ? (
        <EmptyState
          icon="📅"
          message={`No records for ${new Date(selectedDate).toLocaleDateString()}`}
        />
      ) : (
        <>
          <div
            style={{
              padding: '1rem 1.5rem',
              background: '#f5f5f5',
              borderBottom: '1px solid #ddd',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#667eea',
                }}
              >
                {filteredRecords.length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#999' }}>
                Total Records
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#28a745',
                }}
              >
                {presentCount}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#999' }}>
                Present
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#dc3545',
                }}
              >
                {absentCount}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#999' }}>Absent</div>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.employee_id}</td>
                    <td className="employee-name">{record.employee_name || 'N/A'}</td>
                    <td>{record.department || 'N/A'}</td>
                    <td>
                      <span
                        className="badge"
                        style={
                          record.status === 'Present'
                            ? { background: '#d4edda', color: '#155724' }
                            : { background: '#f8d7da', color: '#721c24' }
                        }
                      >
                        {record.status === 'Present' ? '✓ Present' : '✕ Absent'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceRecords;
