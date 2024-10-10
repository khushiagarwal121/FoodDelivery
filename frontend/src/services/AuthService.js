import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL || "http://localhost:5000/api/auth";

const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      return response.data; // Return response data for further processing if needed
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Login failed");
      } else if (error.request) {
        throw new Error("No response from the server");
      } else {
        throw new Error("Error: " + error.message);
      }
    }
  },

  async signup(userData) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data; // Return response data for further processing if needed
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },

  async resetPassword(email) {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      return response.data; // Return response data for further processing if needed
    } catch (error) {
      throw new Error(error.response?.data?.message || "Reset password failed");
    }
  },

  async confirmResetPassword(token, newPassword) {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        token,
        newPassword,
      });
      return response.data; // Return response data for further processing if needed
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Confirm reset password failed"
      );
    }
  },
};

export default AuthService;
