const express = require("express");
const { login, signup, forgotPassword } = require("./controller");

const router = express.Router();

module.exports = (pool) => {
  router.post("/login", (req, res) => login(req, res, pool));
  router.post("/signup", (req, res) => signup(req, res, pool));
  router.post("/forgot-password", (req, res) => forgotPassword(req, res, pool));
  // added logout
  router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully." });
  });

  return router;
};
