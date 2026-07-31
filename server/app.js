const express = require("express");
const cors = require("cors");

const meetingRoutes = require("./routes/meetingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api/meetings", meetingRoutes);

module.exports = app;
