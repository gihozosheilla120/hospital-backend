// app.js
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Connect to DB
const db = require("./config/database");
db();

// Middleware
app.use(express.json());

// Import routes
const doctorRoutes = require("./routes/doctor");
const nurseRoutes = require("./routes/nurse");
const patientRoutes = require("./routes/patient");

// Use routes with /api prefix
app.use("/api", doctorRoutes);
app.use("/api", nurseRoutes);
app.use("/api", patientRoutes);

// Test root route
app.get("/", (req, res) => {
    res.send("Hospital API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
