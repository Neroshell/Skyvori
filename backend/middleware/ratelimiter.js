const rateLimit = require("express-rate-limit");

// Rate Limiter Configuration
const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});

module.exports = apiLimiter;
