import React, { useState } from 'react';
import './Form.css';

const AttendanceForm = ({ employees, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee_id) {
      newErrors.employee_id = 'Employee is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Use the employee_id directly (not the numeric id)
      await onSubmit({
        employee_id: formData.employee_id,
        date: formData.date,
        status: formData.status,
      });

      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      });
      setSuccess('Attendance marked successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || error.message || 'Failed to mark attendance';
      setErrors({ submit: errorMsg });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>📋 Mark Attendance</h2>

      {success && (
        <div className="success-message">
          ✓ {success}
        </div>
      )}

      {errors.submit && (
        <div className="error" style={{ backgroundColor: '#fee', color: '#c33' }}>
          {errors.submit}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="employee_id">Select Employee *</label>
          <select
            id="employee_id"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
          >
            <option value="">-- Choose Employee --</option>
            {employees.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.full_name} ({employee.employee_id})
              </option>
            ))}
          </select>
          {errors.employee_id && <div className="form-error">{errors.employee_id}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <div className="form-error">{errors.date}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Present">Present ✓</option>
            <option value="Absent">Absent ✕</option>
          </select>
          {errors.status && <div className="form-error">{errors.status}</div>}
        </div>
      </div>

      <div className="button-group">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || employees.length === 0}
        >
          {isLoading ? 'Marking...' : 'Mark Attendance'}
        </button>
      </div>

      {employees.length === 0 && (
        <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '1rem' }}>
          ℹ️ Add employees first to mark attendance
        </p>
      )}
    </form>
  );
};

export default AttendanceForm;
