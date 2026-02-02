import axios from 'axios';

// Update this with your FastAPI backend URL
const API_BASE_URL = 'https://quessbackend-3.onrender.com';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
