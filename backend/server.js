const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // Import PostgreSQL client
const authRoutes = require("./features/auth/api");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
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
