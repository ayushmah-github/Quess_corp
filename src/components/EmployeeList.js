import React from 'react';
import { Loading, EmptyState, ErrorMessage } from './LoadingStates';
import './EmployeeList.css';

const EmployeeList = ({
  employees,
  loading,
  error,
  onDelete,
  onViewAttendance,
  onErrorClose,
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onClose={onErrorClose} />;
  }

  if (!employees || employees.length === 0) {
    return <EmptyState icon="👥" message="No employees found. Add one to get started!" />;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>👥 Employees ({employees.length})</h2>
        <p>Manage your workforce</p>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td className="employee-name">{employee.full_name}</td>
                <td>{employee.email}</td>
                <td>
                  <span className="badge badge-dept">{employee.department}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-sm btn-view"
                      onClick={() => onViewAttendance(employee.employee_id)}
                      title="View attendance records"
                    >
                      📋 Attendance
                    </button>
                    <button
                      className="btn-sm btn-delete"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${employee.full_name}?`
                          )
                        ) {
                          onDelete(employee.employee_id);
                        }
                      }}
                      title="Delete employee"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
