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

const auth = require("./src/routes/auth.cjs");
const register = require("./src/routes/register.cjs");
const refreshToken = require("./src/routes/refreshToken.cjs");
const resetEmail = require("./src/routes/sendResetEmail.cjs");
const resetPassword = require("./src/routes/resetPwd.cjs");
const logout = require("./src/routes/logout.cjs");
const payment = require("./src/routes/payment.cjs");

const emailUpdate = require("./src/routes/changeEmail.cjs");
const fullNameUpdate = require("./src/routes/changeFullName.cjs");
const phoneNumberUpdate = require("./src/routes/changePhoneNumber.cjs");
const userAddressUpdate = require("./src/routes/changeUserAddress.cjs");
const userDeliveryAddressUpdate = require("./src/routes/changeDeliveryAddress.cjs");

const products = require("./src/routes/products.cjs");
const productById = require("./src/routes/productById.cjs");
const textures = require("./src/routes/textures.cjs");
const paymentStatus = require("./src/routes/paymentStatus.cjs");
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
app.use("/api", paymentStatus);

app.use(express.json());
// routes

app.use("/api", auth);
app.use("/api", register);
app.use("/api", refreshToken);
app.use("/api", resetEmail);
app.use("/api", resetPassword);
app.use("/api", logout);

app.use("/api", emailUpdate);
app.use("/api", fullNameUpdate);
app.use("/api", phoneNumberUpdate);
app.use("/api", userAddressUpdate);
app.use("/api", userDeliveryAddressUpdate);

app.use("/api", payment);
app.use("/api", products);
app.use("/api", productById);
app.use("/api", textures);
app.use("/api", sendContactForm);
// app.use("/api", FileAploadRoute);

app.use("/", require("./src/routes/root.cjs"));

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
