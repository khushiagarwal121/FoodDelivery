import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const AuthService = {
  login(email, password) {
    return axios.post(`${API_URL}/login`, { email, password });
  },
  signup(userData) {
    return axios.post(`${API_URL}/signup`, userData);
  },
  resetPassword(email) {
    return axios.post(`${API_URL}/forgot-password`, { email });
  },
  confirmResetPassword(token, newPassword) {
    return axios.post(`${API_URL}/reset-password`, { token, newPassword });
  },
};

export default AuthService;
