//middleware function to protect admin routes
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    res.status(403).send("Forbidden: Admins only");
  }
}
