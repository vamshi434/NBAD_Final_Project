const express = require("express");
const router = express.Router();
const path = require("path");

// Adjust the path to the correct location of Chart.js
const Chart = require(path.resolve(__dirname, "../models/Chart"));
const authenticateJWT = require("../middleware/authenticateJWT");

// Route for Chart1 (e.g., for Summary)
router.get("/chart1", authenticateJWT, async (req, res) => {
  try {
    const chart1 = await Chart.findOne({ chartName: "chart1" });
    if (!chart1) {
      return res.status(404).json({ error: "Chart data not found" });
    }
    res.json(chart1);
  } catch (error) {
    console.error("Error fetching chart1 data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route for Chart2 (e.g., for Reports)
router.get("/chart2", authenticateJWT, async (req, res) => {
  try {
    const chart2 = await Chart.findOne({ chartName: "chart2" });
    if (!chart2) {
      return res.status(404).json({ error: "Chart data not found" });
    }
    res.json(chart2); // Send the entire document
  } catch (error) {
    console.error("Error fetching chart2 data:", error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
