// Import from controller
const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  logout,
} = require("./controller");

// Import from service
const {
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,
} = require("./service");

// Import from repository
const {
  findUserByEmail,
  findUserByUUID,
  createUser,
  updateUserPassword,
  findUserByEmailOrPhone,
} = require("./repository");

// Exporting them together for easier access
module.exports = {
  // controller methods
  login,
  signup,
  forgotPassword,
  resetPassword,
  logout,

  //  service methods (if other parts of the app need direct access)
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,

  //  repository methods (if needed in other places)
  findUserByEmail,
  findUserByUUID,
  createUser,
  updateUserPassword,
  findUserByEmailOrPhone,
};
