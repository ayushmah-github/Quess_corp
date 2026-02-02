import React, { useState } from 'react';
import './Form.css';

const EmployeeForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee_id.trim()) {
      newErrors.employee_id = 'Employee ID is required';
    }
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
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
    // Clear error for this field when user starts typing
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
      await onSubmit(formData);
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
      });
      setSuccess('Employee added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      // Handle both conflict errors and other errors
      const errorMsg = error.response?.data?.detail || error.message || 'Failed to add employee';
      setErrors({ submit: errorMsg });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>➕ Add New Employee</h2>

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
          <label htmlFor="employee_id">Employee ID *</label>
          <input
            id="employee_id"
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            placeholder="e.g., EMP001"
          />
          {errors.employee_id && <div className="form-error">{errors.employee_id}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="full_name">Full Name *</label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
          />
          {errors.full_name && <div className="form-error">{errors.full_name}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., john@company.com"
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <input
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Engineering"
          />
          {errors.department && <div className="form-error">{errors.department}</div>}
        </div>
      </div>

      <div className="button-group">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
