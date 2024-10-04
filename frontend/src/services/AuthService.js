import axios from 'axios';

const API_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

const AuthService = {
  login(email, password) {
    return axios.post(`${API_URL}/login`, { email, password });
  },
  signup(firstName, lastName, email, password) {
    return axios.post(`${API_URL}/signup`, { firstName, lastName, email, password });
  },
  resetPassword(email) {
    return axios.post(`${API_URL}/forgot-password`, { email });
  }
};

export default AuthService;
