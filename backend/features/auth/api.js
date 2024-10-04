const express = require("express");
const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  logout, // Add this
} = require("./controller");

const router = express.Router();

module.exports = (pool) => {
  router.post("/login", (req, res) => login(req, res, pool));
  router.post("/signup", (req, res) => signup(req, res, pool));
  router.post("/forgot-password", (req, res) => forgotPassword(req, res, pool));
  router.post("/reset-password", (req, res) => resetPassword(req, res, pool));
  router.post("/logout", (req, res) => logout(req, res)); // Add logout route

  return router;
};
