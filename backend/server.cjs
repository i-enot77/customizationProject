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

const products = require("./src/routes/products.cjs");
const productById = require("./src/routes/productById.cjs");
const paymentStatusRoute = require("./src/routes/paymentStatus.cjs");
const saveOrderRoute = require("./src/routes/saveOrderController.cjs");
const sendContactForm = require("./src/routes/contactForm.cjs");
// const FileAploadRoute = require("./src/routes/fileAploadRoute.cjs");

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
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

//stripe webhook
app.use("/api", paymentStatusRoute);

app.use(express.json());
// routes
app.use("/materials", express.static(path.join(__dirname, "materials")));

app.use("/create-checkout-session", require("./src/routes/payment.cjs"));
app.use("/api", products);
app.use("/api", productById);
app.use("/api", saveOrderRoute);
app.use("/api", sendContactForm);
// app.use("/api", FileAploadRoute);

app.use("/", require("./src/routes/root.cjs"));
app.use("/register", require("./src/routes/register.cjs"));
app.use("/auth", require("./src/routes/auth.cjs"));
app.use("/refresh", require("./src/routes/refresh.cjs"));
app.use("/logout", require("./src/routes/logout.cjs"));
app.use("/reset-email", require("./src/routes/sendResetEmail.cjs"));
app.use("/reset-password", require("./src/routes/resetPwd.cjs"));

// app.use(verifyJWT);

app.all("*", (req, res) => {
  res.status(404);
  res.json({ error: "404 Not Found" });
  console.log("404 Not Found");
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
