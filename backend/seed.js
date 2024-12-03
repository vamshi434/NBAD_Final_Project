require("dotenv").config();
const mongoose = require("mongoose");
const Chart = require("./models/Chart");

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas!123");

    // Debugging: Log database name
    console.log("Database name:", mongoose.connection.name);

    // Perform database operations
    return Chart.deleteMany({});
  })
  .then(() => {
    console.log("Old data cleared. Inserting seed data...");
    return Chart.insertMany([
      {
        chartName: "chart1",
        labels: ["Solar", "Wind", "Hydro", "Nuclear"],
        data: [40, 25, 20, 15],
        description: "Investment percentage in clean energy sectors.",
      },
      {
        chartName: "chart2",
        labels: ["2020", "2021", "2022", "2023", "2024"],
        data: [5, 10, 15, 25, 30],
        description: "Annual growth in renewable energy installations.",
      },
    ]);
  })
  .then((data) => {
    console.log("Seed data inserted successfully:", data);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
  });
