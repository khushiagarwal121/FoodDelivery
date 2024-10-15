const { verify } = require("jsonwebtoken");
const {
  loginUser,
  signupUser,
  sendResetPasswordLink,
  resetUserPassword,
  verifyToken,
} = require("./authService");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password); // Ensure this returns the user object, not just a token
    const accessToken = generateAccessToken(user); // Generate access token
    const refreshToken = generateRefreshToken(user); // Generate refresh token
    console.log("Generated token:", token);

    // Set the refresh token in a cookie for HTTP
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Set to true for HTTPS
      sameSite: "strict", // Helps protect against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
    });
    console.log("Response headers before sending:", res.getHeaders());

    res.status(200).json({
      message: "Login successful",
      accessToken, // Send access token in response
    });
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

exports.checkAuth = async (req, res) => {
  console.log("req.cookies", req.cookies);

  const accessToken = req.cookies["authToken"];
  const refreshToken = req.cookies["refreshToken"];

  // Check for access token
  if (!accessToken) {
    return res.status(401).json({ message: "No access token provided" });
  }

  try {
    // Verify the access token
    const userData = verifyAccessToken(accessToken);
    return res.status(200).json({ message: "Authenticated", user: userData });
  } catch (err) {
    console.log("Access token verification failed:", err.message);

    // Access token is invalid or expired, check refresh token
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
      // Verify the refresh token
      const refreshData = verifyRefreshToken(refreshToken);
      const user = await findUserByUUID(refreshData.uuid); // Retrieve user data using UUID from refresh token

      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // Generate a new access token
      const newAccessToken = generateAccessToken(user);

      // Optionally set the new access token in the cookies
      res.cookie("authToken", newAccessToken, {
        httpOnly: true,
        secure: false, // Should be true in production
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      });

      return res.status(200).json({
        message: "Access token refreshed",
        user: { uuid: user.uuid, email: user.email },
        newAccessToken, // Return the new access token if desired
      });
    } catch (refreshError) {
      console.error("Refresh token verification failed:", refreshError.message);
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
};
