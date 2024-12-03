import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// Fetch data for Summary (Chart 1)
export const fetchChart1Data = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/charts/chart1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chart1 data:", error);
    throw new Error("Failed to fetch chart1 data.");
  }
};

// Fetch data for Reports (Chart 2)
export const fetchChart2Data = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/charts/chart2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the entire chart2 document
  } catch (error) {
    console.error("Error fetching chart2 data:", error);
    throw error;
  }
};
