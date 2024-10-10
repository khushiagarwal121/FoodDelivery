const { verify } = require("jsonwebtoken");
const {
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,
  verifyToken,
} = require("./service");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password); // Assuming this returns a valid token
    console.log("Generated token:", token);

    // Set the token in a cookie for HTTP
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: false, // Must be false for HTTP (only true for HTTPS)
      sameSite: "strict", // Helps protect against CSRF attacks
      maxAge: 3600000, // Cookie expiration time (1 hour)
    });
    console.log("Response headers before sending:", res.getHeaders());

    res.status(200).json({ message: "Login successful" });
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
// exports.logout = (req, res) => {
//   try {
//     // Clear the authToken cookie on logout
//     res.clearCookie("authToken", {
//       httpOnly: true, // Make sure this matches the cookie options you used
//       secure: false, // Set to true if using HTTPS
//       sameSite: "None", // Ensure this matches your cookie settings
//     });

//     // Send a success response
//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({ message: "An error occurred while logging out" });
//   }
// };

exports.checkAuth = (req, res) => {
  console.log("req.cookies", req.cookies);
  // get token
  const token = req.cookies["authToken"];

  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    // calling service to verify token
    const userData = verifyToken(token);
    return res.status(200).json({ message: "Authenticated", user: userData });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
};
