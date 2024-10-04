const {
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,
} = require("./service");

exports.login = async (req, res, pool) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(pool, email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message });
  }
};

exports.signup = async (req, res, pool) => {
  try {
    await signupUser(pool, req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(409).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res, pool) => {
  const { email } = req.body;

  try {
    await sendResetPasswordLink(pool, email);
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(404).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res, pool) => {
  const { token, newPassword } = req.body;

  try {
    await resetUserPassword(pool, token, newPassword);
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
