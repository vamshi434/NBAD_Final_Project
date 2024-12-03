import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const login = async (username, password) => {
  console.log("Sending login request:", { username, password }); // Debug request data

  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    console.log("Login successful, response data:", response.data); // Debug success response
    return response.data.token; // Return the JWT token
  } catch (error) {
    console.error("Login error:", error.response || error.message); // Debug error details
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid credentials. Please try again.");
    }
    throw new Error("Failed to connect to the server.");
  }
};
