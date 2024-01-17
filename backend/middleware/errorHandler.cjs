const { logEvents } = require("./logEvents.cjs");

const errorHandler = (err, req, res) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
