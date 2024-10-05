const {
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,
} = require("./service");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password); // Removed pool
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    await signupUser(req.body); // Removed pool
    res
      .status(201)
      .json({ message: "User created successfully. Please log in." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(409).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await sendResetPasswordLink(email); // Removed pool
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(404).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    await resetUserPassword(token, newPassword); // Removed pool
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
