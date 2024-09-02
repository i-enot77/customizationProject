const jwt = require("jsonwebtoken");
const User = require("../model/User.cjs");

// Middleware to verify the JWT and load the user
const verifyToken = async (req, res, next) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
