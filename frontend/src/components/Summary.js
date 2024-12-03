import React, { useState, useEffect } from "react";
import { fetchChart1Data } from "../services/charts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Summary = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    fetchChart1Data(token)
      .then((data) => {
        setChartData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!chartData) {
    return <p>Loading...</p>;
  }

  // Prepare chart data
  const barData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Values",
        data: chartData.data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div>
      <h2>Summary</h2>
      <p>{chartData.description}</p>
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default Summary;
