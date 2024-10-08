require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // Import PostgreSQL client
const authRoutes = require("./features/auth/api");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    methods: ["GET", "POST"],
  })
);

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
pool
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.log("Database connection error:", err));

// Routes
app.use("/api/auth", authRoutes(pool)); // Pass pool to routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
