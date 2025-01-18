const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const gameRoutes = require("./routes/gameRoutes");
const spinRoutes = require("./routes/spinRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

// API Routes
app.use("/api/games", gameRoutes);
app.use("/api/spin", spinRoutes);

// Serve React Frontend
const buildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildPath));

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
