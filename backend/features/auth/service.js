const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  findUserByEmail,
  createUser,
  updateUserPassword,
  findUserByUUID,
  findUserByEmailOrPhone,
} = require("./repository");
require("dotenv").config();

exports.loginUser = async (email, password) => {
  const user = await findUserByEmail(email); // No need to pass pool

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { uuid: user.uuid, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

exports.signupUser = async (userData) => {
  const existingUser = await findUserByEmailOrPhone(
    userData.email,
    userData.phone_number
  );

  if (existingUser) {
    throw new Error("User already exists with that email or phone number");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await createUser({ ...userData, hashedPassword }); // No need to pass pool
};

exports.sendResetPasswordLink = async (email) => {
  const user = await findUserByEmail(email); // No need to pass pool

  if (!user) {
    throw new Error("User not found with that email");
  }

  const token = jwt.sign(
    { uuid: user.uuid, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Please use the following link to reset your password:${process.env.FRONTEND_URL}/reset-password?token=${token}`,
  };

  await transporter.sendMail(mailOptions);

  return token;
};

exports.resetUserPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await findUserByUUID(decoded.uuid); // No need to pass pool

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.uuid, hashedPassword); // No need to pass pool
};
