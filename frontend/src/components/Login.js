import React, { useState } from "react";
import { login } from "../services/auth";
import { Navigate } from "react-router-dom";
import "../App.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { username, password }); // Debug form submission
    setError(null);

    try {
      const token = await login(username, password);
      console.log("Token received:", token); // Debug token
      localStorage.setItem("token", token);
      setToken(token);
      setRedirectToDashboard(true);
    } catch (err) {
      console.error("Error during login:", err.message); // Debug login error
      setError(err.message);
    }
  };

  if (redirectToDashboard) {
    console.log("Redirecting to dashboard"); // Debug redirection
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h1 className="title">Innovative Solutions for Green Energy</h1>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
