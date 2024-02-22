require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions.cjs");
const { logger } = require("./src/middleware/logEvents.cjs");
const errorHandler = require("./src/middleware/errorHandler.cjs");
// const verifyJWT = require("./src/middleware/verifyJWT.cjs");
const cookieParser = require("cookie-parser");
const credentials = require("./src/middleware/credentials.cjs");
const mongoose = require("mongoose");
const connectDB = require("./src/config/dbConn.cjs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
const PORT = process.env.PORT || 3500;

mongoose.set("strictQuery", false);
connectDB();
app.use(helmet());
app.use(limiter);
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

// routes

app.use("/api", require("./src/routes/products.cjs")); // Mount routes under /api

app.use("/", require("./src/routes/root.cjs"));
app.use("/register", require("./src/routes/register.cjs"));
app.use("/auth", require("./src/routes/auth.cjs"));
app.use("/refresh", require("./src/routes/refresh.cjs"));
app.use("/logout", require("./src/routes/logout.cjs"));
app.use("/reset-email", require("./src/routes/sendResetEmail.cjs"));
app.use("/reset-password", require("./src/routes/resetPwd.cjs"));
app.use("/submit-form", require("./src/routes/contactForm.cjs"));

// app.use(verifyJWT);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
