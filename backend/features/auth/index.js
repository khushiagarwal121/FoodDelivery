// Import from controller
const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  logout, // Include this if you have logout functionality
} = require("./controller");

// Import from service (if needed)
const {
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,
} = require("./service");

// Import from repository (if needed)
const {
  findUserByEmail,
  findUserByUUID,
  createUser,
  updateUserPassword,
  findUserByEmailOrPhone,
} = require("./repository");

// Export them together for easier access
module.exports = {
  // Expose controller methods
  login,
  signup,
  forgotPassword,
  resetPassword,
  logout,

  // Expose service methods (only if other parts of the app need direct access)
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,

  // Expose repository methods (if needed in other places)
  findUserByEmail,
  findUserByUUID,
  createUser,
  updateUserPassword,
  findUserByEmailOrPhone,
};
