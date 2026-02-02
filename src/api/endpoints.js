import apiClient from './apiClient';

// Employee API endpoints
export const employeeAPI = {
  getAll: async () => {
    const response = await apiClient.get('/api/employees');
    return response.data;
  },
  create: async (employeeData) => {
    const response = await apiClient.post('/api/employees', employeeData);
    return response.data;
  },
  delete: async (employeeId) => {
    await apiClient.delete(`/api/employees/${employeeId}`);
  },
  getById: async (employeeId) => {
    const response = await apiClient.get(`/api/employees/${employeeId}`);
    return response.data;
  },
  getDepartments: async () => {
    const response = await apiClient.get('/api/departments');
    return response.data;
  },
};

// Attendance API endpoints
export const attendanceAPI = {
  getAll: async () => {
    const response = await apiClient.get('/api/attendance');
    return response.data;
  },
  create: async (attendanceData) => {
    const response = await apiClient.post('/api/attendance', attendanceData);
    return response.data;
  },
  getByEmployee: async (employeeId) => {
    const response = await apiClient.get('/api/attendance', {
      params: { employee_id: employeeId },
    });
    return response.data;
  },
  getByDate: async (date) => {
    const response = await apiClient.get('/api/attendance', {
      params: { date_from: date, date_to: date },
    });
    return response.data;
  },
  getDashboard: async () => {
    const response = await apiClient.get('/api/dashboard');
    return response.data;
  },
};
