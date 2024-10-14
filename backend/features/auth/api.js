const express = require("express");
const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  // logout,
  checkAuth,
} = require("./controller");
// require("dotenv").config();
const fs = require("fs");
const router = express.Router();
const path = require("path");

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

  // adding check-auth route for cookies
  router.get("/check-auth", (req, res) => checkAuth(req, res));
  // Endpoint to get the public key
  router.get("/public-key", (req, res) => {
    try {
      const publicKey = fs.readFileSync(
        path.join(__dirname, "../../config/keys/public_key.pem"),
        "utf8"
      );
      console.log("fetched public key", publicKey);
      res.json({ publicKey });
    } catch (error) {
      console.error("Error reading public key:", error);
      res.status(500).json({ message: "Could not retrieve public key" });
    }
  });

  return router;
};
