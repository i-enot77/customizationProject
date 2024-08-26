const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:3000",
  "http://localhost:5173",
  "3.18.12.63",
  "3.130.192.231",
  "13.235.14.237",
  "13.235.122.149",
  "18.211.135.69",
  "35.154.171.200",
  "52.15.183.38",
  "54.88.130.119",
  "54.88.130.237",
  "54.187.174.169",
  "54.187.205.235",
  "54.187.216.72",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

// const cors = require('cors');
// const express = require('express');
// const app = express();

// // Environment-specific allowed origins
// const environmentOrigins = {
//   development: [
//     "http://localhost:3000", // React dev server
//     "http://localhost:5173", // Another local client
//   ],
//   production: [
//     "https://example.com",
//     "https://www.example.com",
//   ],
// };

// const allowedOrigins = environmentOrigins[process.env.NODE_ENV] || [];

// // CORS options
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin like mobile apps or curl
//     if (!origin) return callback(null, true);

//     // Check if the origin is allowed
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Necessary for cookies, authorization headers with HTTPS
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// // Use CORS with options
// app.use(cors(corsOptions));
