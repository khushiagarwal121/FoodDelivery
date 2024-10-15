const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate Access Token
exports.generateAccessToken = (user) => {
  return jwt.sign(
    { uuid: user.uuid, email: user.email }, // Payload
    process.env.JWT_SECRET, // Access Token secret
    { expiresIn: "15m" }, // Access Token expires in 15 minutes
  );
};

// Generate Refresh Token
exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { uuid: user.uuid, email: user.email }, // Payload
    process.env.JWT_REFRESH_SECRET, // Refresh Token secret
    { expiresIn: "7d" }, // Refresh Token expires in 7 days
  );
};

// Verify Access Token
exports.verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Valid Access Token
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

// Verify Refresh Token
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET); // Valid Refresh Token
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

// Refresh Access Token using a valid Refresh Token
exports.refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = this.generateAccessToken(decoded); // Generate new Access Token using decoded data
    return accessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
