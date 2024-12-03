require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth"); // Import authentication routes (ensure `auth.js` exists in the same directory)
const chartRoutes = require("./routes/charts"); // Import chart routes (ensure `charts.js` exists in the same directory)

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON payloads

// MongoDB Connection
const uri = process.env.MONGO_URI; // Get MongoDB connection string from .env
if (!uri) {
  console.error("Error: MongoDB URI is not defined in .env file.");
  process.exit(1); // Exit if URI is not provided
}

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes
app.use("/auth", authRoutes); // Attach authentication routes to `/auth`
app.use("/charts", chartRoutes); // Attach chart-related routes to `/charts`

// Root Route for Health Check
app.get("/", (req, res) => {
  res.send("Welcome to the Clean Energy SPA App Backend!");
});

// 404 Route (Not Found)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
