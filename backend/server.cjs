require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.cjs");
const { logger } = require("./middleware/logEvents.cjs");
const errorHandler = require("./middleware/errorHandler.cjs");
const verifyJWT = require("./middleware/verifyJWT.cjs");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials.cjs");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn.cjs");
const PORT = process.env.PORT || 3500;

mongoose.set("strictQuery", false);
connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root.cjs"));
app.use("/register", require("./routes/register.cjs"));
app.use("/auth", require("./routes/auth.cjs"));
app.use("/refresh", require("./routes/refresh.cjs"));
app.use("/logout", require("./routes/logout.cjs"));
app.use("/reset-email", require("./routes/sendResetEmail.cjs"));
app.use("/reset-password", require("./routes/resetPwd.cjs"));
app.use("/submit-form", require("./routes/contactForm.cjs"));

app.use(verifyJWT);
app.use("/users", require("./routes/api/users.cjs"));

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
