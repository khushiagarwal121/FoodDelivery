const express = require("express");
const {
  login,
  signup,
  forgotPassword,
  resetPassword,
} = require("./controller");

const router = express.Router();

module.exports = (pool) => {
  router.post("/login", (req, res) => login(req, res, pool));
  router.post("/signup", (req, res) => signup(req, res, pool));
  router.post("/forgot-password", (req, res) => forgotPassword(req, res, pool));
  router.post("/reset-password", (req, res) => resetPassword(req, res, pool)); // New route for reset password
  // added logout

  // router.post("/refresh", (req, res) => refreshToken(req, res, pool));

  return router;
};
