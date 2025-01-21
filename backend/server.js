const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit"); 

const path = require("path");
const gameRoutes = require("./routes/gameRoutes");
const spinRoutes = require("./routes/spinRoutes");
const apiLimiter = require("./middleware/ratelimiter");


const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); //ensures only trusted origins can access the API if required
app.use(express.json());
app.use(morgan("combined"));

// Apply rate limiting globally to all API routes
// The rate limiter middleware is used to make the API more robust by preventing abuse
// of resources and ensuring fair usage. This is especially important for public APIs
// or APIs exposed to the internet.

// API Routes
app.use("/api/", apiLimiter);
app.use("/api/games", gameRoutes);
app.use("/api/spin", spinRoutes);

// Serve React Frontend
const buildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildPath));

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
