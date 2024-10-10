const express = require("express");
const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  logout,
  checkAuth,
} = require("./controller");
// require("dotenv").config();

const router = express.Router();

module.exports = (pool) => {
  router.post("/login", (req, res) => login(req, res, pool));
  router.post("/signup", (req, res) => signup(req, res, pool));
  router.post("/forgot-password", (req, res) => forgotPassword(req, res, pool));
  router.post("/reset-password", (req, res) => resetPassword(req, res, pool));
  // router.post("/logout", (req, res) => logout(req, res));
  router.post("/logout", (req, res) => {
    // Clear the authentication cookie
    res.clearCookie("authToken"); // Replace 'accessToken' with your actual cookie name
    // res.clearCookie('refreshToken'); // If using refresh token cookies
    res.status(200).json({ message: "Successfully logged out" });
  });

  // adding check-auth route for ckkoies
  router.get("/check-auth", (req, res) => checkAuth(req, res));
  // router.get("/api/auth/check-auth", (req, res) => {
  //   const token = req.cookies["yourCookieName"]; // Replace with your cookie name

  //   if (!token) {
  //     return res.status(401).json({ message: "No token provided" });
  //   }

  //   try {
  //     // Replace 'yourSecretKey' with your actual JWT secret
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     res.status(200).json({ message: "Authenticated", user: decoded });
  //   } catch (err) {
  //     res.status(401).json({ message: "Invalid token" });
  //   }
  // });

  return router;
};
