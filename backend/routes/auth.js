const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const mockUser = { username: "Vamshidhar", password: "Vamshidhar" };

router.post("/login", (req, res) => {
  console.log("Login route hit"); // Debug log to confirm route is hit
  console.log("Request body received:", req.body); // Log the incoming request body

  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    try {
      console.log("Valid credentials. Generating JWT..."); // Debug for valid credentials
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
      console.log("JWT generated successfully:", token); // Debug JWT token
      res.status(200).json({ token });
    } catch (error) {
      console.error("JWT generation error:", error); // Debug JWT generation issues
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.warn("Invalid credentials provided:", { username, password }); // Debug invalid credentials
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
