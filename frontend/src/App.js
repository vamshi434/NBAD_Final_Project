import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Summary from "./components/Summary";
import Reports from "./components/Reports";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const isAuthenticated = !!token;

  return (
    <Router>
      <nav>
        {isAuthenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/summary">Summary</Link>
            <Link to="/reports">Reports</Link>
            <button
              onClick={() => {
                setToken(null);
                localStorage.removeItem("token");
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/summary"
            element={isAuthenticated ? <Summary token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/reports"
            element={isAuthenticated ? <Reports token={token} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
