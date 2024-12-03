import React, { useState, useEffect } from "react";
import { fetchChart2Data } from "../services/charts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the required components for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Reports = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    fetchChart2Data(token)
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

  // Prepare datasets for the chart
  console.log("Labels-->",chartData.labels)
  console.log( "Fossil_Fuel_Data---->",chartData.data);
  console.log("Renewable Data------>",chartData.renewableData);
  const lineData = {
    labels: chartData.labels, // X-axis labels
    datasets: [
      {
        label: "Renewable Energy Growth",
        data: chartData.renewableData, // Y-axis data for renewable energy
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.4,
        pointStyle: "circle",
        pointRadius: 5,
      },
      {
        label: "Fossil Fuel Decline",
        data: chartData.fossilFuelData, // Y-axis data for fossil fuel decline
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        pointStyle: "rect",
        pointRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Energy Trends Over Time",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value.toFixed(2)}%`; // Format values
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
          font: {
            size: 14,
          },
        },
        min: 0,
        max: 100, // Fixed range for percentage data
      },
    },
  };

  return (
    <div>
      <h2>Reports</h2>
      <p>{chartData.description}</p>
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default Reports;
