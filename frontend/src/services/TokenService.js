import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Update tokens in storage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error; // Handle error appropriately
  }
};
