const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  findUserByEmail,
  createUser,
  updateUserPassword,
  findUserByUUID,
  findUserByEmailOrPhone,
} = require("./authRepository");
require("dotenv").config();
const fs = require("fs");
const JSEncrypt = require("node-jsencrypt");
const path = require("path");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/tokenUtils");
const privateKeyPath = path.join(
  __dirname,
  "../../config/keys/private_key.pem",
);
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

function decryptPassword(encryptedPassword) {
  if (!encryptedPassword || typeof encryptedPassword !== "string") {
    throw new Error("Invalid encrypted password");
  }

  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey);

  const decrypted = encryptor.decrypt(encryptedPassword);
  if (!decrypted) {
    throw new Error("Failed to decrypt password");
  }

  return decrypted;
}

exports.loginUser = async (email, encryptedPassword) => {
  console.log("Encrypted Password:", encryptedPassword); // Log encrypted password
  const user = await findUserByEmail(email); // No need to pass pool

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Decrypt the password from the frontend
  const password = decryptPassword(encryptedPassword);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

exports.signupUser = async (userData) => {
  const existingUser = await findUserByEmailOrPhone(
    userData.email,
    userData.phone_number,
  );

  if (existingUser) {
    throw new Error("User already exists with that email or phone number");
  }

  // Decrypt the password from the frontend
  const decryptedPassword = decryptPassword(userData.password);

  // Hash the decrypted password
  const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

  await createUser({ ...userData, hashedPassword }); // Corrected to use 'password' instead of 'hashedPassword'
};

exports.sendResetPasswordLink = async (email) => {
  const user = await findUserByEmail(email); // No need to pass pool

  if (!user) {
    throw new Error("User not found with that email");
  }

  const token = jwt.sign(
    { uuid: user.uuid, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
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
    text: `You requested a password reset. Please use the following link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
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

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
