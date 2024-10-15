require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // Import PostgreSQL client
const authRoutes = require("./features/auth/authApi");
const cookieParser = require("cookie-parser");
// const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:8080", // Your frontend URL
    credentials: true,
    // methods: ["GET", "POST"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);

// Use cookie-parser middleware
app.use(cookieParser());

// Middleware
// app.use(cors());
app.use(express.json());

// PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Test PostgreSQL connection
pool.connect().then(() => console.log("PostgreSQL connected"));

app.options("*", cors()); // Enable pre-flight across-the-board

// Routes
app.use("/api/auth", authRoutes(pool)); // Pass pool to routes

// Global error handler
// app.use(errorHandler); // Add the error handler middleware

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
