const mongoose = require("mongoose");

const ChartSchema = new mongoose.Schema({
  chartName: {
    type: String,
    required: true,
  },
  labels: {
    type: [String],
    required: true,
  },
  data: {
    type: [Number],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Chart", ChartSchema);
