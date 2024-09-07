function errorHandler(err, req, res, next) {
  if (err.status && err.message) {
    res.status(err.status).json({ success: false, message: err.message });
  } else {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  console.log(err.status && err.message);
}
module.exports = errorHandler;

// const { logEvents } = require("./logEvents.cjs");

// const errorHandler = (err, req, res) => {
//   logEvents(`${err.name}: ${err.message}`, "errLog.txt");
//   console.error(err.stack);
//   res.status(500).send(err.message);
// };
