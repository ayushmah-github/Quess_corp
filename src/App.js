import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import AttendanceForm from './components/AttendanceForm';
import AttendanceRecords from './components/AttendanceRecords';
import EmployeeAttendance from './components/EmployeeAttendance';
import { employeeAPI, attendanceAPI } from './api/endpoints';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [loading, setLoading] = useState(false);
  const [employeeError, setEmployeeError] = useState('');
  const [attendanceError, setAttendanceError] = useState('');

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch attendance records when attendance tab is active
  useEffect(() => {
    if (activeTab === 'attendance' && !selectedEmployee) {
      fetchAttendanceRecords();
    }
  }, [activeTab, selectedEmployee]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setEmployeeError('');
      const data = await employeeAPI.getAll();
      setEmployees(data || []);
    } catch (error) {
      setEmployeeError(
        error.response?.data?.detail ||
          error.message ||
          'Failed to fetch employees'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      setAttendanceError('');
      const data = await attendanceAPI.getAll();
      setAttendanceRecords(data || []);
    } catch (error) {
      setAttendanceError(
        error.response?.data?.detail ||
          error.message ||
          'Failed to fetch attendance records'
      );
    }
  };

  const handleAddEmployee = async (formData) => {
    try {
      setLoading(true);
      setEmployeeError('');
      await employeeAPI.create(formData);
      await fetchEmployees();
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Failed to add employee';
      setEmployeeError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      setLoading(true);
      setEmployeeError('');
      await employeeAPI.delete(employeeId);
      await fetchEmployees();
    } catch (error) {
      setEmployeeError(
        error.response?.data?.detail ||
          error.message ||
          'Failed to delete employee'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (attendanceData) => {
    try {
      setLoading(true);
      setAttendanceError('');
      await attendanceAPI.create(attendanceData);
      await fetchAttendanceRecords();
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Failed to mark attendance';
      setAttendanceError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleViewEmployeeAttendance = (employeeId) => {
    const employee = employees.find((e) => e.employee_id === employeeId);
    setSelectedEmployee(employee);
  };

  const handleFetchEmployeeAttendance = async (employeeId) => {
    try {
      const data = await attendanceAPI.getByEmployee(employeeId);
      return data || [];
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
          error.message ||
          'Failed to fetch employee attendance'
      );
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {selectedEmployee ? (
          <EmployeeAttendance
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
            onFetchAttendance={handleFetchEmployeeAttendance}
          />
        ) : (
          <>
            {activeTab === 'employees' && (
              <div>
                <EmployeeForm onSubmit={handleAddEmployee} isLoading={loading} />
                <EmployeeList
                  employees={employees}
                  loading={loading}
                  error={employeeError}
                  onDelete={handleDeleteEmployee}
                  onViewAttendance={handleViewEmployeeAttendance}
                  onErrorClose={() => setEmployeeError('')}
                />
              </div>
            )}

            {activeTab === 'attendance' && (
              <div>
                <AttendanceForm
                  employees={employees}
                  onSubmit={handleMarkAttendance}
                  isLoading={loading}
                />
                <AttendanceRecords
                  records={attendanceRecords}
                  loading={loading}
                  error={attendanceError}
                  onErrorClose={() => setAttendanceError('')}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
