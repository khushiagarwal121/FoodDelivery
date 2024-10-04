const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// const generateAccessToken = (user) => {
//   return jwt.sign(
//     { uuid: user.uuid, email: user.email },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: "15m" }
//   );
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign(
//     { uuid: user.uuid, email: user.email },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: "7d" }
//   );
// };

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.login = async (req, res, pool) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // const accessToken = generateAccessToken(user);
    // const refreshToken = generateRefreshToken(user);

    // Create a token (if needed, e.g., for session management)
    const token = jwt.sign(
      { uuid: user.uuid, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    // res.status(200).json({
    //   message: "Login successful",
    //   accessToken,
    //   refreshToken,
    // });

    console.log("Logged in! Token:", token);

    res.status(200).json({ message: "Login successful", token }); // Send the token or user data
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.refreshToken = async (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.sendStatus(401); // Unauthorized
//   }

//   try {
//     const userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//     const accessToken = generateAccessToken(userData);
//     const newRefreshToken = generateRefreshToken(userData);

//     // Store the new refresh token (if applicable)

//     res.json({ accessToken, refreshToken: newRefreshToken });
//   } catch (error) {
//     console.error("Refresh token error:", error);
//     res.sendStatus(403); // Forbidden
//   }
// };

exports.signup = async (req, res, pool) => {
  const {
    first_name,
    last_name,
    email,
    password,
    country_code,
    phone_number,
    dob,
  } = req.body;

  console.log("Received signup data:", req.body);
  try {
    // Check if user already exists by email or phone number
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR phone_number = $2",
      [email, phone_number]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "User already exists with that email or phone number",
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query(
      `INSERT INTO users (uuid, first_name, last_name, email, password, country_code, phone_number, dob)
       VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        country_code,
        phone_number,
        dob,
      ]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res, pool) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with that email" });
    }

    // Generate a reset token (JWT or random token)
    const token = jwt.sign(
      { uuid: user.uuid, email: user.email },
      "your_jwt_secret",
      { expiresIn: "15m" }
    );

    console.log(process.env.EMAIL_USER);

    // Send email with reset link (You can configure an actual email service with nodemailer)
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
      text: `You requested a password reset. Please use the following link to reset your password: http://localhost:8080/reset-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);

        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Password reset link sent to email" });
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res, pool) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_jwt_secret");

    // Find the user by UUID
    const result = await pool.query("SELECT * FROM users WHERE uuid = $1", [
      decoded.uuid,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await pool.query("UPDATE users SET password = $1 WHERE uuid = $2", [
      hashedPassword,
      user.uuid,
    ]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
